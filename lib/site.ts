/** Company facts used across the site, legal pages and emails. */
export const SITE = {
  name: "TorchNova",
  // TODO: confirm the public contact inbox before submitting the application.
  contactEmail: "contact@torchnova.com",
  /** Public address shown in emails and link previews. */
  url: "https://torchnova.com",
  year: new Date().getFullYear(),
} as const;

/**
 * The public base URL for emails and link previews. Uses
 * NEXT_PUBLIC_SITE_URL unless it points at a local dev address.
 */
export function publicUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return env && !/localhost|127\.0\.0\.1/.test(env) ? env.replace(/\/+$/, "") : SITE.url;
}
