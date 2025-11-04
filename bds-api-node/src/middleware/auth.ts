import { NextFunction, Request, Response } from 'express';

import { UserRole } from '../models/user';
import { AppError } from '../utils/errors';
import { verifyToken } from '../utils/token';

const extractToken = (request: Request): string | null => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const [type, token] = authHeader.split(' ');
  if (type?.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token;
};

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const token = extractToken(req);

  if (!token) {
    next(new AppError('Authentication required', 401));
    return;
  }

  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.userId,
      role: payload.role,
    };
    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', 401));
  }
};

export const optionalAuthenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const token = extractToken(req);

  if (!token) {
    next();
    return;
  }

  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.userId,
      role: payload.role,
    };
  } catch (error) {
    // Ignore token errors for optional authentication
  }

  next();
};

export const requireRole = (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new AppError('Insufficient permissions', 403));
      return;
    }

    next();
  };
