import { Request, Response, NextFunction } from 'express';

import { CourseStatus } from '../models/course';
import { UserRole } from '../models/user';
import { getAdminStats, listAdminCourses, listAdminUsers } from '../services/adminService';
import { AppError } from '../utils/errors';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      throw new AppError('Admin privileges required', 403);
    }

    const stats = await getAdminStats();
    res.json({ status: 'success', data: stats });
  } catch (error) {
    next(error);
  }
};

export const getAdminUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      throw new AppError('Admin privileges required', 403);
    }

    const { page, limit, role, search } = req.query;

    const users = await listAdminUsers({
      page: typeof page === 'string' ? Number(page) : undefined,
      limit: typeof limit === 'string' ? Number(limit) : undefined,
      role: typeof role === 'string' ? (role as UserRole) : undefined,
      search: typeof search === 'string' ? search : undefined,
    });

    res.json({ status: 'success', data: users });
  } catch (error) {
    next(error);
  }
};

export const getAdminCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      throw new AppError('Admin privileges required', 403);
    }

    const { page, limit, status } = req.query;

    const courses = await listAdminCourses({
      page: typeof page === 'string' ? Number(page) : undefined,
      limit: typeof limit === 'string' ? Number(limit) : undefined,
      status: typeof status === 'string' ? (status as CourseStatus) : undefined,
    });

    res.json({ status: 'success', data: courses });
  } catch (error) {
    next(error);
  }
};
