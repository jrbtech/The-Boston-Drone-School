import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import { createServerConfig } from './config';
import { registerRoutes } from './routes';
import { loadEnv } from './env';

// Load environment variables
loadEnv();

const app = express();
const config = createServerConfig();

// CORS configuration for production
const { allowedOrigins } = config;
const isProduction = process.env.NODE_ENV === 'production';

const corsOptions: CorsOptions = {
  origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`Blocked CORS origin: ${origin}`);
    return callback(new Error(`Origin ${origin} not allowed by CORS policy.`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));

// Special handling for Stripe webhook - needs raw body for signature verification
// This MUST come before express.json() middleware
app.use(
  '/api/payments/webhook',
  express.raw({ type: 'application/json', limit: '10mb' })
);

// General body parsers for all other routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Powered-By', 'Boston Drone School API');
  next();
});

// Request logging middleware for production
if (isProduction) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
    next();
  });
}

// Register routes
registerRoutes(app);

// Global error handler with better production error handling
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const error = err as Error & { status?: number };

  console.error('Global error handler:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  const production = process.env.NODE_ENV === 'production';

  res.status(error.status ?? 500).json({
    error: production ? 'Internal server error' : error.message,
    ...(!production && { stack: error.stack }),
    timestamp: new Date().toISOString()
  });
});

// 404 handler - catch all unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

const PORT = Number(process.env.PORT) || config.port || 3001;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Boston Drone School API running on port ${PORT}`);
  console.log(`📡 Listening on host ${HOST}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  PORT=${PORT}`);
  console.log(`🤖 Claude AI: ${process.env.ANTHROPIC_API_KEY ? '✅ Configured' : '❌ Missing API key'}`);
  console.log(`🌐 Allowed CORS origins: ${allowedOrigins.join(', ') || 'none (CORS disabled)'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

export default app;
