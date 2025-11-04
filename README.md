# Boston Drone School Platform

This repository contains the services that power the Boston Drone School learning experience. Two back-end implementations live side by side:

- `bds-api-node/` – A full-featured REST API written in Node.js and TypeScript (the focus of this document).
- `src/` – The legacy Rust service that originally bootstrapped the platform.

The new Node/TypeScript API provides authentication, course management, enrollments, Stripe-powered payments, and administrative analytics backed by PostgreSQL.

## Repository Layout

```
.
├── bds-api-node/              # Node.js REST API (Express + TypeScript)
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── src/migrations/        # SQL migrations for the Node API schema
│   ├── scripts/run_migrations.sh
│   ├── package.json
│   └── tsconfig.json
├── src/                       # Existing Rust implementation
└── migrations/                # Legacy SQL migrations used by the Rust service
```

The sections that follow describe how to configure, run, and integrate with the Node/TypeScript API.

## Node.js REST API Quickstart

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL 13+
- Stripe account (for real payment flows)

### 1. Install dependencies
```bash
cd bds-api-node
npm install
```

### 2. Configure environment
Create `bds-api-node/.env` (or export the variables) with the values that match your Render-hosted database and Stripe account. Refer to the [Environment Variables](#environment-variables) table below.

### 3. Run database migrations
```bash
cd bds-api-node
DATABASE_URL=postgres://user:pass@host:5432/dbname \
  scripts/run_migrations.sh up
```

The migration tool understands the `-- migrate:up` / `-- migrate:down` sections inside each SQL file.

### 4. Start the API
- Development (with live reload):
  ```bash
  npm run dev
  ```
- Production build & start:
  ```bash
  npm run build
  npm start
  ```

The server defaults to `http://localhost:8000` unless `PORT` is provided.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | HTTP port for the API | `8000` |
| `DATABASE_URL` | PostgreSQL connection string | **required** |
| `NODE_ENV` | `development` or `production` | `development` |
| `LOG_LEVEL` | Pino logger level | `debug` in dev, `info` in prod |
| `CORS_ORIGIN` | Comma-separated list of allowed origins or `*` | `*` |
| `JWT_SECRET` | Secret used to sign access tokens | `change-me-in-production` |
| `JWT_EXPIRES_IN` | JWT validity window (ms syntax or seconds) | `1d` |
| `BCRYPT_SALT_ROUNDS` | Cost factor for password hashing | `10` |
| `AUTH_RATE_LIMIT_WINDOW_MS` | Rate limit window for auth endpoints | `900000` (15 min) |
| `AUTH_RATE_LIMIT_MAX_REQUESTS` | Max auth requests per window per IP | `100` |
| `STRIPE_SECRET_KEY` | Stripe secret key for PaymentIntents | empty (disables Stripe features) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | empty (disables webhook validation) |

When `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` is missing, payment-related endpoints will respond with server errors to avoid processing incomplete flows.

## Database Schema Overview

The Node API migrations (located in `bds-api-node/src/migrations`) provision the following tables:

- `users` – Basic profile plus hashed password and role (`student`, `instructor`, `admin`).
- `courses` – Catalog metadata, instructor assignment, capacity, lifecycle status.
- `enrollments` – Student-course relationships with status, completion, and payment state.
- `payments` – Stripe PaymentIntent references, deduplicated per enrollment.

Each table includes auditing columns (`created_at`, `updated_at`) with triggers that refresh timestamps automatically.

## API Surface

### Authentication
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/auth/register` | Create a student account (email + password). |
| `POST` | `/auth/login` | Retrieve a JWT access token. |
| `POST` | `/auth/logout` | Stateless logout acknowledgement. |
| `GET`  | `/auth/me` | Fetch the authenticated user profile. |

### Users (JWT required)
| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `GET`  | `/users` | admin | Paginated user directory (filterable by role, search). |
| `GET`  | `/users/:id` | admin or owner | Retrieve a single profile. |
| `PUT`  | `/users/:id` | admin or owner | Update profile details (role changes require admin). |
| `DELETE` | `/users/:id` | admin | Remove a user record. |

### Courses
| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `GET`  | `/courses` | public | Paginated course catalog with optional status/search filters. |
| `GET`  | `/courses/:id` | public | Course detail. |
| `POST` | `/courses` | instructor, admin | Create a course (instructors auto-assign themselves). |
| `PUT`  | `/courses/:id` | instructor (own course), admin | Update course metadata. |
| `DELETE` | `/courses/:id` | admin | Remove a course. |

### Enrollments (JWT required)
| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/enrollments` | student | Enroll in a course (enforces capacity & uniqueness). |
| `GET`  | `/enrollments` | student, instructor, admin | Paginated enrollments (students see their own; admin can filter). |
| `GET`  | `/enrollments/:id` | student (owner), instructor (course), admin | Enrollment detail. |
| `PUT`  | `/enrollments/:id/complete` | student (self), instructor, admin | Mark an enrollment as completed. |

### Payments
| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `POST` | `/payments/create-intent` | student | Create a Stripe PaymentIntent for an enrollment. |
| `POST` | `/payments/webhook` | Stripe | Stripe webhook endpoint (expects verified signature). |

### Admin Insights
| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| `GET`  | `/admin/stats` | admin | Aggregate counts (users, courses, enrollments, revenue). |
| `GET`  | `/admin/users` | admin | Advanced user listing (pagination + filters). |
| `GET`  | `/admin/courses` | admin | Course list with enrollment counts. |

All endpoints emit JSON responses and consistent error envelopes through centralized error handling.

## Authentication & Authorization
- Passwords are stored with bcrypt (`bcryptjs`).
- JWT access tokens encode the user ID and role; include the token as `Authorization: Bearer <token>`.
- `requireRole` middleware enforces role-based access on each router.
- Auth endpoints are shielded by rate limiting (`AUTH_RATE_LIMIT_*`).

## Stripe Integration
1. Set `STRIPE_SECRET_KEY` to enable PaymentIntent creation.
2. Configure a webhook endpoint in Stripe that points to `/payments/webhook` and use the provided `STRIPE_WEBHOOK_SECRET`.
3. The webhook keeps `payments` and `enrollments.payment_status` in sync for statuses such as `succeeded`, `failed`, and `refunded`.

If Stripe credentials are omitted, payment endpoints return a 500 error indicating misconfiguration.

## Logging & Error Handling
- `pino` and `pino-http` capture structured logs with `pino-pretty` in development.
- Custom `AppError` objects and validation (via `zod`) normalize error responses.
- Unmatched routes respond with a JSON 404 payload.

## Useful npm Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Express with nodemon + ts-node. |
| `npm run build` | Emit compiled JavaScript to `dist/`. |
| `npm start` | Run the compiled build. |

## Keeping the Rust Service

The original Rust implementation remains under `src/` for reference and incremental migration. Its migrations live at the repository root (`/migrations`). When deploying, ensure only one service connects to the shared database at a time.

---

For questions or improvements, open an issue or submit a pull request. Happy flying! ✈️
