-- FAA Part 107 Remote Pilot Certification Course
-- Official curriculum based on FAA regulations and study materials
-- Migration to create comprehensive Part 107 course with college-level content

BEGIN;

-- Insert the main Part 107 course
INSERT INTO courses (
  title,
  description,
  category,
  difficulty_level,
  duration_hours,
  price,
  instructor_id,
  is_published
) VALUES (
  'FAA Part 107 Remote Pilot Certification',
  'Comprehensive college-level course for FAA Part 107 Remote Pilot Certification. This course integrates official FAA content including 14 CFR Part 107 regulations, the FAA Remote Pilot Study Guide, and Airman Certification Standards. Prepare for your commercial drone license with structured lessons covering all exam topics: regulations, airspace, weather, operations, and performance.',
  'FAA Certification',
  'intermediate',
  40,
  499.00,
  1,
  true
) RETURNING id;

-- Store the course ID for use in module creation
-- Note: In production, you would get this ID and use it for the modules below
-- For this migration, we'll use a subquery to get the course_id

-- MODULE 1: Introduction to Part 107 and sUAS Operations
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 1: Introduction to Part 107 and Small UAS Operations',
  'Introduction to FAA Part 107 regulations, history of sUAS regulations, certification requirements, and course overview. Understanding the scope and applicability of Part 107.',
  1,
  'video_text',
  90
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 2: Part 107 Regulations - Subpart A (General)
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 2: Part 107 Regulations - General Provisions',
  'Official FAA 14 CFR Part 107 Subpart A: Applicability, definitions, and general requirements. Learn the foundational regulations that govern small unmanned aircraft systems operations in the United States.',
  2,
  'video_text',
  120
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 3: Part 107 Regulations - Subpart B (Operating Rules)
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 3: Operating Rules and Requirements',
  'Official FAA 14 CFR Part 107 Subpart B: Operating rules including visual line of sight, daylight operations, altitude restrictions, airspeed limitations, right-of-way rules, and operational requirements. Covers §107.11 through §107.51.',
  3,
  'video_text',
  180
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 4: Part 107 Regulations - Subpart C (Certification)
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 4: Remote Pilot Certification Requirements',
  'Official FAA 14 CFR Part 107 Subpart C: Requirements for remote pilot certification, eligibility, aeronautical knowledge testing, recurrent training, and certificate privileges and limitations.',
  4,
  'video_text',
  90
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 5: Airspace Classification and Authorization
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 5: National Airspace System and Airspace Classification',
  'Comprehensive study of U.S. airspace classification (Class A, B, C, D, E, G), controlled vs. uncontrolled airspace, special use airspace, temporary flight restrictions, and LAANC (Low Altitude Authorization and Notification Capability). Understanding sectional charts and airspace requirements.',
  5,
  'video_text',
  150
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 6: Aviation Weather Services
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 6: Aviation Weather and Meteorology',
  'Weather theory and services for UAS operations. Reading and interpreting METARs and TAFs, understanding weather patterns, density altitude, temperature inversions, wind patterns, atmospheric stability, and weather hazards. Based on FAA Pilot''s Handbook Chapter 12.',
  6,
  'video_text',
  180
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 7: Loading, Performance, and Flight Operations
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 7: Aircraft Performance and Loading',
  'Understanding UAS performance factors, weight and balance, center of gravity, effects of atmospheric conditions on performance, battery management, and flight planning considerations.',
  7,
  'video_text',
  90
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 8: Emergency Procedures and Risk Management
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 8: Emergency Procedures and Aeronautical Decision Making',
  'Emergency procedures, accident reporting requirements, risk assessment, crew resource management, aeronautical decision-making (ADM), and human factors in UAS operations.',
  8,
  'video_text',
  90
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 9: Operations Over People and Moving Vehicles
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 9: Operations Over People and Night Operations',
  'Official FAA 14 CFR Part 107 Subpart D: Categories of operations over people, remote identification requirements, operations over moving vehicles, and night operations requirements including anti-collision lighting.',
  9,
  'video_text',
  120
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 10: Waivers and Special Operations
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 10: Part 107 Waivers and Special Authorizations',
  'Official FAA 14 CFR Part 107 Subpart E: Understanding the waiver process, what regulations can be waived, how to apply for waivers, and special flight operations authorizations.',
  10,
  'video_text',
  60
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 11: Aeronautical Charts and Airport Operations
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 11: Aeronautical Charts and Airport Operations',
  'Reading and interpreting sectional charts, understanding airport markings and signs, runway and taxiway operations, and operating in the vicinity of airports. Understanding Chart Supplements and NOTAMs.',
  11,
  'video_text',
  120
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 12: Physiological Factors and Crew Resource Management
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 12: Human Factors and Crew Resource Management',
  'Human factors affecting UAS operations, fatigue, stress, medical conditions, drugs and alcohol, vision considerations, crew resource management, communication, and decision-making. Based on FAA Pilot''s Handbook Chapters 2 and 14.',
  12,
  'video_text',
  90
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 13: Maintenance and Preflight Inspections
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 13: Aircraft Maintenance and Preflight Procedures',
  'UAS maintenance requirements, preflight inspection procedures, identifying and addressing mechanical issues, battery safety, and maintaining aircraft in a condition for safe operation.',
  13,
  'video_text',
  60
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 14: Radio Communication and ATC Procedures
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 14: Radio Communications and ATC Procedures',
  'Basic radio communication procedures, phraseology, working with air traffic control, frequency usage, and understanding ATC instructions for UAS operations.',
  14,
  'video_text',
  75
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- MODULE 15: Comprehensive Exam Preparation and Practice Tests
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT
  id,
  'Module 15: Exam Preparation and Practice Testing',
  'Comprehensive review of all topics, exam-taking strategies, practice questions from official FAA sample questions, and full-length practice exams. Final preparation for the FAA Part 107 knowledge test.',
  15,
  'video_text',
  180
FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- Add course summary statistics comment
COMMENT ON TABLE course_modules IS 'Part 107 course includes 15 comprehensive modules totaling 40 hours of instruction, covering all FAA Part 107 requirements and exam topics';

COMMIT;
