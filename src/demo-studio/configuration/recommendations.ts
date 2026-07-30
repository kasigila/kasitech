import type { DemoIndustryId } from "../types";

/** Deterministic industry → recommended feature codes (canonical only). */
export const INDUSTRY_RECOMMENDATIONS: Record<DemoIndustryId, string[]> = {
  beauty: [
    "BKG-APT",
    "BKG-STAFF",
    "ENT-GALLERY",
    "PAY-STD",
    "LOC-GBP",
    "LOC-REV",
    "ENT-SOCIAL-INTEGRATION",
  ],
  restaurant: [
    "REST-MENU",
    "REST-AMENU",
    "BKG-REST",
    "REST-ORDER",
    "PAY-STD",
    "ADD-EVT",
    "LOC-GBP",
  ],
  hotel: ["BKG-HOTINT", "ADD-INQ", "ENT-GALLERY", "PAY-STD", "LOC-GBP", "ADD-MAP"],
  tourism: [
    "TOUR-CAT",
    "TOUR-ITIN",
    "BKG-TOUR",
    "TOUR-INQ",
    "PAY-STD",
    "LANG-ENSW",
    "LOC-GBP",
  ],
  "real-estate": ["RE-LIST", "RE-FILT", "RE-INQ", "RE-MAP", "RE-AGENT", "ADD-INQ"],
  retail: ["ECOM-START", "PAY-STD", "ADD-SRCH", "LOC-GBP"],
  professional: ["ADD-TEAM", "ADD-CASE", "ADD-INQ", "SEO-PRO", "LOC-GBP"],
  education: ["EDU-ADM", "EDU-COURSE", "EDU-FAC", "ADD-INQ", "LOC-GBP"],
  ngo: ["NGO-PROG", "NGO-VOL", "PAY-DON", "NGO-PUB", "LOC-GBP"],
  healthcare: ["BKG-APT", "HLTH-DIR", "ADD-INQ", "ADD-MAP", "PAY-STD"],
  logistics: ["LOG-TRACK", "LOG-QUOTE", "LOG-INQ", "ADD-MAP", "LOC-GBP"],
  general: ["ADD-INQ", "LOC-GBP", "ADD-TEAM", "SEO-FND"],
};

/** Recommended bundles per industry (when starting with Recommended). */
export const INDUSTRY_BUNDLE_HINTS: Partial<Record<DemoIndustryId, string>> = {
  beauty: "BND-BEAUTY",
  restaurant: "BND-REST",
  tourism: "BND-TOUR",
  "real-estate": "BND-RE",
  retail: "BND-STORE",
  professional: "BND-PRES",
  general: "BND-LAUNCH",
};

/** Recommended starter package when not using a bundle. */
export const INDUSTRY_PACKAGE_HINTS: Record<DemoIndustryId, string> = {
  beauty: "WEB-ONE",
  restaurant: "WEB-ESS",
  hotel: "WEB-BUS",
  tourism: "WEB-BUS",
  "real-estate": "WEB-BUS",
  retail: "WEB-ESS",
  professional: "WEB-PRO",
  education: "WEB-BUS",
  ngo: "WEB-ESS",
  healthcare: "WEB-ESS",
  logistics: "WEB-ESS",
  general: "WEB-ESS",
};

/** Chargeable recommendation codes only (skip entitlements for selection). */
export function chargeableRecommendations(industry: DemoIndustryId): string[] {
  const bookCodes = new Set(
    INDUSTRY_RECOMMENDATIONS[industry].filter((c) => !c.startsWith("ENT-")),
  );
  return [...bookCodes];
}
