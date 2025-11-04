use axum::{routing::get, Json, Router};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};

use crate::config::Config;
use crate::db::DbPool;

#[derive(Clone)]
pub struct AppState {
    pub db: DbPool,
    pub config: Arc<Config>,
}

pub fn create_router(db: DbPool, config: Config) -> Router {
    let state = AppState {
        db,
        config: Arc::new(config),
    };

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .route("/", get(root_handler))
        .route("/health", get(health_handler))
        .layer(cors)
        .with_state(state)
}

async fn root_handler() -> Json<ApiResponse> {
    Json(ApiResponse {
        message: "Welcome to the Boston Drone School API".to_string(),
        status: "success".to_string(),
    })
}

async fn health_handler() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
    })
}

#[derive(Serialize, Deserialize)]
struct ApiResponse {
    message: String,
    status: String,
}

#[derive(Serialize, Deserialize)]
struct HealthResponse {
    status: String,
    version: String,
}
