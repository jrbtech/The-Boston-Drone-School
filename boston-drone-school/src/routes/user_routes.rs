// This file defines routes related to user management, including registration, login, and profile management.

use actix_web::{web, HttpResponse, Responder};
use crate::handlers::user_handlers;

// Route for user registration
pub fn register_user() -> impl Responder {
    HttpResponse::Ok().body("User registration endpoint")
}

// Route for user login
pub fn login_user() -> impl Responder {
    HttpResponse::Ok().body("User login endpoint")
}

// Route for fetching user profile
pub fn get_user_profile() -> impl Responder {
    HttpResponse::Ok().body("User profile endpoint")
}

// Route for updating user profile
pub fn update_user_profile() -> impl Responder {
    HttpResponse::Ok().body("Update user profile endpoint")
}

// Function to configure user routes
pub fn user_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .route("/register", web::post().to(register_user))
            .route("/login", web::post().to(login_user))
            .route("/profile", web::get().to(get_user_profile))
            .route("/profile/update", web::put().to(update_user_profile))
    );
}