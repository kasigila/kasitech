/** Shipped client / founder work (not concept demos). */

export type ShippedWork = {
  id: string;
  slug: string;
  name: string;
  url: string;
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
    url: "https://climatefinance.co.tz/index.html",
    role: "Website / Digital Platform",
    summary:
      "A live institutional site for climate finance in Tanzania: services, impact, partners, and a clear call to collaborate.",
    outcome:
      "Gave an institutional climate-finance organisation a credible digital presence that explains services, impact, and how partners engage.",
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
    url: "https://kasigila.github.io/byzmock/index.html",
    role: "Website / Events Platform",
    summary:
      "A nightlife and events site for Dar es Salaam: event series, table reservations, lineups, gallery, and artist bookings.",
    outcome:
      "Gave BYZ a live digital home for Groove Series, Tempo, and APT. Session - so guests can discover nights, reserve tables, and connect with the brand.",
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
