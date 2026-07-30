export {
  PRICE_BOOK_VERSION,
  formatTsh,
  loadPriceBook,
  getItem,
} from "@/commercial";
export { priceStudioConfiguration, emptyCommercialState, clientValidationMessages, isCurrentPriceBook, selectionsFromCommercial } from "./commercial/bridge";
export { resolvePreviewCapabilities } from "./configuration/capabilities";
export { estimateDelivery } from "./configuration/delivery-calendar";
export {
  INDUSTRY_RECOMMENDATIONS,
  INDUSTRY_BUNDLE_HINTS,
  INDUSTRY_PACKAGE_HINTS,
  chargeableRecommendations,
} from "./configuration/recommendations";
export { FEATURE_REGISTRY, registryByCode, isFeatureRelevant } from "./features/registry";
export { FICTIONAL_BUSINESSES, businessForIndustry, ALL_INDUSTRIES } from "./industries/businesses";
export { demoCoverageReport, assertFullCoverage } from "./coverage/report";
export { trackDemo } from "./analytics/track";
export { KB_MODULES, kbModuleState, planLabel } from "./configuration/kb-modules";
export {
  detectEligibleBundles,
  detectPackageBundleOverlap,
  replaceExclusiveMember,
  exclusiveFamilyFor,
  clearExclusiveFamily,
  activeExclusiveCode,
  makeChangeEntry,
  formatDelta,
} from "./configuration/mutations";
export { normalizeExclusiveFeatureCodes } from "./configuration/normalize";
export { outcomeForCode } from "./configuration/outcomes";
export {
  parseDemoStudioSearchParams,
  parseProposalSearchParams,
  commercialStateFromDeepLink,
  demoStudioUrl,
  proposalDemoStudioUrl,
  CATALOG_QR_TARGETS,
} from "./configuration/deep-link";
export type * from "./types";
