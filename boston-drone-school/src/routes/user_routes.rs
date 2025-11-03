use actix_web::web;

use crate::handlers::user_handlers;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .route("/register", web::post().to(user_handlers::register))
            .route("/login", web::post().to(user_handlers::login))
            .route("/{id}", web::get().to(user_handlers::get_profile))
            .route("/{id}", web::put().to(user_handlers::update_profile)),
    );
}
