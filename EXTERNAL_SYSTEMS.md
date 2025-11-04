# External Systems & Operational Requirements

This document lists every external system the Boston Drone School platform depends on or recommends for production readiness. Each section covers the purpose, required environment variables, setup steps, free-tier options (where available), and estimated production costs.

## 1. PostgreSQL Database

**Purpose**: Primary data store for users, courses, enrollments, lessons, payments, and course materials.

- **Env Vars**: `DATABASE_URL`, optional `PGSSLMODE` (set to `require` for managed hosts).
- **Setup**:
  1. Provision a managed PostgreSQL instance (Render PostgreSQL, Supabase, Neon, etc.).
  2. Whitelist application IPs if necessary.
  3. Export the connection string as `DATABASE_URL` and run `./scripts/run_migrations.sh up`.
- **Free Tier**: Render offers a free 256 MB instance (suitable for staging). Neon and Supabase also provide generous developer tiers.
- **Prod Cost (est.)**: $7–$30/month for small managed instances with automated backups.

## 2. Stripe Payment Gateway

**Purpose**: Handles secure payment intents and confirmations for course enrollments.

- **Env Vars**: `STRIPE_API_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.
- **Setup**:
  1. Create a Stripe account and enable test mode.
  2. Generate secret and publishable keys (`Developers → API keys`).
  3. Configure a webhook endpoint (`/payments/confirm`) to capture payment state changes; copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
- **Free Tier**: No subscription fee; Stripe charges 2.9% + $0.30 per successful card charge in the US.
- **Prod Cost (est.)**: Usage-based; plan 3–5% of revenue for processing fees plus potential chargeback costs.

## 3. Secret Management / JWT Signing Key

**Purpose**: Securely stores secrets used for JWT authentication and other sensitive configs.

- **Env Vars**: `JWT_SECRET` (16+ random bytes), optional `APP_SIGNING_KEY_ID` if using a secrets manager.
- **Setup**:
  1. Generate a strong key (`openssl rand -hex 32`).
  2. Store it as a secret in Render, 1Password, HashiCorp Vault, or AWS Secrets Manager.
  3. Rotate quarterly and after any suspected leak.
- **Free Tier**: Render secrets and 1Password developer accounts are free for limited usage.
- **Prod Cost (est.)**: $0–$5/month depending on chosen secrets manager.

## 4. Transactional Email Service

**Purpose**: Sends account confirmations, password resets, enrollment notifications, and payment receipts.

- **Env Vars**: `EMAIL_PROVIDER` (e.g., `sendgrid`), `EMAIL_API_KEY`, `EMAIL_FROM_ADDRESS`, optional `EMAIL_REPLY_TO`.
- **Setup**:
  1. Sign up for a provider such as SendGrid, Postmark, Mailgun, or Resend.
  2. Verify sending domain and authenticate via SPF/DKIM.
  3. Store API key and sending address in environment variables.
  4. Integrate via provider SDK or REST calls (to be implemented in the codebase).
- **Free Tier**: SendGrid (100 emails/day), Mailgun (first 5,000 emails/month for 3 months), Resend (100 emails/day).
- **Prod Cost (est.)**: $15–$35/month for 50k transactional emails, depending on provider.

## 5. Object Storage for Course Assets

**Purpose**: Hosts video lessons, downloadable resources, and certificates independent of the application server.

- **Env Vars**: `STORAGE_PROVIDER` (e.g., `aws_s3`), `AWS_S3_BUCKET`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, optional `S3_CDN_BASE_URL`.
- **Setup**:
  1. Create an S3 bucket (or equivalent: Cloudflare R2, Backblaze B2).
  2. Enable versioning and lifecycle policies for cost control.
  3. Grant the application IAM credentials with least-privilege access.
  4. Configure public access via presigned URLs or a CDN (see next section).
- **Free Tier**: AWS S3 offers 5 GB storage + 20k GET + 2k PUT requests for 12 months. Cloudflare R2 has low egress fees.
- **Prod Cost (est.)**: $5–$50/month depending on storage volume and egress.

## 6. CDN / Media Delivery

**Purpose**: Delivers large media assets globally with low latency and offloads bandwidth from the origin.

- **Env Vars**: `CDN_BASE_URL`, optional `CDN_PROVIDER`, `CDN_DISTRIBUTION_ID`.
- **Setup**:
  1. Configure a CDN (AWS CloudFront, Cloudflare CDN, Fastly) in front of the storage bucket.
  2. Point course asset URLs to the CDN domain to leverage caching.
  3. Tune cache policies (long TTL for static videos/resources).
- **Free Tier**: Cloudflare’s global CDN is free for moderate traffic. AWS CloudFront free tier includes 1 TB/month for the first year.
- **Prod Cost (est.)**: $0.08–$0.12/GB data transfer for most CDNs after free allowances.

## 7. Analytics & Monitoring

**Purpose**: Captures application errors, performance metrics, and user behavior insights.

- **Env Vars**: `SENTRY_DSN` (error tracking), optional `NEW_RELIC_LICENSE_KEY`, `LOG_LEVEL`.
- **Setup**:
  1. Create a Sentry project (or alternative such as Honeycomb, Datadog, New Relic).
  2. Install SDK in the application to capture errors and performance spans.
  3. Optionally configure uptime checks (StatusCake, Better Uptime) pointing at public endpoints.
- **Free Tier**: Sentry (5k events/month), Better Uptime (10 monitors), New Relic (free tier with 100 GB ingest/month).
- **Prod Cost (est.)**: $0–$99/month depending on volume and tooling depth.

## 8. Session Store / Cache

**Purpose**: Provides fast access to session data, rate-limit counters, and derived caches (e.g., recommendation results).

- **Env Vars**: `REDIS_URL`, optional `CACHE_TTL_SECONDS`.
- **Setup**:
  1. Provision a managed Redis or Upstash instance.
  2. Store the connection URL as `REDIS_URL` and integrate via `redis` or `deadpool-redis` crate.
  3. Use for storing login sessions, JWT blacklists, or computed dashboards (future work in the codebase).
- **Free Tier**: Upstash (10k requests/day), Redis Cloud (30 MB storage), Render Redis (limited free tier).
- **Prod Cost (est.)**: $15–$30/month for 100 MB managed Redis with high availability.

## 9. Additional Operational Integrations

- **Background Jobs / Task Queue**: Consider Sidekiq-compatible services (e.g., Faktory, RabbitMQ) for asynchronous email and video processing. No direct code references yet, but recommended for scalability.
- **Logging Sink**: Aggregate structured logs in services like Logflare, Datadog, or AWS CloudWatch. Configure via `LOG_DESTINATION` if added in future.
- **CI/CD Pipeline**: GitHub Actions or Render’s native builds handle automated testing and deployments. Ensure secrets are configured for migrations and Stripe webhooks.

## Quick Reference Table

| Service | Minimum Env Vars | Free Tier | Est. Monthly Cost |
| --- | --- | --- | --- |
| PostgreSQL | `DATABASE_URL` | Render, Neon | $7–$30 |
| Stripe | `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET` | Pay-per-use | % of revenue |
| Secrets / JWT | `JWT_SECRET` | Render secrets | $0–$5 |
| Email | `EMAIL_API_KEY`, `EMAIL_FROM_ADDRESS` | SendGrid/Mailgun | $15–$35 |
| Storage | `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | AWS/Cloudflare | $5–$50 |
| CDN | `CDN_BASE_URL` | Cloudflare | Usage-based |
| Analytics | `SENTRY_DSN` | Sentry | $0–$99 |
| Cache | `REDIS_URL` | Upstash/Render | $15–$30 |

> Keep non-production and production credentials isolated. Never commit real secrets to the repository—use environment variables or managed secret stores instead.
