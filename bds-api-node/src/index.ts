import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { createServerConfig } from './config';
import { registerRoutes } from './routes';

dotenv.config();

const app = express();
const config = createServerConfig();

app.use(cors());
app.use(express.json());

registerRoutes(app);

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '1.0.0',
  });
});

app.listen(config.port, () => {
  console.log(`Boston Drone School API running on port ${config.port}`);
});
