import { Router } from 'express';
import { Request, Response } from 'express';
import { getPool } from '../db';
import { authenticateToken } from './auth';

const router = Router();

// Middleware to check if user is admin
const requireAdmin = (req: Request, res: Response, next: Function) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
    return res.status(403).json({ error: 'Admin or instructor access required' });
  }

  next();
};

// GET /api/courses - Get all published courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, level, search } = req.query;

    let query = `
      SELECT id, title, description, category, difficulty_level as level,
             duration_hours, price, created_at, updated_at
      FROM courses
      WHERE is_published = true
    `;
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters
    if (category) {
      query += ` AND category ILIKE $${paramIndex}`;
      params.push(category as string);
      paramIndex++;
    }

    if (level) {
      query += ` AND difficulty_level = $${paramIndex}`;
      params.push(level as string);
      paramIndex++;
    }

    if (search) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await getPool().query(query, params);

    res.json({
      success: true,
      courses: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET /api/courses/:id - Get single course with modules
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get course details
    const courseResult = await getPool().query(
      `SELECT id, title, description, category, difficulty_level as level,
              duration_hours, price, created_at, updated_at
       FROM courses
       WHERE id = $1 AND is_published = true`,
      [id]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const course = courseResult.rows[0];

    // Get course modules
    const modulesResult = await getPool().query(
      `SELECT id, title, description, order_index as "order",
              content_type, duration_minutes
       FROM course_modules
       WHERE course_id = $1
       ORDER BY order_index`,
      [id]
    );

    res.json({
      success: true,
      course: {
        ...course,
        modules: modulesResult.rows
      }
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// GET /api/courses/:id/lessons - Get course lessons (modules)
router.get('/:id/lessons', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verify course exists
    const courseResult = await getPool().query(
      'SELECT id FROM courses WHERE id = $1 AND is_published = true',
      [id]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Get lessons (modules)
    const lessonsResult = await getPool().query(
      `SELECT id, course_id as "courseId", title, description,
              duration_minutes as duration, order_index as "order"
       FROM course_modules
       WHERE course_id = $1
       ORDER BY order_index`,
      [id]
    );

    res.json({
      success: true,
      lessons: lessonsResult.rows,
      total: lessonsResult.rows.length
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// POST /api/courses - Create new course (admin only)
router.post('/', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      difficulty_level,
      duration_hours,
      price
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const result = await getPool().query(
      `INSERT INTO courses (
        title, description, category, difficulty_level,
        duration_hours, price, instructor_id, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, title, description, category, difficulty_level as level,
                duration_hours, price, created_at, updated_at`,
      [
        title,
        description,
        category || 'General',
        difficulty_level || 'beginner',
        duration_hours || 0,
        price || 0,
        req.user!.userId,
        false // Not published by default
      ]
    );

    res.status(201).json({
      success: true,
      course: result.rows[0],
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// PUT /api/courses/:id - Update course (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      difficulty_level,
      duration_hours,
      price,
      is_published
    } = req.body;

    const result = await getPool().query(
      `UPDATE courses
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           category = COALESCE($3, category),
           difficulty_level = COALESCE($4, difficulty_level),
           duration_hours = COALESCE($5, duration_hours),
           price = COALESCE($6, price),
           is_published = COALESCE($7, is_published),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING id, title, description, category, difficulty_level as level,
                 duration_hours, price, is_published, updated_at`,
      [title, description, category, difficulty_level, duration_hours, price, is_published, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      success: true,
      course: result.rows[0],
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// DELETE /api/courses/:id - Delete course (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await getPool().query(
      `DELETE FROM courses
       WHERE id = $1
       RETURNING id, title`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      success: true,
      course: result.rows[0],
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;
