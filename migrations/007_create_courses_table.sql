-- 007_create_courses_table.sql
-- Create courses table for e-learning platform

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(255),
    duration VARCHAR(100),
    level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    price DECIMAL(10,2),
    category VARCHAR(100),
    thumbnail_url VARCHAR(500),
    video_url VARCHAR(500),
    materials TEXT[], -- Array of materials
    prerequisites TEXT[], -- Array of prerequisites
    learning_objectives TEXT[], -- Array of learning objectives
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_active ON courses(is_active);

-- Insert sample courses
INSERT INTO courses (title, description, instructor, duration, level, price, category, materials, prerequisites, learning_objectives) VALUES
('FAA Part 107 Certification Prep', 'Complete preparation for the FAA Remote Pilot Certificate exam covering regulations, airspace, weather, and safety protocols.', 'John Smith, Certified Flight Instructor', '8 weeks', 'beginner', 299.00, 'Certification', 
 ARRAY['Study Guide PDF', 'Practice Exams', 'Regulation Handbook'],
 ARRAY[],
 ARRAY['Pass the FAA Part 107 exam', 'Understand drone regulations', 'Master airspace classifications', 'Apply weather knowledge to flight operations']),
 
('Commercial Drone Photography', 'Master aerial photography techniques, equipment setup, and post-processing for commercial real estate and marketing applications.', 'Sarah Johnson, Professional Photographer', '6 weeks', 'intermediate', 399.00, 'Photography',
 ARRAY['Camera Settings Guide', 'Editing Software', 'Portfolio Templates'],
 ARRAY['Basic drone operation', 'FAA Part 107 certificate'],
 ARRAY['Execute professional aerial photography shoots', 'Master camera settings and composition', 'Process and edit aerial imagery', 'Build a commercial photography portfolio']),
 
('Advanced Mapping & Surveying', 'Learn photogrammetry, GIS integration, and precision mapping techniques for construction and land surveying applications.', 'Dr. Michael Chen, Surveying Engineer', '10 weeks', 'advanced', 599.00, 'Surveying',
 ARRAY['Mapping Software License', 'GIS Tools', 'Survey Equipment Guide'],
 ARRAY['Drone piloting experience', 'Basic GIS knowledge'],
 ARRAY['Create accurate orthomosaic maps', 'Perform volumetric calculations', 'Integrate with GIS systems', 'Deliver professional survey reports']);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_courses_updated_at 
    BEFORE UPDATE ON courses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();