-- migrate:up
BEGIN;

CREATE TABLE course_materials (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    material_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_course_materials_course_id ON course_materials (course_id);
CREATE INDEX idx_course_materials_type ON course_materials (material_type);

COMMIT;

-- migrate:down
BEGIN;

DROP INDEX IF EXISTS idx_course_materials_type;
DROP INDEX IF EXISTS idx_course_materials_course_id;
DROP TABLE IF EXISTS course_materials;

COMMIT;
