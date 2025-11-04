import { Request, Response, NextFunction } from 'express';

import { loginSchema, registerSchema } from '../models/auth';
import { loginUser, registerUser, getUserById } from '../services/authService';
import { AppError } from '../utils/errors';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = registerSchema.parse(req.body);
    const { user, token } = await registerUser({
      ...payload,
      role: 'student',
    });
    res.status(201).json({ status: 'success', data: { user, token } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { user, token } = await loginUser(email, password);
    res.json({ status: 'success', data: { user, token } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.json({ status: 'success', message: 'Logged out successfully' });
};

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const user = await getUserById(req.user.id);
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};
