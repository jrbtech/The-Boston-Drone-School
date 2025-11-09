-- Migration: Create password_reset_tokens table
-- Description: Stores password reset tokens for secure password recovery

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_token UNIQUE (user_id)
);

-- Index for fast token lookup
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);

-- Index for user lookup
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

-- Index for expiration cleanup
CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

COMMENT ON TABLE password_reset_tokens IS 'Stores password reset tokens for user authentication';
COMMENT ON COLUMN password_reset_tokens.user_id IS 'References the user requesting password reset';
COMMENT ON COLUMN password_reset_tokens.token IS 'JWT token for password reset';
COMMENT ON COLUMN password_reset_tokens.expires_at IS 'Token expiration timestamp (1 hour from creation)';
COMMENT ON COLUMN password_reset_tokens.used_at IS 'Timestamp when token was used (null if not used yet)';
