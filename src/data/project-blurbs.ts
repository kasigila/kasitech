/** Plain-language “what is this demo?” for homepage discovery. */
export const projectBlurbs: Record<string, string> = {
  zuri: "Hospitality in Zanzibar: discover the stay, check dates, book online.",
  moto: "A restaurant: menus, table reservations, and ordering.",
  noir: "Nightlife and events: find nights out, buy tickets, reserve VIP.",
  soko: "A fashion shop: browse, pick sizes, check out with local payments.",
  nest: "Real estate: search listings, filters, book viewings.",
  afya: "Healthcare: find a doctor, book appointments, patient portal.",
  amani: "A professional firm site: clear story, credibility, enquiries.",
  atlas: "Logistics: quotes, shipment tracking, operations.",
  nuru: "Education: programs, applications, student portal.",
  impact: "A nonprofit: stories, impact, donations.",
  "kasi-flow": "Internal software: CRM, inventory, finance, daily ops.",
  "kasi-intelligence": "AI for the business: ask questions, approve automations.",
};

export function getProjectBlurb(slug: string, fallback?: string) {
  return projectBlurbs[slug] ?? fallback ?? "";
}
