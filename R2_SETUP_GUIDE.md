# Cloudflare R2 Setup Guide for Boston Drone School

## 🎯 Summary
Your file upload system is **100% complete** and ready! You just need to add 4 environment variables to make it work.

## ✅ What's Already Done
- ✅ Database tables created (`course_materials`, `faa_materials`)
- ✅ R2 storage service implemented
- ✅ Upload API endpoints created (`/api/upload/course-material/:courseId`, `/api/upload/faa-material`)
- ✅ Admin file upload interface built
- ✅ File type validation and 100MB size limits
- ✅ Authentication and admin-only access

## 🔑 Required Environment Variables

Add these 4 variables to your **Render.com dashboard** environment variables section:

```bash
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id  
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=boston-drone-school
```

## 📋 Step-by-Step Instructions

### 1. Create Cloudflare R2 Bucket
1. Go to Cloudflare Dashboard > R2 Object Storage
2. Click "Create bucket"
3. Name it: `boston-drone-school`
4. Choose your preferred region
5. Enable "Public access" for the bucket

### 2. Create R2 API Token
1. In Cloudflare Dashboard, go to R2 > Manage R2 API Tokens
2. Click "Create API Token"
3. Choose "Custom token"
4. Set permissions:
   - **Zone**: Not needed
   - **Account**: Read
   - **R2**: Edit (for your bucket)
5. Copy the generated:
   - Access Key ID (`R2_ACCESS_KEY_ID`)
   - Secret Access Key (`R2_SECRET_ACCESS_KEY`)

### 3. Get Account ID
1. In Cloudflare Dashboard, find your Account ID in the right sidebar
2. Copy this value for `R2_ACCOUNT_ID`

### 4. Add to Render Environment
1. Go to your Render dashboard
2. Select your **backend service** (bds-api-node)
3. Go to "Environment" tab
4. Add all 4 R2 variables
5. Click "Save Changes" (this will redeploy)

## 🚀 How to Test

Once deployed with R2 variables:

1. **Login as admin** on your site
2. **Go to Admin panel** (`/admin`)
3. **Click "Files" tab**
4. **Upload a course material** or FAA document
5. **Check Cloudflare R2 bucket** to see the uploaded file

## 📁 File Organization

Files will be organized in R2 as:
```
course-materials/
├── course-1/
│   ├── 2024-12-19_filename.pdf
│   └── 2024-12-19_video.mp4
└── course-2/
    └── 2024-12-19_document.pdf

faa-materials/
├── 2024-12-19_part-107-regulations.pdf
└── 2024-12-19_airspace-guide.pdf
```

## 🎯 Next Steps After R2 Setup

1. Upload course materials through admin interface
2. Students will see download links in their course pages
3. FAA materials will be available in the admin "Files" section
4. All files get public URLs for easy access

## 💡 Important Notes

- Files are uploaded with timestamp prefixes to avoid naming conflicts
- Admin authentication required for all uploads
- File types are validated (PDFs, videos, images, documents)
- 100MB size limit per file
- All uploads are tracked in the database with metadata

The system is production-ready once you add those 4 environment variables!