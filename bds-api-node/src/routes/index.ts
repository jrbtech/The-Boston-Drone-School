import { Express } from 'express';

import adminRoutes from './adminRoutes';
import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';
import enrollmentRoutes from './enrollmentRoutes';
import paymentRoutes from './paymentRoutes';
import userRoutes from './userRoutes';

export const registerRoutes = (app: Express): void => {
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Boston Drone School API',
      status: 'success',
    });
  });

  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/courses', courseRoutes);
  app.use('/enrollments', enrollmentRoutes);
  app.use('/payments', paymentRoutes);
  app.use('/admin', adminRoutes);
};
