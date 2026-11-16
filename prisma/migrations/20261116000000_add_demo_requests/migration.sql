-- Product-website data lives in its own schema, separate from the
-- original waitlist tables in "public".
CREATE SCHEMA IF NOT EXISTS "website";

-- CreateTable
CREATE TABLE "website"."demo_requests" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "consent_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demo_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "demo_requests_email_idx" ON "website"."demo_requests"("email");

-- CreateIndex
CREATE INDEX "demo_requests_created_at_idx" ON "website"."demo_requests"("created_at");
