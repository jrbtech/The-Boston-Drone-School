// File Upload Routes for Course Materials
import { Router } from 'express';
import multer from 'multer';
import { r2Storage } from '../services/r2Storage';
import { getPool } from '../db';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow PDFs, videos, images, and common document types
    const allowedTypes = [
      'application/pdf',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  },
});

/**
 * Upload course material
 * POST /api/upload/course-material/:courseId
 */
router.post('/course-material/:courseId', 
  authenticateToken, 
  requireAdmin, 
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const { courseId } = req.params;
      const { title, description, type } = req.body;

      // Upload to R2
      const uploadResult = await r2Storage.uploadCourseMaterial(
        req.file.buffer,
        req.file.originalname,
        courseId,
        req.file.mimetype
      );

      if (!uploadResult.success) {
        return res.status(500).json({ 
          error: 'Upload failed', 
          details: uploadResult.error 
        });
      }

      // Save to database
      const query = `
        INSERT INTO course_materials (
          course_id, title, description, file_url, file_key, file_type, file_size, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING *
      `;

      const values = [
        courseId,
        title || req.file.originalname,
        description || '',
        uploadResult.url,
        uploadResult.key,
        req.file.mimetype,
        req.file.size,
      ];

      const result = await getPool().query(query, values);

      res.json({
        success: true,
        material: result.rows[0],
        url: uploadResult.url,
      });

    } catch (error) {
      console.error('Course material upload error:', error);
      res.status(500).json({ 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }
);

/**
 * Upload FAA reference material
 * POST /api/upload/faa-material
 */
router.post('/faa-material',
  authenticateToken,
  requireAdmin,
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const { title, description, category } = req.body;

      // Upload to R2
      const uploadResult = await r2Storage.uploadFAAMaterial(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );

      if (!uploadResult.success) {
        return res.status(500).json({
          error: 'Upload failed',
          details: uploadResult.error
        });
      }

      // Save to database - you may need to create an faa_materials table
      const query = `
        INSERT INTO faa_materials (
          title, description, category, file_url, file_key, file_type, file_size, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING *
      `;

      const values = [
        title || req.file.originalname,
        description || '',
        category || 'general',
        uploadResult.url,
        uploadResult.key,
        req.file.mimetype,
        req.file.size,
      ];

      const result = await getPool().query(query, values);

      res.json({
        success: true,
        material: result.rows[0],
        url: uploadResult.url,
      });

    } catch (error) {
      console.error('FAA material upload error:', error);
      res.status(500).json({
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

/**
 * Get course materials
 * GET /api/upload/course-materials/:courseId
 */
router.get('/course-materials/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

    const query = `
      SELECT * FROM course_materials
      WHERE course_id = $1
      ORDER BY created_at DESC
    `;

    const result = await getPool().query(query, [courseId]);

    res.json({
      success: true,
      materials: result.rows,
    });

  } catch (error) {
    console.error('Get course materials error:', error);
    res.status(500).json({
      error: 'Failed to fetch materials'
    });
  }
});

/**
 * Get all FAA materials
 * GET /api/upload/faa-materials
 */
router.get('/faa-materials', async (req, res) => {
  try {
    const query = `
      SELECT * FROM faa_materials
      ORDER BY category, created_at DESC
    `;

    const result = await getPool().query(query);

    res.json({
      success: true,
      materials: result.rows,
    });

  } catch (error) {
    console.error('Get FAA materials error:', error);
    res.status(500).json({
      error: 'Failed to fetch FAA materials'
    });
  }
});

export default router;