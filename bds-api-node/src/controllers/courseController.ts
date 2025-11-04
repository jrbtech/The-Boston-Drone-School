import { Request, Response, NextFunction } from 'express';

import { createCourseSchema, updateCourseSchema, CourseStatus } from '../models/course';
import { AppError } from '../utils/errors';
import { createCourse, deleteCourse, getCourseById, listCourses, updateCourse } from '../services/courseService';

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, status, instructorId, search } = req.query;

    const data = await listCourses({
      page: typeof page === 'string' ? Number(page) : undefined,
      limit: typeof limit === 'string' ? Number(limit) : undefined,
      status: typeof status === 'string' ? (status as CourseStatus) : undefined,
      instructorId: typeof instructorId === 'string' ? instructorId : undefined,
      search: typeof search === 'string' ? search : undefined,
    });

    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const course = await getCourseById(id);
    res.json({ status: 'success', data: course });
  } catch (error) {
    next(error);
  }
};

export const createCourseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const payload = createCourseSchema.parse(req.body);
    const course = await createCourse(payload, req.user);
    res.status(201).json({ status: 'success', data: course });
  } catch (error) {
    next(error);
  }
};

export const updateCourseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const payload = updateCourseSchema.parse(req.body);
    const course = await updateCourse(req.params.id, payload, req.user);
    res.json({ status: 'success', data: course });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      throw new AppError('Admin privileges required', 403);
    }

    await deleteCourse(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
