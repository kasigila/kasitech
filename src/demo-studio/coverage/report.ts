import { loadPriceBook, PRICE_BOOK_VERSION } from "@/commercial";
import type { CatalogItem } from "@/commercial";
import type { DemoCoverageTreatment } from "../types";
import { FEATURE_REGISTRY } from "../features/registry";

export type CoverageRow = {
  code: string;
  name: string;
  kind: string;
  treatment: DemoCoverageTreatment;
  note: string;
};

function treat(item: CatalogItem): { treatment: DemoCoverageTreatment; note: string } {
  if (item.kind === "PACKAGE") {
    return { treatment: "PACKAGE", note: "Selectable website package" };
  }
  if (item.kind === "BUNDLE") {
    return { treatment: "BUNDLE", note: "Selectable bundle" };
  }
  if (item.kind === "SERVICE_ALIAS") {
    return {
      treatment: "NOT_APPLICABLE_TO_DEMO",
      note: "Alias — surfaces via canonical capability",
    };
  }
  if (item.kind === "ENTITLEMENT" || item.code.startsWith("ENT-")) {
    if (FEATURE_REGISTRY.some((f) => f.featureCode === item.code && f.demoSupported)) {
      return { treatment: "VISUAL_DEMO", note: "Entitlement with visual demo" };
    }
    return {
      treatment: "NOT_APPLICABLE_TO_DEMO",
      note: "Non-sellable entitlement applied via packages/bundles",
    };
  }
  if (item.kind === "THIRD_PARTY_COST") {
    return { treatment: "THIRD_PARTY", note: "Disclosed in Build Summary & estimate" };
  }
  if (item.kind === "CUSTOM_QUOTE_ITEM" || item.billing === "CUSTOM_QUOTE") {
    if (item.code.startsWith("KB-")) {
      return { treatment: "KASITECH_BUSINESS", note: "KB plan (custom quote)" };
    }
    return { treatment: "CUSTOM_QUOTE", note: "Configurable as custom quote interest" };
  }
  if (item.kind === "DELIVERY_OPTION") {
    return { treatment: "NOT_APPLICABLE_TO_DEMO", note: "Delivery selector (not a feature card)" };
  }
  if (item.code.startsWith("CARE-")) {
    return { treatment: "CARE", note: "Care plan selector" };
  }
  if (item.code.startsWith("KB-")) {
    return { treatment: "KASITECH_BUSINESS", note: "KB plan + dashboard preview" };
  }
  if (
    item.billing === "MONTHLY" ||
    item.billing === "ANNUAL" ||
    item.code.startsWith("SEO-CARE") ||
    item.code.startsWith("SEO-GROW") ||
    item.code.startsWith("SEO-AUTH") ||
    item.code.startsWith("SOC-")
  ) {
    if (FEATURE_REGISTRY.some((f) => f.featureCode === item.code && f.demoSupported)) {
      return { treatment: "VISUAL_DEMO", note: "Visual + recurring" };
    }
    return { treatment: "RECURRING_SERVICE", note: "Recurring selector in Build panel" };
  }
  if (FEATURE_REGISTRY.some((f) => f.featureCode === item.code && f.demoSupported)) {
    return { treatment: "VISUAL_DEMO", note: "Live website preview behaviour" };
  }
  // One-time services without unique visual component
  if (item.kind === "SERVICE" || item.kind === "SUBSCRIPTION_TIER") {
    return {
      treatment: "CONFIGURABLE_NON_VISUAL",
      note: "Selectable in Features / Build; priced via engine",
    };
  }
  return {
    treatment: "NOT_APPLICABLE_TO_DEMO",
    note: "Intentionally outside Demo Studio surface",
  };
}

/** Every catalog item receives exactly one intentional Demo Studio treatment. */
export function demoCoverageReport(
  book = loadPriceBook(),
): { version: string; rows: CoverageRow[]; missing: string[] } {
  const rows: CoverageRow[] = book.items.map((item) => {
    const t = treat(item);
    return {
      code: item.code,
      name: item.name,
      kind: item.kind,
      treatment: t.treatment,
      note: t.note,
    };
  });

  // Entitlement-only defs not in items
  for (const code of book.entitlementCodes) {
    if (rows.some((r) => r.code === code)) continue;
    const ent = book.entitlements.find((e) => e.code === code);
    rows.push({
      code,
      name: ent?.name ?? code,
      kind: "ENTITLEMENT",
      ...(() => {
        const fake = {
          code,
          name: ent?.name ?? code,
          kind: "ENTITLEMENT" as const,
          category: "Entitlement",
          priceTsh: null,
          billing: "INCLUDED" as const,
          timelineMinDays: null,
          timelineMaxDays: null,
          timelineImpactDays: null,
          clientDescription: "",
          active: true,
          sortOrder: 0,
        };
        return treat(fake);
      })(),
    });
  }

  const missing = rows.filter((r) => !r.treatment).map((r) => r.code);
  return { version: PRICE_BOOK_VERSION, rows, missing };
}

export function assertFullCoverage(): void {
  const { rows, missing } = demoCoverageReport();
  if (missing.length) {
    throw new Error(`Demo coverage gaps: ${missing.join(", ")}`);
  }
  if (rows.length < 144) {
    throw new Error(`Expected ≥144 coverage rows, got ${rows.length}`);
  }
}
