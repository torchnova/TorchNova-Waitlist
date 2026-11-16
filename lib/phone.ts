import { AsYouType, isValidPhoneNumber, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/min";

/**
 * Best guess at the visitor's country from the browser locale (e.g. "en-GB"
 * → GB), used only to read numbers typed without a country code.
 */
export function guessCountry(): CountryCode {
  if (typeof navigator === "undefined") return "US";
  for (const tag of navigator.languages ?? [navigator.language]) {
    const region = tag?.split("-")[1]?.toUpperCase();
    if (region && /^[A-Z]{2}$/.test(region)) return region as CountryCode;
  }
  return "US";
}

/** E.164 form (e.g. +14155550134) if the number is valid, otherwise null. */
export function normalizePhone(value: string, country: CountryCode): string | null {
  const parsed = parsePhoneNumberFromString(value, country);
  return parsed && parsed.isValid() ? parsed.number : null;
}

/** Readable form for the field once the visitor leaves it. */
export function displayPhone(value: string, country: CountryCode): string {
  const parsed = parsePhoneNumberFromString(value, country);
  if (!parsed || !parsed.isValid()) return value;
  return parsed.country === country ? parsed.formatNational() : parsed.formatInternational();
}

/** Formats digits as they are typed (only when the caret is at the end). */
export function formatAsYouType(value: string, country: CountryCode): string {
  return new AsYouType(country).input(value);
}

/** Server-side check: accepts E.164 / international numbers only. */
export function isValidE164(value: string): boolean {
  return value.startsWith("+") && isValidPhoneNumber(value);
}

/** International display form, used in emails. */
export function prettyPhone(value: string): string {
  return parsePhoneNumberFromString(value)?.formatInternational() ?? value;
}
