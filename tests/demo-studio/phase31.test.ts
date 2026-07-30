import { afterEach, describe, expect, it, vi } from "vitest";
import {
  emptyCommercialState,
  detectEligibleBundles,
  detectPackageBundleOverlap,
  FEATURE_REGISTRY,
  normalizeExclusiveFeatureCodes,
  replaceExclusiveMember,
  resolvePreviewCapabilities,
  priceStudioConfiguration,
} from "@/demo-studio";
import { buildProjectEstimatePdf } from "@/demo-studio/estimate/pdf";
import {
  getConfigStore,
  PersistenceMisconfiguredError,
  productionRequiresDatabase,
  resetConfigStoreCache,
  useMemoryConfigStoreForTests,
} from "@/demo-studio/persistence/store";
import { generateEditToken } from "@/demo-studio/persistence/types";
import type { CommercialConfigState } from "@/demo-studio/types";

describe("Phase 3.1 Demo Studio hardening", () => {
  afterEach(() => {
    resetConfigStoreCache();
    vi.unstubAllEnvs();
  });

  it("persistence: production cannot silently use memory without DATABASE_URL", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("DEMO_STUDIO_ALLOW_MEMORY", "");
    // Ensure empty — vitest may load .env DATABASE_URL
    vi.stubEnv("DATABASE_URL", "");
    delete process.env.DATABASE_URL;
    resetConfigStoreCache();
    expect(productionRequiresDatabase()).toBe(true);
    await expect(getConfigStore()).rejects.toBeInstanceOf(
      PersistenceMisconfiguredError,
    );
  });

  it("persistence: memory allowed for tests", async () => {
    const store = useMemoryConfigStoreForTests();
    const token = generateEditToken();
    const record = await store.save(
      {
        industry: "beauty",
        fictionalBusinessKey: "amani-beauty",
        packageCode: "WEB-ONE",
        bundleCode: null,
        selectedFeatures: ["BKG-APT"],
        carePlan: null,
        kbPlan: null,
        seoSetup: null,
        seoRecurring: null,
        socialPlan: null,
        deliveryOption: "STANDARD",
        commercialSnapshot: priceStudioConfiguration({
          ...emptyCommercialState(),
          industry: "beauty",
          packageCode: "WEB-ONE",
          featureCodes: ["BKG-APT"],
          delivery: "STANDARD",
        }).snapshot,
      },
      token,
    );
    const loaded = await store.getById(record.configurationId);
    expect(loaded?.configurationId).toBe(record.configurationId);
    expect(loaded?.commercialSnapshot.totals.oneTimeTsh).toBe(
      record.commercialSnapshot.totals.oneTimeTsh,
    );
  });

  it("multilingual: LANG-ENSW maps to language preview, not ADD-MULTI", () => {
    const multiLoc = FEATURE_REGISTRY.find((f) => f.featureCode === "ADD-MULTI");
    const lang = FEATURE_REGISTRY.find((f) => f.featureCode === "LANG-ENSW");
    expect(multiLoc?.previewFlag).toBe("multiLocation");
    expect(lang?.previewFlag).toBe("multilingual");

    const caps = resolvePreviewCapabilities({
      ...emptyCommercialState(),
      industry: "tourism",
      packageCode: "WEB-BUS",
      featureCodes: ["LANG-ENSW"],
      delivery: "STANDARD",
    });
    expect(caps.multilingual).toBe(true);
    expect(caps.multiLocation).toBeFalsy();
  });

  it("feature discovery: LOC-GBP and LOC-REV are demo-supported local group", () => {
    const gbp = FEATURE_REGISTRY.find((f) => f.featureCode === "LOC-GBP");
    const rev = FEATURE_REGISTRY.find((f) => f.featureCode === "LOC-REV");
    expect(gbp?.demoSupported).toBe(true);
    expect(gbp?.group).toBe("local");
    expect(rev?.demoSupported).toBe(true);
    expect(rev?.group).toBe("local");
  });

  it("exclusive: replaceExclusiveMember never keeps both booking tiers", () => {
    const codes = replaceExclusiveMember(["BKG-APT"], "BKG-STAFF");
    expect(codes).toContain("BKG-STAFF");
    expect(codes).not.toContain("BKG-APT");
  });

  it("exclusive: normalize collapses dual recommended tiers", () => {
    const normalized = normalizeExclusiveFeatureCodes([
      "BKG-APT",
      "BKG-STAFF",
      "REST-MENU",
      "REST-AMENU",
      "PAY-STD",
    ]);
    expect(normalized).toContain("BKG-STAFF");
    expect(normalized).not.toContain("BKG-APT");
    expect(normalized).toContain("REST-AMENU");
    expect(normalized).not.toContain("REST-MENU");
    expect(normalized).toContain("PAY-STD");
  });

  it("package/bundle overlap: detected when both selected with website in bundle", () => {
    const overlap = detectPackageBundleOverlap({
      ...emptyCommercialState(),
      industry: "restaurant",
      packageCode: "WEB-ESS",
      bundleCode: "BND-REST",
      featureCodes: [],
      delivery: "STANDARD",
    });
    expect(overlap).not.toBeNull();
    expect(overlap?.bundleWebsiteCode).toBe("WEB-ESS");
    expect(overlap?.message).toMatch(/already includes website/i);
  });

  it("bundle auto-detection: restaurant scratch build with required components", () => {
    const state: CommercialConfigState = {
      ...emptyCommercialState(),
      industry: "restaurant",
      packageCode: "WEB-ESS",
      bundleCode: null,
      featureCodes: ["REST-MENU", "BKG-REST", "LOC-GBP"],
      delivery: "STANDARD",
    };
    const hints = detectEligibleBundles(state);
    const rest = hints.find((h) => h.bundleCode === "BND-REST");
    expect(rest).toBeTruthy();
    expect(rest?.matches).toBe(true);
    if (rest?.showSavings) {
      expect(rest.savingsTsh).toBeGreaterThan(0);
    }
  });

  it("estimate PDF: generates buffer with config id and price book", async () => {
    const state: CommercialConfigState = {
      ...emptyCommercialState(),
      industry: "beauty",
      packageCode: "WEB-ONE",
      featureCodes: ["BKG-APT"],
      delivery: "STANDARD",
    };
    const priced = priceStudioConfiguration(state);
    const buf = await buildProjectEstimatePdf({
      configurationId: "KT-CONFIG-TEST31",
      industry: "beauty",
      packageCode: "WEB-ONE",
      bundleCode: null,
      delivery: "STANDARD",
      snapshot: priced.snapshot,
    });
    expect(Buffer.isBuffer(buf)).toBe(true);
    expect(buf.length).toBeGreaterThan(500);
    expect(buf.subarray(0, 4).toString()).toBe("%PDF");
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(buf);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
    expect(doc.getTitle()).toContain("KT-CONFIG-TEST31");
    expect(doc.getSubject()).toContain("KT-PB-2026.1");
  });

  it("KB gating: Launch locks Growth modules via commercial parity still holds", () => {
    const launch = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "beauty",
      packageCode: "WEB-ONE",
      kbPlan: "KB-LAUNCH",
      delivery: "STANDARD",
    });
    const grow = priceStudioConfiguration({
      ...emptyCommercialState(),
      industry: "beauty",
      packageCode: "WEB-ONE",
      kbPlan: "KB-GROW",
      delivery: "STANDARD",
    });
    expect(grow.totals.monthlyTsh).toBeGreaterThan(launch.totals.monthlyTsh);
  });
});
