mod config;
mod db;
mod routes;

use config::Config;
use db::create_pool;
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tracing::{error, info};
use tracing_subscriber::EnvFilter;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    init_tracing();

    let config =
        Config::from_env().expect("Failed to load configuration from environment variables");
    let pool = create_pool(&config.database_url).await?;

    let addr = SocketAddr::from(([0, 0, 0, 0], config.server_port));
    info!("Boston Drone School API running on http://{}", addr);

    let app = routes::create_router(pool, config);

    let listener = TcpListener::bind(addr).await?;
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    Ok(())
}

fn init_tracing() {
    let env_filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info"));
    tracing_subscriber::fmt()
        .with_env_filter(env_filter)
        .with_target(false)
        .compact()
        .init();
}

async fn shutdown_signal() {
    if let Err(err) = tokio::signal::ctrl_c().await {
        error!(%err, "failed to listen for shutdown signal");
        return;
    }

    info!("Shutdown signal received, starting graceful shutdown");
}
