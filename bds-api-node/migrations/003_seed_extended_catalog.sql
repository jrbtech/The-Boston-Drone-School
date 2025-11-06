-- Extend Boston Drone School catalog with offerings that mirror public site engagements

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
    'Executive UAS Consultation Series',
    'Three-session advisory program covering UAS integration, compliance, and communications for executive stakeholders.',
    'Consultation',
    'advanced',
    6,
    1299.00,
    true
  ),
  (
    'Part 107 Live Webinar Intensive',
    'Interactive webinar series delivering the full spectrum of FAA Part 107 knowledge, test preparation, and mission planning exercises.',
    'Certification',
    'beginner',
    5,
    349.00,
    true
  ),
  (
    'Guided Flight Experience',
    'Hands-on flight instruction with certified pilots, including pre-flight briefings, flight drills, and post-flight debrief.',
    'Flight Operations',
    'beginner',
    2,
    249.00,
    true
  ),
  (
    'Drone Advocacy & Policy Lab',
    'Collaborative workshop that equips teams to navigate public relations, community engagement, and evolving UAS policy.',
    'Policy',
    'intermediate',
    4,
    599.00,
    true
  ),
  (
    'STEM Workforce Readiness Program',
    'Educational pathway introducing learners to drone technology careers, safety, and mission design through experiential learning.',
    'Education',
    'beginner',
    8,
    199.00,
    true
  ),
  (
    'Enterprise UAS Integration Workshop',
    'Operational blueprint for enterprises adopting drones, covering procurement, SOP development, and data lifecycle management.',
    'Enterprise',
    'advanced',
    7,
    899.00,
    true
  );

-- Modules for Executive UAS Consultation Series
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT id, module_title, module_description, module_order, module_type, module_duration
FROM (
  SELECT
    'Executive UAS Consultation Series'::text AS course_title,
    'Strategic Alignment Session'::text AS module_title,
    'Define mission objectives, risk posture, and stakeholder expectations.'::text AS module_description,
    1 AS module_order,
    'live'::text AS module_type,
    90 AS module_duration
  UNION ALL
  SELECT
    'Executive UAS Consultation Series',
    'Regulatory & Compliance Blueprint',
    'Map applicable FAA regulations, waivers, and reporting workflows for UAS operations.',
    2,
    'live',
    90
  UNION ALL
  SELECT
    'Executive UAS Consultation Series',
    'Communications & Public Affairs Lab',
    'Develop messaging plans, community engagement tactics, and escalation protocols.',
    3,
    'workshop',
    90
) modules
JOIN courses ON courses.title = modules.course_title;

-- Modules for Part 107 Live Webinar Intensive
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT id, module_title, module_description, module_order, module_type, module_duration
FROM (
  SELECT
    'Part 107 Live Webinar Intensive'::text AS course_title,
    'Regulations & Airspace Foundations'::text AS module_title,
    'Review Part 107 regulations, waiver processes, and controlled vs. uncontrolled airspace scenarios.'::text AS module_description,
    1 AS module_order,
    'webinar'::text AS module_type,
    75 AS module_duration
  UNION ALL
  SELECT
    'Part 107 Live Webinar Intensive',
    'Weather & Risk Management Workshop',
    'Interpret weather products, assess go/no-go decisions, and build mission risk matrices.',
    2,
    'webinar',
    75
  UNION ALL
  SELECT
    'Part 107 Live Webinar Intensive',
    'Mission Planning & Exam Preparation',
    'Walk through sectional charts, crew coordination, and exam simulation exercises.',
    3,
    'webinar',
    90
) modules
JOIN courses ON courses.title = modules.course_title;

-- Modules for Guided Flight Experience
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT id, module_title, module_description, module_order, module_type, module_duration
FROM (
  SELECT
    'Guided Flight Experience'::text AS course_title,
    'Pre-Flight Briefing & Safety Checklists'::text AS module_title,
    'Walkthrough of site assessment, crew roles, and emergency procedures.'::text AS module_description,
    1 AS module_order,
    'in-person'::text AS module_type,
    30 AS module_duration
  UNION ALL
  SELECT
    'Guided Flight Experience',
    'Hands-On Flight Fundamentals',
    'Guided stick time focusing on takeoffs, maneuvers, and landing proficiency.',
    2,
    'in-person',
    45
  UNION ALL
  SELECT
    'Guided Flight Experience',
    'Post-Flight Debrief & Performance Review',
    'Review telemetry, video capture, and improvement plan for independent practice.',
    3,
    'in-person',
    30
) modules
JOIN courses ON courses.title = modules.course_title;

-- Modules for Drone Advocacy & Policy Lab
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT id, module_title, module_description, module_order, module_type, module_duration
FROM (
  SELECT
    'Drone Advocacy & Policy Lab'::text AS course_title,
    'Current Policy Landscape Review'::text AS module_title,
    'Analyze FAA guidance, state legislation, and municipal frameworks affecting UAS.'::text AS module_description,
    1 AS module_order,
    'seminar'::text AS module_type,
    60 AS module_duration
  UNION ALL
  SELECT
    'Drone Advocacy & Policy Lab',
    'Public Relations Playbook',
    'Develop communication strategies for community engagement and public briefings.',
    2,
    'workshop',
    75
  UNION ALL
  SELECT
    'Drone Advocacy & Policy Lab',
    'Stakeholder Simulation Exercise',
    'Facilitate mock sessions with regulators, media, and community partners.',
    3,
    'simulation',
    75
) modules
JOIN courses ON courses.title = modules.course_title;

-- Modules for STEM Workforce Readiness Program
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT id, module_title, module_description, module_order, module_type, module_duration
FROM (
  SELECT
    'STEM Workforce Readiness Program'::text AS course_title,
    'Orientation to UAS Careers'::text AS module_title,
    'Introduce learners to career pathways, certifications, and industry expectations.'::text AS module_description,
    1 AS module_order,
    'workshop'::text AS module_type,
    60 AS module_duration
  UNION ALL
  SELECT
    'STEM Workforce Readiness Program',
    'Hands-On Flight & Simulation Lab',
    'Pair simulator practice with supervised flight exercises to build confidence.',
    2,
    'lab',
    90
  UNION ALL
  SELECT
    'STEM Workforce Readiness Program',
    'Mission Design Challenge',
    'Teams collaborate on planning, presenting, and debriefing a mock drone mission.',
    3,
    'project',
    120
) modules
JOIN courses ON courses.title = modules.course_title;

-- Modules for Enterprise UAS Integration Workshop
INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
SELECT id, module_title, module_description, module_order, module_type, module_duration
FROM (
  SELECT
    'Enterprise UAS Integration Workshop'::text AS course_title,
    'Procurement & Vendor Readiness'::text AS module_title,
    'Evaluate hardware, software, and staffing considerations for enterprise deployment.'::text AS module_description,
    1 AS module_order,
    'seminar'::text AS module_type,
    75 AS module_duration
  UNION ALL
  SELECT
    'Enterprise UAS Integration Workshop',
    'Standard Operating Procedures Lab',
    'Draft SOPs, risk assessments, and crew resource management plans aligned to compliance requirements.',
    2,
    'workshop',
    90
  UNION ALL
  SELECT
    'Enterprise UAS Integration Workshop',
    'Data Lifecycle & Reporting',
    'Design data capture, processing, and retention workflows with governance in mind.',
    3,
    'seminar',
    75
) modules
JOIN courses ON courses.title = modules.course_title;
