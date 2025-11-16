# Google OAuth Setup Guide

This guide will help you set up Google OAuth for your Boston Drone School platform.

## Prerequisites

- A Google account
- Access to the Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "Boston Drone School")
5. Click "Create"

## Step 2: Enable Google OAuth

1. In the Google Cloud Console, go to **APIs & Services > OAuth consent screen**
2. Select "External" user type and click "Create"
3. Fill in the required fields:
   - **App name**: Boston Drone School
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Click "Save and Continue"
5. Skip the "Scopes" step (click "Save and Continue")
6. Add test users if needed (for development)
7. Click "Save and Continue" and then "Back to Dashboard"

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services > Credentials**
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Enter a name (e.g., "Boston Drone School Web Client")
5. Add **Authorized JavaScript origins**:
   - Development: `http://localhost:3000`
   - Production: Your production URL (e.g., `https://thebostondroneschool.org`)
6. Add **Authorized redirect URIs**:
   - Development: `http://localhost:3000`
   - Production: Your production URL
7. Click "Create"
8. Copy the **Client ID** (you'll need this for the next step)

## Step 4: Configure Environment Variables

### Backend (.env)

Add the Google Client ID to `bds-api-node/.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
```

### Frontend (.env.local)

Add the same Google Client ID to `bds-frontend/.env.local`:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
```

## Step 5: Restart Your Servers

After adding the environment variables:

1. Stop both backend and frontend servers
2. Restart the backend: `cd bds-api-node && npm start`
3. Restart the frontend: `cd bds-frontend && npm run dev`

## Step 6: Test Google Login

1. Go to `http://localhost:3000/login`
2. You should now see a "Continue with Google" button
3. Click it and sign in with your Google account
4. You should be redirected to the dashboard after successful login

## Security Notes

- **Never commit** the Client ID to public repositories if you want to keep it private
- The Client Secret is **not needed** for this implementation (we use ID tokens)
- For production, make sure to:
  - Update authorized origins and redirect URIs with your production URL
  - Consider moving from "External" to "Internal" user type if you have a Google Workspace
  - Review and limit OAuth scopes to only what's necessary

## Troubleshooting

### "Google login is not configured on this server"

This error means the `GOOGLE_CLIENT_ID` environment variable is not set in the backend. Make sure you:
1. Added `GOOGLE_CLIENT_ID` to `bds-api-node/.env`
2. Restarted the backend server

### Google button doesn't appear

This error means the `NEXT_PUBLIC_GOOGLE_CLIENT_ID` environment variable is not set in the frontend. Make sure you:
1. Added `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to `bds-frontend/.env.local`
2. Restarted the frontend server

### "redirect_uri_mismatch" error

This error means the redirect URI is not authorized. Make sure you:
1. Added `http://localhost:3000` (or your production URL) to the authorized redirect URIs in the Google Cloud Console
2. The URLs match exactly (including http vs https and trailing slashes)

## How It Works

1. User clicks the "Continue with Google" button on the login page
2. Google handles the authentication and returns a credential (ID token)
3. Frontend sends the credential to the backend at `/api/auth/google`
4. Backend verifies the token with Google's servers
5. If valid, backend creates or updates the user account and returns a JWT
6. Frontend stores the JWT and redirects to the dashboard

## Features

- **Automatic account creation**: New users are automatically created when they sign in with Google
- **Account linking**: If a user already exists with the same email, their Google account is linked
- **Profile pictures**: Google profile pictures are automatically synced
- **Secure**: Uses official Google authentication libraries and verifies tokens server-side
