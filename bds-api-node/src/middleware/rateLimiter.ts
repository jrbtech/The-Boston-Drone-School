import rateLimit from 'express-rate-limit';

import { serverConfig } from '../config';

export const authRateLimiter = rateLimit({
  windowMs: serverConfig.rateLimit.windowMs,
  limit: serverConfig.rateLimit.maxRequests,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many authentication attempts, please try again later.',
  },
});
