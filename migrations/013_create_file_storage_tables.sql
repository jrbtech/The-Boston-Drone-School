-- Migration: Create file storage tables for course materials and FAA resources

-- Table for course materials (PDFs, videos, etc.)
CREATE TABLE IF NOT EXISTS course_materials (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_key VARCHAR(500) NOT NULL, -- R2 object key
    file_type VARCHAR(100) NOT NULL, -- MIME type
    file_size INTEGER, -- Size in bytes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for FAA reference materials
CREATE TABLE IF NOT EXISTS faa_materials (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'general', -- 'study-guide', 'weather', 'regulations', etc.
    file_url TEXT NOT NULL,
    file_key VARCHAR(500) NOT NULL, -- R2 object key
    file_type VARCHAR(100) NOT NULL, -- MIME type
    file_size INTEGER, -- Size in bytes
    is_public BOOLEAN DEFAULT true, -- Whether accessible to all users
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for better performance
CREATE INDEX IF NOT EXISTS idx_course_materials_course_id ON course_materials(course_id);
CREATE INDEX IF NOT EXISTS idx_faa_materials_category ON faa_materials(category);
CREATE INDEX IF NOT EXISTS idx_faa_materials_public ON faa_materials(is_public);

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_course_materials_updated_at
    BEFORE UPDATE ON course_materials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faa_materials_updated_at
    BEFORE UPDATE ON faa_materials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some initial FAA materials categories
INSERT INTO faa_materials (title, description, category, file_url, file_key, file_type, file_size) 
VALUES 
  ('FAA Remote Pilot Study Guide', 'Official FAA study guide for Part 107 remote pilot certification', 'study-guide', 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/media/remote_pilot_study_guide.pdf', 'placeholder', 'application/pdf', 0),
  ('Aviation Weather Handbook', 'Comprehensive guide to aviation weather for remote pilots', 'weather', 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/media/00-6B-WX-Book.pdf', 'placeholder', 'application/pdf', 0)
ON CONFLICT DO NOTHING;