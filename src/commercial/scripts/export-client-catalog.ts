/**
 * Generate a client-shareable Services & Pricing PDF into public/.
 * Run: npx tsx src/commercial/scripts/export-client-catalog.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { buildCatalogPdf } from "../catalog/pdf";
import { PRICE_BOOK_VERSION } from "../types";

async function main() {
  const buf = await buildCatalogPdf();
  const dir = resolve(process.cwd(), "public");
  mkdirSync(dir, { recursive: true });
  const file = `KasiTech_Services_Pricing_${PRICE_BOOK_VERSION}.pdf`;
  const path = resolve(dir, file);
  writeFileSync(path, buf);
  // Stable share URL alias
  writeFileSync(resolve(dir, "KasiTech_Services_Pricing.pdf"), buf);
  console.log(`Wrote ${path} (${buf.length} bytes)`);
  console.log(`Also wrote public/KasiTech_Services_Pricing.pdf`);
  console.log(`Share: https://www.kasitechinnovations.com/KasiTech_Services_Pricing.pdf`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
