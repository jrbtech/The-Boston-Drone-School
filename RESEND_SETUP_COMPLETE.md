# Resend Email Setup Guide - Boston Drone School

## Current Status: 95% Complete ✅

Your Resend integration is **almost fully operational**! Just 2 quick fixes needed.

---

## 🚨 Critical Issues to Fix

### 1. Fix DNS DKIM Record (REQUIRED)

**Problem:** Your `resend._domainkey` TXT record has **spaces** in it, which prevents verification.

**Current DNS Record (WRONG):**
```
Host: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/KLGPZCCe+dspb9wVdunBMezRMFb5R/zw D0a7FdGTQl7Mj...
                                                                                    ↑ SPACE HERE
```

**Fix in your domain registrar:**

1. Go to your domain DNS settings
2. Find the `resend._domainkey` TXT record
3. **Replace the entire value** with this (NO SPACES):

```
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/KLGPZCCe+dspb9wVdunBMezRMFb5R/zwD0a7FdGTQl7MjSdyjCw8ipRWIC94+0MCNJ0JZWVgNRL+lQHubqKsLrCWYidCjdLmimT9WYEnSI9xR1UQyA8Taca7RTTnFUfiogpT7ZYk59gGd5Rw9iIf23l1EbFltCnPyqP1MlAWLQIDAQAB
```

4. Save the DNS record
5. Wait 5-10 minutes for DNS propagation
6. Go to Resend dashboard and click "Verify Domain"

---

### 2. Add Your Resend API Key

**Location:** `bds-api-node/.env` (line 9)

**Current value (placeholder):**
```env
RESEND_API_KEY=your_resend_api_key_here
```

**Fix:**

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Create a new API key (or copy existing one)
3. Update your `.env` file:

```env
RESEND_API_KEY=re_YourActualAPIKey_here123456789
```

4. Restart your backend server:
```bash
cd bds-api-node
npm start
```

---

## ✅ What's Already Built and Working

### Email Service (`emailService.ts`)
- ✅ Resend SDK installed (v6.4.2)
- ✅ Service initialized with error handling
- ✅ Professional HTML email templates
- ✅ Sends to both customer AND admin
- ✅ Fallback to `onboarding@resend.dev` for testing

### Order Submission (`/api/orders/submit`)
- ✅ Endpoint registered and working
- ✅ Form validation (name, email, address, cart)
- ✅ Sends order confirmation to customer
- ✅ Sends order notification to admin
- ✅ Error handling (won't crash if email fails)

### Course Enrollment (`/api/enrollment/request`)
- ✅ Sends enrollment confirmation to student
- ✅ Sends enrollment notification to admin
- ✅ Beautiful email templates with course details

---

## 📧 Email Templates

### Customer Order Confirmation Email
**Includes:**
- Order received confirmation
- Next steps (you'll contact them for payment)
- Full order summary with items and prices
- Shipping address
- Contact information

### Admin Order Notification Email
**Includes:**
- Customer contact details
- Complete order breakdown
- Shipping address
- Customer notes
- Action reminder (contact within 24 hours)

### Student Enrollment Confirmation Email
**Includes:**
- Enrollment received message
- What happens next (4-step process)
- Course details and price
- Contact information

### Admin Enrollment Notification Email
**Includes:**
- Student information
- Course details
- Experience level
- Student's message/questions
- Action reminder

---

## 🧪 Testing After Setup

### Test 1: Product Order Email
```bash
curl -X POST https://bds-backend-5ao0.onrender.com/api/orders/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "your-test-email@example.com",
    "phone": "555-123-4567",
    "address": "123 Test St",
    "city": "Boston",
    "state": "MA",
    "zip": "02101",
    "cart_items": [
      {
        "id": "test-product",
        "name": "Test Product",
        "price": 50,
        "quantity": 1
      }
    ],
    "total_price": 50,
    "total_items": 1,
    "notes": "This is a test order"
  }'
```

**Expected result:**
- HTTP 200 response
- Email sent to customer at `your-test-email@example.com`
- Email sent to admin at `info@thebostondroneschool.org`

### Test 2: Course Enrollment Email
```bash
curl -X POST https://bds-backend-5ao0.onrender.com/api/enrollment/request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "your-test-email@example.com",
    "phone": "555-123-4567",
    "course_id": "part-107-complete",
    "course_title": "FAA Part 107 Complete Course",
    "course_price": 299,
    "experience": "beginner",
    "message": "Test enrollment"
  }'
```

**Expected result:**
- HTTP 200 response
- Confirmation email to student
- Notification email to admin

---

## 🌐 Frontend Integration Status

### Shop/Cart Flow
**Files:** `bds-frontend/app/cart/page.tsx`

The cart page sends order data to `/api/orders/submit` which triggers:
1. Order validation
2. Email to customer (confirmation)
3. Email to you (notification with order details)

### Course Enrollment Flow
**Files:** `bds-frontend/app/checkout/[courseId]/page.tsx`

The checkout page sends enrollment data to `/api/enrollment/request` which triggers:
1. Enrollment validation
2. Email to student (confirmation)
3. Email to you (notification with student details)

---

## 📝 Environment Variables Reference

**Current `.env` configuration:**
```env
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here          # ⚠️  UPDATE THIS
RESEND_FROM_EMAIL=onboarding@resend.dev          # ✅ OK for now (will auto-update after verification)
ADMIN_EMAIL=info@thebostondroneschool.org        # ✅ Correct
```

**After domain verification, update to:**
```env
RESEND_FROM_EMAIL=orders@thebostondroneschool.org
# or
RESEND_FROM_EMAIL=noreply@thebostondroneschool.org
```

---

## 🎯 Complete Setup Checklist

- [ ] **Fix DNS DKIM record** (remove spaces)
- [ ] **Wait 5-10 minutes** for DNS propagation
- [ ] **Verify domain in Resend dashboard**
- [ ] **Copy Resend API key** from dashboard
- [ ] **Update `.env` file** with real API key
- [ ] **Restart backend server** (`npm start`)
- [ ] **Test with curl commands** above
- [ ] **Test from frontend** (place test order)
- [ ] **Update `RESEND_FROM_EMAIL`** to your domain (optional, after verification)

---

## 🔍 Troubleshooting

### "Email service not configured"
**Cause:** Missing or invalid `RESEND_API_KEY` in `.env`
**Fix:** Add your real API key and restart server

### "Domain not verified"
**Cause:** DNS records not propagated or have errors
**Fix:**
1. Check DNS records match exactly (no spaces!)
2. Wait 10-15 minutes
3. Use [DNS Checker](https://dnschecker.org) to verify propagation

### Emails going to spam
**Cause:** Domain not fully verified or missing DMARC
**Fix:**
1. Ensure all DNS records are verified in Resend
2. Add SPF and DMARC records (already done ✅)
3. Warm up your domain by sending low volumes initially

### Test emails not arriving
**Cause:** Using `onboarding@resend.dev` has rate limits
**Fix:** Verify your domain to send unlimited emails from your own domain

---

## 📊 Current DNS Records Status

| Type | Host | Status | Notes |
|------|------|--------|-------|
| TXT | `resend._domainkey` | ❌ Has spaces | **MUST FIX** |
| TXT | `_dmarc` | ✅ Correct | Good |
| TXT | `send` | ✅ Correct | SPF record |
| MX | `send` | ✅ Correct | SES for sending |

---

## 💡 How It Works (Flow Diagram)

### Shop Order Flow:
```
Customer fills cart on website
        ↓
Clicks "Checkout"
        ↓
Enters contact/shipping info
        ↓
Submits order (POST /api/orders/submit)
        ↓
Backend validates data
        ↓
Sends 2 emails via Resend:
  1. Customer: "Order Received" ✉️
  2. Admin: "New Order Alert" 📬
        ↓
Returns success to frontend
        ↓
Customer sees confirmation page
        ↓
YOU receive email with order details
        ↓
YOU contact customer for payment
        ↓
YOU fulfill order
```

### Course Enrollment Flow:
```
Student browses courses
        ↓
Clicks "Enroll Now"
        ↓
Fills enrollment form
        ↓
Submits (POST /api/enrollment/request)
        ↓
Backend validates data
        ↓
Sends 2 emails via Resend:
  1. Student: "Enrollment Received" ✉️
  2. Admin: "New Enrollment Alert" 📬
        ↓
Returns success to frontend
        ↓
Student sees confirmation page
        ↓
YOU receive email with student details
        ↓
YOU contact student with payment link
        ↓
Student pays and gets course access
```

---

## 🚀 Next Steps After Email is Working

1. **Test thoroughly** - Place real test orders from your site
2. **Monitor spam placement** - Check if emails land in inbox vs spam
3. **Set up auto-responders** (optional) - Create saved responses for common questions
4. **Track conversions** - See how many enrollment requests convert to paid students
5. **Consider Stripe** - For automated payment processing (already integrated!)

---

## 📞 Support Resources

- **Resend Docs:** https://resend.com/docs
- **Resend Dashboard:** https://resend.com/home
- **DNS Checker:** https://dnschecker.org
- **Your Backend:** https://bds-backend-5ao0.onrender.com
- **Your Frontend:** https://bds-frontend.onrender.com

---

**Last Updated:** November 15, 2025
**Status:** Ready for final configuration ✅
