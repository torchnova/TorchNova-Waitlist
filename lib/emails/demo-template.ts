import type { DemoRequestInput } from "@/lib/validation";
import { SITE } from "@/lib/site";
import { prettyPhone } from "@/lib/phone";

/*
 * Demo-request emails, styled after the website: light grey canvas, one
 * Helvetica family, hairline rules, a typeset wordmark (no images, so it
 * renders the same everywhere). Table layout + inline styles throughout —
 * email clients ignore CSS variables and most <style> blocks.
 */
const BG = "#e9eee7";
const INK = "#0f0f0f";
const INK_2 = "#5c5c5c";
const RULE = "#d6d6d6";
const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

export const DEMO_CONFIRM_SUBJECT = "Thanks for requesting a TorchNova demo";

interface ConfirmParams {
  data: DemoRequestInput;
  siteUrl: string;
  receivedAt?: Date;
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const rule = `<tr><td style="padding:0;"><div style="height:1px;line-height:1px;font-size:0;background:${RULE};">&nbsp;</div></td></tr>`;
const small = (text: string, color = INK_2) =>
  `<span style="font-family:${FONT};font-size:12px;line-height:1.4;color:${color};">${text}</span>`;

/** Confirmation sent to the person who requested the demo. */
export function demoConfirmHtml({ data, siteUrl, receivedAt = new Date() }: ConfirmParams): string {
  const first = esc(data.firstName);
  const org = esc(data.organization);
  const site = escAttr(siteUrl.replace(/\/+$/, ""));
  const mail = esc(SITE.contactEmail);

  const step = (n: number, text: string) => `
      <tr>
        <td width="28" valign="top" style="padding:0 0 8px;font-family:${FONT};font-size:15px;line-height:1.45;color:${INK};">${n}</td>
        <td valign="top" style="padding:0 0 8px;font-family:${FONT};font-size:15px;line-height:1.45;color:${INK_2};">${text}</td>
      </tr>`;
  const detail = (label: string, value: string) => `
      <tr>
        <td width="132" valign="top" style="padding:0 0 8px;">${small(label)}</td>
        <td valign="top" style="padding:0 0 8px;font-family:${FONT};font-size:14px;line-height:1.4;color:${INK};word-break:break-word;">${value}</td>
      </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${DEMO_CONFIRM_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background:${BG};">
  <div style="display:none;max-height:0;overflow:hidden;">We're excited to show you what we've been building, and we'll be in touch soon.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};">
    <tr><td align="center" style="padding:32px 16px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <tr><td style="padding:0 0 10px;font-family:${FONT};font-size:46px;line-height:1;font-weight:700;letter-spacing:-1.5px;color:${INK};">TORCHNOVA</td></tr>
        ${rule}
        <tr><td style="padding:8px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td>${small("Demo request", INK)}</td>
            <td align="right">${small(`Received&nbsp;&nbsp;&nbsp;${fmtDate(receivedAt)}`, INK)}</td>
          </tr></table>
        </td></tr>

        <tr><td style="padding:56px 0 0;font-family:${FONT};font-size:44px;line-height:1;font-weight:500;letter-spacing:-2px;color:${INK};">Thank you, ${first}.</td></tr>
        <tr><td style="padding:22px 0 44px;font-family:${FONT};font-size:17px;line-height:1.45;color:${INK_2};">
          Thanks for requesting a demo of TorchNova. We&rsquo;re excited to show you what we&rsquo;ve been building, and we&rsquo;ll be in touch soon.
        </td></tr>

        ${rule}
        <tr><td style="padding:14px 0 6px;">${small("What happens next")}</td></tr>
        <tr><td style="padding:8px 0 30px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${step(1, "We review your request.")}
            ${step(2, "We reach out within two business days.")}
            ${step(3, `A private walkthrough, shaped around ${org}.`)}
          </table>
        </td></tr>

        ${rule}
        <tr><td style="padding:14px 0 6px;">${small("Your details")}</td></tr>
        <tr><td style="padding:8px 0 30px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${detail("Name", `${first} ${esc(data.lastName)}`)}
            ${detail("Organization", org)}
            ${detail("Role", esc(data.role))}
            ${detail("Email", esc(data.email))}
            ${detail("Phone", esc(prettyPhone(data.phone)))}
          </table>
        </td></tr>

        ${rule}
        <tr><td style="padding:22px 0 0;font-family:${FONT};font-size:15px;line-height:1.5;color:${INK_2};">
          Something to add or change? Write to us at <a href="mailto:${escAttr(SITE.contactEmail)}" style="color:${INK};text-decoration:underline;">${mail}</a>.
        </td></tr>
        <tr><td style="padding:18px 0 56px;font-family:${FONT};font-size:15px;line-height:1.5;color:${INK};">&mdash; The TorchNova Team</td></tr>

        ${rule}
        <tr><td style="padding:12px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td valign="top">${small(`&copy; ${SITE.year} TorchNova`)}</td>
            <td align="right" valign="top">${small(`<a href="${site}" style="color:${INK_2};text-decoration:none;">${site.replace(/^https?:\/\//, "")}</a>`)}</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:10px 0 0;">${small("You&rsquo;re receiving this because a demo was requested with this address. This mailbox isn&rsquo;t monitored, so please don&rsquo;t reply. If this wasn&rsquo;t you, you can ignore this email.")}</td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Plain-text version of the confirmation. */
export function demoConfirmText({ data, siteUrl, receivedAt = new Date() }: ConfirmParams): string {
  return [
    "TORCHNOVA",
    `Demo request — received ${fmtDate(receivedAt)}`,
    "",
    `Thank you, ${data.firstName}.`,
    "",
    "Thanks for requesting a demo of TorchNova. We're excited to show you what we've been building, and we'll be in touch soon.",
    "",
    "What happens next",
    "1  We review your request.",
    "2  We reach out within two business days.",
    `3  A private walkthrough, shaped around ${data.organization}.`,
    "",
    "Your details",
    `Name:          ${data.firstName} ${data.lastName}`,
    `Organization:  ${data.organization}`,
    `Role:          ${data.role}`,
    `Email:         ${data.email}`,
    `Phone:         ${prettyPhone(data.phone)}`,
    "",
    `Something to add or change? Write to us at ${SITE.contactEmail}.`,
    "",
    "— The TorchNova Team",
    "",
    `© ${SITE.year} TorchNova · ${siteUrl}`,
    "You're receiving this because a demo was requested with this address. This mailbox isn't monitored, so please don't reply. If this wasn't you, you can ignore this email.",
  ].join("\n");
}

/** Internal notification to the team inbox. Plain on purpose. */
export function demoNotifyText(d: DemoRequestInput): string {
  return [
    "New demo request",
    "",
    `Name:         ${d.firstName} ${d.lastName}`,
    `Email:        ${d.email}`,
    `Phone:        ${prettyPhone(d.phone)}`,
    `Organization: ${d.organization}`,
    `Role:         ${d.role}`,
    `Received:     ${new Date().toISOString()}`,
  ].join("\n");
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
