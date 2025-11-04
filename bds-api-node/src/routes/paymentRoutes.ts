import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import { createPaymentIntentHandler, stripeWebhookHandler } from '../controllers/paymentController';

const router = Router();

router.post('/create-intent', authenticate, createPaymentIntentHandler);
router.post('/webhook', stripeWebhookHandler);

export default router;
