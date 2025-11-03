use actix_web::web;

use crate::handlers::admin_handlers;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/admin")
            .route("/courses", web::get().to(admin_handlers::list_courses))
            .route("/courses", web::post().to(admin_handlers::create_course))
            .route(
                "/courses/{course_id}",
                web::put().to(admin_handlers::update_course),
            )
            .route(
                "/courses/{course_id}",
                web::delete().to(admin_handlers::delete_course),
            )
            .route("/analytics", web::get().to(admin_handlers::view_analytics)),
    );
}
