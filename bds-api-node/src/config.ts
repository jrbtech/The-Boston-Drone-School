import dotenv from 'dotenv';

dotenv.config();

export type ServerConfig = {
  port: number;
  databaseUrl?: string;
};

export const createServerConfig = (): ServerConfig => {
  const port = parseInt(process.env.PORT ?? '', 10);

  return {
    port: Number.isNaN(port) ? 8000 : port,
    databaseUrl: process.env.DATABASE_URL,
  };
};
