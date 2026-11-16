import { LOGO_CID } from "@/lib/emails/logo";

interface WelcomeEmailParams {
  firstName: string;
  siteUrl: string;
  unsubscribeUrl: string;
}

// Palette mirrors the website (ink / ivory / mint / orange). Inline hex values
// only — email clients ignore CSS variables and most <style> blocks.
const OUTER = "#e4e7e0";
const INK = "#142b2b";
const INK_2 = "#33303a";
const PAPER = "#f3f1e8";
const LINE = "#d9dcd2";
const MUTED = "#60716e";
const BODY = "#3d4f4c";
const ON_INK = "#f3f1e8";
const ON_INK_2 = "#c9d2cf";
const ORANGE = "#e9854f";
const YELLOW = "#f2bf55";
const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',Times,serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,'Courier New',monospace";

// TODO (before launch): point these at the real TorchNova accounts. Any entry
// left empty is skipped, so unclaimed platforms can simply be blanked out.
const SOCIALS: ReadonlyArray<{ label: string; url: string }> = [
  { label: "Instagram", url: "https://instagram.com/torchnovahq" },
  { label: "X", url: "https://x.com/torchnovahq" },
  { label: "TikTok", url: "https://tiktok.com/@torchnovahq" },
];

const activeSocials = SOCIALS.filter((s) => s.url.trim().length > 0);

export const WELCOME_SUBJECT = "You're on the TorchNova waitlist";

/**
 * Welcome / confirmation email — short and warm: you're in, here's what
 * TorchNova is, we'll tell you when it's your turn. Dark ink header over an
 * ivory body, matching the site. Table layout + inline styles throughout.
 */
export function welcomeEmailHtml({
  firstName,
  siteUrl,
  unsubscribeUrl,
}: WelcomeEmailParams): string {
  const name = firstName ? escapeHtml(firstName) : "founder";
  const url = escapeAttr(siteUrl.replace(/\/+$/, ""));
  const unsub = escapeAttr(unsubscribeUrl);
  // Inline attachment, not a URL — see lib/emails/logo.ts for why.
  const logo = `cid:${LOGO_CID}`;
  const label = (text: string, color: string) =>
    `<p style="margin:0;font-family:${MONO};font-size:11px;line-height:1.4;letter-spacing:0.18em;text-transform:uppercase;color:${color};">${text}</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${WELCOME_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background:${OUTER};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${OUTER};font-size:1px;line-height:1px;">Your spot is saved. We'll let you know the moment it's your turn.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${OUTER};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${PAPER};border:1px solid ${LINE};">

          <!-- accent bar -->
          <tr>
            <td bgcolor="${ORANGE}" style="background:${ORANGE};height:5px;line-height:5px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- header -->
          <tr>
            <td bgcolor="${INK}" style="background:${INK};background-image:linear-gradient(135deg,${INK} 0%,${INK_2} 100%);padding:36px 40px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="middle" style="background:${PAPER};border-radius:7px;padding:5px;line-height:0;">
                          <img src="${logo}" alt="" width="20" height="21" style="display:block;width:20px;height:21px;border:0;outline:none;text-decoration:none;" />
                        </td>
                        <td valign="middle" style="padding-left:10px;font-family:${SANS};font-size:17px;font-weight:800;letter-spacing:-0.03em;color:${ON_INK};">TorchNova</td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">${label(`Waitlist / <span style="background:${YELLOW};color:${INK};padding:1px 3px;">Confirmed</span>`, ON_INK_2)}</td>
                </tr>
              </table>
              <h1 style="margin:40px 0 0;font-family:${SERIF};font-weight:400;font-size:40px;line-height:1.1;letter-spacing:-0.01em;color:${ON_INK};">You&rsquo;re in, ${name}<span style="color:${ORANGE};">.</span><br />Welcome aboard.</h1>
              <p style="margin:18px 0 0;font-family:${SANS};font-size:16px;line-height:1.55;color:${ON_INK_2};">Your spot on the TorchNova waitlist is saved.</p>
            </td>
          </tr>

          <!-- body -->
          <tr>
            <td style="padding:40px 40px 8px;">
              ${label("01 / What happens next", MUTED)}
              <p style="margin:16px 0 0;font-family:${SANS};font-size:16px;line-height:1.65;color:${BODY};">We&rsquo;re so glad to have you with us. We&rsquo;re putting the finishing touches on TorchNova: one place to find your people, run your team, and let AI handle the busywork.</p>
              <p style="margin:14px 0 0;font-family:${SANS};font-size:16px;line-height:1.65;color:${BODY};">We&rsquo;ll email you the moment your spot is ready. Until then, no noise.</p>
            </td>
          </tr>

          <!-- cta -->
          <tr>
            <td style="padding:28px 40px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="${INK}" style="background:${INK};border-radius:4px;">
                    <a href="${url}" style="display:inline-block;padding:14px 26px;font-family:${SANS};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:4px;">Visit TorchNova &nbsp;&#8599;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- sign-off -->
          <tr>
            <td style="padding:28px 40px 36px;">
              <p style="margin:0;font-family:${MONO};font-size:13px;line-height:1.5;color:${MUTED};">&mdash; The TorchNova Team</p>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding:22px 40px 30px;border-top:1px solid ${LINE};">
              ${
                activeSocials.length
                  ? `<p style="margin:0 0 12px;font-family:${SANS};font-size:13px;line-height:1.5;">${activeSocials
                      .map(
                        (s) =>
                          `<a href="${escapeAttr(s.url)}" style="color:${INK};text-decoration:none;font-weight:700;">${escapeHtml(s.label)}</a>`,
                      )
                      .join(
                        `<span style="color:${MUTED};padding:0 8px;">&middot;</span>`,
                      )}</p>`
                  : ""
              }
              <p style="margin:0 0 6px;font-family:${SANS};font-size:12px;line-height:1.5;color:${MUTED};">You&rsquo;re getting this because you joined the TorchNova waitlist. If this wasn&rsquo;t you, you can ignore it.</p>
              <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.5;color:${MUTED};"><a href="${unsub}" style="color:${MUTED};text-decoration:underline;">Unsubscribe</a> and remove me from the waitlist.</p>
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
    `You're in, ${name}. Welcome aboard.`,
    "",
    "Your spot on the TorchNova waitlist is saved.",
    "",
    "We're so glad to have you with us. We're putting the finishing touches on TorchNova: one place to find your people, run your team, and let AI handle the busywork.",
    "",
    "We'll email you the moment your spot is ready. Until then, no noise.",
    "",
    `Visit TorchNova: ${siteUrl}`,
    "",
    "— The TorchNova Team",
    ...(activeSocials.length
      ? ["", ...activeSocials.map((s) => `${s.label}: ${s.url}`)]
      : []),
    "",
    "You're getting this because you joined the TorchNova waitlist.",
    `Unsubscribe and remove me from the waitlist: ${unsubscribeUrl}`,
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
