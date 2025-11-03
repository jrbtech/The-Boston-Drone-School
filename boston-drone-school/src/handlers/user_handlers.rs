use actix_web::{web, HttpResponse, Responder};
use uuid::Uuid;

use crate::models::user::{LoginRequest, NewUser, UpdateUser};
use crate::services::auth_service;
use crate::state::AppState;

pub async fn register(state: web::Data<AppState>, payload: web::Json<NewUser>) -> impl Responder {
    match auth_service::register_user(&state, payload.into_inner()).await {
        Ok(profile) => HttpResponse::Created().json(profile),
        Err(err) => HttpResponse::BadRequest().body(err.to_string()),
    }
}

pub async fn login(state: web::Data<AppState>, payload: web::Json<LoginRequest>) -> impl Responder {
    match auth_service::login_user(&state, payload.into_inner()).await {
        Ok(response) => HttpResponse::Ok().json(response),
        Err(err) => match err {
            crate::utils::AppError::Unauthorized(message) => {
                HttpResponse::Unauthorized().body(message)
            }
            other => HttpResponse::BadRequest().body(other.to_string()),
        },
    }
}

pub async fn get_profile(state: web::Data<AppState>, user_id: web::Path<Uuid>) -> impl Responder {
    match auth_service::get_user_profile(&state, user_id.into_inner()).await {
        Ok(profile) => HttpResponse::Ok().json(profile),
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            other => HttpResponse::BadRequest().body(other.to_string()),
        },
    }
}

pub async fn update_profile(
    state: web::Data<AppState>,
    user_id: web::Path<Uuid>,
    payload: web::Json<UpdateUser>,
) -> impl Responder {
    match auth_service::update_user_profile(&state, user_id.into_inner(), payload.into_inner())
        .await
    {
        Ok(profile) => HttpResponse::Ok().json(profile),
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            crate::utils::AppError::BadRequest(message) => HttpResponse::BadRequest().body(message),
            other => HttpResponse::InternalServerError().body(other.to_string()),
        },
    }
}
