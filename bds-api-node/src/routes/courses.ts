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

type RawCourseRow = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  level: string | null;
  duration_hours: number | null;
  price: number | null;
  created_at: string;
  updated_at: string;
  instructor_name: string | null;
};

type RawModuleRow = {
  id: number;
  courseId: number;
  title: string;
  description: string | null;
  order: number;
  duration: number | null;
  contentType: string | null;
  contentUrl: string | null;
};

const FALLBACK_INSTRUCTOR = 'Boston Drone School Faculty';

const formatDuration = (hours: number | null): string => {
  if (!hours || Number.isNaN(hours)) {
    return 'Self-paced';
  }

  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes} minutes`;
  }

  return `${hours} hour${hours === 1 ? '' : 's'}`;
};

const mapCourseRow = (row: RawCourseRow) => ({
  id: row.id.toString(),
  title: row.title,
  description: row.description ?? '',
  category: row.category ?? 'General',
  level: (row.level ?? 'beginner') as string,
  duration: formatDuration(row.duration_hours),
  durationHours: row.duration_hours ?? 0,
  price: row.price ?? 0,
  instructor: row.instructor_name?.trim() || FALLBACK_INSTRUCTOR,
  thumbnailUrl: null,
  videoUrl: null,
  materials: [] as string[],
  prerequisites: [] as string[],
  learningObjectives: [] as string[],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapModuleRow = (row: RawModuleRow) => ({
  id: row.id.toString(),
  courseId: row.courseId?.toString(),
  title: row.title,
  description: row.description ?? '',
  order: row.order,
  duration: row.duration ?? 0,
  contentType: row.contentType ?? 'video',
  videoUrl: row.contentUrl ?? null,
  materials: [] as string[],
});

// GET /api/courses/free - Get all free courses
router.get('/free', async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT
        c.id,
        c.title,
        c.description,
        c.category,
        c.difficulty_level AS level,
        c.duration_hours,
        c.price,
        c.created_at,
        c.updated_at,
        CONCAT_WS(' ', u.first_name, u.last_name) AS instructor_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE c.is_published = true AND c.price = 0
      ORDER BY c.created_at DESC
    `;

    const result = await getPool().query(query);
    const courses = (result.rows as RawCourseRow[]).map(mapCourseRow);

    res.json({
      success: true,
      courses,
      total: courses.length,
    });
  } catch (error) {
    console.error('Error fetching free courses:', error);
    res.status(500).json({ error: 'Failed to fetch free courses' });
  }
});

// GET /api/courses - Get all published courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, level, search } = req.query;

    let query = `
      SELECT
        c.id,
        c.title,
        c.description,
        c.category,
        c.difficulty_level AS level,
        c.duration_hours,
        c.price,
        c.created_at,
        c.updated_at,
        CONCAT_WS(' ', u.first_name, u.last_name) AS instructor_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE c.is_published = true
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND c.category ILIKE $${paramIndex}`;
      params.push(category as string);
      paramIndex++;
    }

    if (level) {
      query += ` AND c.difficulty_level = $${paramIndex}`;
      params.push(level as string);
      paramIndex++;
    }

    if (search) {
      query += ` AND (c.title ILIKE $${paramIndex} OR c.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY c.created_at DESC';

    const result = await getPool().query(query, params);
    const courses = (result.rows as RawCourseRow[]).map(mapCourseRow);

    res.json({
      success: true,
      courses,
      total: courses.length,
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
        `SELECT
            c.id,
            c.title,
            c.description,
            c.category,
            c.difficulty_level AS level,
            c.duration_hours,
            c.price,
            c.created_at,
            c.updated_at,
            CONCAT_WS(' ', u.first_name, u.last_name) AS instructor_name
         FROM courses c
         LEFT JOIN users u ON c.instructor_id = u.id
         WHERE c.id = $1 AND c.is_published = true`,
        [id]
      );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

      const course = mapCourseRow(courseResult.rows[0] as RawCourseRow);

    // Get course modules
    const modulesResult = await getPool().query(
        `SELECT
            id,
            course_id AS "courseId",
            title,
            description,
            order_index AS "order",
            duration_minutes AS duration,
            content_type AS "contentType",
            content_url AS "contentUrl"
         FROM course_modules
         WHERE course_id = $1
         ORDER BY order_index`,
      [id]
    );

    res.json({
      success: true,
        course: {
          ...course,
          modules: (modulesResult.rows as RawModuleRow[]).map(mapModuleRow),
        },
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
        `SELECT
            id,
            course_id AS "courseId",
            title,
            description,
            duration_minutes AS duration,
            order_index AS "order",
            content_type AS "contentType",
            content_url AS "contentUrl"
         FROM course_modules
         WHERE course_id = $1
         ORDER BY order_index`,
        [id]
      );

      const lessons = (lessonsResult.rows as RawModuleRow[]).map(mapModuleRow);

      res.json({
        success: true,
        lessons,
        total: lessons.length,
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
