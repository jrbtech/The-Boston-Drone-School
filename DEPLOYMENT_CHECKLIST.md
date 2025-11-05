# 🚀 Deployment Checklist - Boston Drone School

## ✅ Pre-Deployment (Completed)

- [x] All security vulnerabilities fixed
- [x] JWT secret fallback removed
- [x] Authentication added to all sensitive endpoints
- [x] Database migrations created and tested
- [x] Stripe webhook fixed
- [x] Frontend auth context implemented
- [x] Mock data replaced with database queries
- [x] Both services build successfully
- [x] Changes committed to git

## 📋 Deploy to Production

### Step 1: Push to GitHub
```bash
git push origin main
```

### Step 2: Set Environment Variables in Render

#### Backend Service (bds-api-node)
Go to: https://dashboard.render.com → bds-api-node → Environment

**REQUIRED:**
```
JWT_SECRET=<generate-with-command-below>
DATABASE_URL=<should-already-be-set>
```

**Generate JWT_SECRET:**
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32|%{Get-Random -Max 256}|%{[byte]$_}))
```

**OPTIONAL (but recommended):**
```
STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
STRIPE_WEBHOOK_SECRET=whsec_...
ANTHROPIC_API_KEY=sk-ant-...
```

#### Frontend Service (bds-frontend)
Go to: https://dashboard.render.com → bds-frontend → Environment

**Should already be set:**
```
NEXT_PUBLIC_API_URL=https://bds-api-node.onrender.com
NEXT_PUBLIC_SITE_URL=https://bds-frontend.onrender.com
NODE_ENV=production
```

### Step 3: Verify Deployment

1. **Wait for builds to complete**
   - Both services should rebuild automatically
   - Check logs for "Migrations complete"

2. **Test authentication flow:**
   ```
   1. Visit frontend URL
   2. Click "Register"
   3. Create a test account
   4. Verify redirect to dashboard
   5. Logout
   6. Login again
   ```

3. **Test course enrollment:**
   ```
   1. Browse courses
   2. Click on a course
   3. Click "Enroll"
   4. Verify enrollment successful
   5. Access course content
   ```

4. **Check backend health:**
   ```
   Visit: https://bds-api-node.onrender.com/api/health
   Should see: {"status":"healthy",...}
   ```

## 🔍 Troubleshooting

### Backend won't start
```
Error: JWT_SECRET environment variable is required
→ Set JWT_SECRET in Render dashboard
```

### Migration errors
```
Check logs for specific error
Migrations run automatically on npm start
Can manually run: npm run migrate
```

### Frontend auth not working
```
1. Check NEXT_PUBLIC_API_URL is correct
2. Verify backend is running
3. Check browser console for errors
4. Verify JWT_SECRET is set in backend
```

### Courses showing empty
```
1. Check migration logs - migrations ran?
2. Verify DATABASE_URL is set
3. Check API endpoint: GET /api/courses
```

## 📊 Post-Deployment Verification

### Backend Endpoints to Test
```bash
# Health check
curl https://bds-api-node.onrender.com/api/health

# Courses (should return 3 courses)
curl https://bds-api-node.onrender.com/api/courses

# Auth (should require token)
curl https://bds-api-node.onrender.com/api/enrollment/user \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Database Verification
```sql
-- Connect to database and verify:
SELECT COUNT(*) FROM courses; -- Should be 3
SELECT COUNT(*) FROM course_modules; -- Should be 10
SELECT * FROM schema_migrations; -- Should show 2 migrations
```

## 🎯 Next Steps After Deployment

1. **Create Admin User** (if needed)
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```

2. **Configure Stripe Webhooks** (if accepting payments)
   ```
   Stripe Dashboard → Webhooks → Add endpoint
   URL: https://bds-api-node.onrender.com/api/payments/webhook
   Events: payment_intent.succeeded, payment_intent.payment_failed
   ```

3. **Test Payment Flow**
   ```
   1. Add STRIPE_SECRET_KEY to backend
   2. Create payment intent for a course
   3. Use Stripe test card: 4242 4242 4242 4242
   4. Verify enrollment created via webhook
   ```

4. **Monitor**
   ```
   - Check Render logs regularly
   - Monitor error rates
   - Test critical flows daily
   ```

## 🆘 Support

**Logs:**
- Backend: https://dashboard.render.com → bds-api-node → Logs
- Frontend: https://dashboard.render.com → bds-frontend → Logs

**Documentation:**
- Security fixes: See SECURITY_FIXES.md
- API details: See bds-api-node/README.md
- Frontend setup: See bds-frontend/README.md

---

**Status**: ✅ Ready for Production Deployment

**Last Updated**: 2025-01-05

**All Security Issues**: RESOLVED ✅
