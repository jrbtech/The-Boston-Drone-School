import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodTypeAny } from 'zod';

type RequestPart = 'body' | 'query' | 'params';

export const validate = (schema: AnyZodObject | ZodTypeAny, property: RequestPart = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const result = schema.parse(req[property]);
      (req as any)[property] = result;
      next();
    } catch (error) {
      next(error);
    }
  };
