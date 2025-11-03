use actix_web::{web, HttpResponse, Responder};

use crate::models::course::{NewCourse, UpdateCourse};
use crate::services::admin_service;
use crate::state::AppState;

pub async fn list_courses(state: web::Data<AppState>) -> impl Responder {
    let courses = admin_service::fetch_all_courses(&state).await;
    HttpResponse::Ok().json(courses)
}

pub async fn create_course(
    state: web::Data<AppState>,
    payload: web::Json<NewCourse>,
) -> impl Responder {
    let course = admin_service::add_course(&state, payload.into_inner()).await;
    HttpResponse::Created().json(course)
}

pub async fn update_course(
    state: web::Data<AppState>,
    path: web::Path<i32>,
    payload: web::Json<UpdateCourse>,
) -> impl Responder {
    match admin_service::update_course(&state, path.into_inner(), payload.into_inner()).await {
        Ok(course) => HttpResponse::Ok().json(course),
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            crate::utils::AppError::BadRequest(message) => HttpResponse::BadRequest().body(message),
            other => HttpResponse::InternalServerError().body(other.to_string()),
        },
    }
}

pub async fn delete_course(
    state: web::Data<AppState>,
    course_id: web::Path<i32>,
) -> impl Responder {
    match admin_service::remove_course(&state, course_id.into_inner()).await {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(err) => match err {
            crate::utils::AppError::NotFound(message) => HttpResponse::NotFound().body(message),
            other => HttpResponse::InternalServerError().body(other.to_string()),
        },
    }
}

pub async fn view_analytics(state: web::Data<AppState>) -> impl Responder {
    let analytics = admin_service::get_analytics(&state).await;
    HttpResponse::Ok().json(analytics)
}
