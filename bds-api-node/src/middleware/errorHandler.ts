import { NextFunction, Request, Response } from 'express';

import { AppError, ensureAppError, formatZodError, isZodError } from '../utils/errors';
import { logger } from '../utils/logger';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  if (isZodError(err)) {
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: formatZodError(err),
    });
    return;
  }

  const appError = ensureAppError(err);

  if (!appError.isOperational) {
    logger.error({ err: appError, path: req.path }, 'Unexpected error occurred');
  } else {
    logger.debug({ err: appError, path: req.path }, 'Handled operational error');
  }

  res.status(appError.statusCode).json({
    status: 'error',
    message: appError.message,
    details: appError.details,
  });
};
