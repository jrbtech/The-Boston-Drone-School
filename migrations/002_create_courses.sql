-- migrate:up
BEGIN;

CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    instructor_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    price NUMERIC(10,2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_courses_instructor_id ON courses (instructor_id);
CREATE INDEX idx_courses_status ON courses (status);
CREATE INDEX idx_courses_search ON courses USING GIN (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')));

COMMIT;

-- migrate:down
BEGIN;

DROP INDEX IF EXISTS idx_courses_search;
DROP INDEX IF EXISTS idx_courses_status;
DROP INDEX IF EXISTS idx_courses_instructor_id;
DROP TABLE IF EXISTS courses;

COMMIT;
