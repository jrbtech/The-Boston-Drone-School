// This file contains handler functions for course-related requests, including fetching course details and tracking progress.

use actix_web::{web, HttpResponse, Responder};
use crate::models::course::Course;
use crate::services::course_service;

// Handler to fetch all courses
pub async fn get_courses() -> impl Responder {
    match course_service::fetch_all_courses().await {
        Ok(courses) => HttpResponse::Ok().json(courses),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

// Handler to fetch a specific course by ID
pub async fn get_course(course_id: web::Path<i32>) -> impl Responder {
    match course_service::fetch_course_by_id(course_id.into_inner()).await {
        Ok(course) => match course {
            Some(course) => HttpResponse::Ok().json(course),
            None => HttpResponse::NotFound().finish(),
        },
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

// Handler to track progress for a specific course
pub async fn track_progress(course_id: web::Path<i32>, user_id: web::Path<i32>) -> impl Responder {
    match course_service::track_user_progress(course_id.into_inner(), user_id.into_inner()).await {
        Ok(progress) => HttpResponse::Ok().json(progress),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}