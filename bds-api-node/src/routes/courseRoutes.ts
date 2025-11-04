import { Router } from 'express';

import { authenticate, requireRole } from '../middleware/auth';
import {
  createCourseHandler,
  deleteCourseHandler,
  getCourse,
  getCourses,
  updateCourseHandler,
} from '../controllers/courseController';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', authenticate, requireRole('admin', 'instructor'), createCourseHandler);
router.put('/:id', authenticate, requireRole('admin', 'instructor'), updateCourseHandler);
router.delete('/:id', authenticate, requireRole('admin'), deleteCourseHandler);

export default router;
