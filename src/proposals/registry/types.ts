import type { CommercialConfigState, DemoIndustryId, StudioMode } from "@/demo-studio/types";
import type { FictionalBusiness } from "@/demo-studio/industries/businesses";

/** Approved commercial investment — never derived from live price-book totals. */
export type ProposalInvestment = {
  websiteOneTimeTsh: number;
  careMonthlyTsh: number;
  socialMonthlyTsh: number;
  totalMonthlyTsh: number;
  currency: "TZS";
  paymentSchedule: {
    acceptancePct: number;
    designApprovalPct: number;
    launchPct: number;
  };
};

export type ProposalContact = {
  name: string;
  role: string;
  email: string;
  whatsapp: string;
  web: string;
};

/** Interactive focus when a PDF QR opens the Proposal Companion. */
export type CompanionHighlight =
  | "website"
  | "analytics"
  | "cms"
  | "care"
  | "social"
  | "kb"
  | "investment"
  | "nav";

export type ProposalCompanionSection = {
  /** URL slug, e.g. recommended-website */
  id: string;
  /** PDF page number as printed in chrome (e.g. 12) */
  pageNumber: number;
  /** Short title for companion banner */
  title: string;
  /** Full line: "Section 12 – Recommended Website" */
  sectionLabel: string;
  /** Demo website path, if applicable */
  websitePath?: string;
  studioMode?: StudioMode;
  highlight?: CompanionHighlight;
  /** QR asset filename without path (e.g. section-recommended-website.png) */
  qrAsset: string;
  /** Label printed under QR in the PDF */
  qrLabel: string;
};

export type ProposalPreset = {
  /** Formal proposal reference, e.g. KT-CEG-2026-001 */
  id: string;
  /** URL slug, e.g. credo-energy-group */
  slug: string;
  clientName: string;
  title: string;
  dateIso: string;
  dateLabel: string;
  status: string;
  validityDays: number;
  primaryContact: ProposalContact;
  /** Demo Studio commercial selections (closest catalog mapping for preview). */
  commercial: CommercialConfigState;
  /** Human labels for the recommended solution (proposal truth). */
  recommended: {
    packageLabel: string;
    careLabel: string;
    socialLabel: string;
    kbPlanLabel: string | null;
    capabilities: string[];
    modules: string[];
    architecture: string[];
  };
  /** Approved proposal figures — source of truth for client-facing investment. */
  investment: ProposalInvestment;
  /** Credo-branded preview identity for Proposal Mode. */
  brand: FictionalBusiness;
  /** Deep-link surface for QR / SEE IT LIVE. */
  demoPath: string;
  proposalReturnPath: string;
  configurationKey: string;
  disclaimer: string;
  /** Section map for Proposal Companion QR deep-links. */
  companionSections: ProposalCompanionSection[];
};

export type ProposalLookupKey = string;

export type { DemoIndustryId, CommercialConfigState };
