// src/main.rs

use actix_web::{web, App, HttpServer};

mod config;
mod handlers;
mod models;
mod routes;
mod services;
mod state;
mod utils;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config = config::Config::from_env();
    let state = state::AppState::new(config.jwt_secret.clone());

    println!(
        "Starting Boston Drone School API on {}",
        config.server_address
    );

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .configure(routes::init_routes)
    })
    .bind(&config.server_address)?
    .run()
    .await
}
