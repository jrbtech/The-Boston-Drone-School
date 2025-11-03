// This file defines routes for course management, including listing courses, accessing course content, and tracking progress.

use actix_web::{web, HttpResponse, Responder};
use crate::handlers::course_handlers;

pub fn configure_course_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/courses")
            .route("", web::get().to(course_handlers::list_courses))
            .route("/{id}", web::get().to(course_handlers::get_course))
            .route("/{id}/progress", web::post().to(course_handlers::track_progress))
    );
}