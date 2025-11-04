import 'express-serve-static-core';

import { UserRole } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
      rawBody?: Buffer;
    }
  }
}

export {};
