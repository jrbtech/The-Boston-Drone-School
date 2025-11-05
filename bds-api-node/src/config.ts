import dotenv from 'dotenv';

dotenv.config();

export type ServerConfig = {
  port: number;
  databaseUrl?: string;
  allowedOrigins: string[];
};

const DEFAULT_DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
];

const DEFAULT_PROD_ORIGINS = [
  'https://bds-frontend.onrender.com',
  'https://learn.thebostondroneschool.org',
  'https://thebostondroneschool.org',
];

const sanitizeConnectionString = (
  value?: string | null,
): string | undefined => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  return trimmed.replace(/\s*\r?\n\s*/g, '');
};

export const createServerConfig = (): ServerConfig => {
  const port = parseInt(process.env.PORT ?? '', 10);
  const environment = process.env.NODE_ENV ?? 'development';
  const fallbackOrigins =
    environment === 'production' ? DEFAULT_PROD_ORIGINS : DEFAULT_DEV_ORIGINS;

  const envOrigins = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  const allowedOrigins = envOrigins.length ? envOrigins : fallbackOrigins;

  return {
    port: Number.isNaN(port) ? 8000 : port,
    databaseUrl: sanitizeConnectionString(process.env.DATABASE_URL),
    allowedOrigins: Array.from(new Set(allowedOrigins)),
  };
};
