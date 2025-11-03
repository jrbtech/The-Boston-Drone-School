// This file contains handler functions for administrative requests, including managing courses and viewing analytics.

use actix_web::{web, HttpResponse, Responder};
use crate::services::admin_service;
use crate::models::admin::Admin;

// Handler to get all courses
pub async fn get_courses() -> impl Responder {
    match admin_service::fetch_all_courses().await {
        Ok(courses) => HttpResponse::Ok().json(courses),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

// Handler to create a new course
pub async fn create_course(course: web::Json<Course>) -> impl Responder {
    match admin_service::add_course(course.into_inner()).await {
        Ok(course) => HttpResponse::Created().json(course),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

// Handler to delete a course
pub async fn delete_course(course_id: web::Path<i32>) -> impl Responder {
    match admin_service::remove_course(course_id.into_inner()).await {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

// Handler to view analytics
pub async fn view_analytics() -> impl Responder {
    match admin_service::get_analytics().await {
        Ok(analytics) => HttpResponse::Ok().json(analytics),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}