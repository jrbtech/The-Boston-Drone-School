# Payment Integration Guide - Boston Drone School

## Current Status

✅ **Stripe is fully integrated** in the backend at `bds-api-node/src/routes/payments.ts`

The payment system is production-ready and includes:
- Payment intent creation
- Webhook handling for successful payments
- Automatic course enrollment after payment
- Support for free and paid courses

## Configuration Steps

### 1. Get Your Stripe Keys

1. Go to [https://dashboard.stripe.com/](https://dashboard.stripe.com/)
2. Create an account or sign in
3. Navigate to **Developers > API Keys**
4. Copy your keys:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 2. Set Environment Variables

#### Backend (bds-api-node/.env)
```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### Frontend (bds-frontend/.env.local)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 3. Configure Stripe Webhook

1. Go to **Developers > Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your webhook URL:
   - **Development**: `http://localhost:8000/api/payments/webhook`
   - **Production**: `https://your-domain.com/api/payments/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing Secret** (starts with `whsec_`)
6. Add it to your backend `.env` file

### 4. Test the Payment Flow

#### Test Mode Cards (Use these in Stripe Test Mode)

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Declined Payment:**
- Card: `4000 0000 0000 0002`

**Requires Authentication (3D Secure):**
- Card: `4000 0025 0000 3155`

### 5. How Payments Work

#### Frontend Flow (bds-frontend/src/app/checkout/[courseId]/page.tsx)

1. User selects a course and clicks "Enroll"
2. Frontend creates a payment intent via API:
   ```typescript
   const response = await fetch(`${API_BASE_URL}/payments/create-payment-intent`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({ courseId })
   });
   ```

3. Stripe Elements displays payment form
4. User enters card details and submits
5. Stripe processes payment

#### Backend Flow (bds-api-node/src/routes/payments.ts)

1. **Create Payment Intent** (`POST /api/payments/create-payment-intent`)
   - Validates user is authenticated
   - Gets course price from database
   - Creates Stripe payment intent
   - Returns client secret to frontend

2. **Webhook Handler** (`POST /api/payments/webhook`)
   - Receives payment confirmation from Stripe
   - Validates webhook signature
   - Enrolls user in course automatically
   - Records enrollment in database

3. **Manual Enrollment** (`POST /api/payments/confirm-enrollment`)
   - For free courses or testing
   - Enrolls user without payment

### 6. Free Tier Implementation

Free courses (price = $0) can be enrolled directly without payment:

```typescript
// Frontend call for free courses
const response = await fetch(`${API_BASE_URL}/payments/confirm-enrollment`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ courseId })
});
```

### 7. Database Setup

The payments system requires these tables (already included in migrations):

- **courses** - Stores course information and pricing
- **enrollments** - Tracks user course enrollments
- **users** - User accounts and authentication

Run migrations:
```bash
cd bds-api-node
npm run migrate
```

### 8. Going Live

#### Switch to Live Mode

1. In Stripe Dashboard, toggle from **Test Mode** to **Live Mode**
2. Get your **Live** API keys:
   - `pk_live_...`
   - `sk_live_...`
3. Update environment variables with live keys
4. Configure live webhook endpoint
5. Update webhook secret

#### Compliance Checklist

- [ ] Add Terms of Service page
- [ ] Add Privacy Policy page
- [ ] Add Refund Policy page
- [ ] Link policies in checkout flow
- [ ] Enable HTTPS in production
- [ ] Configure CSP headers
- [ ] Test all payment scenarios
- [ ] Set up email receipts in Stripe
- [ ] Configure tax settings if applicable

### 9. Frontend Checkout Component

The checkout page already exists at:
- `bds-frontend/src/app/checkout/[courseId]/page.tsx`

To customize the checkout experience:

```typescript
// Add custom styling to Stripe Elements
const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#000000',
    colorBackground: '#ffffff',
    colorText: '#1f2937',
    colorDanger: '#df1b41',
    fontFamily: 'system-ui, sans-serif',
    spacingUnit: '4px',
    borderRadius: '8px'
  }
};
```

### 10. Testing Checklist

- [ ] Test successful payment with test card
- [ ] Test declined payment
- [ ] Test webhook receiving payment confirmation
- [ ] Verify user gets enrolled automatically
- [ ] Test free course enrollment
- [ ] Test duplicate enrollment prevention
- [ ] Test payment amount matches course price
- [ ] Test error handling and user feedback
- [ ] Test mobile responsive design
- [ ] Test with real Stripe account in test mode

### 11. Monitoring & Support

#### View Payments
- Stripe Dashboard > Payments
- See all transactions, refunds, disputes

#### View Logs
- Stripe Dashboard > Developers > Logs
- See webhook delivery status
- Debug failed webhooks

#### Customer Support
- Stripe Dashboard > Customers
- View customer payment history
- Issue refunds if needed

### 12. Security Best Practices

✅ **Already Implemented:**
- JWT authentication required for payments
- Webhook signature verification
- Server-side price validation (prevents tampering)
- User enrollment verification

❗ **Additional Recommendations:**
- Use HTTPS in production (required by Stripe)
- Keep Stripe API keys in environment variables (never commit to git)
- Implement rate limiting on payment endpoints
- Set up fraud detection in Stripe Dashboard
- Monitor for suspicious activity

## Need Help?

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **Backend Code**: `bds-api-node/src/routes/payments.ts`
- **Frontend Code**: `bds-frontend/src/app/checkout/[courseId]/page.tsx`

## Quick Start Command

```bash
# Backend
cd bds-api-node
npm install
npm run migrate
npm run dev

# Frontend
cd bds-frontend
npm install
npm run dev
```

Your payment system is ready to accept payments! Just add your Stripe keys and test.
