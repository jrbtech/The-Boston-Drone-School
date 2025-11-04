import { z } from 'zod';

export const paymentStatusEnum = z.enum([
  'requires_payment_method',
  'requires_confirmation',
  'requires_action',
  'processing',
  'succeeded',
  'canceled',
  'failed',
  'refunded',
]);

export type PaymentStatus = z.infer<typeof paymentStatusEnum>;

export const paymentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  enrollmentId: z.string().uuid(),
  amount: z.number().nonnegative(),
  stripePaymentIntentId: z.string(),
  status: paymentStatusEnum,
  createdAt: z.date(),
});

export type Payment = z.infer<typeof paymentSchema>;

export const createPaymentIntentSchema = z.object({
  enrollmentId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().default('usd'),
});

export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;
