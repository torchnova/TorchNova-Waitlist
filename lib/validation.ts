import { z } from "zod";

/**
 * Shared email rule — also used on its own by the landing-page card, which
 * gates the hand-off to /register on a valid address.
 */
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(254)
  .toLowerCase();

/**
 * Single source of truth for registration validation. Used by both the API
 * route (server-side, authoritative) and the client form (instant feedback).
 */
export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Use only letters, numbers and underscores"),
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: emailSchema,
  // Single checkbox covering both the Terms and consent to receive our emails.
  agreeToTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the Terms and to receiving notifications",
    }),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
