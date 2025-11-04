mod config;
mod db;
mod routes;

use config::Config;
use std::net::SocketAddr;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let config = Config::from_env();
    let app = routes::create_router();

    let addr = SocketAddr::from(([0, 0, 0, 0], config.server_port));
    println!("Boston Drone School API running on http://{}", addr);

    if config.database_url.is_none() {
        println!("DATABASE_URL not set; continuing without a database connection");
    }

    match TcpListener::bind(addr).await {
        Ok(listener) => {
            if let Err(err) = axum::serve(listener, app.into_make_service()).await {
                eprintln!("server error: {err}");
            }
        }
        Err(err) => {
            eprintln!("failed to bind to address: {err}");
        }
    }
}
