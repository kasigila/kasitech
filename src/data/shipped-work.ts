/** Shipped client / founder work (not concept demos). */

export type ShippedWork = {
  id: string;
  slug: string;
  name: string;
  /** Actual click destination (may be a temporary host). */
  url: string;
  /**
   * Domain shown on the site (browser chrome + CTA label).
   * Use when the real domain is announced but not live yet.
   */
  displayUrl?: string;
  liveStatus?: "live" | "preview";
  role: string;
  summary: string;
  outcome: string;
  challenge: string;
  capabilities: string[];
  location: string;
  year: string;
  industry: string;
  caseStudyPath: string;
  cover?: string;
};

export const shippedWork: ShippedWork[] = [
  {
    id: "climate-finance",
    slug: "africa-climate-finance",
    name: "Africa Climate Finance",
    url: "https://climatefinance.co.tz/",
    role: "Website / Digital Platform",
    summary:
      "A live institutional site for climate finance in Tanzania: services, impact, partners, and a clear call to collaborate.",
    outcome:
      "Designed a modern digital platform that helps partners explore climate finance initiatives, understand the organisation’s work, and connect with its team.",
    challenge:
      "Institutional organisations often need digital presence that communicates credibility, clarifies services, and invites the right partners - without looking generic or underbuilt.",
    capabilities: [
      "Institutional website",
      "Service storytelling",
      "Impact & partner presentation",
      "Clear collaboration CTA",
    ],
    location: "Tanzania",
    year: "2026",
    industry: "Institutional",
    caseStudyPath: "/work/africa-climate-finance",
    cover: "/work/africa-climate-finance.jpg",
  },
  {
    id: "byz",
    slug: "byz",
    name: "BYZ",
    // Temporary host until byzentertainment.com is purchased + pointed
    url: "https://kasigila.github.io/byzmock/index.html",
    displayUrl: "byzentertainment.com",
    liveStatus: "live",
    role: "Website / Events Platform",
    summary:
      "A nightlife and events site for Dar es Salaam: event series, table reservations, lineups, gallery, and artist bookings.",
    outcome:
      "Built a digital home for nightlife and events where guests can discover nights, reserve tables, and connect with the brand.",
    challenge:
      "Nightlife brands need more than a static page. Guests want upcoming events, reservations, lineups, and a way to connect - fast, on mobile, without losing the energy of the brand.",
    capabilities: [
      "Event discovery & series pages",
      "Table reservation flows",
      "Lineups & announcements",
      "Gallery & artist booking",
      "WhatsApp and social connect",
    ],
    location: "Dar es Salaam",
    year: "2026",
    industry: "Nightlife / Events",
    caseStudyPath: "/work/byz",
    cover: "/work/byz.jpg",
  },
];

export function getShippedWork(slug: string) {
  return shippedWork.find((w) => w.slug === slug);
}

/** Host text shown in UI (browser chrome, labels). */
export function shippedWorkDisplayHost(
  work: Pick<ShippedWork, "url" | "displayUrl">,
) {
  if (work.displayUrl) return work.displayUrl.replace(/^https?:\/\//, "");
  return work.url
    .replace(/^https?:\/\//, "")
    .replace(/\/index\.html$/, "")
    .replace(/\/$/, "");
}

export function shippedWorkExternalLabel(
  work: Pick<ShippedWork, "liveStatus" | "displayUrl" | "url">,
) {
  if (work.displayUrl) {
    return `Visit ${shippedWorkDisplayHost(work)} ↗`;
  }
  return work.liveStatus === "preview"
    ? "View preview site ↗"
    : "Visit live site ↗";
}
