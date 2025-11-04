-- migrate:up
BEGIN;

CREATE TABLE lessons (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    lesson_order INTEGER NOT NULL DEFAULT 1,
    duration INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE lessons
    ADD CONSTRAINT lessons_unique_order UNIQUE (course_id, lesson_order);

CREATE INDEX idx_lessons_course_id ON lessons (course_id);
CREATE INDEX idx_lessons_course_order ON lessons (course_id, lesson_order);

COMMIT;

-- migrate:down
BEGIN;

DROP INDEX IF EXISTS idx_lessons_course_order;
DROP INDEX IF EXISTS idx_lessons_course_id;
ALTER TABLE lessons DROP CONSTRAINT IF EXISTS lessons_unique_order;
DROP TABLE IF EXISTS lessons;

COMMIT;
