import { Router } from 'express';

import { authenticate, requireRole } from '../middleware/auth';
import { getAdminCourses, getAdminUsers, getStats } from '../controllers/adminController';

const router = Router();

router.use(authenticate, requireRole('admin'));

router.get('/stats', getStats);
router.get('/users', getAdminUsers);
router.get('/courses', getAdminCourses);

export default router;
