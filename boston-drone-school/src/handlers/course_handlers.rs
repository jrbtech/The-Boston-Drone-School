use actix_web::{web, HttpResponse, Responder};
use uuid::Uuid;

use crate::models::course::{NewCourse, UpdateCourse};
use crate::services::course_service;
use crate::state::AppState;

pub async fn list_courses(state: web::Data<AppState>) -> impl Responder {
    let courses = course_service::list_courses(&state).await;
    HttpResponse::Ok().json(courses)
}

pub async fn create_course(
    state: web::Data<AppState>,
    payload: web::Json<NewCourse>,
) -> impl Responder {
    let course = course_service::create_course(&state, payload.into_inner()).await;
    HttpResponse::Created().json(course)
}

pub async fn get_course(state: web::Data<AppState>, course_id: web::Path<i32>) -> impl Responder {
    match course_service::get_course(&state, course_id.into_inner()).await {
        Some(course) => HttpResponse::Ok().json(course),
        None => HttpResponse::NotFound().body("Course not found"),
    }
}

pub async fn update_course(
    state: web::Data<AppState>,
    path: web::Path<i32>,
    payload: web::Json<UpdateCourse>,
) -> impl Responder {
    match course_service::update_course(&state, path.into_inner(), payload.into_inner()).await {
        Ok(course) => HttpResponse::Ok().json(course),
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            crate::utils::AppError::BadRequest(message) => HttpResponse::BadRequest().body(message),
            other => HttpResponse::InternalServerError().body(other.to_string()),
        },
    }
}

pub async fn course_progress(
    state: web::Data<AppState>,
    path: web::Path<(i32, Uuid)>,
) -> impl Responder {
    let (course_id, user_id) = path.into_inner();
    match course_service::track_user_progress(&state, user_id).await {
        Ok(progress) => {
            let course_progress = progress
                .into_iter()
                .find(|summary| summary.course_id == course_id);
            match course_progress {
                Some(summary) => HttpResponse::Ok().json(summary),
                None => HttpResponse::NotFound().body("No progress for this course"),
            }
        }
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            other => HttpResponse::InternalServerError().body(other.to_string()),
        },
    }
}
