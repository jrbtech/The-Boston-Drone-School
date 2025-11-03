-- migrate:up
BEGIN;

CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    stripe_payment_intent_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('requires_payment_method', 'requires_confirmation', 'requires_action', 'processing', 'succeeded', 'canceled', 'refunded')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_payments_stripe_intent ON payments (stripe_payment_intent_id);
CREATE INDEX idx_payments_user_id ON payments (user_id);
CREATE INDEX idx_payments_status ON payments (status);
CREATE INDEX idx_payments_created_at ON payments (created_at);

ALTER TABLE enrollments
    ADD CONSTRAINT enrollments_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL;

CREATE INDEX idx_enrollments_payment_id ON enrollments (payment_id);

COMMIT;

-- migrate:down
BEGIN;

DROP INDEX IF EXISTS idx_enrollments_payment_id;
ALTER TABLE enrollments DROP CONSTRAINT IF EXISTS enrollments_payment_id_fkey;

DROP INDEX IF EXISTS idx_payments_created_at;
DROP INDEX IF EXISTS idx_payments_status;
DROP INDEX IF EXISTS idx_payments_user_id;
DROP INDEX IF EXISTS idx_payments_stripe_intent;
DROP TABLE IF EXISTS payments;

COMMIT;
