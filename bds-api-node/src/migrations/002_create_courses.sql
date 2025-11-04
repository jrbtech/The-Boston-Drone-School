-- migrate:up
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration_hours INTEGER NOT NULL CHECK (duration_hours > 0),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  instructor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  max_students INTEGER CHECK (max_students > 0),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses (instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses (status);

CREATE TRIGGER courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- migrate:down
DROP TRIGGER IF EXISTS courses_updated_at ON courses;
DROP INDEX IF EXISTS idx_courses_status;
DROP INDEX IF EXISTS idx_courses_instructor;
DROP TABLE IF EXISTS courses;
