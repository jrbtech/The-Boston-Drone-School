import { Router } from 'express';
import { Request, Response } from 'express';
import { getPool } from '../db';
import { authenticateToken } from './auth';
import { emailService } from '../services/emailService';

const router = Router();

// POST /api/enrollment/request - Public endpoint for enrollment requests (sends email)
router.post('/request', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, course_id, course_title, course_price, experience, message } = req.body;

    // Validation
    if (!name || !email || !course_id || !course_title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Send enrollment confirmation emails
    const emailResult = await emailService.sendEnrollmentConfirmation({
      studentName: name,
      studentEmail: email,
      studentPhone: phone,
      courseTitle: course_title,
      coursePrice: parseFloat(course_price) || 0,
      courseId: course_id,
      experience,
      message,
    });

    if (!emailResult.success) {
      console.error('Failed to send enrollment emails:', emailResult.error);
      // Don't fail the request if email fails, just log it
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment request received. You will be contacted within 24 hours.',
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error('Error processing enrollment request:', error);
    res.status(500).json({ error: 'Failed to process enrollment request' });
  }
});

// All other enrollment routes require authentication
router.use(authenticateToken);

// POST /api/enrollment/enroll - Enroll in a course
// Note: This is typically called after payment, but can be used for free courses
router.post('/enroll', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userId = req.user.userId; // Get from JWT, not request body
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    // Verify course exists
    const courseCheck = await getPool().query(
      'SELECT id, price FROM courses WHERE id = $1 AND is_published = true',
      [courseId]
    );

    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await getPool().query(
      'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );

    if (existingEnrollment.rows.length > 0) {
      return res.status(409).json({ error: 'Already enrolled in this course' });
    }

    // Create enrollment
    const result = await getPool().query(
      `INSERT INTO enrollments (user_id, course_id, status, progress_percentage)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, course_id, enrollment_date, progress_percentage as progress, status`,
      [userId, courseId, 'active', 0]
    );

    res.status(201).json({
      success: true,
      enrollment: result.rows[0],
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
});

// GET /api/enrollment/user - Get current user's enrollments
// No userId param - uses authenticated user from JWT
router.get('/user', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userId = req.user.userId;
    const { status } = req.query;

    let query = `
      SELECT
        e.id,
        e.user_id as "userId",
        e.course_id as "courseId",
        e.enrollment_date as "enrollmentDate",
        e.completion_date as "completionDate",
        e.progress_percentage as progress,
        e.status,
        c.title as "courseTitle",
        c.description as "courseDescription",
        c.category,
        c.price
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1
    `;
    const params: any[] = [userId];

    if (status) {
      query += ` AND e.status = $2`;
      params.push(status);
    }

    query += ' ORDER BY e.enrollment_date DESC';

    const result = await getPool().query(query, params);

    // Add certificateUrl if exists
    const enrollmentsWithCerts = await Promise.all(
      result.rows.map(async (enrollment: any) => {
        const certResult = await getPool().query(
          'SELECT certificate_url FROM certificates WHERE enrollment_id = $1',
          [enrollment.id]
        );
        return {
          ...enrollment,
          certificateUrl: certResult.rows[0]?.certificate_url || null
        };
      })
    );

    res.json({
      success: true,
      enrollments: enrollmentsWithCerts,
      total: enrollmentsWithCerts.length
    });
  } catch (error) {
    console.error('Error fetching user enrollments:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// GET /api/enrollment/:id - Get specific enrollment (must belong to user)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { id } = req.params;
    const userId = req.user.userId;

    const result = await getPool().query(
      `SELECT
        e.id,
        e.user_id,
        e.course_id,
        e.enrollment_date,
        e.completion_date,
        e.progress_percentage as progress,
        e.status,
        c.title as course_title,
        c.description as course_description,
        c.category
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.id = $1 AND e.user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found or access denied' });
    }

    res.json({
      success: true,
      enrollment: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment' });
  }
});

// PUT /api/enrollment/:enrollmentId/progress - Update module progress
router.put('/:enrollmentId/progress', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { enrollmentId } = req.params;
    const { moduleId, lessonId, completed, timeSpent } = req.body;
    const userId = req.user.userId;

    // Support both moduleId and lessonId (they refer to the same thing)
    const actualModuleId = moduleId || lessonId;

    if (!actualModuleId) {
      return res.status(400).json({ error: 'Module ID or Lesson ID is required' });
    }

    // Verify enrollment belongs to user
    const enrollmentCheck = await getPool().query(
      'SELECT id, course_id FROM enrollments WHERE id = $1 AND user_id = $2',
      [enrollmentId, userId]
    );

    if (enrollmentCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found or access denied' });
    }

    const courseId = enrollmentCheck.rows[0].course_id;

    // Verify module belongs to course
    const moduleCheck = await getPool().query(
      'SELECT id FROM course_modules WHERE id = $1 AND course_id = $2',
      [actualModuleId, courseId]
    );

    if (moduleCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid module for this course' });
    }

    try {
      // Update or insert module progress
      await getPool().query(
        `INSERT INTO module_progress (enrollment_id, module_id, completed, time_spent_minutes, completed_at)
         VALUES ($1, $2, $3, $4, CASE WHEN $3 = true THEN CURRENT_TIMESTAMP ELSE NULL END)
         ON CONFLICT (enrollment_id, module_id)
         DO UPDATE SET
           completed = $3,
           time_spent_minutes = module_progress.time_spent_minutes + $4,
           completed_at = CASE WHEN $3 = true THEN CURRENT_TIMESTAMP ELSE module_progress.completed_at END`,
        [enrollmentId, actualModuleId, completed || false, timeSpent || 0]
      );
    } catch (dbError) {
      console.error('Error inserting/updating module progress:', dbError);
      throw new Error('Failed to update module progress in database');
    }

    // Calculate overall course progress
    const progressResult = await getPool().query(
      `SELECT
        COUNT(*) FILTER (WHERE mp.completed = true)::float /
        NULLIF(COUNT(cm.id)::float, 0) * 100 as progress_percentage
       FROM course_modules cm
       LEFT JOIN module_progress mp ON cm.id = mp.module_id AND mp.enrollment_id = $1
       WHERE cm.course_id = $2`,
      [enrollmentId, courseId]
    );

    const progressPercentage = Math.round(progressResult.rows[0]?.progress_percentage || 0);
    console.log(`[PROGRESS] Calculated progress for enrollment ${enrollmentId}: ${progressPercentage}%`);

    // Update enrollment progress
    const updateResult = await getPool().query(
      `UPDATE enrollments
       SET progress_percentage = $1,
           status = CASE WHEN $1 >= 100 THEN 'completed' ELSE status END,
           completion_date = CASE WHEN $1 >= 100 AND completion_date IS NULL THEN CURRENT_TIMESTAMP ELSE completion_date END
       WHERE id = $2
       RETURNING progress_percentage, status`,
      [progressPercentage, enrollmentId]
    );

    console.log(`[PROGRESS] Updated enrollment:`, updateResult.rows[0]);

    // Get updated enrollment
    const updatedEnrollment = await getPool().query(
      `SELECT id, user_id, course_id, enrollment_date, completion_date,
              progress_percentage as progress, status
       FROM enrollments
       WHERE id = $1`,
      [enrollmentId]
    );

    res.json({
      success: true,
      enrollment: updatedEnrollment.rows[0],
      message: 'Progress updated successfully'
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    res.status(500).json({
      error: 'Failed to update progress',
      message: errorMessage,
      stack: errorStack
    });
  }
});

// GET /api/enrollment/:enrollmentId/progress - Get detailed progress
router.get('/:enrollmentId/progress', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { enrollmentId } = req.params;
    const userId = req.user.userId;

    // Verify enrollment belongs to user
    const enrollmentCheck = await getPool().query(
      `SELECT e.id, e.course_id, e.progress_percentage as progress, e.status,
              c.title as course_title
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE e.id = $1 AND e.user_id = $2`,
      [enrollmentId, userId]
    );

    if (enrollmentCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found or access denied' });
    }

    const enrollment = enrollmentCheck.rows[0];

    // Get module progress
    const progressResult = await getPool().query(
      `SELECT
        cm.id as module_id,
        cm.title as module_title,
        cm.order_index,
        COALESCE(mp.completed, false) as completed,
        COALESCE(mp.time_spent_minutes, 0) as time_spent,
        mp.completed_at
       FROM course_modules cm
       LEFT JOIN module_progress mp ON cm.id = mp.module_id AND mp.enrollment_id = $1
       WHERE cm.course_id = $2
       ORDER BY cm.order_index`,
      [enrollmentId, enrollment.course_id]
    );

    const totalTimeSpent = progressResult.rows.reduce((acc, curr) => acc + curr.time_spent, 0);

    res.json({
      success: true,
      enrollment,
      moduleProgress: progressResult.rows,
      totalTimeSpent,
      completedModules: progressResult.rows.filter(m => m.completed).length,
      totalModules: progressResult.rows.length
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST /api/enrollment/:enrollmentId/certificate - Generate certificate
router.post('/:enrollmentId/certificate', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { enrollmentId } = req.params;
    const userId = req.user.userId;

    // Verify enrollment and completion
    const enrollmentResult = await getPool().query(
      `SELECT e.id, e.course_id, e.progress_percentage, e.completion_date,
              c.title as course_name,
              u.first_name, u.last_name
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       JOIN users u ON e.user_id = u.id
       WHERE e.id = $1 AND e.user_id = $2`,
      [enrollmentId, userId]
    );

    if (enrollmentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found or access denied' });
    }

    const enrollment = enrollmentResult.rows[0];

    if (enrollment.progress_percentage < 100) {
      return res.status(400).json({ error: 'Course must be completed to generate certificate' });
    }

    // Check if certificate already exists
    const existingCert = await getPool().query(
      'SELECT id, certificate_number, certificate_url FROM certificates WHERE enrollment_id = $1',
      [enrollmentId]
    );

    if (existingCert.rows.length > 0) {
      return res.json({
        success: true,
        certificate: existingCert.rows[0],
        message: 'Certificate already exists'
      });
    }

    // Generate certificate
    const certificateNumber = `BDS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const certificateUrl = `/certificates/${certificateNumber}.pdf`;

    const certResult = await getPool().query(
      `INSERT INTO certificates (enrollment_id, certificate_number, certificate_url)
       VALUES ($1, $2, $3)
       RETURNING id, certificate_number, issued_at, certificate_url`,
      [enrollmentId, certificateNumber, certificateUrl]
    );

    res.json({
      success: true,
      certificate: {
        ...certResult.rows[0],
        studentName: `${enrollment.first_name} ${enrollment.last_name}`,
        courseName: enrollment.course_name
      },
      message: 'Certificate generated successfully'
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ error: 'Failed to generate certificate' });
  }
});

// DELETE /api/enrollment/:id - Cancel enrollment (soft delete)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { id } = req.params;
    const userId = req.user.userId;

    const result = await getPool().query(
      `UPDATE enrollments
       SET status = 'cancelled'
       WHERE id = $1 AND user_id = $2
       RETURNING id, status`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found or access denied' });
    }

    res.json({
      success: true,
      enrollment: result.rows[0],
      message: 'Enrollment cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling enrollment:', error);
    res.status(500).json({ error: 'Failed to cancel enrollment' });
  }
});

// GET /api/enrollment/analytics/overview - Get enrollment analytics (admin only)
router.get('/analytics/overview', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
      return res.status(403).json({ error: 'Admin or instructor access required' });
    }

    const stats = await getPool().query(`
      SELECT
        COUNT(*) as total_enrollments,
        COUNT(*) FILTER (WHERE status = 'active') as active_enrollments,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_enrollments,
        AVG(progress_percentage) as average_progress
      FROM enrollments
    `);

    const recentEnrollments = await getPool().query(`
      SELECT
        e.id,
        e.enrollment_date,
        e.progress_percentage as progress,
        e.status,
        u.first_name,
        u.last_name,
        c.title as course_title
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrollment_date DESC
      LIMIT 10
    `);

    const analytics = {
      totalEnrollments: parseInt(stats.rows[0].total_enrollments),
      activeEnrollments: parseInt(stats.rows[0].active_enrollments),
      completedEnrollments: parseInt(stats.rows[0].completed_enrollments),
      completionRate: stats.rows[0].total_enrollments > 0
        ? (parseInt(stats.rows[0].completed_enrollments) / parseInt(stats.rows[0].total_enrollments)) * 100
        : 0,
      averageProgress: Math.round(parseFloat(stats.rows[0].average_progress) || 0),
      recentEnrollments: recentEnrollments.rows
    };

    res.json({
      success: true,
      analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
