# 🗺️ Implementation Roadmap - What to Add and Where

This guide shows exactly what needs to be added to complete The Boston Drone School platform.

---

## 🔴 **CRITICAL - Must Have Before Launch**

### 1. Authentication Backend (JWT)

**Priority:** 🔥 CRITICAL
**Time Estimate:** 2-3 hours

#### Where to Add:
```
bds-api-node/src/routes/
└── auth.ts (NEW FILE)
```

#### What to Add:

**File: `bds-api-node/src/routes/auth.ts`**
```typescript
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at',
      [email, hashedPassword, name, 'student']
    );

    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    // Find user
    const result = await pool.query(
      'SELECT id, email, password_hash, name, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Middleware to verify JWT
export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

export default router;
```

#### Register Route:
**File: `bds-api-node/src/routes/index.ts`**

Add this import:
```typescript
import authRoutes from './auth';
```

Add this route registration:
```typescript
app.use('/api/auth', authRoutes);
```

#### Install Dependencies:
```bash
cd bds-api-node
npm install bcrypt jsonwebtoken
npm install --save-dev @types/bcrypt @types/jsonwebtoken
```

---

### 2. Frontend Auth Integration

#### Update: `bds-frontend/src/lib/api.ts`

Add these methods to the ApiClient class:

```typescript
// Add after the constructor
async register(email: string, password: string, name: string) {
  return this.fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}

async login(email: string, password: string) {
  return this.fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

async getCurrentUser(token: string) {
  return this.fetch('/api/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

// Update fetch method to include auth token
private async fetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${this.baseUrl}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}
```

#### Update: `bds-frontend/src/app/login/page.tsx`

Replace the TODO section (lines 19-30):

```typescript
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setError('')
  setLoading(true)

  const formData = new FormData(e.currentTarget)
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const response = await api.login(email, password)

    // Store token and user data
    localStorage.setItem('authToken', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))

    router.push('/dashboard')
  } catch (error: any) {
    setError(error.message || 'Invalid email or password')
  } finally {
    setLoading(false)
  }
}
```

#### Update: `bds-frontend/src/app/register/page.tsx`

Replace the TODO section (lines 19-42):

```typescript
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setError('')
  setLoading(true)

  const formData = new FormData(e.currentTarget)
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    setError('Passwords do not match')
    setLoading(false)
    return
  }

  if (password.length < 8) {
    setError('Password must be at least 8 characters')
    setLoading(false)
    return
  }

  try {
    const response = await api.register(email, password, name)

    // Store token and user data
    localStorage.setItem('authToken', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))

    router.push('/dashboard')
  } catch (error: any) {
    setError(error.message || 'Registration failed')
  } finally {
    setLoading(false)
  }
}
```

---

## 🟡 **HIGH PRIORITY - Needed for Basic Functionality**

### 3. Stripe Payment Backend

**Priority:** 🟡 HIGH
**Time Estimate:** 2 hours

#### Install Stripe:
```bash
cd bds-api-node
npm install stripe
```

#### Where to Add:
```
bds-api-node/src/routes/
└── payments.ts (NEW FILE)
```

#### What to Add:

**File: `bds-api-node/src/routes/payments.ts`**
```typescript
import { Router } from 'express';
import Stripe from 'stripe';
import pool from '../db';
import { authenticateToken } from './auth';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// POST /api/payments/create-payment-intent
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.userId;

    // Get course details
    const courseResult = await pool.query(
      'SELECT id, title, price FROM courses WHERE id = $1',
      [courseId]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const course = courseResult.rows[0];

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        courseId: course.id,
        userId: userId,
        courseName: course.title,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: course.price,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// POST /api/payments/webhook - Stripe webhook
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Enroll user in course
    const { courseId, userId } = paymentIntent.metadata;

    await pool.query(
      'INSERT INTO enrollments (user_id, course_id, status, progress, enrolled_at) VALUES ($1, $2, $3, $4, NOW())',
      [userId, courseId, 'active', 0]
    );

    console.log('User enrolled after successful payment:', userId, courseId);
  }

  res.json({ received: true });
});

export default router;
```

#### Register Route:
**File: `bds-api-node/src/routes/index.ts`**

Add:
```typescript
import paymentRoutes from './payments';
app.use('/api/payments', paymentRoutes);
```

#### Environment Variables:
Add to `.env`:
```
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

#### Update Frontend Checkout:

**File: `bds-frontend/src/app/checkout/[courseId]/page.tsx`**

Replace lines 39-66 with:
```typescript
async function handlePayment(e: React.FormEvent) {
  e.preventDefault()
  setProcessing(true)

  try {
    // Create payment intent
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ courseId: params.courseId }),
    });

    const { clientSecret } = await response.json();

    // Load Stripe
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    // Confirm payment (using Stripe Elements - you'd need to set this up properly)
    // For now, this is a simplified version
    alert('Payment successful! Enrolling you in the course...');

    router.push(`/learn/${params.courseId}`);
  } catch (error: any) {
    alert('Payment failed: ' + error.message);
  } finally {
    setProcessing(false);
  }
}
```

Install Stripe frontend:
```bash
cd bds-frontend
npm install @stripe/stripe-js @stripe/react-stripe-js
```

---

### 4. Video Hosting Integration

**Priority:** 🟡 HIGH
**Time Estimate:** 1-2 hours

#### Option A: Vimeo (Recommended)

**Where to Add:**
```
bds-api-node/src/
└── vimeo-client.ts (NEW FILE)
```

**File: `bds-api-node/src/vimeo-client.ts`**
```typescript
import { Vimeo } from 'vimeo';

const client = new Vimeo(
  process.env.VIMEO_CLIENT_ID!,
  process.env.VIMEO_CLIENT_SECRET!,
  process.env.VIMEO_ACCESS_TOKEN!
);

export async function getVideoUrl(videoId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    client.request(
      {
        method: 'GET',
        path: `/videos/${videoId}`,
      },
      (error, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body.player_embed_url);
        }
      }
    );
  });
}

export default client;
```

Install:
```bash
cd bds-api-node
npm install vimeo
```

Add to `.env`:
```
VIMEO_CLIENT_ID=xxxxx
VIMEO_CLIENT_SECRET=xxxxx
VIMEO_ACCESS_TOKEN=xxxxx
```

#### Update Course Player:

**File: `bds-frontend/src/app/learn/[courseId]/page.tsx`**

Replace line 133-135 video player with:
```typescript
<iframe
  src={currentLesson.videoUrl}
  className="w-full h-full"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
/>
```

---

## 🟢 **MEDIUM PRIORITY - Nice to Have**

### 5. Email Notifications (SendGrid)

**Priority:** 🟢 MEDIUM
**Time Estimate:** 1 hour

#### Where to Add:
```
bds-api-node/src/
└── email-service.ts (NEW FILE)
```

**File: `bds-api-node/src/email-service.ts`**
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendWelcomeEmail(email: string, name: string) {
  const msg = {
    to: email,
    from: 'noreply@thebostondroneschool.org',
    subject: 'Welcome to The Boston Drone School!',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for joining The Boston Drone School. Start your drone training journey today!</p>
      <a href="https://learn.thebostondroneschool.org/courses">Browse Courses</a>
    `,
  };

  await sgMail.send(msg);
}

export async function sendEnrollmentEmail(email: string, courseName: string) {
  const msg = {
    to: email,
    from: 'noreply@thebostondroneschool.org',
    subject: `You're enrolled in ${courseName}!`,
    html: `
      <h1>Congratulations!</h1>
      <p>You're now enrolled in <strong>${courseName}</strong>.</p>
      <a href="https://learn.thebostondroneschool.org/dashboard">Go to Dashboard</a>
    `,
  };

  await sgMail.send(msg);
}

export async function sendCertificateEmail(email: string, courseName: string, certificateUrl: string) {
  const msg = {
    to: email,
    from: 'noreply@thebostondroneschool.org',
    subject: `Your ${courseName} Certificate is Ready!`,
    html: `
      <h1>Congratulations! 🎓</h1>
      <p>You've completed <strong>${courseName}</strong>!</p>
      <a href="${certificateUrl}">Download Certificate</a>
    `,
  };

  await sgMail.send(msg);
}
```

Install:
```bash
cd bds-api-node
npm install @sendgrid/mail
```

Add to `.env`:
```
SENDGRID_API_KEY=SG.xxxxx
```

Call these functions in your auth and enrollment routes.

---

### 6. Admin Course Create/Edit

**Priority:** 🟢 MEDIUM
**Time Estimate:** 2 hours

#### Where to Add:
```
bds-frontend/src/app/admin/
├── create-course/
│   └── page.tsx (NEW FILE)
└── edit-course/
    └── [id]/page.tsx (NEW FILE)
```

**File: `bds-frontend/src/app/admin/create-course/page.tsx`**
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function CreateCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Part 107',
    level: 'Beginner',
    duration: '',
    instructor: '',
    thumbnailUrl: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await api.createCourse({
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
      })

      alert('Course created successfully!')
      router.push('/admin')
    } catch (error: any) {
      alert('Failed to create course: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link href="/admin" className="text-blue-600 hover:underline">
            ← Back to Admin
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Course</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., FAA Part 107 Certification Prep"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what students will learn..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Part 107</option>
                  <option>Commercial</option>
                  <option>Photography</option>
                  <option>Racing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level *
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor *
              </label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? 'Creating...' : 'Create Course'}
              </button>
              <Link
                href="/admin"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
```

Update admin panel button (line 151 in admin/page.tsx):
```typescript
<Link href="/admin/create-course">
  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
    + Create New Course
  </button>
</Link>
```

---

## 🔵 **LOW PRIORITY - Future Enhancements**

### 7. Quiz System
- **Where:** `bds-frontend/src/app/learn/[courseId]/quiz/page.tsx`
- **Time:** 3-4 hours

### 8. Discussion Forums
- **Where:** `bds-frontend/src/app/courses/[id]/discussions/page.tsx`
- **Time:** 4-5 hours

### 9. Advanced Analytics
- **Where:** `bds-frontend/src/app/admin/analytics/page.tsx`
- **Time:** 3-4 hours

### 10. Mobile App (React Native)
- **Where:** New repo `bds-mobile/`
- **Time:** 2-3 weeks

---

## 📝 Summary of Files to Create

### Backend (bds-api-node/src/)
- ✅ `routes/auth.ts` - Authentication endpoints
- ✅ `routes/payments.ts` - Stripe integration
- ✅ `vimeo-client.ts` - Video hosting
- ✅ `email-service.ts` - Email notifications

### Frontend (bds-frontend/src/app/)
- ✅ `admin/create-course/page.tsx` - Course creation
- ✅ `admin/edit-course/[id]/page.tsx` - Course editing
- 🔵 `learn/[courseId]/quiz/page.tsx` - Quiz system
- 🔵 `courses/[id]/discussions/page.tsx` - Forums

### Configuration
- Update `.env` files with new API keys
- Install new npm packages

---

## 🚀 Implementation Order

**Week 1 - Critical Launch Features:**
1. Authentication Backend (Day 1-2)
2. Frontend Auth Integration (Day 2)
3. Stripe Payment Backend (Day 3-4)
4. Video Hosting (Day 5)

**Week 2 - Polish & Deploy:**
1. Email Notifications (Day 1)
2. Admin Course Management (Day 2-3)
3. Testing & Bug Fixes (Day 4-5)
4. Deploy to Render (Day 5)

**Future Sprints:**
- Quiz system
- Discussion forums
- Advanced analytics
- Mobile app

---

**Total Time Estimate:** 15-20 hours for critical features

Ready to start implementing? Begin with Authentication! 🔐
