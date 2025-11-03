use actix_web::web;

use crate::handlers::dashboard_handlers;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/dashboard")
            .route(
                "/progress/{user_id}",
                web::get().to(dashboard_handlers::get_progress),
            )
            .route(
                "/recommendations/{user_id}",
                web::get().to(dashboard_handlers::get_recommendations),
            ),
    );
}
