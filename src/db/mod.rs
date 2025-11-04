use deadpool_postgres::{Manager, ManagerConfig, Pool, RecyclingMethod, Runtime};
use tokio_postgres::NoTls;

pub type DbPool = Pool;

pub async fn create_pool(database_url: &str) -> Result<DbPool, Box<dyn std::error::Error>> {
    let pg_config = database_url.parse::<tokio_postgres::Config>()?;

    let manager_config = ManagerConfig {
        recycling_method: RecyclingMethod::Fast,
    };

    let manager = Manager::from_config(pg_config, NoTls, manager_config);

    let pool = Pool::builder(manager)
        .max_size(16)
        .runtime(Runtime::Tokio1)
        .build()?;

    Ok(pool)
}
