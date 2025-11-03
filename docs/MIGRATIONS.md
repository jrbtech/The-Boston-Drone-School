# Database Migrations

This project manages its PostgreSQL schema with hand-authored SQL migrations stored in the `migrations/` directory and applied via the helper script in `scripts/run_migrations.sh`.

## Prerequisites

- PostgreSQL client tools (`psql`) installed locally or available in your deployment environment.
- The `DATABASE_URL` environment variable pointing to the target database (e.g., `postgres://user:pass@host:5432/dbname`).
- Execute permissions on the migration script:
  ```bash
  chmod +x scripts/run_migrations.sh
  ```

## Running Migrations Locally

1. Export your database connection string:
   ```bash
   export DATABASE_URL=postgres://postgres:postgres@localhost:5432/boston_drone_school
   ```
2. Apply all pending migrations:
   ```bash
   ./scripts/run_migrations.sh up
   ```
3. (Optional) Roll back migrations in reverse order:
   ```bash
   ./scripts/run_migrations.sh down
   ```

The script reads the `-- migrate:up` or `-- migrate:down` sections from each SQL file and pipes them to `psql` inside a transaction so the migration either finishes entirely or fails without partial changes.

## Connecting to Render PostgreSQL

Render exposes a direct connection string for each managed PostgreSQL instance. Retrieve it from the Render dashboard under **Databases → (your instance) → Connection**.

1. From your development machine:
   ```bash
   export DATABASE_URL="postgres://<user>:<password>@<host>:<port>/<database>?sslmode=require"
   ./scripts/run_migrations.sh up
   ```

2. To run migrations from the Render service container (e.g., during deployment), add a deploy hook or shell command in the Render dashboard:
   ```bash
   DATABASE_URL=$DATABASE_URL ./scripts/run_migrations.sh up
   ```

   Render automatically injects `DATABASE_URL` when it is defined as an environment variable in the service settings.

3. For ad-hoc maintenance, use Render's remote shell feature:
   ```bash
   render ssh <service-name>
   cd /opt/render/project/src
   ./scripts/run_migrations.sh down   # Roll back the most recent migrations as needed
   ```

## Migration Order and Idempotency

- Migrations are numbered with a three-digit prefix (e.g., `001_`, `002_`) to guarantee execution order.
- Each file defines both upgrade and downgrade paths. Avoid editing a migration that has already been applied to shared environments; instead, create a new migration with the required changes.
- Always back up production data before running `down` migrations.

## Troubleshooting

- If a migration fails, the script stops immediately and reports the error returned by PostgreSQL.
- Check the `psql` output for constraint or permission issues. Fix the problem, then rerun `./scripts/run_migrations.sh up` to resume from the failed migration.
- Ensure your database user has privileges to create extensions if you add new features (e.g., full-text search or UUID helpers).
