# Dual Domain Setup Guide
## Supporting Both thebostondroneschool.org AND bostondroneschool.org

This guide explains how to configure both domain variants to work with your Boston Drone School platform.

---

## Current Configuration Status

✅ **Backend CORS**: Both domains added to allowed origins
✅ **Frontend Image Optimization**: Both domains configured
✅ **Environment Variables**: Using NEXT_PUBLIC_SITE_URL for flexibility

---

## DNS Configuration Required

You need to configure DNS records for **BOTH** domains to point to your Render deployments.

### Option 1: Both Domains Point to Frontend (Recommended)

This setup allows users to access the site from either domain.

#### For thebostondroneschool.org:

```
Type: A
Name: @ (or blank)
Value: [Render IP Address]
TTL: 3600

Type: CNAME
Name: www
Value: bds-frontend.onrender.com
TTL: 3600
```

#### For bostondroneschool.org:

```
Type: A
Name: @ (or blank)
Value: [Render IP Address]
TTL: 3600

Type: CNAME
Name: www
Value: bds-frontend.onrender.com
TTL: 3600
```

### Option 2: Redirect One Domain to the Other

Set up bostondroneschool.org to redirect to thebostondroneschool.org (or vice versa).

**Primary Domain**: thebostondroneschool.org (configured as above)

**Secondary Domain** (bostondroneschool.org) with redirect:

```
Type: A
Name: @
Value: [Your redirect service IP or use URL forwarding]
HTTP Status: 301 (Permanent Redirect)
Destination: https://thebostondroneschool.org
```

---

## Render Custom Domain Setup

### Step 1: Add Custom Domains in Render Dashboard

1. Go to your Render dashboard
2. Select the **bds-frontend** service
3. Go to **Settings** → **Custom Domains**
4. Click **Add Custom Domain**
5. Add the following domains one by one:
   - `thebostondroneschool.org`
   - `www.thebostondroneschool.org`
   - `bostondroneschool.org`
   - `www.bostondroneschool.org`

### Step 2: Update DNS Records

After adding custom domains, Render will provide:
- An A record IP address
- CNAME instructions

Copy these values to your domain registrar's DNS settings for **both domains**.

### Step 3: Wait for SSL Certificate

Render automatically provisions SSL certificates via Let's Encrypt. This takes 5-15 minutes after DNS propagation.

---

## Environment Variables Update

### Backend (already configured)

The backend API now accepts requests from both domains:

```bash
CORS_ORIGIN=https://bds-frontend.onrender.com,https://learn.thebostondroneschool.org,https://thebostondroneschool.org,https://bostondroneschool.org,https://www.thebostondroneschool.org,https://www.bostondroneschool.org,http://localhost:3000
```

### Frontend

Update the environment variable in Render dashboard for **bds-frontend**:

**If using thebostondroneschool.org as primary:**
```
NEXT_PUBLIC_SITE_URL=https://thebostondroneschool.org
NEXT_PUBLIC_API_URL=https://bds-backend-5ao0.onrender.com
```

**If using bostondroneschool.org as primary:**
```
NEXT_PUBLIC_SITE_URL=https://bostondroneschool.org
NEXT_PUBLIC_API_URL=https://bds-backend-5ao0.onrender.com
```

---

## Verification Steps

After DNS propagation (can take 24-48 hours):

### 1. Check Domain Resolution
```bash
nslookup thebostondroneschool.org
nslookup bostondroneschool.org
```

Both should resolve to the same IP address.

### 2. Test HTTPS Access
```bash
curl -I https://thebostondroneschool.org
curl -I https://bostondroneschool.org
```

Both should return HTTP 200 with valid SSL certificates.

### 3. Test API CORS
```bash
curl -H "Origin: https://thebostondroneschool.org" -I https://bds-backend-5ao0.onrender.com/api/health
curl -H "Origin: https://bostondroneschool.org" -I https://bds-backend-5ao0.onrender.com/api/health
```

Both should return `Access-Control-Allow-Origin` header.

### 4. Browser Testing

Visit both URLs:
- https://thebostondroneschool.org
- https://bostondroneschool.org
- https://www.thebostondroneschool.org
- https://www.bostondroneschool.org

All should load the site successfully.

---

## SEO Considerations

### Option A: Use Canonical URLs (Recommended)

Keep both domains active but specify a canonical URL to avoid duplicate content penalties.

The site already includes canonical tags in the metadata. Set `NEXT_PUBLIC_SITE_URL` to your preferred domain.

### Option B: 301 Redirect Secondary Domain

Set up bostondroneschool.org to permanently redirect to thebostondroneschool.org. This consolidates SEO value to one domain.

---

## Email Configuration

Your email addresses should work with both domains:

- info@thebostondroneschool.org (already configured)
- info@bostondroneschool.org (set up forwarding or separate inbox)

Current email configuration:
```
RESEND_FROM_EMAIL=info@bostondroneschool.org
ADMIN_EMAIL=info@thebostondroneschool.org
```

Consider using the shorter domain (bostondroneschool.org) for email consistency.

---

## Troubleshooting

### Domain Not Resolving

**Issue**: Users can't access one or both domains
**Solution**:
- Check DNS propagation: https://dnschecker.org
- Verify A/CNAME records in registrar dashboard
- Wait up to 48 hours for full propagation

### SSL Certificate Error

**Issue**: "Your connection is not private" warning
**Solution**:
- Wait 15 minutes after DNS propagation for Render to issue SSL
- Check Render dashboard for certificate status
- Re-add custom domain if certificate fails

### CORS Errors

**Issue**: API requests blocked by CORS policy
**Solution**:
- Verify domain is in CORS_ORIGIN environment variable
- Restart backend service after updating env vars
- Check browser console for exact CORS error

### Images Not Loading

**Issue**: Images from custom domain not displaying
**Solution**:
- Verify domain added to `next.config.js` remotePatterns
- Rebuild and redeploy frontend after config changes

---

## Files Modified

The following files have been updated to support both domains:

1. ✅ `render.yaml` - Added both domains to CORS configuration
2. ✅ `bds-frontend/next.config.js` - Added bostondroneschool.org to image remote patterns

No code changes required - configuration is environment-driven.

---

## DNS Provider Instructions

### GoDaddy
1. Log in to GoDaddy DNS Manager
2. Select domain → Manage DNS
3. Add A and CNAME records as specified above
4. Save changes (propagation: 1-48 hours)

### Namecheap
1. Log in to Namecheap Dashboard
2. Domain List → Manage → Advanced DNS
3. Add records as specified
4. Save (propagation: 30 minutes - 48 hours)

### Cloudflare
1. Add both domains to Cloudflare
2. Update nameservers at registrar
3. Add DNS records in Cloudflare dashboard
4. Enable "Proxied" for CDN benefits
5. Propagation: Usually within minutes

---

## Recommended Setup

**Best Practice for Production:**

1. **Primary Domain**: thebostondroneschool.org
2. **Secondary Domain**: bostondroneschool.org (301 redirect to primary)
3. **Learning Subdomain**: learn.thebostondroneschool.org (points to frontend)
4. **API Subdomain**: api.thebostondroneschool.org (points to backend)

This gives you:
- Clear branding hierarchy
- SEO consolidation
- Professional subdomain structure
- Both domains functional

---

## Support

If you need help with DNS configuration:
- Your domain registrar's support team can assist with DNS records
- Render documentation: https://render.com/docs/custom-domains
- DNS propagation checker: https://dnschecker.org

Both domains are now fully supported by the application configuration!
