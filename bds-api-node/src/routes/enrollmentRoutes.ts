import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import {
  completeEnrollmentHandler,
  createEnrollmentHandler,
  getEnrollmentHandler,
  listEnrollmentsHandler,
} from '../controllers/enrollmentController';

const router = Router();

router.post('/', authenticate, createEnrollmentHandler);
router.get('/', authenticate, listEnrollmentsHandler);
router.get('/:id', authenticate, getEnrollmentHandler);
router.put('/:id/complete', authenticate, completeEnrollmentHandler);

export default router;
