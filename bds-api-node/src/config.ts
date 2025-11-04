import dotenv from 'dotenv';

dotenv.config();

export type ServerConfig = {
  port: number;
  databaseUrl?: string;
};

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

  return {
    port: Number.isNaN(port) ? 8000 : port,
    databaseUrl: sanitizeConnectionString(process.env.DATABASE_URL),
  };
};
