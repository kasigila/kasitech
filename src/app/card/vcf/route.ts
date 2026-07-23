import { buildVCard } from "@/lib/vcard";

export function GET() {
  const body = buildVCard();

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="KasiTech.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
