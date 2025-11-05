# Deploy Frontend to Render

## Quick Deploy (2 Minutes)

Your frontend code is ready! Just need to create the service on Render.

### Method 1: Use Render Blueprint (Recommended - Automatic)

1. Go to: https://dashboard.render.com/blueprints
2. Click **"New Blueprint Instance"**
3. Select repository: **`jrbtech/The-Boston-Drone-School`**
4. Service Group Name: **`boston-drone-school`**
5. Click **"Apply"**

Render will automatically create the frontend service from your `render.yaml` file!

### Method 2: Manual Deploy

1. Go to: https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Select repo: **`jrbtech/The-Boston-Drone-School`**
4. Configure:
   ```
   Name:               bds-frontend
   Region:             Oregon (US West)
   Branch:             main
   Root Directory:     bds-frontend
   Build Command:      npm ci && npm run build
   Start Command:      npm start
   ```

5. **Environment Variables** (auto-filled from render.yaml):
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://the-boston-drone-school.onrender.com
   NEXT_PUBLIC_SITE_URL=https://bds-frontend.onrender.com
   ```

6. Click **"Create Web Service"**

### After Deployment (3-5 minutes)

Your website will be live at: **https://bds-frontend.onrender.com**

You'll see:
- ✅ Beautiful homepage with blue/orange gradient
- ✅ Navigation menu
- ✅ "The Boston Drone School - Future Industry Optimization"
- ✅ Course catalog, login, dashboard pages

### Architecture

```
┌─────────────────────────────────────────┐
│  Frontend (Next.js)                     │
│  https://bds-frontend.onrender.com      │
│  - Homepage, courses, login, dashboard  │
└────────────────┬────────────────────────┘
                 │
                 │ API calls
                 ▼
┌─────────────────────────────────────────┐
│  Backend API (Node.js/Express)          │
│  https://the-boston-drone-school.       │
│            onrender.com                 │
│  - REST API, authentication, Claude AI  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  PostgreSQL Database                    │
│  - Users, courses, progress, certs      │
└─────────────────────────────────────────┘
```

### Verification

Once deployed, test:
1. Visit: https://bds-frontend.onrender.com
2. You should see the homepage (NOT JSON)
3. Click "Explore Courses"
4. Try logging in at /login

### Current Status
- ✅ Backend API: https://the-boston-drone-school.onrender.com (working)
- ✅ Database: PostgreSQL (connected)
- ⏳ Frontend: Waiting for deployment
