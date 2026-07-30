import { emptyCommercialState } from "@/demo-studio/commercial/bridge";
import type { ProposalCompanionSection, ProposalPreset } from "./types";

const DEMO_ORIGIN = "https://www.kasitechinnovations.com";

function section(
  partial: Omit<ProposalCompanionSection, "sectionLabel" | "qrAsset" | "qrLabel"> & {
    qrLabel?: string;
  },
): ProposalCompanionSection {
  return {
    ...partial,
    sectionLabel: `Section ${partial.pageNumber} – ${partial.title}`,
    qrAsset: `section-${partial.id}.png`,
    qrLabel: partial.qrLabel ?? "View Interactive Version",
  };
}

/**
 * Credo Energy Group — Proposal KT-CEG-2026-001
 *
 * Commercial figures below are the APPROVED proposal investment.
 * Demo Studio catalog codes are the closest visual/configuration mapping;
 * they must never silently replace approved proposal pricing in client surfaces.
 */
export const CREDO_ENERGY_PROPOSAL: ProposalPreset = {
  id: "KT-CEG-2026-001",
  slug: "credo-energy-group",
  clientName: "Credo Energy Group",
  title: "Digital Transformation Proposal",
  dateIso: "2026-07-30",
  dateLabel: "30 July 2026",
  status: "Presented · Awaiting decision",
  validityDays: 30,
  primaryContact: {
    name: "Karen Marie Kasigila",
    role: "Founder, KasiTech",
    email: "karen@kasitechinnovations.com",
    whatsapp: "+1 269 861 3487",
    web: "kasitechinnovations.com",
  },
  commercial: {
    ...emptyCommercialState(),
    industry: "professional",
    startMode: "package",
    packageCode: "WEB-SIG",
    bundleCode: null,
    featureCodes: ["SEO-FND", "LOC-GBP"],
    carePlan: "CARE-PRI",
    kbPlan: null,
    seoSetup: "SEO-PRO",
    seoRecurring: null,
    socialPlan: "SOC-PRO",
    delivery: "STANDARD",
  },
  recommended: {
    packageLabel: "Premium corporate website (Signature-grade)",
    careLabel: "Website Care Plan — TZS 800,000 / month",
    socialLabel: "Social Media Management — TZS 1,200,000 / month",
    kbPlanLabel: null,
    capabilities: [
      "Executive-grade corporate presence",
      "Multi-vertical product catalogue",
      "Project / proof library",
      "Segmented enquiry architecture",
      "CMS for products, projects & insights",
      "SEO foundations & analytics",
      "Professional email & hosting setup",
      "Operator training & documentation",
    ],
    modules: [
      "Homepage",
      "Products",
      "Solutions",
      "Projects",
      "About",
      "Insights",
      "Contact / Quote",
      "CMS",
      "Analytics",
    ],
    architecture: [
      "Brand & trust layer",
      "Vertical product systems",
      "Audience-specific journeys",
      "Lead desk & routing",
      "Care & social operating layer",
      "Future platform readiness (CRM · portals · AI)",
    ],
  },
  investment: {
    websiteOneTimeTsh: 7_500_000,
    careMonthlyTsh: 800_000,
    socialMonthlyTsh: 1_200_000,
    totalMonthlyTsh: 2_000_000,
    currency: "TZS",
    paymentSchedule: {
      acceptancePct: 40,
      designApprovalPct: 40,
      launchPct: 20,
    },
  },
  brand: {
    key: "credo-energy-group",
    industry: "professional",
    name: "Credo Energy Group",
    tagline: "Energy systems for Africa’s next decade.",
    city: "Dar es Salaam",
    phone: "+255 700 000 000",
    email: "enquiries@credogroupllc.com",
    whatsapp: "+255700000000",
    accent: "#0b6e4f",
    surface: "#f3f7f5",
    ink: "#0c1612",
    nav: ["Products", "Solutions", "Projects", "About", "Contact"],
    hero: {
      eyebrow: "Credo Energy Group",
      title: "Energy systems for Africa’s next decade.",
      subtitle:
        "Solar cooling, smart utilities, renewables, EV, drones, and digital infrastructure — one institutional presence.",
      cta: "Request consultation",
    },
    services: [
      { name: "CREDO™ Solar AC", blurb: "Solar cooling systems for residential and commercial." },
      { name: "Smart Utilities", blurb: "Metering and utility technology for municipalities." },
      { name: "Renewable Infrastructure", blurb: "Solar and energy systems at scale." },
      { name: "EV Solutions", blurb: "Charging and mobility infrastructure." },
      { name: "Drone Technology", blurb: "Aerial systems for agri, security, and inspection." },
      { name: "Digital & Telecom", blurb: "Emerging connectivity and digital services." },
    ],
    team: [
      { name: "Executive Leadership", role: "Group strategy" },
      { name: "Engineering", role: "Products & deployments" },
      { name: "Commercial", role: "Partners & institutions" },
    ],
    galleryLabels: ["Solar", "Utilities", "EV", "Projects"],
    products: [
      { name: "CREDO™ Solar Breeze", priceLabel: "Enquire" },
      { name: "CREDO™ Solar Force", priceLabel: "Enquire" },
      { name: "Smart prepaid metering", priceLabel: "Enquire" },
      { name: "EV charging solutions", priceLabel: "Enquire" },
    ],
    trackingDemoCode: "CREDO-CEG-2026",
  },
  demoPath: `${DEMO_ORIGIN}/demo-studio/proposal/credo-energy-group`,
  proposalReturnPath: "/proposals/credo-energy-group/",
  configurationKey: "KT-CONFIG-CEG2026001",
  disclaimer:
    "This demonstration represents the recommended solution presented in Proposal KT-CEG-2026-001.",
  companionSections: [
    section({
      id: "overview",
      pageNumber: 2,
      title: "Executive Dashboard",
      websitePath: "home",
      highlight: "website",
    }),
    section({
      id: "future-presence",
      pageNumber: 6,
      title: "Future Digital Presence",
      websitePath: "home",
      highlight: "website",
    }),
    section({
      id: "recommended-website",
      pageNumber: 12,
      title: "Recommended Website",
      websitePath: "home",
      highlight: "website",
    }),
    section({
      id: "homepage",
      pageNumber: 13,
      title: "Homepage Concept",
      websitePath: "home",
      highlight: "website",
    }),
    section({
      id: "products",
      pageNumber: 13,
      title: "Products",
      websitePath: "products",
      highlight: "website",
    }),
    section({
      id: "solutions",
      pageNumber: 13,
      title: "Solutions",
      websitePath: "solutions",
      highlight: "website",
    }),
    section({
      id: "about",
      pageNumber: 14,
      title: "About",
      websitePath: "about",
      highlight: "website",
    }),
    section({
      id: "projects",
      pageNumber: 14,
      title: "Projects",
      websitePath: "projects",
      highlight: "website",
    }),
    section({
      id: "contact",
      pageNumber: 14,
      title: "Contact",
      websitePath: "contact",
      highlight: "website",
    }),
    section({
      id: "navigation",
      pageNumber: 15,
      title: "Mega Navigation",
      websitePath: "home",
      highlight: "nav",
    }),
    section({
      id: "enquiry",
      pageNumber: 15,
      title: "Inquiry Flow",
      websitePath: "enquiry",
      highlight: "website",
    }),
    section({
      id: "walkthrough",
      pageNumber: 17,
      title: "Website Walkthrough",
      websitePath: "home",
      highlight: "website",
    }),
    section({
      id: "analytics",
      pageNumber: 17,
      title: "Analytics",
      websitePath: "home",
      highlight: "analytics",
    }),
    section({
      id: "cms",
      pageNumber: 17,
      title: "CMS",
      websitePath: "home",
      highlight: "cms",
    }),
    section({
      id: "journeys",
      pageNumber: 18,
      title: "User Journeys · Inquiry",
      websitePath: "enquiry",
      highlight: "website",
    }),
    section({
      id: "social",
      pageNumber: 19,
      title: "Social Media",
      websitePath: "home",
      highlight: "social",
    }),
    section({
      id: "care",
      pageNumber: 28,
      title: "Website Care",
      websitePath: "home",
      highlight: "care",
    }),
    section({
      id: "investment",
      pageNumber: 28,
      title: "Investment",
      websitePath: "home",
      highlight: "investment",
    }),
    section({
      id: "kasitech-business",
      pageNumber: 29,
      title: "KasiTech Business · Future Platform",
      studioMode: "business",
      highlight: "kb",
    }),
  ],
};

/** Canonical Demo Studio URL builders for proposal QR / SEE IT LIVE deep-links. */
export function credoDemoUrl(sectionOrView?: string): string {
  const base = `${DEMO_ORIGIN}/demo-studio/proposal/credo-energy-group`;
  if (!sectionOrView) return base;
  // Prefer section= for companion deep-links
  const known = CREDO_ENERGY_PROPOSAL.companionSections.find(
    (s) => s.id === sectionOrView || String(s.pageNumber) === sectionOrView,
  );
  if (known) {
    return `${base}?section=${encodeURIComponent(known.id)}`;
  }
  return `${base}?view=${encodeURIComponent(sectionOrView)}`;
}

export function resolveCompanionSection(
  key: string | null | undefined,
): ProposalCompanionSection | null {
  if (!key) return null;
  const k = key.trim().toLowerCase();
  return (
    CREDO_ENERGY_PROPOSAL.companionSections.find(
      (s) =>
        s.id === k ||
        String(s.pageNumber) === k ||
        s.title.toLowerCase() === k ||
        // legacy view aliases
        (k === "home" && s.id === "homepage") ||
        (k === "inquiry" && s.id === "enquiry") ||
        (k === "nav" && s.id === "navigation"),
    ) ?? null
  );
}

export const CREDO_QR_TARGETS: { id: string; label: string; view: string }[] =
  CREDO_ENERGY_PROPOSAL.companionSections.map((s) => ({
    id: s.id,
    label: s.title,
    view: s.id,
  }));
