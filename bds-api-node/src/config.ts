import dotenv from 'dotenv';

dotenv.config();

type CorsOrigin = string | boolean | Array<string>;

export type JwtConfig = {
  secret: string;
  expiresIn: string | number;
};

export type StripeConfig = {
  secretKey: string;
  webhookSecret: string;
};

export type RateLimitConfig = {
  windowMs: number;
  maxRequests: number;
};

export type ServerConfig = {
  port: number;
  env: string;
  databaseUrl: string;
  corsOrigin: CorsOrigin;
  jwt: JwtConfig;
  stripe: StripeConfig;
  rateLimit: RateLimitConfig;
};

const parseNumber = (value: string | undefined, defaultValue: number): number => {
  if (!value) {
    return defaultValue;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? defaultValue : parsed;
};

const parseCorsOrigin = (origin: string | undefined): CorsOrigin => {
  if (!origin) {
    return true;
  }

  if (origin === '*') {
    return '*';
  }

  return origin.split(',').map((value) => value.trim()).filter(Boolean);
};

export const createServerConfig = (): ServerConfig => {
  const port = parseNumber(process.env.PORT, 8000);
  const env = process.env.NODE_ENV ?? 'development';
  const rateLimitWindow = parseNumber(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000);
  const rateLimitMax = parseNumber(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS, 100);

  return {
    port,
    env,
    databaseUrl: process.env.DATABASE_URL ?? '',
    corsOrigin: parseCorsOrigin(process.env.CORS_ORIGIN),
    jwt: {
      secret: process.env.JWT_SECRET ?? 'change-me-in-production',
      expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY ?? '',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    },
    rateLimit: {
      windowMs: rateLimitWindow,
      maxRequests: rateLimitMax,
    },
  };
};

export const serverConfig = createServerConfig();
