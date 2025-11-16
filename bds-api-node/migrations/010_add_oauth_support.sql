-- Add OAuth support to users table
-- This allows users to sign in with Google or other OAuth providers

-- Add columns for OAuth authentication
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR(50),
  ADD COLUMN IF NOT EXISTS oauth_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;

-- Make password_hash nullable since OAuth users won't have passwords
ALTER TABLE users
  ALTER COLUMN password_hash DROP NOT NULL;

-- Create unique index on oauth provider + id combination
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_oauth
  ON users(oauth_provider, oauth_id)
  WHERE oauth_provider IS NOT NULL;

-- Add index on oauth_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_oauth_id
  ON users(oauth_id)
  WHERE oauth_id IS NOT NULL;
