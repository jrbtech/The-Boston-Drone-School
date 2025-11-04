-- 010_create_lesson_progress_table.sql
-- Create lesson progress tracking table

CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    time_spent INTEGER DEFAULT 0, -- Time spent in seconds
    completed BOOLEAN DEFAULT false,
    first_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id, lesson_id) -- One progress record per user per lesson
);

-- Create indexes
CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_course_id ON lesson_progress(course_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX idx_lesson_progress_enrollment_id ON lesson_progress(enrollment_id);
CREATE INDEX idx_lesson_progress_completed ON lesson_progress(completed);

-- Add trigger for updated_at
CREATE TRIGGER update_lesson_progress_updated_at 
    BEFORE UPDATE ON lesson_progress 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();