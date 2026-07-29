/**
 * KT-PB-2026.1 commercial domain types.
 * Prices use integer Tanzanian Shilling minor units (whole TSh; no floats).
 */

export const PRICE_BOOK_VERSION = "KT-PB-2026.1" as const;

export type CatalogKind =
  | "SERVICE"
  | "SERVICE_ALIAS"
  | "ENTITLEMENT"
  | "PACKAGE"
  | "BUNDLE"
  | "SUBSCRIPTION_TIER"
  | "THIRD_PARTY_COST"
  | "CUSTOM_QUOTE_ITEM"
  | "DELIVERY_OPTION";

export type BillingType =
  | "ONE_TIME"
  | "MONTHLY"
  | "ANNUAL"
  | "CUSTOM_QUOTE"
  | "THIRD_PARTY"
  | "INCLUDED"
  | "SURCHARGE";

export type CommercialRuleType =
  | "ALIAS_NO_CHARGE"
  | "EXCLUSIVE_REPLACE"
  | "NEVER_AUTO_ADD"
  | "PACKAGE_INCLUSION_NO_CHARGE"
  | "BUNDLE_ABSORBS_COMPONENTS";

export type DeliveryLevel = "STANDARD" | "PRIORITY" | "RUSH" | "EMERGENCY";

export type CatalogItem = {
  code: string;
  name: string;
  kind: CatalogKind;
  category: string;
  /** Integer TSh. null = custom / third-party / included / entitlement without price */
  priceTsh: number | null;
  billing: BillingType;
  /** Package delivery window in business days (nullable for non-packages / undefined) */
  timelineMinDays: number | null;
  timelineMaxDays: number | null;
  /** Feature-level timeline impact — always null in KT-PB-2026.1 unless approved */
  timelineImpactDays: number | null;
  clientDescription: string;
  active: boolean;
  sortOrder: number;
};

export type ServiceAlias = {
  aliasCode: string;
  label: string;
  canonicalCode: string;
  industryTag: string;
};

export type EntitlementDef = {
  code: string;
  name: string;
  description: string;
  /** Always false for KT-PB-2026.1 non-sellable entitlements */
  sellable: false;
  /** Never invent a comparable standalone price */
  comparableStandaloneCode: string | null;
};

export type TierFamily = {
  code: string;
  name: string;
  /** Higher rank wins / replaces lower when both selected */
  members: { code: string; rank: number; includesLower?: boolean }[];
};

export type PackageInclusion = {
  packageCode: string;
  /** Catalog item or entitlement code */
  includedCode: string;
  inclusionType: "FEATURE" | "ENTITLEMENT" | "BASELINE";
};

export type BundleComponent = {
  bundleCode: string;
  /** Chargeable catalog code OR entitlement code */
  componentCode: string;
  role: "CHARGE" | "ENTITLEMENT";
};

export type TechnicalDependency = {
  fromCode: string;
  toCode: string;
  note: string;
  /** Never creates a commercial charge by itself */
  createsCharge: false;
};

export type CommercialCharge = {
  itemCode: string;
  name: string;
  amountTsh: number;
  billing: BillingType;
  source:
    | "PACKAGE"
    | "BUNDLE"
    | "SERVICE"
    | "SUBSCRIPTION_TIER"
    | "DELIVERY_SURCHARGE"
    | "CUSTOM_QUOTE";
  /** Why this charge exists (auditability) */
  rationale: string;
};

export type PricingTotals = {
  oneTimeTsh: number;
  monthlyTsh: number;
  annualTsh: number;
  thirdPartyDisclosed: boolean;
  customQuoteRequired: boolean;
  /** oneTime + 12*monthly + annual (first year) when all are known integers */
  estimatedFirst12MonthsTsh: number | null;
};

export type BundleSavings = {
  showSavings: boolean;
  individualValueTsh: number | null;
  savingsTsh: number | null;
  reasonIfHidden: string | null;
};

export type ConfigurationInput = {
  /** Selected codes (packages, services, tiers, bundles, delivery). Aliases accepted. */
  selections: string[];
  delivery?: DeliveryLevel;
};

export type PricingResult = {
  priceBookVersion: typeof PRICE_BOOK_VERSION;
  resolvedCapabilityCodes: string[];
  charges: CommercialCharge[];
  suppressedCodes: { code: string; reason: string }[];
  entitlements: string[];
  totals: PricingTotals;
  bundleSavings: BundleSavings | null;
  validation: ValidationResult;
  snapshot: CommercialSnapshot;
};

export type ValidationIssue = {
  code: string;
  severity: "error" | "warning";
  message: string;
};

export type ValidationResult = {
  ok: boolean;
  issues: ValidationIssue[];
};

export type CommercialSnapshot = {
  priceBookVersion: typeof PRICE_BOOK_VERSION;
  frozenAt: string;
  selections: string[];
  charges: CommercialCharge[];
  totals: PricingTotals;
  entitlements: string[];
};
