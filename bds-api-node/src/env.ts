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

let hasLoaded = false;

export const loadEnv = (): void => {
  if (hasLoaded) {
    return;
  }

  hasLoaded = true;

  const alwaysLoad = normalizeBoolean(process.env.ALWAYS_LOAD_DOTENV ?? process.env.USE_DOTENV);
  if (alwaysLoad === true) {
    dotenv.config();
    return;
  }

  const disableLoad = normalizeBoolean(process.env.DISABLE_DOTENV);
  if (disableLoad === true) {
    return;
  }

  const environment = (process.env.NODE_ENV ?? '').trim().toLowerCase();
  const runOnRender = Boolean(process.env.RENDER);

  if (runOnRender || environment === 'production') {
    return;
  }

  dotenv.config();
};

// Load environment variables immediately for modules that import this helper.
loadEnv();
