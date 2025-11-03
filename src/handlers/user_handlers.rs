mod user_routes;

use actix_web::{web, HttpResponse, Responder};
use crate::models::user::{User, NewUser};
use crate::services::auth_service::{register_user, login_user, update_user_profile};

pub async fn register(user: web::Json<NewUser>) -> impl Responder {
    match register_user(user.into_inner()).await {
        Ok(user) => HttpResponse::Created().json(user),
        Err(e) => HttpResponse::BadRequest().body(e.to_string()),
    }
}

pub async fn login(user: web::Json<User>) -> impl Responder {
    match login_user(user.into_inner()).await {
        Ok(token) => HttpResponse::Ok().json(token),
        Err(e) => HttpResponse::Unauthorized().body(e.to_string()),
    }
}

pub async fn update_profile(user: web::Json<User>) -> impl Responder {
    match update_user_profile(user.into_inner()).await {
        Ok(updated_user) => HttpResponse::Ok().json(updated_user),
        Err(e) => HttpResponse::BadRequest().body(e.to_string()),
    }
}