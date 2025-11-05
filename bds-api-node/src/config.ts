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

  const withoutPrefix = trimmed
    .replace(/^(?:export\s+)?DATABASE_URL\s*=\s*/i, '')
    .trim();

  const withoutWrappingQuotes = withoutPrefix.replace(/^['"]|['"]$/g, '');

  const joinedLines = withoutWrappingQuotes
    .split(/\r?\n/)
    .map(line => line.trim())
    .join('');

  const sanitized = joinedLines.replace(/\s+/g, '');

  return sanitized || undefined;
};

const parseAllowedOrigins = (value?: string | null): string[] => {
  if (!value) {
    return [];
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return [];
  }

  const withoutPrefix = trimmed
    .replace(/^(?:export\s+)?CORS_ORIGINS?\s*=\s*/i, '')
    .trim();

  if (withoutPrefix.startsWith('[') && withoutPrefix.endsWith(']')) {
    try {
      const parsed = JSON.parse(withoutPrefix);
      if (Array.isArray(parsed)) {
        return parsed
          .map(origin => (typeof origin === 'string' ? origin.trim() : ''))
          .filter(Boolean);
      }
    } catch {
      // Fall through to string parsing if JSON parsing fails
    }
  }

  const tokens = withoutPrefix
    .split(/\r?\n|,/)
    .flatMap(entry => entry.split(/\s+/))
    .map(origin => origin.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);

  return tokens;
};

export const createServerConfig = (): ServerConfig => {
  const port = parseInt(process.env.PORT ?? '', 10);
  const environment = process.env.NODE_ENV ?? 'development';
  const fallbackOrigins =
    environment === 'production' ? DEFAULT_PROD_ORIGINS : DEFAULT_DEV_ORIGINS;

  const envOrigins = parseAllowedOrigins(process.env.CORS_ORIGIN);

  const allowedOrigins = envOrigins.length ? envOrigins : fallbackOrigins;

  return {
    port: Number.isNaN(port) ? 8000 : port,
    databaseUrl: sanitizeConnectionString(process.env.DATABASE_URL),
    allowedOrigins: Array.from(new Set(allowedOrigins)),
  };
};
