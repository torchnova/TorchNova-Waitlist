# Torch

The private network where founders connect, get unstuck, and hand off ideas.
This repo is the marketing landing page + waitlist registration flow, built as a
production-ready full-stack app.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for utilities, with the bespoke black + flame-orange glass
  styling in `app/globals.css`
- **Framer Motion** for the animated accent on the welcome page
- **Prisma ORM** + **Neon** (serverless PostgreSQL)
- **Next.js API Routes** for the backend
- **Resend** for the welcome/confirmation email, **Zod** for validation

The waitlist collects **email, username, and first and last name** — no passwords are stored.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Neon project at https://neon.tech and copy its connection strings.
   Copy `.env.example` to `.env` and set both:

   ```
   # pooled (host has "-pooler") — used at runtime
   DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.REGION.aws.neon.tech/torch?sslmode=require"
   # direct (no "-pooler") — used for migrations
   DIRECT_URL="postgresql://user:pass@ep-xxx.REGION.aws.neon.tech/torch?sslmode=require"
   ```

3. Push the schema to Neon (applies `prisma/migrations`):

   ```bash
   npx prisma migrate deploy
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Project structure

```
app/
  api/register/route.ts   POST /api/register — validates + persists a user
  register/page.tsx       Registration page (Suspense-wrapped form)
  welcome/page.tsx        Post-signup welcome + "Build boldly." animation
  page.tsx                Landing page
  layout.tsx, globals.css
components/
  landing/                Blobs, Nav, Hero, Typewriter, WaitlistCard
  register/RegisterForm.tsx
  welcome/BuildBoldly.tsx
  ui/Field.tsx
hooks/useTypewriter.ts    Typewriter loop for the rotating hero line
lib/                      prisma client, zod validation, email (Resend)
lib/emails/               welcome-template.ts (dark + flame confirmation email)
prisma/schema.prisma      User model (legacy optional Role column, no longer collected)
types/                    Shared types
```

## Routes

- `/` — landing page. The "Join the waitlist" CTA routes to `/register`,
  prefilling the first name / email the visitor already typed.
- `/register` — registration form (username, name, email, terms). Validates client- and server-side.
- `/welcome` — success page.
- `POST /api/register` — creates the user, enforces unique email/username,
  sends the welcome email, and returns typed success/error responses.

## Email

On successful registration a dark-themed confirmation email is sent via Resend
(see `lib/email.ts`). Configure `RESEND_API_KEY` and `EMAIL_FROM` in `.env`.
Without a key, registration still succeeds and the email is skipped. Note that
Resend's shared `onboarding@resend.dev` sender only delivers to your own Resend
account address — verify a domain to email arbitrary signups.

## Authentication

Only waitlist registration is implemented (no passwords). The `User` model and
API route are structured so an auth layer can be added later without reshaping
the data model.

## Deployment

Set `DATABASE_URL`, `DIRECT_URL`, and the email vars in your host's environment
(the same Neon strings work locally and in production). `npm run build` runs
`prisma generate` automatically; run `prisma migrate deploy` once against the
Neon database to create the tables. On Vercel, a build command of
`prisma migrate deploy && prisma generate && next build` keeps the schema in
sync on every deploy.
