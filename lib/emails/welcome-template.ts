import { LOGO_CID } from "@/lib/emails/logo";

interface WelcomeEmailParams {
  firstName: string;
  siteUrl: string;
  unsubscribeUrl: string;
}

// Light theme matching the website (Apple/Google-clean), inline hex for
// email-client compatibility.
const BG = "#edeff3";
const CARD = "#ffffff";
const CARD_EDGE = "rgba(0,0,0,0.08)";
const HOOK_BG = "#fff5ee";
const HOOK_EDGE = "rgba(234,106,44,0.30)";
const ACCENT = "#ea6a2c";
const TEXT = "#1d1d1f";
const TEXT_2 = "#58585c";
const TEXT_3 = "#86868b";
const BTN_BG = "#1d1d1f";
const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif";

// TODO (before launch): point these at the real TORCHNOVA accounts. Any entry
// left empty is skipped, so unclaimed platforms can simply be blanked out.
const SOCIALS: ReadonlyArray<{ label: string; url: string }> = [
  { label: "Instagram", url: "https://instagram.com/torchnovahq" },
  { label: "X", url: "https://x.com/torchnovahq" },
  { label: "TikTok", url: "https://tiktok.com/@torchnovahq" },
];

const activeSocials = SOCIALS.filter((s) => s.url.trim().length > 0);

/**
 * Welcome / confirmation email — light theme, flame-orange accents, with a
 * curiosity hook to keep the reader watching their inbox. Table layout +
 * inline styles for broad email-client support.
 */
export function welcomeEmailHtml({
  firstName,
  siteUrl,
  unsubscribeUrl,
}: WelcomeEmailParams): string {
  const name = firstName ? escapeHtml(firstName) : "founder";
  const base = siteUrl.replace(/\/+$/, "");
  const url = escapeAttr(base);
  const unsub = escapeAttr(unsubscribeUrl);
  // Inline attachment, not a URL — see lib/emails/logo.ts for why.
  const logo = `cid:${LOGO_CID}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Welcome to TORCHNOVA</title>
</head>
<body style="margin:0;padding:0;background:${BG};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${BG};font-size:1px;line-height:1px;">You're in. Here's the part we're most excited to show you.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:488px;background:${CARD};border:1px solid ${CARD_EDGE};border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(28,32,54,0.10);">
          <!-- brand -->
          <tr>
            <td style="padding:34px 40px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;line-height:0;" valign="middle">
                    <img src="${logo}" alt="TORCHNOVA" width="26" height="28" style="display:block;width:26px;height:28px;border:0;outline:none;text-decoration:none;" />
                  </td>
                  <td valign="middle" style="font-family:${FONT};font-weight:600;font-size:18px;letter-spacing:-0.01em;color:${TEXT};">TORCHNOVA</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- headline + confirmation -->
          <tr>
            <td style="padding:22px 40px 0;font-family:${FONT};">
              <h1 style="margin:0 0 14px;font-weight:600;font-size:30px;line-height:1.12;letter-spacing:-0.02em;color:${TEXT};">You're in, ${name}.</h1>
              <p style="margin:0 0 6px;font-size:16px;line-height:1.6;color:${TEXT_2};">Your spot on the TORCHNOVA waitlist is locked in. We won't crowd your inbox in the meantime — just the one message that matters, the day your door opens.</p>
            </td>
          </tr>
          <!-- curiosity hook -->
          <tr>
            <td style="padding:24px 40px 0;font-family:${FONT};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${HOOK_BG};border:1px solid ${HOOK_EDGE};border-radius:14px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${ACCENT};">Before you go</p>
                    <p style="margin:0;font-size:15.5px;line-height:1.62;color:${TEXT};">We're not building another feed. We're building the room founders wish they had at 2am — where the person three steps ahead of you actually answers. The founders already inside are quietly trading the intros, ideas, and shortcuts most people never get.</p>
                    <p style="margin:12px 0 0;font-size:15.5px;line-height:1.62;color:${TEXT};font-weight:600;">The earlier your spot, the more you unlock on day one. Keep an eye on your inbox — what we open with is worth the wait.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- mantra -->
          <tr>
            <td style="padding:26px 40px 0;font-family:${FONT};">
              <p style="margin:0;font-size:18px;line-height:1.5;font-weight:700;color:${ACCENT};">Build boldly.</p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:${TEXT_2};">Share every step.</p>
            </td>
          </tr>
          <!-- cta -->
          <tr>
            <td style="padding:24px 40px 34px;font-family:${FONT};">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:12px;background:${BTN_BG};">
                    <a href="${url}" style="display:inline-block;padding:13px 28px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:12px;">See what we're building</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- socials -->
          ${
            activeSocials.length
              ? `<tr>
            <td style="padding:2px 40px 30px;font-family:${FONT};">
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${TEXT_3};">Follow along</p>
              <p style="margin:0;font-size:14px;line-height:1.5;color:${TEXT_3};">${activeSocials
                  .map(
                    (s) =>
                      `<a href="${escapeAttr(s.url)}" style="color:${ACCENT};text-decoration:none;font-weight:600;">${escapeHtml(s.label)}</a>`,
                  )
                  .join(
                    `<span style="color:${TEXT_3};padding:0 8px;">&middot;</span>`,
                  )}</p>
            </td>
          </tr>`
              : ""
          }
          <!-- footer -->
          <tr>
            <td style="padding:20px 40px 34px;border-top:1px solid rgba(0,0,0,0.07);">
              <p style="margin:0 0 8px;font-family:${FONT};font-size:12px;line-height:1.5;color:${TEXT_3};">You're getting this because you joined the TORCHNOVA waitlist. If this wasn't you, just ignore it — no account was created without you.</p>
              <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.5;color:${TEXT_3};"><a href="${unsub}" style="color:${TEXT_3};text-decoration:underline;">Unsubscribe / remove me</a> from the waitlist.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plaintext fallback for clients that don't render HTML. */
export function welcomeEmailText({
  firstName,
  siteUrl,
  unsubscribeUrl,
}: WelcomeEmailParams): string {
  const name = firstName || "founder";
  return [
    `You're in, ${name}.`,
    "",
    "Your spot on the TORCHNOVA waitlist is locked in. We won't crowd your inbox in the meantime — just the one message that matters, the day your door opens.",
    "",
    "BEFORE YOU GO:",
    "We're not building another feed. We're building the room founders wish they had at 2am — where the person three steps ahead of you actually answers. The founders already inside are quietly trading the intros, ideas, and shortcuts most people never get.",
    "",
    "The earlier your spot, the more you unlock on day one. Keep an eye on your inbox — what we open with is worth the wait.",
    "",
    "Build boldly. Share every step.",
    "",
    `See what we're building: ${siteUrl}`,
    ...(activeSocials.length
      ? [
          "",
          "FOLLOW ALONG:",
          ...activeSocials.map((s) => `${s.label}: ${s.url}`),
        ]
      : []),
    "",
    "You're getting this because you joined the TORCHNOVA waitlist.",
    `Unsubscribe / remove me from the waitlist: ${unsubscribeUrl}`,
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value: string): string {
  return value.replace(/"/g, "&quot;");
}
