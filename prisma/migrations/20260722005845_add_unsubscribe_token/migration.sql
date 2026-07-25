-- Add opaque unsubscribe/delete token, backfilling any existing rows so the
-- column can be NOT NULL + UNIQUE without losing data.
ALTER TABLE "users" ADD COLUMN "unsubscribe_token" TEXT;

UPDATE "users"
SET "unsubscribe_token" = gen_random_uuid()::text
WHERE "unsubscribe_token" IS NULL;

ALTER TABLE "users" ALTER COLUMN "unsubscribe_token" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_unsubscribe_token_key" ON "users"("unsubscribe_token");
