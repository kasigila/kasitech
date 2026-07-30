import { emptyCommercialState } from "@/demo-studio/commercial/bridge";
import type { ProposalPreset } from "./types";

const DEMO_ORIGIN = "https://www.kasitechinnovations.com";

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
};

/** Canonical Demo Studio URL builders for proposal QR / SEE IT LIVE deep-links. */
export function credoDemoUrl(view?: string): string {
  const base = `${DEMO_ORIGIN}/demo-studio/proposal/credo-energy-group`;
  if (!view) return base;
  return `${base}?view=${encodeURIComponent(view)}`;
}

export const CREDO_QR_TARGETS: { id: string; label: string; view: string }[] = [
  { id: "demo-home", label: "Interactive Demo", view: "home" },
  { id: "demo-products", label: "Products", view: "products" },
  { id: "demo-projects", label: "Projects", view: "projects" },
  { id: "demo-about", label: "About", view: "about" },
  { id: "demo-contact", label: "Inquiry", view: "contact" },
  { id: "demo-analytics", label: "Analytics", view: "analytics" },
  { id: "demo-cms", label: "CMS", view: "cms" },
  { id: "demo-nav", label: "Navigation", view: "nav" },
];
