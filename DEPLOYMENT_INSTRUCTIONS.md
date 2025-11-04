## Deployment Instructions

Follow these steps to ship the Axum-based Boston Drone School API:

1. **Sync the repo**
   - Ensure the repository contains the latest versions of:
     - `Cargo.toml`
     - `src/config.rs`
     - `src/main.rs`
     - `src/db/mod.rs`
     - `src/routes/mod.rs`
   - Remove deprecated Actix files (`src/routes/*`, `src/handlers`, `src/services/admin_service.rs`, `src/services/course_service.rs`).

2. **Configure environment variables**
   - Required: `DATABASE_URL`
   - Optional: `SERVER_PORT`, `JWT_SECRET`, `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`

3. **Render setup**
   - Link the `BDS` environment group to the _The-Boston-Drone-School_ service.
   - Build command: `cargo build --release`
   - Start command: `./target/release/boston_drone_school`

4. **Deploy**
   - Commit the changes: `git add . && git commit -m "Deploy Axum API"`
   - Push to the deployment branch (e.g. `main`): `git push origin main`

5. **Verify**
   - After Render finishes building, check `GET /health` to confirm the service is healthy.
