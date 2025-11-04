-- 008_create_lessons_table.sql
-- Create lessons table for course content

CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(500),
    duration INTEGER DEFAULT 0, -- Duration in seconds
    lesson_order INTEGER NOT NULL,
    materials TEXT[], -- Array of lesson materials
    content TEXT, -- Lesson content/transcript
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_lessons_order ON lessons(course_id, lesson_order);
CREATE INDEX idx_lessons_published ON lessons(is_published);

-- Insert sample lessons
INSERT INTO lessons (course_id, title, description, video_url, duration, lesson_order, materials, content, is_published) 
SELECT 
    c.id,
    'Introduction to Drone Regulations',
    'Overview of FAA Part 107 and regulatory framework',
    '/videos/lesson1.mp4',
    1800,
    1,
    ARRAY['Regulation Summary PDF', 'Key Points Checklist'],
    'This lesson covers the fundamental regulations governing drone operations in the United States...',
    true
FROM courses c WHERE c.title = 'FAA Part 107 Certification Prep';

INSERT INTO lessons (course_id, title, description, video_url, duration, lesson_order, materials, content, is_published) 
SELECT 
    c.id,
    'Airspace Classifications',
    'Understanding controlled and uncontrolled airspace',
    '/videos/lesson2.mp4',
    2400,
    2,
    ARRAY['Airspace Chart', 'Practice Scenarios'],
    'In this lesson, we will explore the different types of airspace and their operational requirements...',
    true
FROM courses c WHERE c.title = 'FAA Part 107 Certification Prep';

-- Add trigger for updated_at
CREATE TRIGGER update_lessons_updated_at 
    BEFORE UPDATE ON lessons 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();