/**
 * Jembe Group LLC — Website Proposal KT-JEM-WEB-2026-001
 * Commencement invoice KT-INV-JEM-2026-001
 *
 * Approved commercial figures. Catalog codes must match KT-PB-2026.1.
 * Do not silently replace these with live price-book totals in client surfaces.
 */

export const JEMBE_PROPOSAL_REF = "KT-JEM-WEB-2026-001";
export const JEMBE_INVOICE_REF = "KT-INV-JEM-2026-001";
export const JEMBE_CLIENT = "Jembe Group LLC";
export const JEMBE_DATE_ISO = "2026-08-28";
export const JEMBE_DATE_LABEL = "28 August 2026";
export const JEMBE_VALIDITY_DAYS = 30;
export const JEMBE_CATALOG = "KT-PB-2026.1";
export const JEMBE_PREVIEW_PATH = "/preview/jembe/";
export const JEMBE_PREVIEW_URL =
  "https://www.kasitechinnovations.com/preview/jembe/";

/** Catalog-valid line items in the base one-time quote. */
export const JEMBE_LINE_ITEMS = [
  {
    code: "BND-PRES",
    name: "Professional Presence bundle",
    amountTsh: 3_750_000,
    billing: "ONE_TIME" as const,
    why: "Corporate site for a multi-sector advisory and investing group: advanced IA, up to 20 pages/templates, projects, resources, careers, Professional SEO Setup, and Google Business Profile.",
    includes: [
      { code: "WEB-PRO", name: "Professional Website", standaloneTsh: 3_250_000 },
      { code: "SEO-PRO", name: "Professional SEO Setup", standaloneTsh: 750_000 },
      { code: "LOC-GBP", name: "Google Business Profile", standaloneTsh: 150_000 },
    ],
    standaloneWouldBeTsh: 4_150_000,
    savingsTsh: 400_000,
  },
  {
    code: "ADD-QUOTE",
    name: "Quote Request System",
    amountTsh: 300_000,
    billing: "ONE_TIME" as const,
    why: "Mandate desk: counterpart type × sector routing for sponsors, ministries, DFIs, and partners — not a generic contact form.",
    includes: [],
    standaloneWouldBeTsh: 300_000,
    savingsTsh: 0,
  },
  {
    code: "ADD-SRCH",
    name: "Advanced Site Search",
    amountTsh: 350_000,
    billing: "ONE_TIME" as const,
    why: "Search across sectors, assets, offices, and entities. Already in the interactive preview; billed because it is in scope, not as an optional extra.",
    includes: [],
    standaloneWouldBeTsh: 350_000,
    savingsTsh: 0,
  },
  {
    code: "COPY-20",
    name: "Copywriting · up to 20 pages",
    amountTsh: 1_100_000,
    billing: "ONE_TIME" as const,
    why: "Institutional copy adapted from Corporate Profile 2026 across the full page map. Facts that are not in the profile are not invented.",
    includes: [],
    standaloneWouldBeTsh: 1_100_000,
    savingsTsh: 0,
  },
] as const;

export const JEMBE_CARE = {
  code: "CARE-PRO",
  name: "Professional Care",
  amountTsh: 150_000,
  billing: "MONTHLY" as const,
} as const;

export const JEMBE_ONE_TIME_TSH = JEMBE_LINE_ITEMS.reduce(
  (sum, line) => sum + line.amountTsh,
  0,
);

/** Catalog payment schedule for amounts above TSh 5,000,000. */
export const JEMBE_PAYMENT = {
  commencementPct: 50,
  designApprovalPct: 30,
  launchPct: 20,
} as const;

export const JEMBE_COMMENCEMENT_TSH = Math.round(
  (JEMBE_ONE_TIME_TSH * JEMBE_PAYMENT.commencementPct) / 100,
);
export const JEMBE_DESIGN_TSH = Math.round(
  (JEMBE_ONE_TIME_TSH * JEMBE_PAYMENT.designApprovalPct) / 100,
);
export const JEMBE_LAUNCH_TSH = Math.round(
  (JEMBE_ONE_TIME_TSH * JEMBE_PAYMENT.launchPct) / 100,
);

export const JEMBE_BUNDLE_SAVINGS_TSH = JEMBE_LINE_ITEMS.reduce(
  (sum, line) => sum + line.savingsTsh,
  0,
);

export const JEMBE_INCLUDED_IN_WEB_PRO = [
  "≤20 pages / templates",
  "Advanced information architecture",
  "Blog / News",
  "Projects / Portfolio",
  "Case studies / track record",
  "Team / leadership templates",
  "Resource centre",
  "Careers",
  "Multi-location office ledger",
  "Analytics baseline",
] as const;

export const JEMBE_OUT_OF_SCOPE = [
  "Social media management (not proposed in this document)",
  "Domain registration and hosting (third-party / HOST-HOSTING)",
  "Paid advertising, ad spend, or media buying",
  "New photography or video production",
  "Optional add-ons listed later, unless Jembe selects them in writing",
] as const;

export const JEMBE_CONTACT = {
  name: "Karen Marie Kasigila",
  role: "Founder, KasiTech",
  email: "karen@kasitechinnovations.com",
  whatsapp: "+1 269 861 3487",
  mobile: "+255 626 000 005",
  web: "kasitechinnovations.com",
} as const;

export const JEMBE_BILL_TO = {
  legalName: "Jembe Group LLC",
  attention: "Leadership / authorised signatory",
  addressLines: [
    "Level 8, Standard Chartered Tower",
    "19 Cybercity, Ebene 72201",
    "Mauritius",
  ],
  email: "info@jembegroup.com",
  note: "Address as stated in Jembe Group Corporate Profile 2026. Confirm before a live domain launch.",
} as const;
