use actix_web::web;

use crate::handlers::course_handlers;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/courses")
            .route("", web::get().to(course_handlers::list_courses))
            .route("", web::post().to(course_handlers::create_course))
            .route("/{id}", web::get().to(course_handlers::get_course))
            .route("/{id}", web::put().to(course_handlers::update_course))
            .route(
                "/{course_id}/progress/{user_id}",
                web::get().to(course_handlers::course_progress),
            ),
    );
}
