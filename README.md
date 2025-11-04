# The Boston Drone School - E-Learning Platform

> Professional drone training and certification platform with AI-powered learning assistance

[![Deployment Status](https://img.shields.io/badge/deployment-ready-green.svg)](https://render.com)
[![Node.js](https://img.shields.io/badge/node.js-18+-brightgreen.svg)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/next.js-14-black.svg)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/postgresql-14+-blue.svg)](https://postgresql.org)

## 🚀 Overview

A modern, full-stack e-learning platform built for **The Boston Drone School** (https://thebostondroneschool.org/). The platform provides comprehensive drone training courses, certifications, and workforce development programs in partnership with NASA and the Massachusetts Registered Apprenticeship Program.

### Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, TailwindCSS, Stripe
- **Backend:** Node.js, Express, TypeScript, PostgreSQL
- **AI:** Claude AI (Anthropic) for personalized learning
- **Deployment:** Render.com (Docker support included)

## ✨ Features

### 🎓 For Students
- Course catalog with advanced filtering
- Secure authentication (Email + OAuth)
- Interactive video course player
- AI learning assistant (powered by Claude)
- Progress tracking dashboard
- Automated certificate generation
- Stripe payment integration
- Mobile responsive design

### 👨‍🏫 For Admins
- Course management panel
- Student analytics
- Content management
- Certificate issuance
- Revenue tracking

### 🤖 AI Features
- Personalized course recommendations
- Adaptive learning paths
- Real-time student assistance
- Automated quiz generation

## 📁 Project Structure

```
The-Boston-Drone-School/
├── bds-frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/              # App router pages
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── courses/      # Course catalog & details
│   │   │   ├── learn/        # Course player
│   │   │   ├── dashboard/    # Student dashboard
│   │   │   ├── login/        # Authentication
│   │   │   ├── checkout/     # Payment flow
│   │   │   └── admin/        # Admin panel
│   │   └── lib/             # API client & utilities
│   └── package.json
│
├── bds-api-node/             # Node.js backend
│   ├── src/
│   │   ├── index.ts         # Server entry point
│   │   ├── routes/          # API routes
│   │   └── anthropic-client.ts
│   ├── migrations/          # Database migrations
│   └── package.json
│
└── render.yaml              # Render deployment config
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Anthropic API key

### 1. Backend Setup

```bash
cd bds-api-node
npm install
cp .env.example .env
# Edit .env with your credentials
npm run migrate
npm run dev
```

Backend runs on http://localhost:3001

### 2. Frontend Setup

```bash
cd bds-frontend
npm install
cp .env.example .env.local
# Edit .env.local
npm run dev
```

Frontend runs on http://localhost:3000

## 🚢 Deployment to Render

1. Create PostgreSQL database in Render
2. Create backend service with env vars:
   ```
   NODE_ENV=production
   DATABASE_URL=[auto-populated]
   ANTHROPIC_API_KEY=[your key]
   JWT_SECRET=[generate with: openssl rand -base64 32]
   ```
3. Create frontend service with env vars:
   ```
   NEXT_PUBLIC_API_URL=https://api.thebostondroneschool.org
   NEXT_PUBLIC_SITE_URL=https://learn.thebostondroneschool.org
   ```
4. Push to GitHub - automatic deployment via `render.yaml`

See `DEPLOYMENT_FIXED.md` for detailed deployment guide.

## 🎯 API Endpoints

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses/:id` - Course details
- `POST /api/courses` - Create course (admin)

### Enrollment
- `POST /api/enrollment/enroll` - Enroll in course
- `GET /api/enrollment/user/:userId` - User enrollments
- `PUT /api/enrollment/:id/progress` - Update progress
- `POST /api/enrollment/:id/certificate` - Generate certificate

### AI Features
- `POST /api/ai/chat` - AI assistant
- `POST /api/ai/recommendations` - Course recommendations
- `POST /api/ai/assistance` - Learning help

## 🗄️ Database Schema

```sql
users (id, email, name, role)
courses (id, title, description, price, category, level)
enrollments (userId, courseId, progress, status)
certificates (enrollmentId, certificateUrl)
```

## 🔒 Security

- JWT authentication
- Password hashing (bcrypt)
- SQL injection protection
- CORS configuration
- Rate limiting
- Environment variable protection

## 📱 Mobile Responsive

Optimized for all screen sizes:
- Desktop (1920px+)
- Laptop (1280px-1919px)
- Tablet (768px-1279px)
- Mobile (320px-767px)

## 🎨 Branding

**Colors:**
- Primary Blue: `#2563EB`
- Orange: `#EA580C`
- Dark: `#1F2937`

## 📄 License

Copyright © 2025 The Boston Drone School - All Rights Reserved

## 🤝 Partnerships

- 🚀 NASA
- 📚 Massachusetts Registered Apprenticeship Program

## 📞 Support

- Website: https://thebostondroneschool.org
- Email: info@thebostondroneschool.org
- Location: Boston, Massachusetts

---

**Built with ❤️ for The Boston Drone School**

*Empowering the future workforce through drone technology education*