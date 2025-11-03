// src/services/auth_service.rs

use bcrypt::{hash, verify, DEFAULT_COST};
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};
use serde::{Serialize, Deserialize};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
    pub password: String,
    pub role: String,
}

pub fn signup(email: &str, password: &str, name: &str) -> Result<User, String> {
    let hashed_password = hash(password, DEFAULT_COST).map_err(|e| e.to_string())?;
    let user = User {
        id: uuid::Uuid::new_v4().to_string(),
        name: name.to_string(),
        email: email.to_string(),
        password: hashed_password,
        role: "student".to_string(),
    };
    // Here you would typically save the user to the database
    Ok(user)
}

pub fn login(email: &str, password: &str) -> Result<String, String> {
    // Here you would typically fetch the user from the database
    let user = User {
        id: "example_id".to_string(),
        name: "Example User".to_string(),
        email: email.to_string(),
        password: hash("example_password", DEFAULT_COST).unwrap(), // Replace with actual password
        role: "student".to_string(),
    };

    if verify(password, &user.password).map_err(|e| e.to_string())? {
        let claims = Claims {
            sub: user.id.clone(),
            exp: get_current_timestamp() + 3600, // Token valid for 1 hour
        };
        let token = encode(&Header::default(), &claims, &EncodingKey::from_secret("secret".as_ref())).map_err(|e| e.to_string())?;
        Ok(token)
    } else {
        Err("Invalid credentials".to_string())
    }
}

fn get_current_timestamp() -> usize {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs() as usize
}

pub fn validate_token(token: &str) -> Result<Claims, String> {
    let validation = Validation::new(Algorithm::HS256);
    let decoded = decode::<Claims>(token, &DecodingKey::from_secret("secret".as_ref()), &validation).map_err(|e| e.to_string())?;
    Ok(decoded.claims)
}