import { Express } from 'express';

export const registerRoutes = (app: Express): void => {
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Boston Drone School API',
      status: 'success',
    });
  });
};
