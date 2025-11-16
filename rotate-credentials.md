# Credential Rotation Guide - Step by Step

## ⚠️ CRITICAL: These credentials were exposed on GitHub

Your database password and Resend API key were committed to GitHub and are visible in git history. You **must** rotate them immediately.

---

## Step 1: Rotate Database Password (5 minutes)

### On Render Dashboard:

1. **Go to Render:** https://dashboard.render.com/

2. **Find your database:**
   - Click on "PostgreSQL" in the left sidebar
   - Click on your database: `boston_drone_school`

3. **Reset the password:**
   - Go to "Info" tab
   - Click "Reset Database Password"
   - Copy the NEW `Internal Database URL`

4. **Update Backend Service:**
   - Go to "Web Services"
   - Click on `bds-backend-5ao0` (your backend)
   - Go to "Environment" tab
   - Find `DATABASE_URL`
   - Click "Edit"
   - Paste the NEW database URL
   - Click "Save Changes"
   - **Backend will auto-redeploy**

### Update Local Environment:

1. Open `bds-api-node/.env` in your editor
2. Replace the `DATABASE_URL` line with the new URL
3. Save the file
4. **DO NOT commit this file!**

### Restart Local Server:

```bash
# Kill the current server
npx kill-port 8000

# Start fresh
cd bds-api-node
npm run dev
```

---

## Step 2: Rotate Resend API Key (3 minutes)

### On Resend Dashboard:

1. **Go to Resend:** https://resend.com/api-keys

2. **Delete the old key:**
   - Find key starting with: `re_4iF6aZfV...`
   - Click the trash icon
   - Confirm deletion

3. **Create new key:**
   - Click "Create API Key"
   - Name it: "Boston Drone School - Production"
   - Permissions: "Sending access"
   - Click "Add"
   - **Copy the new API key immediately** (you won't see it again!)

### Update Render Backend:

1. Go back to Render dashboard
2. Click on `bds-backend-5ao0`
3. Go to "Environment" tab
4. Find `RESEND_API_KEY`
5. Click "Edit"
6. Paste the NEW API key
7. Click "Save Changes"
8. **Backend will auto-redeploy**

### Update Local Environment:

1. Open `bds-api-node/.env`
2. Replace `RESEND_API_KEY` with the new key
3. Save the file
4. **DO NOT commit this file!**

---

## Step 3: Verify Everything Works

### Test Backend is Running:

```bash
# Check health endpoint
curl https://bds-backend-5ao0.onrender.com/health
```

Should return: `{"status":"healthy"}`

### Test Database Connection:

```bash
cd bds-api-node
node scripts/check-enrollment.js
```

Should show your enrollment data without errors.

### Test Email Sending:

```bash
cd ..
node test-course-enrollment.js
```

Should send test emails successfully.

---

## Step 4: Clean Local Files (Optional but Recommended)

Delete any remaining test files with old credentials:

```bash
# From project root
rm -f test-*.js
rm -f grant-course-access.js
rm -f enroll-user-db.js
rm -f enroll-megan.sql
```

These were for testing and contain old credentials.

---

## Verification Checklist

Check off each item after completing:

- [ ] Database password rotated on Render
- [ ] `DATABASE_URL` updated on Render backend
- [ ] `DATABASE_URL` updated in local `bds-api-node/.env`
- [ ] Old Resend API key deleted
- [ ] New Resend API key created
- [ ] `RESEND_API_KEY` updated on Render backend
- [ ] `RESEND_API_KEY` updated in local `bds-api-node/.env`
- [ ] Backend deployed successfully on Render
- [ ] Local server restarts without errors
- [ ] Health check passes
- [ ] Database connection works
- [ ] Email sending works

---

## What If Something Breaks?

### Backend won't start on Render:

1. Check "Logs" tab for errors
2. Most common issue: typo in environment variable
3. Double-check `DATABASE_URL` is complete and correct

### Local server can't connect to database:

1. Make sure you copied the **Internal** database URL
2. Check for extra spaces in `.env` file
3. Database URL should start with: `postgresql://`

### Emails not sending:

1. Check Resend dashboard for error logs
2. Make sure new API key has "Sending access"
3. Verify `RESEND_FROM_EMAIL` is still set to: `info@bostondroneschool.org`

---

## After Rotation

Your credentials are now secure! 🎉

**Remember:**
- ✅ `.env` files are in `.gitignore` (never commit them)
- ✅ Test files with credentials are blocked from git
- ✅ Old credentials are revoked and useless
- ✅ New credentials are only in environment variables

**Going forward:**
- Always use environment variables for secrets
- Never hardcode API keys in source code
- Review `git diff --staged` before committing
- Keep `.env.example` updated (without real values)

---

## Need Help?

If you run into issues:
1. Check Render logs for specific error messages
2. Verify environment variables are set correctly
3. Make sure there are no typos or extra spaces
4. Test each service independently (database, email, backend)

Let me know if you need assistance with any step!
