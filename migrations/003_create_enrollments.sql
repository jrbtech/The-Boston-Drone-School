-- migrate:up
BEGIN;

CREATE TABLE enrollments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    payment_id BIGINT,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    progress SMALLINT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100)
);

ALTER TABLE enrollments
    ADD CONSTRAINT enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    ADD CONSTRAINT enrollments_unique_user_course UNIQUE (user_id, course_id);

CREATE INDEX idx_enrollments_user_id ON enrollments (user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments (course_id);

COMMIT;

-- migrate:down
BEGIN;

DROP INDEX IF EXISTS idx_enrollments_course_id;
DROP INDEX IF EXISTS idx_enrollments_user_id;
ALTER TABLE enrollments DROP CONSTRAINT IF EXISTS enrollments_unique_user_course;
ALTER TABLE enrollments DROP CONSTRAINT IF EXISTS enrollments_course_id_fkey;
ALTER TABLE enrollments DROP CONSTRAINT IF EXISTS enrollments_user_id_fkey;
DROP TABLE IF EXISTS enrollments;

COMMIT;
