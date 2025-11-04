import Stripe from 'stripe';

import { serverConfig } from '../config';
import { CreatePaymentIntentInput, Payment, PaymentStatus, paymentStatusEnum } from '../models/payment';
import { AppError } from '../utils/errors';
import { getPool } from '../db';
import { mapPaymentRow } from '../utils/mappers';
import { updateEnrollmentPaymentStatus } from './enrollmentService';

const stripeSecret = serverConfig.stripe.secretKey;

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: '2024-06-20',
    })
  : null;

type Actor = {
  id: string;
  role: 'student' | 'instructor' | 'admin';
};

type EnrollmentWithCourse = {
  enrollment_id: string;
  user_id: string;
  course_id: string;
  price: number;
  status: string;
  payment_status: string;
};

const requireStripe = () => {
  if (!stripe) {
    throw new AppError('Stripe is not configured', 500);
  }
  return stripe;
};

const fetchEnrollmentForPayment = async (id: string): Promise<EnrollmentWithCourse> => {
  const pool = getPool();
  const { rows } = await pool.query(
    `
      SELECT e.id AS enrollment_id,
             e.user_id,
             e.course_id,
             e.payment_status,
             c.price,
             c.status
      FROM enrollments e
      JOIN courses c ON c.id = e.course_id
      WHERE e.id = $1
    `,
    [id]
  );

  if (rows.length === 0) {
    throw new AppError('Enrollment not found', 404);
  }

  return {
    enrollment_id: rows[0].enrollment_id,
    user_id: rows[0].user_id,
    course_id: rows[0].course_id,
    price: Number(rows[0].price),
    status: rows[0].status,
    payment_status: rows[0].payment_status,
  };
};

type PaymentRecordInput = {
  userId: string;
  enrollmentId: string;
  amount: number;
  stripePaymentIntentId: string;
  status: PaymentStatus;
};

const upsertPaymentRecord = async (data: PaymentRecordInput): Promise<Payment> => {
  const pool = getPool();
  const { rows } = await pool.query(
    `
      INSERT INTO payments (id, user_id, enrollment_id, amount, stripe_payment_intent_id, status)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
      ON CONFLICT (user_id, enrollment_id)
      DO UPDATE SET amount = $3, stripe_payment_intent_id = $4, status = $5
      RETURNING *
    `,
    [data.userId, data.enrollmentId, data.amount, data.stripePaymentIntentId, data.status]
  );

  return mapPaymentRow(rows[0]);
};

export const createPaymentIntent = async (
  actor: Actor,
  input: CreatePaymentIntentInput
): Promise<{ clientSecret: string; payment: Payment }> => {
  const enrollment = await fetchEnrollmentForPayment(input.enrollmentId);

  if (actor.role !== 'admin' && actor.id !== enrollment.user_id) {
    throw new AppError('You do not have access to this enrollment', 403);
  }

  if (enrollment.payment_status === 'paid') {
    throw new AppError('Enrollment has already been paid for', 400);
  }

  const stripeClient = requireStripe();
  const amountInCents = Math.round(enrollment.price * 100);

  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: amountInCents,
    currency: input.currency ?? 'usd',
    metadata: {
      enrollment_id: enrollment.enrollment_id,
      user_id: enrollment.user_id,
    },
  });

  const payment = await upsertPaymentRecord({
    userId: enrollment.user_id,
    enrollmentId: enrollment.enrollment_id,
    amount: enrollment.price,
    stripePaymentIntentId: paymentIntent.id,
    status: paymentStatusEnum.parse(paymentIntent.status ?? 'requires_payment_method'),
  });

  await updateEnrollmentPaymentStatus(enrollment.enrollment_id, 'pending');

  return {
    clientSecret: paymentIntent.client_secret ?? '',
    payment,
  };
};

const paymentStatusFromIntent = (intent: Stripe.PaymentIntent): string => {
  if (intent.status === 'processing') {
    return 'processing';
  }

  if (intent.status === 'succeeded') {
    return 'succeeded';
  }

  if (intent.status === 'requires_payment_method') {
    return 'requires_payment_method';
  }

  if (intent.status === 'requires_action') {
    return 'requires_action';
  }

  if (intent.status === 'requires_confirmation') {
    return 'requires_confirmation';
  }

  if (intent.status === 'canceled') {
    return 'canceled';
  }

  return 'failed';
};

export const constructStripeEvent = (signature: string | string[] | undefined, payload: Buffer) => {
  const webhookSecret = serverConfig.stripe.webhookSecret;

  if (!stripe || !webhookSecret) {
    throw new AppError('Stripe webhook not configured', 500);
  }

  return stripe.webhooks.constructEvent(payload, signature ?? '', webhookSecret);
};

export const handleStripeEvent = async (event: Stripe.Event): Promise<void> => {
  if (!stripe) {
    throw new AppError('Stripe is not configured', 500);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
    case 'payment_intent.processing':
    case 'payment_intent.payment_failed':
    case 'payment_intent.canceled': {
      const intent = event.data.object as Stripe.PaymentIntent;
      const enrollmentId = intent.metadata.enrollment_id;

      if (!enrollmentId) {
        return;
      }

      const userId = intent.metadata.user_id;

      if (!userId) {
        return;
      }

      const status = paymentStatusEnum.parse(paymentStatusFromIntent(intent));

      await upsertPaymentRecord({
        userId,
        enrollmentId,
        amount: (intent.amount_received ?? intent.amount ?? 0) / 100,
        stripePaymentIntentId: intent.id,
        status,
      });

      if (status === 'succeeded') {
        await updateEnrollmentPaymentStatus(enrollmentId, 'paid');
      } else if (status === 'failed' || status === 'canceled') {
        await updateEnrollmentPaymentStatus(enrollmentId, 'failed');
      } else {
        await updateEnrollmentPaymentStatus(enrollmentId, 'pending');
      }

      break;
    }
    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      const enrollmentId = charge.metadata?.enrollment_id;

      if (!enrollmentId) {
        return;
      }

      const userId = charge.metadata?.user_id;
      const paymentIntentId = charge.payment_intent?.toString();

      if (!userId || !paymentIntentId) {
        return;
      }

      await updateEnrollmentPaymentStatus(enrollmentId, 'refunded');
      await upsertPaymentRecord({
        userId,
        enrollmentId,
        amount: (charge.amount_refunded ?? charge.amount ?? 0) / 100,
        stripePaymentIntentId: paymentIntentId,
        status: 'refunded',
      });
      break;
    }
    default:
      break;
  }
};
