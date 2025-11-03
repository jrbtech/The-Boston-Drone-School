use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    pub server_address: String,
    pub jwt_secret: String,
}

impl Config {
    pub fn from_env() -> Self {
        dotenv::dotenv().ok();

        let server_address =
            env::var("SERVER_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8080".to_string());
        let jwt_secret =
            env::var("JWT_SECRET").unwrap_or_else(|_| "local-development-secret".to_string());

        Self {
            server_address,
            jwt_secret,
        }
    }
}
