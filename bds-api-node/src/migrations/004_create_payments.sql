-- migrate:up
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('requires_payment_method', 'requires_confirmation', 'requires_action', 'processing', 'succeeded', 'canceled', 'failed', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, enrollment_id)
);

CREATE INDEX IF NOT EXISTS idx_payments_user ON payments (user_id);
CREATE INDEX IF NOT EXISTS idx_payments_enrollment ON payments (enrollment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments (status);

-- migrate:down
DROP INDEX IF EXISTS idx_payments_status;
DROP INDEX IF EXISTS idx_payments_enrollment;
DROP INDEX IF EXISTS idx_payments_user;
DROP TABLE IF EXISTS payments;
