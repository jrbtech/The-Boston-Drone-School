-- 011_create_certificates_table.sql
-- Create certificates table for course completion

CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    verification_code VARCHAR(100) UNIQUE NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    instructor_name VARCHAR(255),
    completion_date TIMESTAMP NOT NULL,
    certificate_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_certificates_user_id ON certificates(user_id);
CREATE INDEX idx_certificates_course_id ON certificates(course_id);
CREATE INDEX idx_certificates_verification_code ON certificates(verification_code);
CREATE INDEX idx_certificates_certificate_number ON certificates(certificate_number);

-- Add trigger for updated_at
CREATE TRIGGER update_certificates_updated_at 
    BEFORE UPDATE ON certificates 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();