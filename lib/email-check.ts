import { promises as dns } from "node:dns";

/** Common throwaway-inbox services. Not exhaustive — catches the usual ones. */
const DISPOSABLE = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamailblock.com", "sharklasers.com",
  "grr.la", "10minutemail.com", "10minutemail.net", "tempmail.com", "temp-mail.org", "tempmail.net",
  "tempmailo.com", "yopmail.com", "yopmail.net", "trashmail.com", "trashmail.de", "getnada.com", "nada.email",
  "maildrop.cc", "dispostable.com", "throwawaymail.com", "fakeinbox.com", "mintemail.com", "mohmal.com",
  "emailondeck.com", "mailnesia.com", "spamgourmet.com", "burnermail.io", "discard.email", "tempr.email",
  "moakt.com", "mailcatch.com", "inboxkitten.com", "1secmail.com", "1secmail.net", "tmail.ws", "tmpmail.org",
]);

export type EmailCheck = { ok: true } | { ok: false; message: string };

const withTimeout = <T,>(p: Promise<T>, ms: number) =>
  Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);

/**
 * Server-side deliverability check: refuses throwaway inboxes and domains
 * that can't receive mail. Lookup failures (timeouts, resolver errors) are
 * treated as deliverable — a real person must never be blocked by DNS.
 */
export async function checkEmailDeliverable(email: string): Promise<EmailCheck> {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return { ok: false, message: "Enter a valid email address" };

  if (DISPOSABLE.has(domain)) {
    return { ok: false, message: "Please use your work email rather than a temporary inbox" };
  }

  try {
    const mx = await withTimeout(dns.resolveMx(domain), 3000);
    if (mx.some((r) => r.exchange && r.exchange !== ".")) return { ok: true };
    return { ok: false, message: "This email domain can't receive mail" };
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOTFOUND" || code === "ENODATA") {
      // No MX: mail falls back to the domain's own address record (RFC 5321).
      try {
        await withTimeout(dns.resolve(domain), 3000);
        return { ok: true };
      } catch {
        return { ok: false, message: "This email domain doesn't exist — check for a typo" };
      }
    }
    return { ok: true };
  }
}
