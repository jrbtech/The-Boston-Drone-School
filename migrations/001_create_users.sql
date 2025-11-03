-- migrate:up
BEGIN;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin', 'instructor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_email_lower ON users (LOWER(email));
CREATE INDEX idx_users_role ON users (role);

COMMIT;

-- migrate:down
BEGIN;

DROP INDEX IF EXISTS idx_users_role;
DROP INDEX IF EXISTS idx_users_email_lower;
DROP TABLE IF EXISTS users;

COMMIT;
