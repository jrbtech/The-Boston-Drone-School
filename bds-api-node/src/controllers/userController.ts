import { Request, Response, NextFunction } from 'express';

import { updateUserSchema, UserRole } from '../models/user';
import { deleteUser, getUser, listUsers, updateUser } from '../services/userService';
import { AppError } from '../utils/errors';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, role, search } = req.query;

    const result = await listUsers({
      page: typeof page === 'string' ? Number(page) : undefined,
      limit: typeof limit === 'string' ? Number(limit) : undefined,
      role: typeof role === 'string' ? (role as UserRole) : undefined,
      search: typeof search === 'string' ? search : undefined,
    });

    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (req.user.role !== 'admin' && req.user.id !== id) {
      throw new AppError('Insufficient permissions', 403);
    }

    const user = await getUser(id);
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (req.user.role !== 'admin' && req.user.id !== id) {
      throw new AppError('Insufficient permissions', 403);
    }

    const payload = updateUserSchema.parse(req.body);

    if (req.user.role !== 'admin') {
      delete payload.role;
    }

    const user = await updateUser(id, payload);
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      throw new AppError('Admin privileges required', 403);
    }

    const { id } = req.params;
    await deleteUser(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
