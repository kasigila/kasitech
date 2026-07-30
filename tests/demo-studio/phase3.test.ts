import { describe, expect, it, beforeEach } from "vitest";
import {
  PRICE_BOOK_VERSION,
  priceConfiguration,
  formatTsh,
  loadPriceBook,
} from "@/commercial";
import { addBusinessDays as addBd } from "@/demo-studio/configuration/delivery-calendar";
import {
  clearMemoryConfigStore,
  createMemoryConfigStore,
} from "@/demo-studio/persistence/memory";
import { generateConfigurationId, generateEditToken } from "@/demo-studio/persistence/types";
import { buildProjectEstimatePdf } from "@/demo-studio/estimate/pdf";
import {
  clearMemorySubmissions,
  persistSubmissionIntent,
} from "@/demo-studio/persistence/submissions";
import type { CommercialConfigState } from "@/demo-studio/types";
import {
  priceStudioConfiguration,
  emptyCommercialState,
  resolvePreviewCapabilities,
  demoCoverageReport,
  assertFullCoverage,
  ALL_INDUSTRIES,
  businessForIndustry,
  FEATURE_REGISTRY,
  chargeableRecommendations,
  detectEligibleBundles,
  replaceExclusiveMember,
  estimateDelivery,
} from "@/demo-studio";

describe("Phase 3 Demo Studio", () => {
  beforeEach(() => {
    clearMemoryConfigStore();
    clearMemorySubmissions();
  });

  it("coverage: every Price Book item has intentional treatment", () => {
    assertFullCoverage();
    const { rows, missing } = demoCoverageReport();
    expect(missing).toEqual([]);
    expect(rows.length).toBeGreaterThanOrEqual(146);
    const treatments = new Set(rows.map((r) => r.treatment));
    expect(treatments.size).toBeGreaterThan(5);
  });

  it("commercial: studio totals equal Phase 1 engine", () => {
    const state: CommercialConfigState = {
      ...emptyCommercialState(),
      industry: "beauty",
      packageCode: "WEB-ESS",
      featureCodes: ["BKG-APT", "PAY-STD"],
      carePlan: "CARE-STD",
      delivery: "STANDARD",
    };
    const studio = priceStudioConfiguration(state);
    const engine = priceConfiguration({
      selections: ["WEB-ESS", "BKG-APT", "PAY-STD", "CARE-STD"],
      delivery: "STANDARD",
    });
    expect(studio.totals).toEqual(engine.totals);
    expect(studio.charges.map((c) => c.itemCode).sort()).toEqual(
      engine.charges.map((c) => c.itemCode).sort(),
    );
  });

  it("package: included features never double-charge", () => {
    const withBlog = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "general",
      packageCode: "WEB-BUS",
      featureCodes: ["ADD-BLOG"],
      delivery: "STANDARD",
    });
    expect(
      withBlog.charges.some((c) => c.itemCode === "ADD-BLOG"),
    ).toBe(false);
    expect(withBlog.suppressedCodes.some((s) => s.code === "ADD-BLOG")).toBe(
      true,
    );
  });

  it("bundle: absorption works", () => {
    const r = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "restaurant",
      bundleCode: "BND-REST",
      featureCodes: ["REST-MENU", "BKG-REST"],
      delivery: "STANDARD",
    });
    expect(r.charges.some((c) => c.itemCode === "BND-REST")).toBe(true);
    expect(r.charges.some((c) => c.itemCode === "REST-MENU")).toBe(false);
    expect(r.charges.some((c) => c.itemCode === "BKG-REST")).toBe(false);
  });

  it("upgrade: exclusive booking replaces lower tier", () => {
    const r = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "beauty",
      featureCodes: replaceExclusiveMember(
        replaceExclusiveMember([], "BKG-APT"),
        "BKG-STAFF",
      ),
      delivery: "STANDARD",
    });
    expect(r.charges.some((c) => c.itemCode === "BKG-STAFF")).toBe(true);
    expect(r.charges.some((c) => c.itemCode === "BKG-APT")).toBe(false);
  });

  it("upgrade: SEO_SETUP replaces lower tiers", () => {
    const r = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "general",
      seoSetup: "SEO-ADV",
      featureCodes: ["SEO-FND", "SEO-PRO"],
      delivery: "STANDARD",
    });
    // seoSetup + featureCodes both feed selections — highest wins
    const codes = r.charges.map((c) => c.itemCode);
    expect(codes).toContain("SEO-ADV");
    expect(codes).not.toContain("SEO-FND");
    expect(codes).not.toContain("SEO-PRO");
  });

  it("payments: selecting deposit does not auto-charge PAY-STD", () => {
    const r = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "general",
      featureCodes: ["PAY-DEP"],
      delivery: "STANDARD",
    });
    expect(r.charges.some((c) => c.itemCode === "PAY-STD")).toBe(false);
    expect(r.charges.some((c) => c.itemCode === "PAY-DEP")).toBe(true);
  });

  it("industries: all 12 load with distinct fictional businesses", () => {
    const keys = new Set<string>();
    for (const ind of ALL_INDUSTRIES) {
      const b = businessForIndustry(ind.id);
      expect(b.name.length).toBeGreaterThan(3);
      expect(b.hero.title.length).toBeGreaterThan(5);
      keys.add(b.key);
    }
    expect(keys.size).toBe(12);
  });

  it("feature registry: every demo-supported feature maps to catalog capability", () => {
    const book = loadPriceBook();
    for (const f of FEATURE_REGISTRY.filter((x) => x.demoSupported)) {
      const ok =
        book.itemByCode.has(f.featureCode) ||
        book.entitlementCodes.has(f.featureCode);
      expect(ok, f.featureCode).toBe(true);
    }
  });

  it("feature visualization: booking + blog alter preview flags", () => {
    const off = resolvePreviewCapabilities({
      ...emptyCommercialState(),
      industry: "beauty",
      packageCode: "WEB-ONE",
      featureCodes: [],
      delivery: "STANDARD",
    });
    expect(off.blog).toBeFalsy();
    expect(off.bookingApt).toBeFalsy();

    const on = resolvePreviewCapabilities({
      ...emptyCommercialState(),
      industry: "beauty",
      packageCode: "WEB-BUS",
      featureCodes: ["BKG-APT"],
      delivery: "STANDARD",
    });
    expect(on.blog).toBe(true); // included in WEB-BUS
    expect(on.bookingApt).toBe(true);
  });

  it("delivery: business-day calendar and relative acceleration", () => {
    const d0 = new Date("2026-07-27T12:00:00Z"); // Monday
    const d5 = addBd(d0, 5);
    expect(d5.getUTCDay()).not.toBe(0);
    expect(d5.getUTCDay()).not.toBe(6);

    const std = estimateDelivery("WEB-ESS", "STANDARD", d0);
    expect(std.hasPreciseTimeline).toBe(true);
    expect(std.baselineLabel).toMatch(/business days/);

    const pri = estimateDelivery("WEB-ESS", "PRIORITY", d0);
    expect(pri.acceleratedLabel).toMatch(/25%/);
  });

  it("save + share restore: configuration persists with snapshot", async () => {
    const store = createMemoryConfigStore();
    const state: CommercialConfigState = {
      ...emptyCommercialState(),
      industry: "tourism",
      bundleCode: "BND-TOUR",
      featureCodes: chargeableRecommendations("tourism"),
      delivery: "PRIORITY",
    };
    const pricing = priceStudioConfiguration(state);
    const token = generateEditToken();
    const saved = await store.save(
      {
        industry: "tourism",
        fictionalBusinessKey: "tembea-tanzania",
        packageCode: null,
        bundleCode: "BND-TOUR",
        selectedFeatures: state.featureCodes,
        carePlan: null,
        kbPlan: null,
        seoSetup: null,
        seoRecurring: null,
        socialPlan: null,
        deliveryOption: "PRIORITY",
        commercialSnapshot: pricing.snapshot,
      },
      token,
    );
    expect(saved.configurationId.startsWith("KT-CONFIG-")).toBe(true);
    expect(saved.priceBookVersion).toBe(PRICE_BOOK_VERSION);

    const loaded = await store.getById(saved.configurationId);
    expect(loaded?.commercialSnapshot.totals).toEqual(pricing.snapshot.totals);
    expect(loaded?.bundleCode).toBe("BND-TOUR");
  });

  it("old Price Book: snapshot totals preserved (no silent reprice)", async () => {
    const store = createMemoryConfigStore();
    const pricing = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "general",
      packageCode: "WEB-ESS",
      delivery: "STANDARD",
    });
    const oldSnap = {
      ...pricing.snapshot,
      priceBookVersion: "KT-PB-2025.9" as typeof PRICE_BOOK_VERSION,
      totals: {
        ...pricing.snapshot.totals,
        oneTimeTsh: 123456,
      },
    };
    const saved = await store.save(
      {
        industry: "general",
        fictionalBusinessKey: "mara-and-co",
        packageCode: "WEB-ESS",
        bundleCode: null,
        selectedFeatures: [],
        carePlan: null,
        kbPlan: null,
        seoSetup: null,
        seoRecurring: null,
        socialPlan: null,
        deliveryOption: "STANDARD",
        commercialSnapshot: oldSnap,
      },
      generateEditToken(),
    );
    const loaded = await store.getById(saved.configurationId);
    expect(loaded?.priceBookVersion).toBe("KT-PB-2025.9");
    expect(loaded?.commercialSnapshot.totals.oneTimeTsh).toBe(123456);
    // Live engine would differ — snapshot must win for display
    expect(pricing.totals.oneTimeTsh).not.toBe(123456);
  });

  it("estimate PDF embeds configuration id and price book version", async () => {
    const pricing = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "retail",
      packageCode: "WEB-ESS",
      featureCodes: ["ECOM-START", "PAY-STD"],
      delivery: "STANDARD",
    });
    const pdf = await buildProjectEstimatePdf({
      configurationId: "KT-CONFIG-TEST01",
      industry: "retail",
      packageCode: "WEB-ESS",
      bundleCode: null,
      delivery: "STANDARD",
      snapshot: pricing.snapshot,
    });
    expect(pdf.byteLength).toBeGreaterThan(800);
    expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(pdf);
    expect(doc.getTitle()).toContain("KT-CONFIG-TEST01");
    expect(doc.getSubject()).toContain(PRICE_BOOK_VERSION);
  });

  it("validation: unknown selection yields client-facing failure path", () => {
    const r = priceConfiguration({
      selections: ["NOT-A-REAL-SKU"],
      delivery: "STANDARD",
    });
    expect(r.validation.ok).toBe(false);
  });

  it("submission intent persists for Phase 4", async () => {
    const store = createMemoryConfigStore();
    const pricing = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "ngo",
      packageCode: "WEB-ESS",
      delivery: "STANDARD",
    });
    const saved = await store.save(
      {
        industry: "ngo",
        fictionalBusinessKey: "mwangaza-foundation",
        packageCode: "WEB-ESS",
        bundleCode: null,
        selectedFeatures: [],
        carePlan: null,
        kbPlan: null,
        seoSetup: null,
        seoRecurring: null,
        socialPlan: null,
        deliveryOption: "STANDARD",
        commercialSnapshot: pricing.snapshot,
      },
      generateEditToken(),
    );
    const sub = await persistSubmissionIntent({
      configurationId: saved.configurationId,
      name: "Test User",
      businessName: "Test Org",
      email: "test@example.com",
      phone: "+255700000000",
      message: "Phase 3 test",
    });
    expect(sub.leadStatus).toBe("pending");
    expect(sub.configurationId).toBe(saved.configurationId);
  });

  it("bundle detection: eligible bundles surface without inventing savings", () => {
    const state: CommercialConfigState = {
      ...emptyCommercialState(),
      industry: "restaurant",
      packageCode: "WEB-ESS",
      featureCodes: ["REST-MENU", "BKG-REST", "LOC-GBP"],
      delivery: "STANDARD",
    };
    const hints = detectEligibleBundles(state);
    const rest = hints.find((h) => h.bundleCode === "BND-REST");
    expect(rest?.matches).toBe(true);
    // Restaurant bundle has legitimate savings in engine when gallery free
    if (rest?.showSavings) {
      expect(rest.savingsTsh).toBeGreaterThan(0);
    }
  });

  it("configuration ids are collision-resistant format", () => {
    const a = generateConfigurationId();
    const b = generateConfigurationId();
    expect(a).toMatch(/^KT-CONFIG-[A-F0-9]{12}$/);
    expect(a).not.toBe(b);
  });

  it("formatTsh still used for display (sanity)", () => {
    expect(formatTsh(650000)).toContain("650");
  });
});
