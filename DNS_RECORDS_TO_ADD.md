# DNS Records for thebostondroneschool.org - Resend Email Setup

## Instructions
Add these records to your domain registrar (where you manage bostondroneschool.org DNS).

---

## 1. Domain Verification (DKIM) - REQUIRED ✅

**Type:** TXT
**Host/Name:** `resend._domainkey`
**Value/Content:**
```
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDX9sOJ5zOesb5YyUUJVMuUyECm3FMe4vND9c3AU/pqdSM94UJGNeHs0Zr+TTLqu6MoM3cdEsO/7gzSq5zkuvEIWTRzsInEToJmg8YLi6cOUpK+wDN6ymRIm4WrGx2w+H4JxuvDQ7i2UlT2Yyj9UwCfWJXHhPWKO7GiZFZZ+hce6QIDAQAB
```
**TTL:** Automatic (or 3600)
**Priority:** (leave blank)

⚠️ **IMPORTANT:** Copy this value exactly as shown - NO spaces or line breaks!

---

## 2. Enable Sending - MX Record

**Type:** MX
**Host/Name:** `send`
**Value/Content:** `feedback-smtp.us-east-1.amazonses.com`
**TTL:** Automatic (or 3600)
**Priority:** 10

---

## 3. Enable Sending - SPF Record

**Type:** TXT
**Host/Name:** `send`
**Value/Content:**
```
v=spf1 include:amazonses.com ~all
```
**TTL:** Automatic (or 3600)
**Priority:** (leave blank)

---

## 4. Enable Sending - DMARC (Optional but Recommended)

**Type:** TXT
**Host/Name:** `_dmarc`
**Value/Content:**
```
v=DMARC1; p=none;
```
**TTL:** Automatic (or 3600)
**Priority:** (leave blank)

---

## 5. Enable Receiving - MX Record (Optional - only if you want to receive emails)

**Type:** MX
**Host/Name:** `@`
**Value/Content:** `inbound-smtp.us-east-1.amazonaws.com`
**TTL:** Automatic (or 3600)
**Priority:** 10

⚠️ **Warning:** Only add this if you want Resend to handle incoming emails to your domain.

---

## Step-by-Step Guide

### Step 1: Log into your domain registrar
Where did you buy `thebostondroneschool.org`? Common providers:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- etc.

### Step 2: Find DNS Management
Look for:
- "DNS Settings"
- "Manage DNS"
- "DNS Management"
- "Advanced DNS"

### Step 3: Add Each Record

For **each record above**, click "Add Record" or "Add New Record" and enter:
1. Record Type (TXT or MX)
2. Host/Name
3. Value/Content
4. TTL (use Auto or 3600)
5. Priority (for MX records only)

### Step 4: Remove Old Records (if any)

If you have old `resend._domainkey` records from your previous attempt, **delete them first** before adding the new one.

### Step 5: Save and Wait

- Save all DNS changes
- Wait 5-10 minutes for propagation
- Go to Resend dashboard and click "Verify Domain"

---

## Quick Verification Checklist

After adding records, check:

- [ ] `resend._domainkey` TXT record added (exact value, no spaces)
- [ ] `send` MX record added (priority 10)
- [ ] `send` TXT record added (SPF)
- [ ] `_dmarc` TXT record added (optional)
- [ ] Saved all changes
- [ ] Waited 5-10 minutes
- [ ] Clicked "Verify Domain" in Resend dashboard

---

## Verify DNS Propagation

After 5-10 minutes, check if your records are live:

**Check DKIM:**
```bash
nslookup -type=TXT resend._domainkey.thebostondroneschool.org
```

**Check SPF:**
```bash
nslookup -type=TXT send.thebostondroneschool.org
```

**Online Tool:** https://dnschecker.org

---

## Common Issues

### "Record already exists"
**Fix:** Delete the old record first, then add the new one.

### "Invalid value"
**Fix:** Make sure there are NO spaces or line breaks in the TXT record value. It should be one continuous string.

### "Verification failed"
**Fix:**
1. Wait 10-15 minutes (DNS can be slow)
2. Check record was added exactly as shown
3. Use dnschecker.org to verify propagation

---

## After Verification

Once domain is verified in Resend:

1. Update your `.env` file:
```env
RESEND_FROM_EMAIL=orders@thebostondroneschool.org
# or
RESEND_FROM_EMAIL=noreply@thebostondroneschool.org
```

2. Restart backend:
```bash
cd bds-api-node
npm start
```

3. Test by placing an order on your website!

---

**Last Updated:** November 15, 2025
