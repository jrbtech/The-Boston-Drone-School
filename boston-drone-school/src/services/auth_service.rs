use std::time::{SystemTime, UNIX_EPOCH};

use bcrypt::{hash, verify, DEFAULT_COST};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::models::user::{
    AuthResponse, LoginRequest, NewUser, StoredUser, UpdateUser, UserProfile, UserRole,
};
use crate::state::AppState;
use crate::utils::{validate_email, validate_password, AppError};

const TOKEN_TTL_SECONDS: u64 = 60 * 60; // 1 hour

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

fn current_timestamp() -> usize {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs() as usize
}

pub async fn register_user(state: &AppState, payload: NewUser) -> Result<UserProfile, AppError> {
    validate_email(&payload.email).map_err(AppError::BadRequest)?;
    validate_password(&payload.password).map_err(AppError::BadRequest)?;

    let mut users = state.users.write().await;
    if users
        .values()
        .any(|user| user.email.eq_ignore_ascii_case(&payload.email))
    {
        return Err(AppError::BadRequest("Email already in use".into()));
    }

    let password_hash = hash(&payload.password, DEFAULT_COST)
        .map_err(|err| AppError::InternalServerError(err.to_string()))?;

    let stored = StoredUser {
        id: Uuid::new_v4(),
        name: payload.name,
        email: payload.email,
        password_hash,
        role: UserRole::Student,
        progress: Vec::new(),
    };

    let profile = stored.as_profile();
    users.insert(profile.id, stored);

    Ok(profile)
}

pub async fn login_user(state: &AppState, payload: LoginRequest) -> Result<AuthResponse, AppError> {
    let users = state.users.read().await;
    let stored = users
        .values()
        .find(|user| user.email.eq_ignore_ascii_case(&payload.email))
        .ok_or_else(|| AppError::Unauthorized("Invalid credentials".into()))?;

    if !verify(&payload.password, &stored.password_hash)
        .map_err(|err| AppError::InternalServerError(err.to_string()))?
    {
        return Err(AppError::Unauthorized("Invalid credentials".into()));
    }

    let claims = Claims {
        sub: stored.id.to_string(),
        exp: current_timestamp() + TOKEN_TTL_SECONDS as usize,
    };

    let token = encode(
        &Header::new(Algorithm::HS256),
        &claims,
        &EncodingKey::from_secret(state.jwt_secret.as_bytes()),
    )
    .map_err(|err| AppError::InternalServerError(err.to_string()))?;

    Ok(AuthResponse {
        token,
        user: stored.as_profile(),
    })
}

pub async fn get_user_profile(state: &AppState, user_id: Uuid) -> Result<UserProfile, AppError> {
    let users = state.users.read().await;
    let stored = users
        .get(&user_id)
        .ok_or_else(|| AppError::NotFound("User not found".into()))?;

    Ok(stored.as_profile())
}

pub async fn update_user_profile(
    state: &AppState,
    user_id: Uuid,
    payload: UpdateUser,
) -> Result<UserProfile, AppError> {
    let mut users = state.users.write().await;
    let stored = users
        .get_mut(&user_id)
        .ok_or_else(|| AppError::NotFound("User not found".into()))?;

    if let Some(name) = payload.name {
        if name.trim().is_empty() {
            return Err(AppError::BadRequest("Name cannot be empty".into()));
        }
        stored.name = name;
    }

    if let Some(password) = payload.password {
        validate_password(&password).map_err(AppError::BadRequest)?;
        stored.password_hash = hash(&password, DEFAULT_COST)
            .map_err(|err| AppError::InternalServerError(err.to_string()))?;
    }

    Ok(stored.as_profile())
}

#[allow(dead_code)]
pub fn validate_token(state: &AppState, token: &str) -> Result<Claims, AppError> {
    let validation = Validation::new(Algorithm::HS256);
    let decoded = decode::<Claims>(
        token,
        &DecodingKey::from_secret(state.jwt_secret.as_bytes()),
        &validation,
    )
    .map_err(|err| AppError::Unauthorized(err.to_string()))?;

    Ok(decoded.claims)
}
