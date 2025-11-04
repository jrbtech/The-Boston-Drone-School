import { Request, Response, NextFunction } from 'express';

import { createPaymentIntentSchema } from '../models/payment';
import { AppError } from '../utils/errors';
import { constructStripeEvent, createPaymentIntent, handleStripeEvent } from '../services/paymentService';
import { logger } from '../utils/logger';

export const createPaymentIntentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const payload = createPaymentIntentSchema.parse(req.body);
    const result = await createPaymentIntent(req.user, payload);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const stripeWebhookHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.rawBody) {
      throw new AppError('Missing webhook payload', 400);
    }

    const signature = req.headers['stripe-signature'];
    const event = constructStripeEvent(signature, req.rawBody);

    await handleStripeEvent(event);

    res.json({ received: true });
  } catch (error) {
    logger.error({ err: error }, 'Stripe webhook handling failed');
    next(error);
  }
};
