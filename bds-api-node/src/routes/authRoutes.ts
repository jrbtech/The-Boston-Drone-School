import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import { authRateLimiter } from '../middleware/rateLimiter';
import { register, login, logout, getCurrentUser } from '../controllers/authController';

const router = Router();

router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);

export default router;
