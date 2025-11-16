-- Enroll meganragab23@gmail.com in Part 107 course
-- Run this SQL in your PostgreSQL database

-- First, let's check if the user exists
DO $$
DECLARE
    v_user_id INTEGER;
    v_course_id VARCHAR(255) := 'part-107-complete';
    v_enrollment_exists BOOLEAN;
BEGIN
    -- Get user ID
    SELECT id INTO v_user_id FROM users WHERE email = 'meganragab23@gmail.com';

    IF v_user_id IS NULL THEN
        RAISE NOTICE 'User not found with email: meganragab23@gmail.com';
        RAISE NOTICE 'Please create account first at /register';
    ELSE
        RAISE NOTICE 'User found - ID: %', v_user_id;

        -- Check if already enrolled
        SELECT EXISTS(
            SELECT 1 FROM enrollments
            WHERE user_id = v_user_id AND course_id = v_course_id
        ) INTO v_enrollment_exists;

        IF v_enrollment_exists THEN
            -- Update to active if cancelled
            UPDATE enrollments
            SET status = 'active', progress_percentage = 0
            WHERE user_id = v_user_id AND course_id = v_course_id;

            RAISE NOTICE 'Enrollment updated to active';
        ELSE
            -- Create new enrollment
            INSERT INTO enrollments (user_id, course_id, status, progress_percentage)
            VALUES (v_user_id, v_course_id, 'active', 0);

            RAISE NOTICE 'New enrollment created successfully!';
        END IF;

        RAISE NOTICE '✅ SUCCESS! User is now enrolled in Part 107 course';
    END IF;
END $$;

-- Verify the enrollment
SELECT
    u.email,
    u.first_name,
    u.last_name,
    c.title as course_title,
    e.status,
    e.progress_percentage,
    e.enrollment_date
FROM enrollments e
JOIN users u ON e.user_id = u.id
JOIN courses c ON e.course_id = c.id
WHERE u.email = 'meganragab23@gmail.com'
AND c.id = 'part-107-complete';
