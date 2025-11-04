use dotenvy::dotenv;
use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    pub database_url: String,
    pub server_port: u16,
    pub jwt_secret: Option<String>,
    pub stripe_api_key: Option<String>,
    pub stripe_webhook_secret: Option<String>,
}

impl Config {
    pub fn from_env() -> Result<Self, std::env::VarError> {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL")?;
        let server_port = env::var("PORT")
            .or_else(|_| env::var("SERVER_PORT"))
            .ok()
            .and_then(|value| value.parse().ok())
            .unwrap_or(8000);
        let jwt_secret = env::var("JWT_SECRET").ok();
        let stripe_api_key = env::var("STRIPE_API_KEY").ok();
        let stripe_webhook_secret = env::var("STRIPE_WEBHOOK_SECRET").ok();

        Ok(Self {
            database_url,
            server_port,
            jwt_secret,
            stripe_api_key,
            stripe_webhook_secret,
        })
    }
}
