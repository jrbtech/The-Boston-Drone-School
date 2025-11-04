import { Request, Response, NextFunction } from 'express';

import { createEnrollmentSchema, EnrollmentStatus } from '../models/enrollment';
import {
  completeEnrollment,
  createEnrollment,
  getEnrollmentById,
  listEnrollments,
} from '../services/enrollmentService';
import { AppError } from '../utils/errors';

export const createEnrollmentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const payload = createEnrollmentSchema.parse(req.body);
    const enrollment = await createEnrollment(payload, req.user);
    res.status(201).json({ status: 'success', data: enrollment });
  } catch (error) {
    next(error);
  }
};

export const listEnrollmentsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { page, limit, status, userId } = req.query;

    const result = await listEnrollments(req.user, {
      page: typeof page === 'string' ? Number(page) : undefined,
      limit: typeof limit === 'string' ? Number(limit) : undefined,
      status: typeof status === 'string' ? (status as EnrollmentStatus) : undefined,
      userId: typeof userId === 'string' ? userId : undefined,
    });

    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const getEnrollmentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const enrollment = await getEnrollmentById(req.user, req.params.id);
    res.json({ status: 'success', data: enrollment });
  } catch (error) {
    next(error);
  }
};

export const completeEnrollmentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const enrollment = await completeEnrollment(req.user, req.params.id);
    res.json({ status: 'success', data: enrollment });
  } catch (error) {
    next(error);
  }
};
