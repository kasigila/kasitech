export type CatalogPrice = number | "custom";

export type PriceItem = {
  name: string;
  price: CatalogPrice;
  detail: string;
  /** e.g. "/month", "/year", " once" */
  suffix?: string;
};

export type CatalogSection = {
  id: string;
  num: string;
  title: string;
  intro?: string;
  note?: string;
  demoHref?: string;
  demoLabel?: string;
};

export const catalogMeta = {
  year: 2026,
  market: "Tanzania",
  currency: "Tanzanian Shillings (TSh)",
  tagline: "Clear scope. Clear pricing. Built around your business.",
  disclaimer:
    "Prices are fixed for the stated scope unless marked Custom Quote. No additional work is billed without written approval.",
} as const;

export const catalogNav = [
  { id: "websites", label: "Websites" },
  { id: "addons", label: "Add-ons" },
  { id: "booking", label: "Booking" },
  { id: "commerce", label: "Commerce" },
  { id: "industries", label: "Industries" },
  { id: "bundles", label: "Bundles" },
  { id: "seo", label: "SEO" },
  { id: "social", label: "Social" },
  { id: "branding", label: "Branding" },
  { id: "software", label: "Software" },
  { id: "care", label: "Care" },
  { id: "terms", label: "Terms" },
] as const;

export const websitePackages: (PriceItem & {
  pages: string;
  delivery: string;
  bestFit: string;
  featured?: boolean;
})[] = [
  {
    name: "One Page",
    price: 500_000,
    pages: "1 page · up to 8 sections",
    detail:
      "Custom scrolling page · responsive design · contact form · analytics · basic SEO",
    delivery: "7–10 business days",
    bestFit: "Focused small business, campaign, or personal brand",
  },
  {
    name: "Essential",
    price: 900_000,
    pages: "Up to 5 pages",
    detail:
      "Custom design · CMS for agreed content · forms · gallery · analytics · basic SEO",
    delivery: "2–3 weeks",
    bestFit: "Small business needing a complete professional presence",
  },
  {
    name: "Business",
    price: 1_500_000,
    pages: "Up to 10 pages",
    detail:
      "Enhanced custom design · CMS · blog/news · portfolio · advanced forms · enhanced SEO",
    delivery: "3–4 weeks",
    bestFit: "Established business with multiple services or content areas",
    featured: true,
  },
  {
    name: "Business+",
    price: 2_250_000,
    pages: "Up to 15 pages",
    detail:
      "Custom UX/UI · CMS · projects/case studies · team · resources · technical SEO foundation",
    delivery: "4–6 weeks",
    bestFit: "Growing organization with richer content and management needs",
  },
  {
    name: "Professional",
    price: 3_250_000,
    pages: "Up to 20 pages/templates",
    detail:
      "Advanced architecture · CMS · directories/resources · careers/news · event tracking",
    delivery: "6–8 weeks",
    bestFit: "Organization with multiple audiences, departments, or content types",
  },
  {
    name: "Signature",
    price: 4_500_000,
    pages: "Bespoke",
    detail:
      "Bespoke UX/UI · premium interactions · advanced architecture · custom components · advanced analytics · technical SEO",
    delivery: "8–10 weeks",
    bestFit: "Bespoke digital experience with premium interactions",
  },
  {
    name: "Custom Platform",
    price: "custom",
    pages: "Scoped",
    detail:
      "Portals · databases · dashboards · complex integrations · operational systems · large migrations",
    delivery: "Confirmed after scoping",
    bestFit: "Portals, databases, dashboards, integrations, or software",
  },
];

export const websiteIncluded =
  "Responsive design · SSL setup · basic security · contact form · WhatsApp · social links · Google Maps · analytics · basic SEO · performance optimization · domain connection · QA · two revision rounds · launch support";

export const websiteExcluded =
  "Hosting, domain registration/renewal, paid services and ongoing maintenance are separate where applicable.";

export const websiteComparison: {
  capability: string;
  values: string[];
}[] = [
  {
    capability: "Pages / templates",
    values: ["1", "Up to 5", "Up to 10", "Up to 15", "Up to 20", "Bespoke"],
  },
  {
    capability: "Editable content / CMS",
    values: ["—", "Selected", "✓", "✓", "✓", "✓"],
  },
  {
    capability: "Blog / News",
    values: ["Add-on", "Add-on", "✓", "✓", "✓", "✓"],
  },
  {
    capability: "Portfolio / Projects",
    values: ["Add-on", "Add-on", "✓", "✓", "✓", "✓"],
  },
  {
    capability: "Case studies / Team / Resources",
    values: ["Add-on", "Add-on", "Add-on", "✓", "✓", "✓"],
  },
  {
    capability: "Advanced forms",
    values: ["Add-on", "Add-on", "✓", "✓", "✓", "✓"],
  },
  {
    capability: "SEO",
    values: ["Basic", "Basic", "Enhanced", "Technical", "Technical", "Advanced"],
  },
  {
    capability: "Custom UX/UI",
    values: ["Focused", "Standard", "Enhanced", "Advanced", "Advanced", "Bespoke"],
  },
  {
    capability: "Premium interactions",
    values: ["—", "—", "—", "Selected", "Selected", "✓"],
  },
];

export const addOns: PriceItem[] = [
  { name: "Additional standard page", price: 100_000, detail: "Additional page using approved design system" },
  { name: "Custom landing page", price: 250_000, detail: "Campaign/product conversion page" },
  { name: "Blog / News", price: 300_000, detail: "Publish and manage articles" },
  { name: "Projects / Portfolio", price: 350_000, detail: "Reusable project listings/details" },
  { name: "Case Studies", price: 300_000, detail: "Case-study listing/detail system" },
  { name: "Team / Leadership", price: 200_000, detail: "Reusable staff profiles" },
  { name: "Careers / Vacancies", price: 300_000, detail: "Publish vacancies/receive applications" },
  { name: "Resource Centre", price: 300_000, detail: "Reports, brochures and downloads" },
  { name: "Events", price: 300_000, detail: "Event listings/details" },
  { name: "Advanced Site Search", price: 350_000, detail: "Search site content" },
  { name: "Multi-location Directory", price: 300_000, detail: "Branch/location profiles" },
  { name: "Interactive Map", price: 400_000, detail: "Custom map experience" },
  { name: "Advanced Inquiry Form", price: 150_000, detail: "Structured enquiry/routing" },
  { name: "Multi-step Form", price: 250_000, detail: "Long form divided into steps" },
  { name: "Quote Request System", price: 300_000, detail: "Structured quote-request workflow" },
  { name: "File Uploads", price: 100_000, detail: "Attach files to forms" },
  { name: "Social Feed", price: 150_000, detail: "Supported social content on-site" },
  { name: "Website Chatbot", price: 350_000, detail: "Rule/knowledge-based assistance" },
];

export const bookingFeatures: PriceItem[] = [
  { name: "External Booking Integration", price: 250_000, detail: "Connect existing booking provider" },
  { name: "Appointment Booking", price: 650_000, detail: "Service/date/time booking workflow" },
  { name: "Multi-staff Booking", price: 1_250_000, detail: "Staff schedules and availability" },
  { name: "Restaurant Reservations", price: 600_000, detail: "Table reservation workflow" },
  { name: "Tour / Activity Booking", price: 900_000, detail: "Tour/date/customer booking" },
  { name: "Hotel Booking Integration", price: 400_000, detail: "Connect existing booking engine" },
  { name: "Custom Hotel Booking", price: 2_000_000, detail: "Agreed room/availability workflow" },
  { name: "Availability Calendar", price: 400_000, detail: "Display/manage availability" },
];

export const paymentFeatures: PriceItem[] = [
  { name: "Standard Payment Integration", price: 500_000, detail: "M-Pesa, cards, and local payment reality" },
  { name: "Deposit Payments", price: 350_000, detail: "Partial payment at booking or order" },
  { name: "Recurring Payments", price: 750_000, detail: "Subscription or installment flows" },
  { name: "Donation Payments", price: 500_000, detail: "One-time and campaign giving" },
  { name: "Custom / Direct Payment API", price: "custom", detail: "Specialized provider or direct API work" },
];

export const commerceStores: PriceItem[] = [
  {
    name: "Starter Store",
    price: 1_500_000,
    detail: "Up to 25 products · categories · cart · checkout · orders · basic inventory",
  },
  {
    name: "Business Store",
    price: 2_500_000,
    detail: "Up to 100 products · variants · coupons · accounts · inventory · filters",
  },
  {
    name: "Advanced Store",
    price: 4_000_000,
    detail: "Advanced catalogue · inventory · customer workflows · advanced commerce features",
  },
  {
    name: "Custom Commerce",
    price: "custom",
    detail: "Wholesale/B2B · multi-vendor · ERP/POS · specialized integrations",
  },
];

export const languageServices: PriceItem[] = [
  { name: "English + Swahili functionality", price: 400_000, detail: "Bilingual site structure and switching" },
  { name: "Each additional language", price: 300_000, detail: "Per language beyond English + Swahili" },
  { name: "Professional translation", price: "custom", detail: "Quoted by word count and turnaround" },
];

export const industryGroups: {
  id: string;
  name: string;
  items: PriceItem[];
  demoHref?: string;
  demoLabel?: string;
}[] = [
  {
    id: "tourism",
    name: "Tourism",
    demoHref: "/demo/zuri",
    demoLabel: "Tourism demo",
    items: [
      { name: "Tour/Safari Catalogue", price: 400_000, detail: "Tour listings and detail pages" },
      { name: "Itinerary Templates", price: 300_000, detail: "Reusable trip structures" },
      { name: "Tour Inquiry", price: 300_000, detail: "Structured tour enquiry workflow" },
      { name: "Tour Booking", price: 900_000, detail: "Tour/date/customer booking" },
      { name: "Itinerary Builder", price: 900_000, detail: "Custom trip assembly experience" },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    demoHref: "/demo/nest",
    demoLabel: "Real estate demo",
    items: [
      { name: "Property Listings", price: 650_000, detail: "Listings with detail pages" },
      { name: "Search & Filters", price: 450_000, detail: "Location, price, and attribute filters" },
      { name: "Agent Profiles", price: 250_000, detail: "Reusable agent pages" },
      { name: "Property Inquiry", price: 250_000, detail: "Lead capture for listings" },
      { name: "Property Map", price: 450_000, detail: "Map-led discovery" },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurant",
    demoHref: "/demo/moto",
    demoLabel: "Restaurant demo",
    items: [
      { name: "Digital Menu", price: 300_000, detail: "Online menu with categories" },
      { name: "Advanced Menu", price: 450_000, detail: "Enhanced menu with modifiers and media" },
      { name: "Reservations", price: 600_000, detail: "Table reservation workflow" },
      { name: "Online Ordering", price: 900_000, detail: "Order and fulfilment flow" },
      { name: "Multi-branch", price: 350_000, detail: "Multiple location support" },
      { name: "QR Menu", price: 150_000, detail: "Scan-to-menu experience" },
    ],
  },
  {
    id: "education",
    name: "Education",
    items: [
      { name: "Admissions", price: 450_000, detail: "Application intake workflow" },
      { name: "Faculty Directory", price: 250_000, detail: "Staff and faculty profiles" },
      { name: "Course Catalogue", price: 400_000, detail: "Programs and course listings" },
      { name: "Student Portal", price: 2_000_000, detail: "Authenticated student experience" },
      { name: "Parent Portal", price: 2_000_000, detail: "Authenticated parent experience" },
      { name: "Fee Payments", price: 750_000, detail: "Fee collection integration" },
    ],
  },
  {
    id: "ngo",
    name: "NGO / Charity",
    demoHref: "/demo/impact",
    demoLabel: "Impact demo",
    items: [
      { name: "Programs / Projects", price: 350_000, detail: "Program listings and stories" },
      { name: "Donations", price: 500_000, detail: "Giving and payment flow" },
      { name: "Publications", price: 300_000, detail: "Reports and downloads" },
      { name: "Volunteer Applications", price: 250_000, detail: "Volunteer intake" },
      { name: "Donor Portal", price: 1_750_000, detail: "Authenticated donor experience" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    demoHref: "/demo/afya",
    demoLabel: "Healthcare demo",
    items: [
      { name: "Practitioner Directory", price: 250_000, detail: "Clinician profiles" },
      { name: "Appointments", price: 650_000, detail: "Appointment booking workflow" },
      { name: "Patient Forms", price: 250_000, detail: "Intake and clinical forms" },
      { name: "Patient Portal", price: 2_500_000, detail: "Authenticated patient experience" },
      { name: "Teleconsult Integration", price: 450_000, detail: "Connect teleconsult provider" },
    ],
  },
  {
    id: "logistics",
    name: "Logistics",
    demoHref: "/demo/atlas",
    demoLabel: "Logistics demo",
    items: [
      { name: "Quote Workflow", price: 300_000, detail: "Freight/service quote requests" },
      { name: "Shipment Inquiry", price: 350_000, detail: "Shipment enquiry intake" },
      { name: "Tracking Interface", price: 650_000, detail: "Customer-facing tracking UI" },
      { name: "Live Tracking API", price: 1_250_000, detail: "Live tracking integration" },
      { name: "Customer Portal", price: 2_000_000, detail: "Authenticated customer experience" },
    ],
  },
];

export const bundles: (PriceItem & {
  featured?: boolean;
  demoHref?: string;
  demoLabel?: string;
})[] = [
  {
    name: "Business Launch",
    price: 1_250_000,
    detail: "Essential Website · Google Business · enhanced SEO · analytics · business email setup",
    featured: true,
  },
  {
    name: "Beauty & Booking",
    price: 1_050_000,
    detail: "One Page · external booking · gallery · Google Business · social integration",
    demoHref: "/demo/noir",
    demoLabel: "Beauty demo",
  },
  {
    name: "Restaurant",
    price: 1_850_000,
    detail: "Essential Website · digital menu · reservations · Google Business · gallery",
    demoHref: "/demo/moto",
    demoLabel: "Restaurant demo",
  },
  {
    name: "Online Store",
    price: 2_850_000,
    detail: "Essential Website · Starter Store · one standard payment integration",
    demoHref: "/demo/soko",
    demoLabel: "Store demo",
  },
  {
    name: "Tourism",
    price: 2_850_000,
    detail: "Business Website · tour catalogue · itinerary templates · inquiry system · enhanced SEO",
    demoHref: "/demo/zuri",
    demoLabel: "Tourism demo",
  },
  {
    name: "Real Estate",
    price: 2_650_000,
    detail: "Business Website · property listings · filters · inquiry system",
    demoHref: "/demo/nest",
    demoLabel: "Real estate demo",
  },
  {
    name: "Professional Presence",
    price: 3_750_000,
    detail: "Professional Website · Professional SEO Setup · Google Business",
  },
  {
    name: "Digital Growth",
    price: 2_250_000,
    suffix: "/month",
    detail: "Social Pro · SEO Growth · website care/content within allowance",
  },
];

export const seoServices: PriceItem[] = [
  {
    name: "SEO Foundation",
    price: 400_000,
    suffix: " once",
    detail: "Keyword mapping · metadata · indexing · sitemap · core on-page optimization",
  },
  {
    name: "Professional SEO Setup",
    price: 750_000,
    suffix: " once",
    detail: "Research · on-page SEO · internal linking · structured data · technical review",
  },
  {
    name: "Advanced SEO Setup",
    price: 1_250_000,
    suffix: " once",
    detail: "Large-site technical SEO · architecture · strategy · advanced structured data",
  },
  {
    name: "SEO Care",
    price: 350_000,
    suffix: "/month",
    detail: "Monitoring · upkeep · optimization · reporting",
  },
  {
    name: "SEO Growth",
    price: 650_000,
    suffix: "/month",
    detail: "Optimization · keyword/content growth · competitor tracking · reporting",
  },
  {
    name: "SEO Authority",
    price: 1_100_000,
    suffix: "/month",
    detail: "Competitive search program · content/authority work · advanced reporting",
  },
];

export const localSearch: PriceItem[] = [
  { name: "Google Business Profile", price: 150_000, detail: "Setup and optimization foundation" },
  { name: "Local Search Optimization", price: 250_000, detail: "Local presence and citation hygiene" },
  { name: "Review Strategy Setup", price: 100_000, detail: "Review request and response framework" },
];

export const socialPlans: PriceItem[] = [
  {
    name: "Essential",
    price: 350_000,
    suffix: "/month",
    detail: "1 platform · 8 pieces · captions · graphics · scheduling · report",
  },
  {
    name: "Growth",
    price: 650_000,
    suffix: "/month",
    detail: "Up to 2 platforms · 12 pieces · strategy · graphics · basic video edits · community management",
  },
  {
    name: "Pro",
    price: 1_000_000,
    suffix: "/month",
    detail: "Up to 3 platforms · 16–20 pieces · Reels/carousels · calendar · copy · community management",
  },
  {
    name: "Corporate",
    price: 1_750_000,
    suffix: "/month",
    detail: "Up to 4 platforms · 20–24 pieces · strategy · enhanced creative/video · analytics · strategy review",
  },
];

export const advertising: PriceItem[] = [
  { name: "Meta Ads Setup", price: 200_000, suffix: " once", detail: "Campaign structure and launch setup" },
  {
    name: "Meta Management",
    price: 300_000,
    suffix: "/month",
    detail: "Up to TSh 2M spend; 15% thereafter",
  },
  { name: "Google Ads Setup", price: 300_000, suffix: " once", detail: "Account and campaign setup" },
  {
    name: "Google Management",
    price: 400_000,
    suffix: "/month",
    detail: "Up to TSh 2.5M spend; 15% thereafter",
  },
  { name: "Campaign Landing Page", price: 250_000, detail: "Conversion-focused campaign page" },
];

export const brandingServices: PriceItem[] = [
  { name: "Logo Refresh", price: 300_000, detail: "Refine an existing mark" },
  { name: "Professional Logo", price: 500_000, detail: "New logo system" },
  { name: "Visual Identity", price: 900_000, detail: "Broader visual language" },
  { name: "Brand Guidelines", price: 450_000, detail: "Usage rules and examples" },
  { name: "Business Card", price: 150_000, detail: "Print-ready card design" },
  { name: "Letterhead", price: 100_000, detail: "Stationery system" },
  { name: "Company Profile", price: 450_000, detail: "Capability / company PDF" },
  { name: "Corporate Deck", price: 450_000, detail: "Presentation design" },
  { name: "Brochure / Catalogue", price: 350_000, detail: "Print or digital brochure" },
  { name: "Social Visual System", price: 350_000, detail: "Reusable social templates" },
  { name: "One-page Copywriting", price: 200_000, detail: "Homepage or landing copy" },
  { name: "Up to 5 Pages Copywriting", price: 400_000, detail: "Multi-page site copy" },
  { name: "Up to 10 Pages Copywriting", price: 650_000, detail: "Broader site copy package" },
  { name: "Up to 20 Pages Copywriting", price: 1_100_000, detail: "Full site copy package" },
];

export const businessPlans: PriceItem[] = [
  {
    name: "Launch",
    price: 150_000,
    suffix: "/month",
    detail: "1 user · 1 location · website editor · basic analytics",
  },
  {
    name: "Growth",
    price: 400_000,
    suffix: "/month",
    detail: "Up to 5 users · customer database · bookings · events · QR tools · standard analytics",
  },
  {
    name: "Pro",
    price: 800_000,
    suffix: "/month",
    detail: "Up to 10 users · 2 locations · advanced analytics · expanded workflows",
  },
  {
    name: "Scale",
    price: 1_500_000,
    suffix: "/month",
    detail: "Up to 25 users · 5 locations · advanced operations",
  },
  {
    name: "Enterprise",
    price: "custom",
    detail: "Custom users, locations, integrations and workflows",
  },
];

export const customSoftware: PriceItem[] = [
  { name: "Custom Web Application", price: "custom", detail: "Bespoke product or internal tool" },
  { name: "CRM / Inventory / Operations System", price: "custom", detail: "Operational software around your workflows" },
  { name: "Dashboard / Data Platform", price: "custom", detail: "Reporting and decision surfaces" },
  { name: "AI / Automation System", price: "custom", detail: "Automation with human approval where needed" },
  { name: "Mobile Application", price: "custom", detail: "iOS/Android product scoped to need" },
  { name: "API / Third-party Integration", price: "custom", detail: "Connect systems you already use" },
];

export const carePlans: PriceItem[] = [
  {
    name: "Essential Care",
    price: 180_000,
    suffix: "/year",
    detail: "Small/static site · SSL monitoring · technical checks",
  },
  {
    name: "Standard Care",
    price: 300_000,
    suffix: "/year",
    detail: "Small-business maintenance · backups · technical checks",
  },
  {
    name: "Business Care",
    price: 600_000,
    suffix: "/year",
    detail: "Maintenance · backups · monitoring · defined minor content updates",
  },
  {
    name: "Professional Care",
    price: 150_000,
    suffix: "/month",
    detail: "Routine support · maintenance · defined content updates",
  },
  {
    name: "Priority Care",
    price: 300_000,
    suffix: "/month",
    detail: "Priority support · monitoring · backups · analytics checks · content support",
  },
];

export const hostingItems: PriceItem[] = [
  {
    name: "Business email setup",
    price: 150_000,
    detail: "Configuration for up to 5 addresses; mailbox subscription/provider fees separate",
  },
  {
    name: "Additional email setup",
    price: 25_000,
    detail: "Per address · configuration only; provider subscription separate",
  },
];

export const deliveryOptions = [
  { name: "Standard", fee: "Included", reduction: "Standard schedule" },
  { name: "Priority", fee: "+25%", reduction: "Approx. 25% faster" },
  { name: "Rush", fee: "+40%", reduction: "Approx. 40% faster" },
  { name: "Emergency", fee: "+50%", reduction: "Up to approx. 50% faster" },
] as const;

export const paymentSchedule = [
  {
    range: "Below TSh 1,000,000",
    schedule: "70% commencement · 30% before launch",
  },
  {
    range: "TSh 1,000,000–5,000,000",
    schedule: "60% commencement · 30% milestone · 10% before launch",
  },
  {
    range: "Above TSh 5,000,000",
    schedule: "50% commencement · 30% design/development approval · 20% before launch",
  },
] as const;

export const projectSteps = [
  { num: "01", title: "Consultation", body: "Goals, audience and required functionality" },
  { num: "02", title: "Scope & Quote", body: "Deliverables, final price and timeline" },
  { num: "03", title: "Design", body: "Visual direction and interface approval" },
  { num: "04", title: "Development", body: "Build, content and integrations" },
  { num: "05", title: "Review & QA", body: "Testing and structured revisions" },
  { num: "06", title: "Launch", body: "Deployment, handover and support options" },
] as const;

export const termsHighlights = [
  "Formal quotations are valid for 30 days.",
  "Monthly services are paid in advance.",
  "Two structured revision rounds are included unless stated otherwise.",
  "The approved scope is billed at the approved price.",
  "New requirements are quoted through a Change Request before work begins.",
  "No additional work is billed without written client approval.",
  "Third-party fees, licenses, subscriptions, transaction charges, ad spend and production costs are shown separately where applicable.",
  "Timelines begin after commencement payment and receipt of required materials/access.",
  "Post-launch workmanship warranty: 30 calendar days for defects in approved delivered scope.",
  "Catalog prices are presented before any tax that KasiTech is legally required to charge.",
] as const;
