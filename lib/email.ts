import { Resend } from "resend";
import {
  WELCOME_SUBJECT,
  welcomeEmailHtml,
  welcomeEmailText,
} from "@/lib/emails/welcome-template";
import { LOGO_BASE64, LOGO_CID, LOGO_FILENAME } from "@/lib/emails/logo";

// Instantiate lazily/conditionally so the app runs fine without a key set —
// registration must never fail just because email isn't configured.
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? "TORCHNOVA <onboarding@resend.dev>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export interface SendResult {
  ok: boolean;
  /** True when email is intentionally skipped (no API key configured). */
  skipped?: boolean;
  error?: string;
}

interface WelcomeEmailArgs {
  to: string;
  firstName: string;
  /** Opaque token used to build the one-click unsubscribe link. */
  unsubscribeToken: string;
}

/**
 * Sends the welcome / confirmation email. Never throws — any failure is logged
 * and returned so the caller can decide what to do (registration proceeds
 * regardless of email outcome).
 */
export async function sendWelcomeEmail({
  to,
  firstName,
  unsubscribeToken,
}: WelcomeEmailArgs): Promise<SendResult> {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not set — skipping welcome email to",
      to,
    );
    return { ok: false, skipped: true };
  }

  const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${encodeURIComponent(
    unsubscribeToken,
  )}`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject: WELCOME_SUBJECT,
      html: welcomeEmailHtml({ firstName, siteUrl: SITE_URL, unsubscribeUrl }),
      text: welcomeEmailText({ firstName, siteUrl: SITE_URL, unsubscribeUrl }),
      // Inline logo — referenced as cid:LOGO_CID in the HTML above.
      attachments: [
        {
          filename: LOGO_FILENAME,
          content: LOGO_BASE64,
          contentType: "image/png",
          contentId: LOGO_CID,
        },
      ],
      // Improves deliverability + satisfies bulk-sender / CAN-SPAM expectations.
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    if (error) {
      console.error("[email] Resend returned an error:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] failed to send welcome email:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}
