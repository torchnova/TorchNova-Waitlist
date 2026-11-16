import { Resend } from "resend";
import {
  DEMO_CONFIRM_SUBJECT,
  demoConfirmHtml,
  demoConfirmText,
  demoNotifyText,
} from "@/lib/emails/demo-template";
import type { DemoRequestInput } from "@/lib/validation";
import { publicUrl } from "@/lib/site";

// Conditional so the site runs fine without a key — a demo request must never
// fail just because email isn't configured.
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? "TorchNova <onboarding@resend.dev>";
// Emails always point at the public site, never a local dev address.
const SITE_URL = publicUrl();
/** Team inbox that receives each new request. Optional. */
const NOTIFY_TO = process.env.DEMO_NOTIFY_EMAIL?.trim() || null;

/**
 * Sends the requester's confirmation and, if configured, the internal
 * notification. Never throws — failures are logged and swallowed.
 */
export async function sendDemoEmails(
  data: DemoRequestInput,
  { confirm = true }: { confirm?: boolean } = {},
): Promise<void> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping demo emails for", data.email);
    return;
  }

  const jobs: Promise<unknown>[] = [];
  if (confirm) {
    const receivedAt = new Date();
    jobs.push(
      resend.emails.send({
        from: FROM,
        to: data.email,
        subject: DEMO_CONFIRM_SUBJECT,
        html: demoConfirmHtml({ data, siteUrl: SITE_URL, receivedAt }),
        text: demoConfirmText({ data, siteUrl: SITE_URL, receivedAt }),
      }),
    );
  }

  if (NOTIFY_TO) {
    jobs.push(
      resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: data.email,
        subject: `Demo request — ${data.organization} (${data.firstName} ${data.lastName})`,
        text: demoNotifyText(data),
      }),
    );
  }

  const results = await Promise.allSettled(jobs);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error("[email] demo email failed:", r.reason);
    } else {
      const { error } = r.value as { error?: { message: string } | null };
      if (error) console.error("[email] Resend returned an error:", error);
    }
  }
}
