import { NextResponse } from "next/server";
import { buildCatalogPdf } from "@/commercial/catalog/pdf";
import { PRICE_BOOK_VERSION } from "@/commercial/types";

export const runtime = "nodejs";

export async function GET() {
  const pdf = await buildCatalogPdf();
  const filename = `KasiTech_Services_Pricing_${PRICE_BOOK_VERSION}.pdf`;
  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
