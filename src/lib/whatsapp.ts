import { WHATSAPP_E164 } from "@/lib/contact";

export function hasWhatsApp() {
  return WHATSAPP_E164.length >= 9;
}

export function whatsappUrl(message?: string) {
  if (!hasWhatsApp()) return "/start";
  const text = encodeURIComponent(
    message ?? "Hi KasiTech: I'd like to start my project.",
  );
  return `https://wa.me/${WHATSAPP_E164}?text=${text}`;
}
