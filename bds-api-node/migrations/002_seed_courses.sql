-- Seed initial courses for Boston Drone School
-- This migration adds the three main courses from the mock data

INSERT INTO courses (
  title,
  description,
  category,
  difficulty_level,
  duration_hours,
  price,
  is_published
) VALUES
  (
    'FAA Part 107 Certification Prep',
    'Complete preparation for the FAA Remote Pilot Certificate exam covering regulations, airspace, weather, and safety protocols.',
    'Certification',
    'beginner',
    64,
    299.00,
    true
  ),
  (
    'Commercial Drone Photography',
    'Master aerial photography techniques, equipment setup, and post-processing for commercial real estate and marketing applications.',
    'Photography',
    'intermediate',
    48,
    399.00,
    true
  ),
  (
    'Advanced Mapping & Surveying',
    'Learn photogrammetry, GIS integration, and precision mapping techniques for construction and land surveying applications.',
    'Surveying',
    'advanced',
    80,
    599.00,
    true
  )
ON CONFLICT DO NOTHING;

-- Add some sample modules for the courses
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
VALUES
  -- FAA Part 107 modules
  (1, 'Introduction to Drone Regulations', 'Overview of FAA Part 107 and regulatory framework', 1, 'video', 30),
  (1, 'Airspace Classifications', 'Understanding controlled and uncontrolled airspace', 2, 'video', 40),
  (1, 'Weather Fundamentals', 'Weather theory and practical applications for drone operations', 3, 'video', 45),
  (1, 'Safety Protocols', 'Operational safety and risk management', 4, 'video', 35),

  -- Commercial Photography modules
  (2, 'Camera Settings for Aerial Photography', 'Master exposure, ISO, and shutter speed', 1, 'video', 25),
  (2, 'Composition and Framing', 'Principles of professional aerial composition', 2, 'video', 30),
  (2, 'Post-Processing Workflow', 'Editing techniques for aerial imagery', 3, 'video', 40),

  -- Mapping & Surveying modules
  (3, 'Photogrammetry Basics', 'Introduction to creating 3D models from aerial photos', 1, 'video', 50),
  (3, 'GIS Integration', 'Working with geographic information systems', 2, 'video', 45),
  (3, 'Survey Data Processing', 'Professional deliverables and reporting', 3, 'video', 55)
ON CONFLICT DO NOTHING;
