const WHATSAPP_NUMBER = "255700000000"; // Replace with live number when ready

export function whatsappUrl(message?: string) {
  const text = encodeURIComponent(
    message ?? "Hi KasiTech — I'd like to start a project.",
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
