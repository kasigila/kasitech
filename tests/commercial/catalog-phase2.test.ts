import { describe, expect, it } from "vitest";
import { loadPriceBook } from "../../src/commercial/price-book/load";
import {
  billingLabel,
  catalogMeta,
  coverageReport,
  displayItemPrice,
  getBrowsableItems,
  getBundleViews,
  getWebsitePackages,
  searchCatalog,
} from "../../src/commercial/catalog/presentation";
import { buildCatalogPdf } from "../../src/commercial/catalog/pdf";
import { priceConfiguration } from "../../src/commercial/engines/pricing";

describe("Phase 2 catalog presentation", () => {
  const book = loadPriceBook();

  it("covers every non-entitlement canonical item in browse or intentional omission", () => {
    const report = coverageReport(book);
    expect(report.missingFromBrowse).toEqual([]);
    expect(report.browsableCount).toBeGreaterThan(100);
  });

  it("displays prices equal to engine integer prices", () => {
    for (const v of getBrowsableItems(book)) {
      if (v.item.priceTsh != null && v.item.billing === "ONE_TIME") {
        expect(v.priceLabel).toContain(
          v.item.priceTsh.toLocaleString("en-TZ"),
        );
      }
      if (v.item.billing === "CUSTOM_QUOTE") {
        expect(v.priceLabel).toBe("Custom Quote");
        expect(v.priceLabel).not.toMatch(/\d{3,}/);
      }
    }
  });

  it("billing labels distinguish monthly from one-time", () => {
    const monthly = book.itemByCode.get("SEO-GROW")!;
    const once = book.itemByCode.get("SEO-FND")!;
    expect(billingLabel(monthly.billing)).toBe("PER MONTH");
    expect(billingLabel(once.billing)).toBe("ONE-TIME");
    expect(displayItemPrice(monthly)).toContain("/ month");
  });

  it("third-party items are classified", () => {
    const domain = getBrowsableItems(book).find((v) => v.item.code === "HOST-DOMAIN");
    expect(domain?.billingLabel).toBe("THIRD-PARTY");
  });

  it("website packages are the seven approved packages", () => {
    const pkgs = getWebsitePackages(book).map((p) => p.code);
    expect(pkgs).toEqual([
      "WEB-ONE",
      "WEB-ESS",
      "WEB-BUS",
      "WEB-BUSP",
      "WEB-PRO",
      "WEB-SIG",
      "WEB-CUS",
    ]);
  });

  it("bundle savings match engine", () => {
    const views = getBundleViews(book);
    for (const v of views) {
      const engine = priceConfiguration({ selections: [v.item.code] }, book);
      expect(v.savings?.showSavings).toBe(engine.bundleSavings?.showSavings);
      expect(v.savings?.savingsTsh).toBe(engine.bundleSavings?.savingsTsh ?? null);
      if (!engine.bundleSavings?.showSavings) {
        expect(v.savings?.showSavings).toBe(false);
      }
    }
  });

  it("search finds appointments, restaurant, school, Instagram", () => {
    const items = getBrowsableItems(book);
    expect(searchCatalog("appointments", items).some((v) => v.item.code === "BKG-APT")).toBe(true);
    expect(searchCatalog("restaurant", items).length).toBeGreaterThan(0);
    expect(searchCatalog("school", items).some((v) => v.item.code.startsWith("EDU"))).toBe(true);
    expect(searchCatalog("Instagram", items).some((v) => v.item.code.startsWith("SOC"))).toBe(true);
    expect(searchCatalog("sell products", items).some((v) => v.item.code.startsWith("ECOM"))).toBe(true);
  });

  it("catalog meta exposes price book version", () => {
    expect(catalogMeta().version).toBe("KT-PB-2026.1");
  });

  it("PDF generates and embeds price book version", async () => {
    const pdf = await buildCatalogPdf();
    expect(pdf.byteLength).toBeGreaterThan(1000);
    expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(pdf);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(5);
    expect(doc.getTitle()).toContain("KT-PB-2026.1");
    expect(doc.getAuthor()).toBe("KasiTech");
  });
});
