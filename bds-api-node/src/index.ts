import express, { Request as ExpressRequest } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { createServerConfig } from './config';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { httpLogger, logger } from './utils/logger';
import { registerRoutes } from './routes';

dotenv.config();

const app = express();
const config = createServerConfig();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(httpLogger);

app.use(
  express.json({
    verify: (req: ExpressRequest, _res, buf) => {
      if (req.originalUrl.startsWith('/payments/webhook')) {
        req.rawBody = Buffer.from(buf);
      }
    },
  })
);
app.use(express.urlencoded({ extended: false }));

registerRoutes(app);

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '1.0.0',
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Boston Drone School API running on port ${config.port}`);
});
