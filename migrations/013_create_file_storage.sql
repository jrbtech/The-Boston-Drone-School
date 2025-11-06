-- File storage tables for course materials and FAA documents
-- Migration: 013_create_file_storage.sql

-- Table for course materials (videos, PDFs, images, etc.)
CREATE TABLE IF NOT EXISTS course_materials (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL, -- 'video', 'pdf', 'image', 'document'
    file_size BIGINT NOT NULL, -- file size in bytes
    mime_type VARCHAR(100) NOT NULL,
    r2_key VARCHAR(500) NOT NULL, -- R2 object key/path
    public_url TEXT NOT NULL, -- public URL for access
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_downloadable BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for FAA reference materials (regulations, guides, etc.)
CREATE TABLE IF NOT EXISTS faa_materials (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL, -- 'pdf', 'document'
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    r2_key VARCHAR(500) NOT NULL,
    public_url TEXT NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'regulation', 'guide', 'form', 'reference'
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_materials_course_id ON course_materials(course_id);
CREATE INDEX IF NOT EXISTS idx_course_materials_type ON course_materials(file_type);
CREATE INDEX IF NOT EXISTS idx_course_materials_sort ON course_materials(course_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_faa_materials_category ON faa_materials(category);
CREATE INDEX IF NOT EXISTS idx_faa_materials_featured ON faa_materials(is_featured);

-- Add updated_at trigger for course_materials
CREATE OR REPLACE FUNCTION update_course_materials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER course_materials_updated_at
    BEFORE UPDATE ON course_materials
    FOR EACH ROW
    EXECUTE FUNCTION update_course_materials_updated_at();

-- Add updated_at trigger for faa_materials
CREATE OR REPLACE FUNCTION update_faa_materials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER faa_materials_updated_at
    BEFORE UPDATE ON faa_materials
    FOR EACH ROW
    EXECUTE FUNCTION update_faa_materials_updated_at();