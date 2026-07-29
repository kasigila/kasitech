import PDFDocument from "pdfkit";
import { loadPriceBook } from "@/commercial/price-book/load";
import {
  catalogMeta,
  displayItemPrice,
  getBundleViews,
  getBrowsableItems,
  getWebsitePackages,
  billingLabel,
} from "@/commercial/catalog/presentation";
import { PRICE_BOOK_VERSION } from "@/commercial/types";

/** Build a professional catalog PDF buffer from KT-PB-2026.1 (not a webpage print). */
export async function buildCatalogPdf(): Promise<Buffer> {
  const book = loadPriceBook();
  const meta = catalogMeta();
  const packages = getWebsitePackages(book);
  const bundles = getBundleViews(book);
  const services = getBrowsableItems(book).filter(
    (v) =>
      v.item.kind === "SERVICE" ||
      v.item.kind === "SUBSCRIPTION_TIER" ||
      v.item.kind === "CUSTOM_QUOTE_ITEM" ||
      v.item.kind === "THIRD_PARTY_COST",
  );

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 48, bottom: 48, left: 48, right: 48 },
      info: {
        Title: `KasiTech Services & Pricing · ${PRICE_BOOK_VERSION}`,
        Author: "KasiTech",
        Subject: "Client services catalog",
      },
    });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c as Buffer));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const green = "#6a8f00";
    const grey = "#666666";

    doc.fontSize(22).fillColor("#111").text("KasiTech", { continued: false });
    doc.fontSize(14).fillColor("#111").text("Services & Pricing Catalog");
    doc.moveDown(0.4);
    doc.fontSize(9).fillColor(grey).text(`${meta.version} · Tanzania · ${new Date().toISOString().slice(0, 10)}`);
    doc.moveDown(0.6);
    doc.fontSize(10).fillColor("#333").text(meta.tagline);
    doc.moveDown(0.3);
    doc.fontSize(8).fillColor(grey).text(meta.currencyNote);
    doc.text(meta.disclaimer, { width: 500 });
    doc.moveDown(1);

    section(doc, "Website packages");
    for (const p of packages) {
      lineItem(doc, p.name, displayItemPrice(p), p.clientDescription);
    }

    doc.moveDown(0.8);
    section(doc, "Popular bundles");
    for (const b of bundles) {
      lineItem(doc, b.item.name, b.priceLabel, b.item.clientDescription);
      if (b.savings?.showSavings && b.savings.savingsTsh != null) {
        doc.fontSize(8).fillColor(green).text(
          `  Approved savings vs standalone: TSh ${b.savings.savingsTsh.toLocaleString("en-TZ")}`,
        );
      }
    }

    doc.moveDown(0.8);
    section(doc, "Services");
    let lastCat = "";
    for (const v of services) {
      if (v.item.category !== lastCat) {
        lastCat = v.item.category;
        doc.moveDown(0.4);
        doc.fontSize(9).fillColor(green).text(lastCat.toUpperCase());
      }
      lineItem(
        doc,
        `${v.item.name} · ${billingLabel(v.item.billing)}`,
        v.priceLabel,
        v.item.clientDescription,
      );
    }

    doc.moveDown(1);
    section(doc, "Notes");
    doc
      .fontSize(8)
      .fillColor(grey)
      .text(
        "Formal quotations confirm final scope, compatibility, timeline, third-party fees, applicable taxes, and commercial terms before commencement. This catalog estimate is not an invoice.",
        { width: 500 },
      );
    doc.moveDown(0.5);
    doc.text("kasitechinnovations.com · Dar es Salaam, Tanzania");

    doc.end();
  });
}

function section(doc: PDFKit.PDFDocument, title: string) {
  doc.fontSize(11).fillColor("#111").text(title);
  doc.moveDown(0.3);
}

function lineItem(
  doc: PDFKit.PDFDocument,
  name: string,
  price: string,
  detail: string,
) {
  doc.fontSize(9).fillColor("#111").text(name, { continued: true });
  doc.fillColor("#333").text(`  ${price}`);
  doc.fontSize(7).fillColor("#777").text(detail, { width: 500 });
  doc.moveDown(0.25);
}
