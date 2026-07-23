import { social } from "@/lib/social";

/** KasiTech digital business card: source of truth for /card + vCard. */
export const businessCard = {
  org: "KasiTech",
  fullName: "Karen Marie Kasigila",
  firstName: "Karen Marie",
  lastName: "Kasigila",
  title: "Founder",
  tagline: "Digital products that work",
  location: "Dar es Salaam, Tanzania",
  website: "https://kasitechinnovations.com",
  cardUrl: "https://kasitechinnovations.com/card",
  email: "karen_marie1@icloud.com",
  mobile: "+255 626 000 005",
  mobileE164: "+255626000005",
  mobileDigits: "255626000005",
  whatsapp: "+1 269 861 3487",
  whatsappE164: "+12698613487",
  whatsappDigits: "12698613487",
  linkedin: social.linkedin,
  instagram: social.instagram,
} as const;

export function cardWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(
    message ?? "Hi KasiTech: I saved your card and would like to talk.",
  );
  return `https://wa.me/${businessCard.whatsappDigits}?text=${text}`;
}
