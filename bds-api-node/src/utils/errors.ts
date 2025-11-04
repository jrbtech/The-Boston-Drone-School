import { ZodError } from 'zod';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const isZodError = (error: unknown): error is ZodError => error instanceof ZodError;

export const formatZodError = (error: ZodError) =>
  error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

export const ensureAppError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (isZodError(error)) {
    return new AppError('Validation failed', 400, formatZodError(error));
  }

  if (error instanceof Error) {
    return new AppError(error.message, 500, undefined, false);
  }

  return new AppError('An unexpected error occurred', 500, undefined, false);
};
