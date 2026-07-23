import { businessCard as c } from "@/lib/card";

/** Escape text for vCard 3.0 property values. */
function esc(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Build a phone-friendly vCard customers can save to Contacts. */
export function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(c.lastName)};${esc(c.firstName)};;;`,
    `FN:${esc(c.fullName)}`,
    `ORG:${esc(c.org)}`,
    `TITLE:${esc(c.title)}`,
    `EMAIL;TYPE=INTERNET,PREF:${esc(c.email)}`,
    `TEL;TYPE=CELL,VOICE,PREF:${esc(c.mobileE164)}`,
    `TEL;TYPE=CELL,VOICE:${esc(c.whatsappE164)}`,
    `item1.URL:${esc(cardWhatsAppLink())}`,
    "item1.X-ABLabel:WhatsApp",
    `URL:${esc(c.website)}`,
    `ADR;TYPE=WORK:;;${esc(c.location)};;;;`,
    `NOTE:${esc(`${c.tagline} · ${c.location}`)}`,
  ];

  if (c.linkedin) {
    lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${esc(c.linkedin)}`);
  }
  if (c.instagram) {
    lines.push(`X-SOCIALPROFILE;TYPE=instagram:${esc(c.instagram)}`);
  }

  lines.push("END:VCARD");
  return `${lines.join("\r\n")}\r\n`;
}

function cardWhatsAppLink() {
  return `https://wa.me/${c.whatsappDigits}`;
}
