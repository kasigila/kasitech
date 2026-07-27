/**
 * Single source of truth for public contact details.
 * Prefer env overrides when a domain mailbox / numbers change.
 *
 * Domain email: set NEXT_PUBLIC_CONTACT_EMAIL when ready
 * (e.g. hello@kasitechinnovations.com). Until then we keep the
 * current public address so nothing breaks.
 */

export const SITE_URL = "https://www.kasitechinnovations.com";
export const SITE_HOST = "www.kasitechinnovations.com";

/** Primary project chat — WhatsApp (reachable worldwide). */
export const WHATSAPP_E164 = "12698613487";
export const WHATSAPP_DISPLAY = "+1 269 861 3487";

/** Tanzania mobile for calls / SMS (not primary project chat). */
export const MOBILE_E164 = "255626000005";
export const MOBILE_DISPLAY = "+255 626 000 005";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "karen_marie1@icloud.com";

export const CONTACT_LINKEDIN =
  "https://www.linkedin.com/in/karen-marie-kasigila-443b73242";

export const CONTACT_INSTAGRAM =
  "https://www.instagram.com/kasitechinnovations";

export const CONTACT_PRIMARY_NOTE =
  "Project chat: WhatsApp. Tanzania mobile is for calls/SMS.";

export function emailHref(address = CONTACT_EMAIL) {
  return address.startsWith("mailto:") ? address : `mailto:${address}`;
}

/** Digits only, 8–15 length after stripping — E.164-ish without forcing +. */
export function normalizePhoneDigits(raw: string) {
  return raw.replace(/\D/g, "");
}

export function isValidPhone(raw: string) {
  const digits = normalizePhoneDigits(raw);
  return digits.length >= 8 && digits.length <= 15;
}
