# Resend Email Setup Guide

## What's Implemented

I've set up automatic email confirmations for both course enrollments and shop orders using Resend (free tier - 100 emails/day).

### What Happens Now:

#### Course Enrollments:
- Student submits enrollment form → **Student receives confirmation email** + **You receive notification email**
- Emails include course details, next steps, and contact info

#### Shop Orders:
- Customer submits order → **Customer receives confirmation email** + **You receive notification email**
- Emails include order details, shipping address, total price

---

## Setup Instructions

### Step 1: Get Your Resend API Key

1. Go to your Resend dashboard: https://resend.com/api-keys
2. Click **"Create API Key"**
3. Name it "Boston Drone School"
4. Copy the API key (starts with `re_...`)

### Step 2: Add API Key to Backend

1. Open the file: `bds-api-node/.env`
2. Find this line:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ```
3. Replace `your_resend_api_key_here` with your actual API key
4. Save the file

Example:
```env
RESEND_API_KEY=re_abc123xyz789...
```

### Step 3: Restart Backend

```bash
cd bds-api-node
npm start
```

---

## Using Your Domain (Optional)

Right now, emails are sent from `onboarding@resend.dev` (Resend's test email).

Once your domain `thebostondroneschool.org` is verified in Resend:

1. Go to Resend dashboard → Domains
2. Verify your DNS records are set up
3. Edit `bds-api-node/.env`:
   ```env
   RESEND_FROM_EMAIL=info@thebostondroneschool.org
   ```
4. Restart backend

---

## Testing

### Test Enrollment Email:
1. Go to `http://localhost:3000/courses`
2. Click on any course
3. Click "Enroll Now"
4. Fill out the form with your email
5. Submit

**You should receive:**
- ✅ Confirmation email to the student email you entered
- ✅ Notification email to `info@thebostondroneschool.org`

### Test Order Email:
1. Go to `http://localhost:3000/shop`
2. Add items to cart
3. Go to cart and fill out checkout form
4. Submit order

**You should receive:**
- ✅ Confirmation email to the customer email you entered
- ✅ Notification email to `info@thebostondroneschool.org`

---

## What the Emails Look Like

### Student Confirmation Email:
```
Subject: Enrollment Request Received - FAA Part 107 Remote Pilot Certification

Hi [Student Name],

Thank you for your interest in FAA Part 107 Remote Pilot Certification at The Boston Drone School!

What Happens Next:
1. Review: Our admissions team will review your enrollment request
2. Contact: We'll reach out within 24 hours via email or phone
3. Payment: Complete enrollment via secure payment link
4. Access: Get instant access to course materials after payment

Course Details:
Course: FAA Part 107 Remote Pilot Certification
Price: $[price]
Your Contact: [email]

Best regards,
The Boston Drone School Team
```

### Admin Notification Email (to you):
```
Subject: New Enrollment: [Student Name] - FAA Part 107 Remote Pilot Certification

Student Information:
- Name: [Student Name]
- Email: [email]
- Phone: [phone]
- Experience: [experience level]

Course Details:
- Course: FAA Part 107 Remote Pilot Certification
- Course ID: 12
- Price: $[price]

Action Required: Contact the student within 24 hours to complete enrollment.
```

---

## Current Configuration

- **Send From**: `onboarding@resend.dev` (Resend test email)
- **Admin Email**: `info@thebostondroneschool.org`
- **Daily Limit**: 100 emails/day (free tier)
- **Status**: ✅ Configured and ready to use

---

## Troubleshooting

### Emails Not Sending?
1. Check backend console for errors
2. Verify API key is correct in `.env`
3. Make sure you didn't exceed 100 emails/day
4. Check Resend dashboard for delivery status

### Emails Going to Spam?
- This is normal with `onboarding@resend.dev`
- Once you verify `thebostondroneschool.org`, deliverability improves
- Add SPF, DKIM records in Resend dashboard

---

## Next Steps

1. **Add your Resend API key** (required)
2. **Verify your domain** in Resend (optional but recommended)
3. **Test the enrollment flow** to make sure emails work
4. **Check spam folder** the first time (if using test email)

---

*Last Updated: November 2024*
