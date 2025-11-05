import express from 'express';
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
  origin(origin, callback) {
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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Powered-By', 'Boston Drone School API');
  next();
});

// Request logging middleware for production
if (isProduction) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
    next();
  });
}

// Register routes
registerRoutes(app);

// Global error handler with better production error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Log the error
  console.error('Global error handler:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Don't leak error details in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.status(err.status || 500).json({
    error: isProduction ? 'Internal server error' : err.message,
    ...((!isProduction) && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

const PORT = process.env.PORT || config.port || 3001;

const server = app.listen(PORT, () => {
  console.log(`🚀 Boston Drone School API running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
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
