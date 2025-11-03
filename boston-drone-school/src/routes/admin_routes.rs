// This file defines routes for administrative features, including content management and analytics.

use actix_web::{web, HttpResponse, Responder};

pub async fn get_admin_dashboard() -> impl Responder {
    HttpResponse::Ok().json("Admin Dashboard")
}

pub async fn manage_courses() -> impl Responder {
    HttpResponse::Ok().json("Manage Courses")
}

pub async fn view_analytics() -> impl Responder {
    HttpResponse::Ok().json("View Analytics")
}

pub fn admin_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/admin")
            .route("/dashboard", web::get().to(get_admin_dashboard))
            .route("/courses", web::get().to(manage_courses))
            .route("/analytics", web::get().to(view_analytics)),
    );
}