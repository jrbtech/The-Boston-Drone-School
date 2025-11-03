// src/main.rs

use actix_web::{web, App, HttpServer};
use dotenv::dotenv;
use std::env;

mod config;
mod routes;
mod db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    
    let server_address = env::var("SERVER_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8080".to_string());

    HttpServer::new(|| {
        App::new()
            .configure(routes::init_routes)
    })
    .bind(&server_address)?
    .run()
    .await
}