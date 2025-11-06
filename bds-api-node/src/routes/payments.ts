import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { getPool } from '../db';
import { authenticateToken } from './auth';

const router = Router();

// Initialize Stripe only if key is provided
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // Using latest stable API version
    apiVersion: '2024-11-20.acacia' as any,
  });
}

// POST /api/payments/create-payment-intent
router.post('/create-payment-intent', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      return res.status(503).json({ error: 'Payment system not configured' });
    }

    const { courseId } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const userId = req.user.userId;

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    // Get course details
    const courseResult = await getPool().query(
      'SELECT id, title, price FROM courses WHERE id = $1',
      [courseId]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const course = courseResult.rows[0];

    // Check if user is already enrolled
    const enrollmentCheck = await getPool().query(
      'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );

    if (enrollmentCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        courseId: course.id,
        userId: userId.toString(),
        courseName: course.title,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: course.price,
      courseName: course.title,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// POST /api/payments/webhook - Stripe webhook handler
router.post('/webhook', async (req: Request, res: Response) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Payment system not configured' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: 'Missing webhook signature or secret' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { courseId, userId } = paymentIntent.metadata;

        if (!courseId || !userId) {
          console.error('Missing metadata in payment intent:', paymentIntent.id);
          break;
        }

        // Enroll user in course
          const parsedUserId = Number(userId);
          const parsedCourseId = Number(courseId);

          if (Number.isNaN(parsedUserId) || Number.isNaN(parsedCourseId)) {
            console.error('Invalid metadata IDs, skipping enrollment', { userId, courseId });
            break;
          }

          await getPool().query(
            `INSERT INTO enrollments (user_id, course_id, status, progress_percentage)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (user_id, course_id)
             DO UPDATE SET status = EXCLUDED.status`,
            [parsedUserId, parsedCourseId, 'active', 0]
          );

        console.log('User enrolled after successful payment:', { userId, courseId, paymentIntentId: paymentIntent.id });
        break;

      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        console.error('Payment failed:', failedIntent.id, failedIntent.last_payment_error);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// POST /api/payments/confirm-enrollment - Manual enrollment after test payment
router.post('/confirm-enrollment', authenticateToken, async (req: Request, res: Response) => {
  try {
      const { courseId } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Access token required' });
    }

      const userId = req.user.userId;

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

      const parsedCourseId = Number(courseId);

      if (Number.isNaN(parsedCourseId)) {
        return res.status(400).json({ error: 'Invalid course identifier' });
      }

    // Check if course exists
    const courseResult = await getPool().query(
      'SELECT id FROM courses WHERE id = $1',
        [parsedCourseId]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Enroll user
    const result = await getPool().query(
        `INSERT INTO enrollments (user_id, course_id, status, progress_percentage)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (user_id, course_id)
         DO UPDATE SET status = EXCLUDED.status
         RETURNING id`,
        [userId, parsedCourseId, 'active', 0]
    );

    res.json({
      success: true,
      enrollmentId: result.rows[0].id,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Enrollment confirmation error:', error);
    res.status(500).json({ error: 'Failed to confirm enrollment' });
  }
});

export default router;
