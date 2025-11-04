import { Pool } from 'pg';

import { createServerConfig } from './config';

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (pool) {
    return pool;
  }

  const { databaseUrl } = createServerConfig();

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL is not configured or is empty after sanitization. Ensure the environment variable is set correctly.',
    );
  }

  pool = new Pool({
    connectionString: databaseUrl,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  });

  return pool;
};
