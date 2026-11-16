import { z } from "zod";
import { isValidE164 } from "@/lib/phone";

/** Roles offered in the demo form. Kept short and generic on purpose. */
export const DEMO_ROLES = [
  "Founder / Co-founder",
  "Executive",
  "Operator / Team lead",
  "Investor",
  "Accelerator / Program",
  "Other",
] as const;

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(254)
  .toLowerCase();

const name = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(60, `${label} is too long`);

/**
 * Single source of truth for demo-request validation — used by the API route
 * (authoritative) and the client form (instant feedback).
 */
export const demoRequestSchema = z.object({
  firstName: name("First name"),
  lastName: name("Last name"),
  email: emailSchema,
  // The form normalises to E.164 (+14155550134) before sending; the server
  // accepts only numbers that are valid for their country.
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(24, "Phone number is too long")
    .refine(isValidE164, "Enter a valid phone number"),
  organization: z
    .string()
    .trim()
    .min(1, "Organization is required")
    .max(120, "Organization name is too long"),
  role: z.enum(DEMO_ROLES, {
    errorMap: () => ({ message: "Select your role" }),
  }),
  agreeToPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Please accept the Privacy Policy" }),
  }),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
