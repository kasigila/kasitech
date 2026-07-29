import { describe, expect, it } from "vitest";
import {
  CANONICAL_ITEM_COUNT,
  loadPriceBook,
  priceConfiguration,
  validatePriceBookIntegrity,
} from "../../src/commercial";

describe("KT-PB-2026.1 integrity", () => {
  it("loads exactly 144 canonical items", () => {
    const book = loadPriceBook();
    expect(book.items.length).toBe(144);
    expect(CANONICAL_ITEM_COUNT).toBe(144);
  });

  it("passes integrity validation", () => {
    const v = validatePriceBookIntegrity();
    expect(v.ok).toBe(true);
  });

  it("resolves all aliases to one canonical each", () => {
    const book = loadPriceBook();
    for (const a of book.aliases) {
      expect(book.itemByCode.has(a.canonicalCode)).toBe(true);
    }
    expect(book.aliases.length).toBe(5);
  });

  it("entitlements have no invented prices", () => {
    const book = loadPriceBook();
    for (const e of book.entitlements) {
      expect(e.sellable).toBe(false);
      expect(e.comparableStandaloneCode).toBeNull();
    }
  });

  it("includes required exclusive families", () => {
    const codes = loadPriceBook().families.map((f) => f.code);
    for (const c of [
      "BOOKING_APPOINTMENT",
      "RESTAURANT_MENU",
      "LOGISTICS_TRACKING",
      "ECOM_STORE",
      "SEO_SETUP",
      "SEO_RECURRING",
      "SOCIAL_PLAN",
      "CARE_PLAN",
      "KB_PLAN",
    ]) {
      expect(codes).toContain(c);
    }
  });
});

describe("golden financial configurations", () => {
  it("Online Store bundle = 2,850,000 with TSh 50,000 savings", () => {
    const r = priceConfiguration({ selections: ["BND-STORE"] });
    expect(r.validation.ok).toBe(true);
    expect(r.totals.oneTimeTsh).toBe(2_850_000);
    expect(r.totals.monthlyTsh).toBe(0);
    expect(r.bundleSavings?.showSavings).toBe(true);
    expect(r.bundleSavings?.savingsTsh).toBe(50_000);
    expect(r.charges.some((c) => c.itemCode === "WEB-ESS")).toBe(false);
    expect(r.charges.some((c) => c.itemCode === "PAY-STD")).toBe(false);
  });

  it("Real Estate bundle = 2,650,000 savings 200,000", () => {
    const r = priceConfiguration({ selections: ["BND-RE"] });
    expect(r.totals.oneTimeTsh).toBe(2_650_000);
    expect(r.bundleSavings?.savingsTsh).toBe(200_000);
  });

  it("Professional Presence = 3,750,000 savings 400,000", () => {
    const r = priceConfiguration({ selections: ["BND-PRES"] });
    expect(r.totals.oneTimeTsh).toBe(3_750_000);
    expect(r.bundleSavings?.savingsTsh).toBe(400_000);
  });

  it("Restaurant bundle shows savings 100,000 (gallery is entitlement)", () => {
    const r = priceConfiguration({ selections: ["BND-REST"] });
    expect(r.totals.oneTimeTsh).toBe(1_850_000);
    expect(r.bundleSavings?.showSavings).toBe(true);
    expect(r.bundleSavings?.savingsTsh).toBe(100_000);
    expect(r.entitlements).toContain("ENT-GALLERY");
  });

  it("Business Launch hides manufactured savings", () => {
    const r = priceConfiguration({ selections: ["BND-LAUNCH"] });
    expect(r.totals.oneTimeTsh).toBe(1_250_000);
    expect(r.bundleSavings?.showSavings).toBe(false);
  });

  it("Beauty & Booking hides manufactured savings", () => {
    const r = priceConfiguration({ selections: ["BND-BEAUTY"] });
    expect(r.totals.oneTimeTsh).toBe(1_050_000);
    expect(r.bundleSavings?.showSavings).toBe(false);
    expect(r.entitlements).toEqual(
      expect.arrayContaining(["ENT-GALLERY", "ENT-SOCIAL-INTEGRATION"]),
    );
  });

  it("Digital Growth is monthly 2,250,000 without savings", () => {
    const r = priceConfiguration({ selections: ["BND-GROW"] });
    expect(r.totals.oneTimeTsh).toBe(0);
    expect(r.totals.monthlyTsh).toBe(2_250_000);
    expect(r.totals.estimatedFirst12MonthsTsh).toBe(2_250_000 * 12);
    expect(r.bundleSavings?.showSavings).toBe(false);
    expect(r.entitlements).toContain("ENT-GROWTH-WEBSITE-CONTENT");
  });

  it("alias NGO Donations charges PAY-DON once only", () => {
    const r = priceConfiguration({
      selections: ["ALIAS-NGO-DON", "PAY-DON"],
    });
    const pay = r.charges.filter((c) => c.itemCode === "PAY-DON");
    expect(pay.length).toBe(1);
    expect(r.totals.oneTimeTsh).toBe(500_000);
  });

  it("Campaign Landing alias charges ADD-LAND once", () => {
    const r = priceConfiguration({
      selections: ["ALIAS-ADS-LAND", "ADD-LAND"],
    });
    expect(r.charges.filter((c) => c.itemCode === "ADD-LAND").length).toBe(1);
    expect(r.totals.oneTimeTsh).toBe(250_000);
  });

  it("P1-A: PAY-DON does not auto-add PAY-STD", () => {
    const r = priceConfiguration({ selections: ["PAY-DON"] });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["PAY-DON"]);
    expect(r.totals.oneTimeTsh).toBe(500_000);
  });

  it("P1-E: EDU-FEE does not auto-add PAY-STD or PAY-REC", () => {
    const r = priceConfiguration({ selections: ["EDU-FEE"] });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["EDU-FEE"]);
    expect(r.totals.oneTimeTsh).toBe(750_000);
  });

  it("P1-B: BKG-STAFF replaces BKG-APT — charge 1,250,000 only", () => {
    const r = priceConfiguration({
      selections: ["BKG-APT", "BKG-STAFF"],
    });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["BKG-STAFF"]);
    expect(r.totals.oneTimeTsh).toBe(1_250_000);
  });

  it("P1-B: REST-AMENU replaces REST-MENU", () => {
    const r = priceConfiguration({
      selections: ["REST-MENU", "REST-AMENU"],
    });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["REST-AMENU"]);
    expect(r.totals.oneTimeTsh).toBe(450_000);
  });

  it("P1-B: LOG-API replaces LOG-TRACK", () => {
    const r = priceConfiguration({
      selections: ["LOG-TRACK", "LOG-API"],
    });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["LOG-API"]);
    expect(r.totals.oneTimeTsh).toBe(1_250_000);
  });

  it("package inclusion: WEB-BUS + ADD-BLOG does not double-charge blog", () => {
    const r = priceConfiguration({
      selections: ["WEB-BUS", "ADD-BLOG"],
    });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["WEB-BUS"]);
    expect(r.totals.oneTimeTsh).toBe(1_500_000);
  });

  it("Business + Appointment Booking golden total", () => {
    const r = priceConfiguration({
      selections: ["WEB-BUS", "BKG-APT"],
    });
    expect(r.totals.oneTimeTsh).toBe(1_500_000 + 650_000);
    expect(r.totals.estimatedFirst12MonthsTsh).toBe(2_150_000);
  });

  it("Priority delivery +25% on one-time only", () => {
    const r = priceConfiguration({
      selections: ["WEB-ESS"],
      delivery: "PRIORITY",
    });
    // 900,000 + 25% = 225,000 surcharge → 1,125,000
    expect(r.totals.oneTimeTsh).toBe(1_125_000);
  });

  it("snapshot freezes price book version", () => {
    const r = priceConfiguration({ selections: ["WEB-ONE"] });
    expect(r.snapshot.priceBookVersion).toBe("KT-PB-2026.1");
    expect(r.snapshot.totals.oneTimeTsh).toBe(500_000);
  });

  it("store tiers are exclusive", () => {
    const r = priceConfiguration({
      selections: ["ECOM-START", "ECOM-BUS"],
    });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["ECOM-BUS"]);
    expect(r.totals.oneTimeTsh).toBe(2_500_000);
  });

  it("SEO_SETUP: SEO-FND alone charges 400,000", () => {
    const r = priceConfiguration({ selections: ["SEO-FND"] });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["SEO-FND"]);
    expect(r.totals.oneTimeTsh).toBe(400_000);
  });

  it("SEO_SETUP: SEO-FND + SEO-PRO charges SEO-PRO only 750,000", () => {
    const r = priceConfiguration({
      selections: ["SEO-FND", "SEO-PRO"],
    });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["SEO-PRO"]);
    expect(r.totals.oneTimeTsh).toBe(750_000);
  });

  it("SEO_SETUP: SEO-FND + SEO-PRO + SEO-ADV charges SEO-ADV only 1,250,000", () => {
    const r = priceConfiguration({
      selections: ["SEO-FND", "SEO-PRO", "SEO-ADV"],
    });
    expect(r.charges.map((c) => c.itemCode)).toEqual(["SEO-ADV"]);
    expect(r.totals.oneTimeTsh).toBe(1_250_000);
  });

  it("SEO_SETUP and SEO_RECURRING remain separate families", () => {
    const r = priceConfiguration({
      selections: ["SEO-ADV", "SEO-GROW"],
    });
    expect(r.charges.map((c) => c.itemCode).sort()).toEqual([
      "SEO-ADV",
      "SEO-GROW",
    ]);
    expect(r.totals.oneTimeTsh).toBe(1_250_000);
    expect(r.totals.monthlyTsh).toBe(650_000);
  });
});
