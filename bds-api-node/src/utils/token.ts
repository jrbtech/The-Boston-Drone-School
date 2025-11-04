import jwt, { SignOptions, Secret } from 'jsonwebtoken';

import { serverConfig } from '../config';
import { UserRole } from '../models/user';

export type JwtPayload = {
  userId: string;
  role: UserRole;
};

export const signToken = (payload: JwtPayload, options?: SignOptions): string => {
  const secret: Secret = serverConfig.jwt.secret;
  const signOptions: SignOptions = {
    ...options,
    expiresIn: options?.expiresIn ?? (serverConfig.jwt.expiresIn as SignOptions['expiresIn']),
  };

  return jwt.sign(payload, secret, signOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  const secret: Secret = serverConfig.jwt.secret;
  const decoded = jwt.verify(token, secret);
  return decoded as JwtPayload;
};
