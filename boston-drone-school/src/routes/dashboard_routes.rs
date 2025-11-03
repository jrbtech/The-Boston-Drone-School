// This file defines routes for the student dashboard, including progress tracking and recommendations.

use actix_web::{web, HttpResponse, Responder};

#[get("/dashboard/progress")]
async fn get_progress() -> impl Responder {
    // Logic to fetch and return user progress
    HttpResponse::Ok().json("User progress data")
}

#[get("/dashboard/recommendations")]
async fn get_recommendations() -> impl Responder {
    // Logic to fetch and return course recommendations
    HttpResponse::Ok().json("Course recommendations data")
}

pub fn dashboard_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(get_progress)
       .service(get_recommendations);
}