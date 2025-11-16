# 2-MINUTE SECURITY FIX

I've secured the repository. You just need to click a few buttons:

## Action 1: Database Password (60 seconds)

1. Open: https://dashboard.render.com/d/dpg-d44iulkhg0os73cihtr0
2. Click "Reset Database Password" button
3. Copy the new URL that appears
4. Click on "bds-backend-5ao0" service
5. Click "Environment" tab
6. Find DATABASE_URL → Click Edit
7. Paste new URL → Click Save

✅ Done! Backend auto-redeploys.

## Action 2: Resend API Key (60 seconds)

1. Open: https://resend.com/api-keys
2. Delete the exposed key (if still present)
3. Click "Create API Key"
4. Copy the new key
5. Back to Render → bds-backend-5ao0
6. Environment tab → Find RESEND_API_KEY
7. Click Edit → Paste new key → Save

✅ Done! That's it!

## Update Local Files (optional)

If you run the backend locally, update `bds-api-node/.env` with the new values.

---

Everything else is already fixed in the repository!
