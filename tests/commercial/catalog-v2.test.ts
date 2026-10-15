import { describe, expect, it } from "vitest";
import {
  commercialStateFromDeepLink,
  parseDemoStudioSearchParams,
  demoStudioUrl,
} from "@/demo-studio/configuration/deep-link";
import { buildCatalogPdf } from "@/commercial/catalog/pdf";
import {
  KB_WHAT_YOU_GET,
  WEB_BASELINE_SCOPE,
  buildBundleGuides,
  buildKbGuides,
} from "@/commercial/catalog/buying-guide-content";
import { PRICE_BOOK_VERSION } from "@/commercial";

describe("Commercial Catalog V2", () => {
  it("deep link: restaurant bundle selects industry + bundle", () => {
    const link = parseDemoStudioSearchParams(
      new URLSearchParams("bundle=restaurant"),
    );
    expect(link).not.toBeNull();
    expect(link!.bundleCode).toBe("BND-REST");
    expect(link!.industry).toBe("restaurant");
    const state = commercialStateFromDeepLink(link!);
    expect(state.bundleCode).toBe("BND-REST");
    expect(state.packageCode).toBeNull();
  });

  it("deep link: package + feature + kb", () => {
    const link = parseDemoStudioSearchParams({
      package: "professional",
      feature: "appointment-booking",
      kb: "growth",
      industry: "beauty",
    });
    expect(link!.packageCode).toBe("WEB-PRO");
    expect(link!.featureCodes).toContain("BKG-APT");
    expect(link!.kbPlan).toBe("KB-GROW");
    expect(demoStudioUrl({ bundle: "restaurant" })).toContain(
      "bundle=restaurant",
    );
  });

  it("bundle guides expose standalone total and savings without customer math", () => {
    const rest = buildBundleGuides().find((b) => b.code === "BND-REST");
    expect(rest).toBeTruthy();
    expect(rest!.components.length).toBeGreaterThanOrEqual(4);
    expect(rest!.showSavings).toBe(true);
    expect(rest!.standaloneTotalTsh).toBe(900000 + 300000 + 600000 + 150000);
    expect(rest!.bundlePriceTsh).toBe(1850000);
    expect(rest!.savingsTsh).toBe(100000);
  });

  it("beauty bundle does not show a misleading buy-separately total", () => {
    const beauty = buildBundleGuides().find((b) => b.code === "BND-BEAUTY");
    expect(beauty).toBeTruthy();
    expect(beauty!.showSavings).toBe(false);
    expect(beauty!.standaloneTotalTsh).toBeNull();
    expect(beauty!.savingsTsh).toBeNull();
    expect(beauty!.pricingNote).toMatch(/entitlement/i);
  });

  it("website baseline is included in all website packages", () => {
    expect(WEB_BASELINE_SCOPE.toLowerCase()).toContain(
      "included in all website packages",
    );
  });

  it("KasiTech Business copy names the approved owner modules", () => {
    const launch = KB_WHAT_YOU_GET.launch.items.join(" ");
    const growth = KB_WHAT_YOU_GET.growth.items.join(" ");
    expect(launch).toMatch(/Overview/i);
    expect(launch).toMatch(/Website/i);
    expect(launch).toMatch(/Analytics/i);
    expect(growth).toMatch(/Catalog/i);
    expect(growth).toMatch(/Bookings/i);
    expect(growth).toMatch(/Customers/i);
    expect(growth).toMatch(/Events/i);
    expect(growth).toMatch(/QR/i);
    expect(growth).toMatch(/Feedback/i);
    expect(growth).toMatch(/Locations/i);
    expect(KB_WHAT_YOU_GET.intro).toMatch(/private dashboard/i);

    const kb = buildKbGuides();
    expect(kb.map((p) => p.item.code)).toEqual([
      "KB-LAUNCH",
      "KB-GROW",
      "KB-PRO",
      "KB-SCALE",
      "KB-ENT",
    ]);
    expect(kb[0]!.included.length).toBeGreaterThanOrEqual(3);
    expect(kb[1]!.included.join(" ")).toMatch(/Bookings/i);
  });

  it("catalog Phase 3.2 PDF is a dense editorial buying guide", async () => {
    const pdf = await buildCatalogPdf();
    expect(pdf.byteLength).toBeGreaterThan(20000);
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(pdf);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(12);
    expect(doc.getPageCount()).toBeLessThan(36);
    expect(doc.getTitle()).toContain(PRICE_BOOK_VERSION);
    expect(doc.getSubject()).toMatch(/buying guide/i);
  });
});
