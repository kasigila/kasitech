/** Set your real WhatsApp number (digits only, country code, no +). */
const WHATSAPP_NUMBER = "12698613487";

export function hasWhatsApp() {
  return WHATSAPP_NUMBER.length >= 9;
}

export function whatsappUrl(message?: string) {
  if (!hasWhatsApp()) return "/start";
  const text = encodeURIComponent(
    message ?? "Hi KasiTech: I'd like to start my project.",
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
