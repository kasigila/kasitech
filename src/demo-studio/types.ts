import type {
  CommercialSnapshot,
  DeliveryLevel,
  PricingResult,
} from "@/commercial";

/** Demo Studio industry ids — aligned with Phase 2 INDUSTRIES. */
export type DemoIndustryId =
  | "beauty"
  | "restaurant"
  | "hotel"
  | "tourism"
  | "real-estate"
  | "retail"
  | "professional"
  | "education"
  | "ngo"
  | "healthcare"
  | "logistics"
  | "general";

export type StartMode = "recommended" | "package" | "bundle" | "scratch";

export type PreviewDevice = "desktop" | "tablet" | "mobile";

export type StudioMode = "website" | "business";

export type CompareMode = "build" | "base";

export type FeatureGroup =
  | "recommended"
  | "website"
  | "booking"
  | "payments"
  | "commerce"
  | "content"
  | "marketing"
  | "local"
  | "advanced"
  | "all";

export type DemoCoverageTreatment =
  | "VISUAL_DEMO"
  | "CONFIGURABLE_NON_VISUAL"
  | "RECURRING_SERVICE"
  | "PACKAGE"
  | "BUNDLE"
  | "KASITECH_BUSINESS"
  | "CARE"
  | "CUSTOM_QUOTE"
  | "THIRD_PARTY"
  | "NOT_APPLICABLE_TO_DEMO";

/** Commercial configuration state (what gets charged). */
export type CommercialConfigState = {
  industry: DemoIndustryId | null;
  startMode: StartMode | null;
  packageCode: string | null;
  bundleCode: string | null;
  /** Explicit feature / service / tier selections (not package/bundle codes). */
  featureCodes: string[];
  /** Recurring services outside exclusive KB/Care/SEO/Social when selected via those pickers */
  carePlan: string | null;
  kbPlan: string | null;
  seoSetup: string | null;
  seoRecurring: string | null;
  socialPlan: string | null;
  delivery: DeliveryLevel;
};

/** Ephemeral demo UI state (does not affect pricing). */
export type DemoUiState = {
  previewDevice: PreviewDevice;
  studioMode: StudioMode;
  compareMode: CompareMode;
  featureGroup: FeatureGroup;
  previewPath: string;
  language: "en" | "sw";
  bookingOpen: boolean;
  cartOpen: boolean;
  controlsCollapsed: boolean;
  summaryCollapsed: boolean;
  mobileSheet: "features" | "build" | "price" | null;
};

export type PriceChangeEntry = {
  id: string;
  at: string;
  label: string;
  deltaOneTimeTsh: number | null;
  deltaMonthlyTsh: number | null;
  deltaAnnualTsh: number | null;
  undoSelections?: string[];
};

export type StudioSession = {
  commercial: CommercialConfigState;
  demo: DemoUiState;
  changeLog: PriceChangeEntry[];
  pricing: PricingResult | null;
};

export type PersistedConfiguration = {
  configurationId: string;
  priceBookVersion: string;
  industry: DemoIndustryId;
  fictionalBusinessKey: string;
  packageCode: string | null;
  bundleCode: string | null;
  selectedFeatures: string[];
  carePlan: string | null;
  kbPlan: string | null;
  seoSetup: string | null;
  seoRecurring: string | null;
  socialPlan: string | null;
  deliveryOption: DeliveryLevel;
  commercialSnapshot: CommercialSnapshot;
  status: "draft" | "saved" | "submitted";
  createdAt: string;
  updatedAt: string;
};

export type ConfigurationSubmission = {
  id: string;
  configurationId: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  message: string | null;
  createdAt: string;
  /** Phase 4 will promote these to Leads */
  leadStatus: "pending";
};
