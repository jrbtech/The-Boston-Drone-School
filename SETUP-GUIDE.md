# Boston Drone School E-Learning Platform - Installation Guide

## 🚀 Complete Installation & Setup

This guide will help you set up the complete Boston Drone School e-learning platform with AI integration.

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database access
- Anthropic API key from [console.anthropic.com](https://console.anthropic.com/)
- Stripe account for payments (optional)

## 🛠️ Installation Steps

### 1. Install Dependencies

```powershell
# Navigate to the project directory
cd "C:\Users\megan\Downloads\The-Boston-Drone-School"

# Install backend dependencies
cd bds-api-node
npm install

# Install frontend dependencies  
cd ../bds-frontend
npm install

# Install root CLI dependencies
cd ..
npm install
```

### 2. Environment Configuration

Create `.env` files in both directories:

**Root `.env`:**
```env
# Copy from .env.example and fill in your values
ANTHROPIC_API_KEY=your_anthropic_api_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/boston_drone_school
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. Database Setup

```powershell
# Run database migrations
./scripts/run_migrations.sh

# Or manually run each migration:
psql $DATABASE_URL -f migrations/001_create_users.sql
psql $DATABASE_URL -f migrations/002_create_courses.sql
# ... continue with all migration files
```

### 4. Start the Applications

**Option A: Development Mode**
```powershell
# Terminal 1: Start backend API
cd bds-api-node
npm run dev

# Terminal 2: Start frontend
cd bds-frontend  
npm run dev

# Terminal 3: Use Claude CLI
.\bds-claude.ps1 chat
```

**Option B: Production Mode**
```powershell
# Build and start backend
cd bds-api-node
npm run build
npm start

# Build and start frontend
cd bds-frontend
npm run build
npm start
```

## 🎯 Available Features

### 🖥️ Frontend (Port 3000)
- **Homepage**: Modern landing page with Boston Drone School branding
- **Course Catalog**: Browse and filter drone courses
- **Student Dashboard**: Track progress and access courses
- **Video Learning**: Stream course videos with progress tracking
- **Certificates**: Download completion certificates
- **AI Chat**: Get help from Claude AI assistant

### 🔧 Backend API (Port 3001)
- **Course Management**: `/api/courses`
- **Student Enrollment**: `/api/enrollment`  
- **AI Features**: `/api/ai`
- **Progress Tracking**: Detailed analytics
- **Certificate Generation**: Automated certificates

### 🤖 AI Features
- **Personalized Recommendations**: Course suggestions based on profile
- **Adaptive Learning Paths**: Customized study plans
- **Q&A Assistant**: Get answers to drone-related questions
- **Quiz Generation**: AI-generated assessments
- **Content Analysis**: Safety and compliance checking

## 🌐 Domain Integration

To integrate with `thebostondroneschool.org`:

1. **Subdomain Setup**: Point `learn.thebostondroneschool.org` to your frontend
2. **API Domain**: Point `api.thebostondroneschool.org` to your backend
3. **SSL Certificates**: Ensure HTTPS for both domains
4. **CORS Configuration**: Update allowed origins in backend

## 🚀 Deployment Options

### Render.com (Recommended)
```bash
# Deploy using the configured render.yaml
git push origin main
# Render will automatically deploy based on render.yaml
```

### Vercel (Frontend) + Railway (Backend)
```bash
# Frontend to Vercel
cd bds-frontend
vercel

# Backend to Railway  
cd bds-api-node
railway up
```

### Docker (Self-hosted)
```bash
# Build and run containers
docker-compose up -d
```

## 🔐 Security Configuration

1. **JWT Secrets**: Generate secure secrets
2. **API Keys**: Store in environment variables
3. **Database**: Use connection pooling and SSL
4. **CORS**: Restrict to your domains only
5. **Rate Limiting**: Implement API rate limits

## 📊 Monitoring & Analytics

- **Application Health**: `/api/health` endpoint
- **User Analytics**: Track course progress and engagement
- **Performance Monitoring**: Monitor response times
- **Error Logging**: Centralized error tracking

## 🎨 Customization

The platform uses the Boston Drone School color scheme:
- **Primary Blue**: #1E40AF
- **Secondary Orange**: #EA580C
- **Neutral Grays**: Various shades

All colors are defined in `design-tokens.json` and Tailwind config.

## 🆘 Troubleshooting

### Common Issues:

1. **Port Conflicts**: Change ports in package.json scripts
2. **Database Connection**: Verify DATABASE_URL format
3. **API Key Issues**: Check Anthropic console for key validity
4. **Build Errors**: Clear node_modules and reinstall

### Debug Commands:
```powershell
# Check API status
curl http://localhost:3001/api/health

# Test Claude integration
.\bds-claude.ps1 chat

# View logs
npm run logs
```

## 📞 Support

For technical support or questions:
- Email: info@thebostondroneschool.org  
- Documentation: This README and inline code comments
- AI Assistant: Use the built-in Claude chat for development help

## 🎉 Next Steps

1. **Content Creation**: Add your drone courses and lessons
2. **User Management**: Set up admin accounts
3. **Payment Integration**: Configure Stripe for course payments
4. **Custom Branding**: Adjust colors and content to match your brand
5. **Analytics Setup**: Implement user behavior tracking
6. **Mobile Optimization**: Test and optimize for mobile devices

Your Boston Drone School e-learning platform is now ready for students! 🚁✨