use axum::{routing::get, Json, Router};
use serde::Serialize;

pub fn create_router() -> Router {
    Router::new()
        .route("/", get(root_handler))
        .route("/health", get(health_handler))
}

async fn root_handler() -> Json<ApiMessage> {
    Json(ApiMessage {
        message: "Welcome to the Boston Drone School API".to_string(),
    })
}

async fn health_handler() -> Json<ApiStatus> {
    Json(ApiStatus {
        status: "ok".to_string(),
    })
}

#[derive(Serialize)]
struct ApiMessage {
    message: String,
}

#[derive(Serialize)]
struct ApiStatus {
    status: String,
}
