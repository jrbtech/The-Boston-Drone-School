# 🚀 Render Deployment Guide - The Boston Drone School

## ✅ Status: READY TO DEPLOY

All code has been tested, built successfully, and pushed to GitHub. You can now deploy to Render.com!

---

## 📋 Pre-Deployment Checklist

- [x] Backend builds successfully (TypeScript)
- [x] Frontend builds successfully (Next.js)
- [x] Authentication system implemented
- [x] Payment integration ready (Stripe)
- [x] Video hosting configured (YouTube/Vimeo support)
- [x] Database migrations created
- [x] Environment variables documented
- [x] Code pushed to GitHub
- [ ] Render services created (see steps below)
- [ ] Environment variables set in Render
- [ ] Database connected
- [ ] Services deployed

---

## 🎯 Deployment Steps

### **Step 1: Create PostgreSQL Database**

1. Log in to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure database:
   - **Name**: `bds-postgres`
   - **Database**: `boston_drone_school`
   - **User**: `bds_admin` (or let Render auto-generate)
   - **Region**: Choose closest to your users
   - **Plan**: **Starter** ($7/month) or **Free** (expires in 90 days)
4. Click **"Create Database"**
5. Wait for database to provision (2-3 minutes)
6. **Important**: Copy the **Internal Database URL** for use in backend service

---

### **Step 2: Create Backend Service (bds-api-node)**

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `jrbtech/The-Boston-Drone-School`
3. Configure service:
   - **Name**: `bds-api-node`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `bds-api-node`
   - **Runtime**: **Node**
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Starter** ($7/month) or **Free**

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable" for each:

   ```env
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=<generate-a-32+-character-random-string>
   ANTHROPIC_API_KEY=<your-anthropic-api-key-from-console.anthropic.com>
   CORS_ORIGIN=https://learn.thebostondroneschool.org,https://thebostondroneschool.org
   ```

   **Link Database**:
   - Click "Add Environment Variable"
   - **Key**: `DATABASE_URL`
   - **Value**: Choose "From Database" → Select `bds-postgres`

   **Optional (for Stripe payments)**:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_stripe_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

5. Configure **Health Check**:
   - Path: `/api/health`
   - This ensures Render monitors your service

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes first time)
8. **Copy your backend URL**: `https://bds-api-node.onrender.com`

---

### **Step 3: Create Frontend Service (bds-frontend)**

1. Click **"New +"** → **"Web Service"**
2. Select repository: `jrbtech/The-Boston-Drone-School`
3. Configure service:
   - **Name**: `bds-frontend`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `bds-frontend`
   - **Runtime**: **Node**
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Starter** ($7/month) or **Free**

4. **Add Environment Variables**:
   ```env
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://bds-api-node.onrender.com
   NEXT_PUBLIC_SITE_URL=https://bds-frontend.onrender.com
   ```

   **Optional (for Stripe on frontend)**:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

5. Click **"Create Web Service"**
6. Wait for deployment (8-12 minutes first time)
7. **Copy your frontend URL**: `https://bds-frontend.onrender.com`

---

### **Step 4: Update CORS Settings**

After frontend deploys, update backend environment variable:

1. Go to backend service (`bds-api-node`)
2. Click "Environment"
3. Update `CORS_ORIGIN`:
   ```
   https://bds-frontend.onrender.com,https://learn.thebostondroneschool.org
   ```
4. Service will auto-redeploy

---

### **Step 5: Configure Custom Domains (Optional)**

#### Backend Domain (api.thebostondroneschool.org)
1. In `bds-api-node` service → **Settings** → **Custom Domains**
2. Click **"Add Custom Domain"**
3. Enter: `api.thebostondroneschool.org`
4. Copy the CNAME record
5. Add to your DNS provider (e.g., Cloudflare, GoDaddy):
   - **Type**: CNAME
   - **Name**: `api`
   - **Target**: `bds-api-node.onrender.com`
   - **Proxy**: Disabled (DNS only)
6. Wait for DNS propagation (5-60 minutes)

#### Frontend Domain (learn.thebostondroneschool.org)
1. In `bds-frontend` service → **Settings** → **Custom Domains**
2. Click **"Add Custom Domain"**
3. Enter: `learn.thebostondroneschool.org`
4. Copy the CNAME record
5. Add to DNS:
   - **Type**: CNAME
   - **Name**: `learn`
   - **Target**: `bds-frontend.onrender.com`
6. Wait for DNS propagation

#### Update Environment Variables with Custom Domains
Once domains are active:

**Backend**:
```env
CORS_ORIGIN=https://learn.thebostondroneschool.org,https://thebostondroneschool.org
```

**Frontend**:
```env
NEXT_PUBLIC_API_URL=https://api.thebostondroneschool.org
NEXT_PUBLIC_SITE_URL=https://learn.thebostondroneschool.org
```

---

## 🧪 Post-Deployment Testing

### 1. **Test Backend Health**
```bash
curl https://bds-api-node.onrender.com/api/health
```
Expected response:
```json
{"status":"healthy","timestamp":"...","uptime":123}
```

### 2. **Test Frontend**
Visit: `https://bds-frontend.onrender.com`

Expected: Homepage loads with hero section

### 3. **Test Full Flow**
1. ✅ Homepage loads
2. ✅ Click "Browse Courses"
3. ✅ Click "Register" → Create account
4. ✅ Login with new account
5. ✅ Go to Dashboard
6. ✅ Enroll in a course (payment demo mode)
7. ✅ Access course player
8. ✅ Test AI assistant in course
9. ✅ Mark lesson complete
10. ✅ Check progress tracking

---

## 🔧 Environment Variable Reference

### Backend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `10000` |
| `DATABASE_URL` | PostgreSQL connection | Auto from Render |
| `JWT_SECRET` | JWT signing secret | 32+ char random string |
| `ANTHROPIC_API_KEY` | Claude AI key | `sk-ant-api03-...` |
| `CORS_ORIGIN` | Allowed origins | `https://learn.domain.com` |

### Backend Optional Variables

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhooks |
| `VIMEO_ACCESS_TOKEN` | Vimeo videos |
| `SENDGRID_API_KEY` | Email notifications |

### Frontend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.domain.com` |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL | `https://learn.domain.com` |

### Frontend Optional Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe payments |

---

## 📊 Service Monitoring

### Render Dashboard
- View logs: Service → "Logs" tab
- Check metrics: Service → "Metrics" tab
- Restart service: Service → "Manual Deploy" → "Clear build cache & deploy"

### Common Issues

**Issue**: Backend won't start
- **Solution**: Check DATABASE_URL is set and database is running
- **Check logs**: Look for migration errors

**Issue**: Frontend can't connect to API
- **Solution**: Verify NEXT_PUBLIC_API_URL matches backend URL
- **Check CORS**: Ensure frontend URL is in backend CORS_ORIGIN

**Issue**: Database connection failed
- **Solution**: Ensure database is in same region or use external URL
- **Check**: Database status in Render dashboard

**Issue**: "Module not found" errors
- **Solution**: Clear build cache and redeploy
- **Verify**: package.json has all dependencies

---

## 💰 Cost Estimate (Monthly)

### Free Tier
- Backend: Free ($0)
- Frontend: Free ($0)
- Database: Free ($0) - *90 days then $7/mo*
- **Total**: $0/month (first 90 days), then $7/month

### Starter Tier (Recommended)
- Backend: $7/month
- Frontend: $7/month
- Database: $7/month
- **Total**: $21/month

### Pro Tier (Production)
- Backend: $25/month
- Frontend: $25/month
- Database: $20/month
- **Total**: $70/month

---

## 🎉 Success Indicators

You've successfully deployed when:

- [ ] Backend health check returns HTTP 200
- [ ] Frontend homepage loads without errors
- [ ] User can register and login
- [ ] User can browse courses
- [ ] User can enroll in a course
- [ ] Course player loads and plays videos
- [ ] AI assistant responds in course player
- [ ] Dashboard shows enrolled courses
- [ ] Admin panel loads (for admin users)

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **Stripe Docs**: https://stripe.com/docs
- **Anthropic Docs**: https://docs.anthropic.com
- **Next.js Docs**: https://nextjs.org/docs

---

## 🔄 Updating Your Deployment

To deploy updates:

1. Make code changes locally
2. Test locally (`npm run dev`)
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
4. Render auto-deploys from GitHub (if auto-deploy enabled)
5. Or manually deploy from Render dashboard

---

## 🎯 Next Steps After Deployment

1. **Add Real Course Content**
   - Use admin panel to create courses
   - Upload videos to YouTube/Vimeo
   - Add course descriptions and curriculum

2. **Set Up Stripe Payments**
   - Create Stripe account
   - Add webhook endpoint: `https://api.yourdomain.com/api/payments/webhook`
   - Test payment flow

3. **Configure Email Notifications**
   - Sign up for SendGrid
   - Add SENDGRID_API_KEY to backend
   - Test welcome/enrollment emails

4. **Add Analytics**
   - Google Analytics for frontend
   - Monitor enrollment trends
   - Track student progress

5. **Security Hardening**
   - Enable rate limiting
   - Add HTTPS enforcement
   - Implement CSRF protection
   - Set up monitoring alerts

---

**🎓 Your Boston Drone School e-learning platform is ready to empower students!**

*Built with Next.js 14, Express, PostgreSQL, and Claude AI*
*Deployed with ❤️ on Render*
