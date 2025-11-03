// This file contains handler functions for student dashboard requests, including fetching progress and recommendations.

use actix_web::{web, HttpResponse, Responder};
use crate::models::user::User;
use crate::services::course_service;
use crate::services::user_service;

// Fetch student progress
pub async fn get_progress(user_id: web::Path<i32>) -> impl Responder {
    match user_service::get_user_progress(user_id.into_inner()).await {
        Ok(progress) => HttpResponse::Ok().json(progress),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

// Fetch recommendations for the student
pub async fn get_recommendations(user_id: web::Path<i32>) -> impl Responder {
    match course_service::get_recommendations(user_id.into_inner()).await {
        Ok(recommendations) => HttpResponse::Ok().json(recommendations),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}