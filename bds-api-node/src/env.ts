import dotenv from 'dotenv';

const normalizeBoolean = (value?: string | null): boolean | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (['1', 'true', 'yes', 'on'].includes(normalized)) {
    return true;
  }

  if (['0', 'false', 'no', 'off'].includes(normalized)) {
    return false;
  }

  return undefined;
};

const sanitizeConnectionString = (value?: string | null): string | undefined => {
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

  const compact = withoutWrappingQuotes
    .split(/\r?\n/)
    .map(part => part.trim())
    .join('')
    .replace(/\s+/g, '');

  return compact || undefined;
};

const isRemoteDatabaseHost = (connectionString?: string): boolean => {
  if (!connectionString) {
    return false;
  }

  try {
    const url = new URL(connectionString);
    const host = url.hostname.toLowerCase();

    return (
      host.length > 0 &&
      host !== 'localhost' &&
      host !== '127.0.0.1' &&
      host !== '::1' &&
      !host.endsWith('.local')
    );
  } catch {
    return false;
  }
};

let hasLoaded = false;

export const loadEnv = (): void => {
  if (hasLoaded) {
    return;
  }

  hasLoaded = true;

  const alwaysLoad = normalizeBoolean(
    process.env.ALWAYS_LOAD_DOTENV ?? process.env.USE_DOTENV,
  );
  if (alwaysLoad === true) {
    dotenv.config();
    return;
  }

  const disableLoad = normalizeBoolean(process.env.DISABLE_DOTENV);
  if (disableLoad === true) {
    return;
  }

  const environment = (process.env.NODE_ENV ?? '').trim().toLowerCase();
  const runOnRender = Boolean(
    process.env.RENDER ??
      process.env.RENDER_SERVICE_ID ??
      process.env.RENDER_SERVICE_NAME ??
      process.env.RENDER_EXTERNAL_URL,
  );

  const sanitizedDatabaseUrl = sanitizeConnectionString(process.env.DATABASE_URL);
  const hasRemoteDatabaseUrl = isRemoteDatabaseHost(sanitizedDatabaseUrl);

  if (runOnRender || environment === 'production' || hasRemoteDatabaseUrl) {
    return;
  }

  dotenv.config();
};

// Load environment variables immediately for modules that import this helper.
loadEnv();
