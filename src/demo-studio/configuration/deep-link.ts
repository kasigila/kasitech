import type { CommercialConfigState, DemoIndustryId } from "@/demo-studio/types";
import { emptyCommercialState } from "@/demo-studio/commercial/bridge";
import { INDUSTRY_PACKAGE_HINTS } from "@/demo-studio/configuration/recommendations";
import { normalizeExclusiveFeatureCodes } from "@/demo-studio/configuration/normalize";
import { loadPriceBook } from "@/commercial";

/** Public origin used in catalog QR / SEE IT LIVE links. */
export const DEMO_STUDIO_ORIGIN = "https://www.kasitechinnovations.com";

const PACKAGE_SLUGS: Record<string, string> = {
  one: "WEB-ONE",
  "one-page": "WEB-ONE",
  "web-one": "WEB-ONE",
  essential: "WEB-ESS",
  "web-ess": "WEB-ESS",
  business: "WEB-BUS",
  "web-bus": "WEB-BUS",
  "business-plus": "WEB-BUSP",
  "business+": "WEB-BUSP",
  "web-busp": "WEB-BUSP",
  professional: "WEB-PRO",
  "web-pro": "WEB-PRO",
  signature: "WEB-SIG",
  "web-sig": "WEB-SIG",
  custom: "WEB-CUS",
  "web-cus": "WEB-CUS",
};

const BUNDLE_SLUGS: Record<string, string> = {
  launch: "BND-LAUNCH",
  beauty: "BND-BEAUTY",
  "beauty-booking": "BND-BEAUTY",
  restaurant: "BND-REST",
  store: "BND-STORE",
  "online-store": "BND-STORE",
  tourism: "BND-TOUR",
  tour: "BND-TOUR",
  "real-estate": "BND-RE",
  re: "BND-RE",
  professional: "BND-PRES",
  presence: "BND-PRES",
  growth: "BND-GROW",
  "digital-growth": "BND-GROW",
  lang3: "BND-LANG3",
  "three-language": "BND-LANG3",
  "three-languages": "BND-LANG3",
  lang4: "BND-LANG4",
  "four-language": "BND-LANG4",
  "four-languages": "BND-LANG4",
};

const FEATURE_SLUGS: Record<string, string> = {
  "appointment-booking": "BKG-APT",
  appointments: "BKG-APT",
  "multi-staff-booking": "BKG-STAFF",
  "staff-booking": "BKG-STAFF",
  "restaurant-reservations": "BKG-REST",
  reservations: "BKG-REST",
  "tour-booking": "BKG-TOUR",
  payments: "PAY-STD",
  "payment-integration": "PAY-STD",
  "starter-store": "ECOM-START",
  store: "ECOM-START",
  "digital-menu": "REST-MENU",
  menu: "REST-MENU",
  "advanced-menu": "REST-AMENU",
  "property-listings": "RE-LIST",
  listings: "RE-LIST",
  "google-business": "LOC-GBP",
  gbp: "LOC-GBP",
  "review-strategy": "LOC-REV",
  reviews: "LOC-REV",
  "seo-foundation": "SEO-FND",
  seo: "SEO-FND",
  "seo-professional": "SEO-PRO",
  multilingual: "LANG-ENSW",
  "tour-catalog": "TOUR-CAT",
};

const CARE_SLUGS: Record<string, string> = {
  essential: "CARE-ESS",
  standard: "CARE-STD",
  business: "CARE-BUS",
  professional: "CARE-PRO",
  priority: "CARE-PRI",
};

const KB_SLUGS: Record<string, string> = {
  launch: "KB-LAUNCH",
  growth: "KB-GROW",
  pro: "KB-PRO",
  scale: "KB-SCALE",
  enterprise: "KB-ENT",
};

const INDUSTRY_SLUGS: Record<string, DemoIndustryId> = {
  beauty: "beauty",
  restaurant: "restaurant",
  hotel: "hotel",
  tourism: "tourism",
  "real-estate": "real-estate",
  retail: "retail",
  professional: "professional",
  education: "education",
  ngo: "ngo",
  healthcare: "healthcare",
  logistics: "logistics",
  general: "general",
};

export type CatalogDeepLink = {
  industry: DemoIndustryId | null;
  packageCode: string | null;
  bundleCode: string | null;
  featureCodes: string[];
  carePlan: string | null;
  kbPlan: string | null;
  /** Human label for the banner */
  viewingLabel: string;
  /** Canonical query string without leading ? */
  query: string;
};

function resolveCode(
  raw: string | null | undefined,
  slugMap: Record<string, string>,
): string | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  if (slugMap[key]) return slugMap[key];
  const upper = raw.trim().toUpperCase();
  const book = loadPriceBook();
  if (book.itemByCode.has(upper)) return upper;
  return null;
}

export function parseDemoStudioSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): CatalogDeepLink | null {
  const get = (k: string): string | undefined => {
    if (params instanceof URLSearchParams) {
      return params.get(k) ?? undefined;
    }
    const v = params[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const packageCode = resolveCode(get("package"), PACKAGE_SLUGS);
  const bundleCode = resolveCode(get("bundle"), BUNDLE_SLUGS);
  const carePlan = resolveCode(get("care"), CARE_SLUGS);
  const kbPlan = resolveCode(get("kb"), KB_SLUGS);
  const featureRaw = get("feature");
  const featuresRaw = get("features");
  const featureCodes: string[] = [];
  if (featureRaw) {
    const c = resolveCode(featureRaw, FEATURE_SLUGS);
    if (c) featureCodes.push(c);
  }
  if (featuresRaw) {
    for (const part of featuresRaw.split(",")) {
      const c = resolveCode(part.trim(), FEATURE_SLUGS);
      if (c && !featureCodes.includes(c)) featureCodes.push(c);
    }
  }

  let industry: DemoIndustryId | null = null;
  const indRaw = get("industry");
  if (indRaw) {
    const key = indRaw.trim().toLowerCase();
    industry = INDUSTRY_SLUGS[key] ?? (key as DemoIndustryId);
  }

  // Infer industry from bundle when missing
  if (!industry && bundleCode) {
    const map: Record<string, DemoIndustryId> = {
      "BND-BEAUTY": "beauty",
      "BND-REST": "restaurant",
      "BND-TOUR": "tourism",
      "BND-RE": "real-estate",
      "BND-STORE": "retail",
      "BND-PRES": "professional",
      "BND-LAUNCH": "general",
      "BND-GROW": "general",
    };
    industry = map[bundleCode] ?? "general";
  }
  if (!industry && packageCode) {
    industry =
      Object.entries(INDUSTRY_PACKAGE_HINTS).find(([, p]) => p === packageCode)?.[0] as
        | DemoIndustryId
        | undefined ?? "general";
  }

  if (
    !packageCode &&
    !bundleCode &&
    !featureCodes.length &&
    !carePlan &&
    !kbPlan &&
    !get("industry")
  ) {
    return null;
  }

  const book = loadPriceBook();
  const parts: string[] = [];
  if (industry) parts.push(`industry=${industry}`);
  if (bundleCode) parts.push(`bundle=${bundleCode.toLowerCase().replace(/^bnd-/, "")}`);
  if (packageCode) parts.push(`package=${packageCode.toLowerCase().replace(/^web-/, "")}`);
  if (featureCodes[0]) parts.push(`feature=${featureCodes[0]}`);
  if (carePlan) parts.push(`care=${carePlan.toLowerCase().replace(/^care-/, "")}`);
  if (kbPlan) parts.push(`kb=${kbPlan.toLowerCase().replace(/^kb-/, "")}`);

  const labelBits: string[] = [];
  if (bundleCode) labelBits.push(book.itemByCode.get(bundleCode)?.name ?? bundleCode);
  if (packageCode && !bundleCode)
    labelBits.push(book.itemByCode.get(packageCode)?.name ?? packageCode);
  if (featureCodes[0] && !bundleCode)
    labelBits.push(book.itemByCode.get(featureCodes[0])?.name ?? featureCodes[0]);
  if (kbPlan) labelBits.push(book.itemByCode.get(kbPlan)?.name ?? kbPlan);
  if (carePlan) labelBits.push(book.itemByCode.get(carePlan)?.name ?? carePlan);

  return {
    industry,
    packageCode: bundleCode ? null : packageCode,
    bundleCode,
    featureCodes: normalizeExclusiveFeatureCodes(featureCodes),
    carePlan,
    kbPlan,
    viewingLabel: labelBits.join(" · ") || "Catalog selection",
    query: parts.join("&"),
  };
}

export function commercialStateFromDeepLink(
  link: CatalogDeepLink,
): CommercialConfigState {
  return {
    ...emptyCommercialState(),
    industry: link.industry,
    packageCode: link.packageCode,
    bundleCode: link.bundleCode,
    featureCodes: link.featureCodes,
    carePlan: link.carePlan,
    kbPlan: link.kbPlan,
    delivery: "STANDARD",
    startMode: link.bundleCode
      ? "bundle"
      : link.packageCode
        ? "package"
        : "scratch",
  };
}

/** Build a Demo Studio URL for catalog SEE IT LIVE / QR. */
export function demoStudioUrl(opts: {
  industry?: DemoIndustryId | string;
  package?: string;
  bundle?: string;
  feature?: string;
  care?: string;
  kb?: string;
}): string {
  const q = new URLSearchParams();
  if (opts.industry) q.set("industry", String(opts.industry));
  if (opts.package) q.set("package", opts.package);
  if (opts.bundle) q.set("bundle", opts.bundle);
  if (opts.feature) q.set("feature", opts.feature);
  if (opts.care) q.set("care", opts.care);
  if (opts.kb) q.set("kb", opts.kb);
  const qs = q.toString();
  return `${DEMO_STUDIO_ORIGIN}/demo-studio${qs ? `?${qs}` : ""}`;
}

/** Major catalog products that get their own QR. */
export const CATALOG_QR_TARGETS: {
  label: string;
  url: string;
}[] = [
  {
    label: "Restaurant Bundle",
    url: demoStudioUrl({ industry: "restaurant", bundle: "restaurant" }),
  },
  {
    label: "Beauty & Booking Bundle",
    url: demoStudioUrl({ industry: "beauty", bundle: "beauty" }),
  },
  {
    label: "Tourism Bundle",
    url: demoStudioUrl({ industry: "tourism", bundle: "tourism" }),
  },
  {
    label: "Real Estate Bundle",
    url: demoStudioUrl({ industry: "real-estate", bundle: "real-estate" }),
  },
  {
    label: "Online Store Bundle",
    url: demoStudioUrl({ industry: "retail", bundle: "store" }),
  },
  {
    label: "Professional Presence Bundle",
    url: demoStudioUrl({ industry: "professional", bundle: "presence" }),
  },
  {
    label: "Business Launch Bundle",
    url: demoStudioUrl({ industry: "general", bundle: "launch" }),
  },
  {
    label: "Appointment Booking",
    url: demoStudioUrl({
      industry: "beauty",
      package: "essential",
      feature: "appointment-booking",
    }),
  },
  {
    label: "Professional Website",
    url: demoStudioUrl({ industry: "professional", package: "professional" }),
  },
  {
    label: "Essential Website",
    url: demoStudioUrl({ industry: "general", package: "essential" }),
  },
  {
    label: "KasiTech Business Growth",
    url: demoStudioUrl({ industry: "beauty", package: "essential", kb: "growth" }),
  },
  {
    label: "Professional Care",
    url: demoStudioUrl({
      industry: "general",
      package: "essential",
      care: "professional",
    }),
  },
];
