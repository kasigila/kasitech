import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM,
  CONTACT_LINKEDIN,
  MOBILE_DISPLAY,
  MOBILE_E164,
  SITE_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_E164,
} from "@/lib/contact";

/** KasiTech digital business card: source of truth for /card + vCard. */
export const businessCard = {
  org: "KasiTech",
  fullName: "Karen Marie Kasigila",
  firstName: "Karen Marie",
  lastName: "Kasigila",
  title: "Founder",
  tagline: "Digital products that work",
  location: "Dar es Salaam, Tanzania",
  website: SITE_URL,
  cardUrl: `${SITE_URL}/card`,
  email: CONTACT_EMAIL,
  mobile: MOBILE_DISPLAY,
  mobileE164: `+${MOBILE_E164}`,
  mobileDigits: MOBILE_E164,
  whatsapp: WHATSAPP_DISPLAY,
  whatsappE164: `+${WHATSAPP_E164}`,
  whatsappDigits: WHATSAPP_E164,
  linkedin: CONTACT_LINKEDIN,
  instagram: CONTACT_INSTAGRAM,
} as const;

export function cardWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(
    message ?? "Hi KasiTech: I saved your card and would like to talk.",
  );
  return `https://wa.me/${businessCard.whatsappDigits}?text=${text}`;
}
