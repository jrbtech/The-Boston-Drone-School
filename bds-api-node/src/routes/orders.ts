import { Router } from 'express';
import { Request, Response } from 'express';
import { emailService } from '../services/emailService';

const router = Router();

// POST /api/orders/submit - Public endpoint for product orders (sends email)
router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, city, state, zip, notes, cart_items, total_price, total_items } = req.body;

    // Validation
    if (!name || !email || !address || !city || !state || !zip || !cart_items) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Parse cart items if it's a string
    let cartItems = cart_items;
    if (typeof cart_items === 'string') {
      try {
        cartItems = JSON.parse(cart_items);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid cart items format' });
      }
    }

    // Format shipping address
    const shippingAddress = `${address}\n${city}, ${state} ${zip}`;

    // Send order confirmation emails
    const emailResult = await emailService.sendOrderConfirmation({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress,
      cartItems,
      totalPrice: parseFloat(total_price) || 0,
      totalItems: parseInt(total_items) || 0,
      notes,
    });

    if (!emailResult.success) {
      console.error('Failed to send order emails:', emailResult.error);
      // Don't fail the request if email fails, just log it
    }

    res.status(200).json({
      success: true,
      message: 'Order received. You will be contacted within 24 hours to arrange payment.',
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

export default router;
