use std::env;
use std::error::Error;
use tokio_postgres::{NoTls, Client};

pub async fn establish_connection() -> Result<Client, Box<dyn Error>> {
    let database_url = env::var("DATABASE_URL")?;
    let (client, connection) = tokio_postgres::connect(&database_url, NoTls).await?;

    // Spawn a new task to handle the connection
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Connection error: {}", e);
        }
    });

    Ok(client)
}