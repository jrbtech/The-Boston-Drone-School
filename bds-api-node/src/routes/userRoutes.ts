import { Router } from 'express';

import { authenticate, requireRole } from '../middleware/auth';
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from '../controllers/userController';

const router = Router();

router.get('/', authenticate, requireRole('admin'), getUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUserById);
router.delete('/:id', authenticate, requireRole('admin'), deleteUserById);

export default router;
