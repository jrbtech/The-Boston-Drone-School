use actix_web::web;

pub mod admin_routes;
pub mod course_routes;
pub mod dashboard_routes;
pub mod payment_routes;
pub mod user_routes;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .configure(user_routes::configure)
            .configure(course_routes::configure)
            .configure(payment_routes::configure)
            .configure(dashboard_routes::configure)
            .configure(admin_routes::configure),
    );
}
