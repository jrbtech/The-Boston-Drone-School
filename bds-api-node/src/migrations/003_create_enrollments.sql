-- migrate:up
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completion_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments (user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments (course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments (status);

CREATE TRIGGER enrollments_updated_at
BEFORE UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- migrate:down
DROP TRIGGER IF EXISTS enrollments_updated_at ON enrollments;
DROP INDEX IF EXISTS idx_enrollments_status;
DROP INDEX IF EXISTS idx_enrollments_course;
DROP INDEX IF EXISTS idx_enrollments_user;
DROP TABLE IF EXISTS enrollments;
