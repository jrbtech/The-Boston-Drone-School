import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface AuthenticatedUser extends JwtPayload {
      userId: number;
      email: string;
      role: string;
    }

    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
