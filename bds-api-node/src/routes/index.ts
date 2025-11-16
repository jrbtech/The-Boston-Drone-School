import { Express, Request, Response } from 'express';
import anthropicRoutes from './anthropic';
import coursesRoutes from './courses';
import enrollmentRoutes from './enrollment';
import authRoutes from './auth';
import paymentRoutes from './payments';
import uploadRoutes from './upload';
import ordersRoutes from './orders';

export const registerRoutes = (app: Express): void => {
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome to the Boston Drone School E-Learning Platform API',
      status: 'success',
      version: '2.0.0',
      features: [
        'Course Management',
        'Student Enrollment',
        'Progress Tracking',
        'AI-Powered Learning Assistant',
        'Certificate Generation'
      ]
    });
  });

  // Health check endpoint at root level for Render
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'Boston Drone School API'
    });
  });

  // Register API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/ai', anthropicRoutes);
  app.use('/api/courses', coursesRoutes);
  app.use('/api/enrollment', enrollmentRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/orders', ordersRoutes);
  
  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });
};
