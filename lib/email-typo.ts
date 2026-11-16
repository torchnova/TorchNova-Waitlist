/** Common mistyped mail domains → the domain the visitor almost certainly meant. */
const DOMAIN_FIXES: Record<string, string> = {
  "gmial.com": "gmail.com", "gmal.com": "gmail.com", "gmai.com": "gmail.com", "gamil.com": "gmail.com",
  "gnail.com": "gmail.com", "gmaill.com": "gmail.com", "gmail.co": "gmail.com", "gmail.cm": "gmail.com",
  "gmail.om": "gmail.com", "gmail.con": "gmail.com", "gmail.cmo": "gmail.com", "googlemail.co": "googlemail.com",
  "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com", "hotmai.com": "hotmail.com", "hotmail.co": "hotmail.com",
  "hotmail.con": "hotmail.com", "outlok.com": "outlook.com", "outloo.com": "outlook.com", "outlook.co": "outlook.com",
  "outlook.con": "outlook.com", "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com", "yahoo.co": "yahoo.com",
  "yahoo.con": "yahoo.com", "iclod.com": "icloud.com", "icoud.com": "icloud.com", "icloud.co": "icloud.com",
  "icloud.con": "icloud.com", "protonmal.com": "protonmail.com", "proton.mi": "proton.me",
};

const TLD_FIXES: Record<string, string> = { con: "com", cmo: "com", ocm: "com", comm: "com", cpm: "com", vom: "com", nte: "net", ogr: "org" };

/** A corrected address to suggest, or null if nothing looks mistyped. */
export function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 1) return null;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  if (!domain.includes(".")) return null;

  const fixed = DOMAIN_FIXES[domain];
  if (fixed) return `${local}@${fixed}`;

  const dot = domain.lastIndexOf(".");
  const tld = domain.slice(dot + 1);
  if (TLD_FIXES[tld]) return `${local}@${domain.slice(0, dot)}.${TLD_FIXES[tld]}`;
  return null;
}
