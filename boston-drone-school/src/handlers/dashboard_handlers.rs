use actix_web::{web, HttpResponse, Responder};
use uuid::Uuid;

use crate::services::course_service;
use crate::state::AppState;

pub async fn get_progress(state: web::Data<AppState>, user_id: web::Path<Uuid>) -> impl Responder {
    match course_service::track_user_progress(&state, user_id.into_inner()).await {
        Ok(progress) => HttpResponse::Ok().json(progress),
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            other => HttpResponse::InternalServerError().body(other.to_string()),
        },
    }
}

pub async fn get_recommendations(
    state: web::Data<AppState>,
    user_id: web::Path<Uuid>,
) -> impl Responder {
    match course_service::get_recommendations(&state, user_id.into_inner()).await {
        Ok(recommendations) => HttpResponse::Ok().json(recommendations),
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            other => HttpResponse::InternalServerError().body(other.to_string()),
        },
    }
}
