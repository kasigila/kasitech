/**
 * Commercial buying-guide documentation for Catalog V2.
 * Expands approved KT-PB-2026.1 items - does not invent products or entitlements.
 */
import { loadPriceBook } from "@/commercial/price-book/load";
import { formatTsh } from "@/commercial/money";
import {
  getBundleViews,
  getWebsitePackages,
  PACKAGE_POSITIONING,
} from "@/commercial/catalog/presentation";
import { KB_MODULES } from "@/demo-studio/configuration/kb-modules";
import { demoStudioUrl } from "@/demo-studio/configuration/deep-link";
import type { BillingType, CatalogItem } from "@/commercial/types";

/** Baseline bullets from ENT-WEB-BASELINE (approved entitlement text). */
export const WEB_BASELINE_INCLUDED = [
  "Responsive website (works on phone, tablet, desktop)",
  "SSL setup",
  "Basic security configuration",
  "Contact form",
  "WhatsApp integration",
  "Social profile links",
  "Google Maps",
  "Baseline analytics setup",
  "Basic on-page SEO",
  "Performance optimization",
  "Domain connection",
  "QA before launch",
  "Two revision rounds",
  "Launch support",
];

export type PackageGuide = {
  item: CatalogItem;
  valueProp: string;
  whatItDoes: string;
  /** Package-specific scope (baseline listed once on the packages glance page). */
  included: string[];
  includesBaseline: boolean;
  idealFor: string;
  commonlyUsedBy: string;
  seeLiveUrl: string;
  notes: string | null;
  timeline: string | null;
};

export type CapabilityGuide = {
  item: CatalogItem;
  valueProp: string;
  whatItDoes: string;
  included: string[];
  idealFor: string;
  commonlyUsedBy: string;
  related: string[];
  workflow: string;
  seeLiveUrl: string;
  notes: string | null;
};

export type BundleGuide = {
  code: string;
  name: string;
  valueProp: string;
  whyTogether: string;
  components: {
    code: string;
    name: string;
    priceLabel: string;
    priceTsh: number | null;
    billing: BillingType;
  }[];
  entitlements: string[];
  standaloneTotalTsh: number | null;
  bundlePriceLabel: string;
  bundlePriceTsh: number | null;
  savingsTsh: number | null;
  showSavings: boolean;
  seeLiveUrl: string;
  industryHint: string;
  /** Shown when we intentionally hide a buy-separately total */
  pricingNote: string | null;
};

function packageExtras(code: string): string[] {
  switch (code) {
    case "WEB-ONE":
      return [
        "1 custom scrolling page",
        "Up to 8 content sections",
        "Clear single-offer / campaign structure",
      ];
    case "WEB-ESS":
      return [
        "Up to 5 pages",
        "Custom design",
        "CMS for agreed content your team can update",
        "Image gallery",
      ];
    case "WEB-BUS":
      return [
        "Up to 10 pages",
        "Enhanced custom design",
        "CMS for agreed content",
        "Blog / News",
        "Projects / Portfolio",
        "Enhanced on-page SEO level",
      ];
    case "WEB-BUSP":
      return [
        "Up to 15 pages",
        "Custom UX/UI",
        "CMS for agreed content",
        "Blog / News",
        "Projects / Portfolio",
        "Case Studies",
        "Team / Leadership",
        "Resource Centre",
      ];
    case "WEB-PRO":
      return [
        "Up to 20 pages / templates",
        "Advanced information architecture",
        "Blog / News",
        "Projects / Portfolio",
        "Case Studies",
        "Team / Leadership",
        "Resource Centre",
        "Careers / Vacancies",
      ];
    case "WEB-SIG":
      return [
        "Bespoke UX/UI craft",
        "Premium interactions (scoped to Signature)",
        "Blog / News",
        "Projects / Portfolio",
        "Case Studies",
        "Team / Leadership",
        "Resource Centre",
        "Careers / Vacancies",
        "Everything in Professional structure - elevated execution",
      ];
    case "WEB-CUS":
      return [
        "Scoped after discovery - portals, databases, dashboards, complex integrations",
        "Priced as a custom quotation (not a fixed package fee)",
      ];
    default:
      return [];
  }
}

export function buildPackageGuides(): PackageGuide[] {
  const packages = getWebsitePackages();
  return packages.map((item) => {
    const pos = PACKAGE_POSITIONING[item.code];
    const extras = packageExtras(item.code);
    const includesBaseline = item.code !== "WEB-CUS";
    const slug = packageSlug(item.code);
    const timeline =
      item.timelineMinDays != null && item.timelineMaxDays != null
        ? `${item.timelineMinDays}–${item.timelineMaxDays} days`
        : null;

    return {
      item,
      valueProp:
        (pos?.plain ??
          item.clientDescription.replace(item.name, "").trim()) ||
        item.clientDescription,
      whatItDoes: item.clientDescription,
      included: extras,
      includesBaseline,
      idealFor: pos?.bestFor ?? "Businesses that need a clear online presence.",
      commonlyUsedBy: commonlyForPackage(item.code),
      seeLiveUrl: demoStudioUrl({
        industry: industryForPackage(item.code),
        package: slug,
      }),
      notes:
        item.code === "WEB-CUS"
          ? "Custom Platform is quoted after we understand workflows. Domain registration and hosting are typically third-party costs."
          : "Domain registration and website hosting are usually paid to third parties and confirmed separately from this build fee.",
      timeline,
    };
  });
}

function packageSlug(code: string): string {
  const map: Record<string, string> = {
    "WEB-ONE": "one",
    "WEB-ESS": "essential",
    "WEB-BUS": "business",
    "WEB-BUSP": "business-plus",
    "WEB-PRO": "professional",
    "WEB-SIG": "signature",
    "WEB-CUS": "custom",
  };
  return map[code] ?? code.toLowerCase();
}

function industryForPackage(code: string): string {
  const map: Record<string, string> = {
    "WEB-ONE": "beauty",
    "WEB-ESS": "general",
    "WEB-BUS": "tourism",
    "WEB-BUSP": "professional",
    "WEB-PRO": "professional",
    "WEB-SIG": "professional",
    "WEB-CUS": "general",
  };
  return map[code] ?? "general";
}

function commonlyForPackage(code: string): string {
  const map: Record<string, string> = {
    "WEB-ONE": "Salons launching a single offer, campaigns, personal brands",
    "WEB-ESS": "Clinics, cafés, local services, NGOs needing a complete site",
    "WEB-BUS": "Tour operators, hotels, growing service businesses",
    "WEB-BUSP": "Agencies and firms with case studies, teams, and resources",
    "WEB-PRO": "Organizations with careers, directories, and multiple audiences",
    "WEB-SIG": "Premium brands that need a distinctive digital experience",
    "WEB-CUS": "Operators needing portals, dashboards, or complex systems",
  };
  return map[code] ?? "Tanzanian businesses";
}

const CAPABILITY_DOCS: Record<
  string,
  Omit<CapabilityGuide, "item" | "seeLiveUrl">
> = {
  "BKG-APT": {
    valueProp:
      "Allow customers to schedule appointments online without calling or sending WhatsApp messages.",
    whatItDoes:
      "Visitors choose a service, pick a date and time, and submit booking details to your team.",
    included: [
      "Service selection",
      "Date and time selection",
      "Customer contact details capture",
      "Confirmation flow (demo / production configuration as scoped)",
    ],
    idealFor: "Salons, clinics, consultants, and appointment-led businesses",
    commonlyUsedBy: "Beauty studios, healthcare practices, professional services",
    related: ["BKG-STAFF", "PAY-DEP", "PAY-STD"],
    workflow:
      "Customer opens Book -> selects service -> chooses slot -> submits details -> your team receives the request.",
    notes: "Upgrade to Multi-staff Booking when each staff member needs their own calendar.",
  },
  "BKG-STAFF": {
    valueProp:
      "Let customers book with a specific staff member whose availability is respected.",
    whatItDoes:
      "Appointment booking with staff selection - includes the capability of Appointment Booking.",
    included: [
      "Everything in Appointment Booking",
      "Staff member selection",
      "Per-staff availability awareness (as scoped)",
    ],
    idealFor: "Multi-stylist salons and clinics with named practitioners",
    commonlyUsedBy: "Beauty teams, multi-doctor clinics",
    related: ["BKG-APT", "PAY-DEP"],
    workflow:
      "Customer picks service -> chooses staff -> selects available time -> confirms.",
    notes: "Exclusive with Appointment Booking - you pay for one tier, not both.",
  },
  "BKG-REST": {
    valueProp: "Let guests reserve a table online for the date and party size they need.",
    whatItDoes:
      "Restaurant reservation requests with date, time, party size, and guest details.",
    included: [
      "Reservation request form",
      "Date / time / party size",
      "Guest contact capture",
    ],
    idealFor: "Restaurants and hospitality venues taking table bookings",
    commonlyUsedBy: "Restaurants, cafés with evening service",
    related: ["REST-MENU", "REST-AMENU", "LOC-GBP"],
    workflow:
      "Guest taps Reserve -> enters date, time, party size -> restaurant confirms.",
    notes: null,
  },
  "BKG-TOUR": {
    valueProp: "Let travellers request or book tours and activities from your site.",
    whatItDoes: "Tour / activity booking flow connected to your tour offerings.",
    included: [
      "Tour selection context",
      "Booking / request capture",
      "Customer details",
    ],
    idealFor: "Tour operators and activity providers",
    commonlyUsedBy: "Safari and experience operators",
    related: ["TOUR-CAT", "TOUR-ITIN", "PAY-STD"],
    workflow:
      "Traveller chooses tour -> submits booking interest -> your team confirms availability.",
    notes: null,
  },
  "BKG-EXT": {
    valueProp: "Connect your website to an external booking tool you already use.",
    whatItDoes:
      "Integration path to an existing booking system rather than a full native booking build.",
    included: ["Connection to an agreed external booking tool", "Website entry points"],
    idealFor: "Businesses that already run bookings in another platform",
    commonlyUsedBy: "Salons and clinics with existing booking software",
    related: ["BKG-APT", "LOC-GBP"],
    workflow: "Visitor clicks Book -> opens or embeds your existing booking tool.",
    notes: "Used in the Beauty & Booking bundle.",
  },
  "PAY-STD": {
    valueProp:
      "Accept payments on your site through supported channels such as M-Pesa or cards (as scoped).",
    whatItDoes: "Standard payment integration for checkout or pay-now flows.",
    included: [
      "Payment provider connection (as scoped)",
      "Checkout / pay flow on the website",
    ],
    idealFor: "Stores, deposits, and paid services",
    commonlyUsedBy: "Retail, tours, restaurants with ordering",
    related: ["ECOM-START", "PAY-DEP", "PAY-REC"],
    workflow: "Customer reaches payment step -> pays via connected method -> order confirmed.",
    notes: "Provider fees are third-party and separate from this integration fee.",
  },
  "ECOM-START": {
    valueProp: "Sell products online with a simple shop, cart, and checkout.",
    whatItDoes: "Starter e-commerce store for a clear product catalogue.",
    included: [
      "Product listing",
      "Cart",
      "Checkout",
      "Basic stock tracking (as scoped)",
    ],
    idealFor: "Retailers starting online sales",
    commonlyUsedBy: "Boutiques, product brands, market sellers",
    related: ["PAY-STD", "ECOM-BUS"],
    workflow: "Shopper browses products -> adds to cart -> checks out -> pays.",
    notes: "Higher store tiers (Business / Advanced) replace this when you need more commerce depth.",
  },
  "REST-MENU": {
    valueProp: "Publish a clean digital menu guests can read on any phone.",
    whatItDoes: "Digital menu presentation for restaurant dishes and prices.",
    included: ["Menu structure", "Dish names and prices", "Mobile-readable layout"],
    idealFor: "Restaurants replacing paper menus online",
    commonlyUsedBy: "Restaurants, cafés, hotel F&B",
    related: ["REST-AMENU", "REST-QR", "BKG-REST"],
    workflow: "Guest opens Menu -> browses sections -> (optionally) reserves or orders.",
    notes: "Upgrade to Advanced Menu for categories, filters, and dietary detail.",
  },
  "REST-AMENU": {
    valueProp:
      "Give guests a richer menu with categories, filtering, and dietary information.",
    whatItDoes:
      "Advanced digital menu - includes Digital Menu capability.",
    included: [
      "Everything in Digital Menu",
      "Categories",
      "Filtering",
      "Dietary information (as scoped)",
    ],
    idealFor: "Restaurants with larger menus and dietary needs",
    commonlyUsedBy: "Full-service restaurants",
    related: ["REST-MENU", "REST-ORDER"],
    workflow: "Guest filters by category or diet -> browses -> acts (reserve / order).",
    notes: "Exclusive with Digital Menu - one tier charge.",
  },
  "TOUR-CAT": {
    valueProp: "Present tours as clear products travellers can browse and compare.",
    whatItDoes: "Tour catalog with structured tour offerings.",
    included: ["Tour list / cards", "Key tour facts on each offering"],
    idealFor: "Operators with multiple experiences",
    commonlyUsedBy: "Tourism companies",
    related: ["TOUR-ITIN", "TOUR-INQ", "BKG-TOUR"],
    workflow: "Traveller browses catalog -> opens a tour -> enquires or books.",
    notes: null,
  },
  "RE-LIST": {
    valueProp: "List properties with the facts buyers need - price, location, and details.",
    whatItDoes: "Property listing presentation for real-estate inventory.",
    included: ["Property cards / list", "Key property facts"],
    idealFor: "Agencies and property advisors",
    commonlyUsedBy: "Real-estate brokerages",
    related: ["RE-FILT", "RE-INQ", "RE-MAP"],
    workflow: "Buyer browses listings -> opens a property -> enquires.",
    notes: null,
  },
  "LOC-GBP": {
    valueProp: "Get found on Google Maps and local Search with a polished Business Profile.",
    whatItDoes:
      "Google Business Profile setup / optimization work as a local-search service (non-website layout change).",
    included: [
      "Business Profile work as scoped in your quotation",
      "Local presence guidance",
    ],
    idealFor: "Any local business that wants to be found nearby",
    commonlyUsedBy: "Restaurants, salons, clinics, shops",
    related: ["LOC-OPT", "LOC-REV"],
    workflow: "Customer searches Google -> finds your profile -> calls, visits, or clicks to site.",
    notes: "Does not replace a website - it strengthens how you appear in Google.",
  },
  "LOC-REV": {
    valueProp: "Plan how customers leave and find reviews that build trust.",
    whatItDoes: "Review strategy for gathering and presenting social proof.",
    included: ["Review strategy as scoped", "Guidance for customer review journeys"],
    idealFor: "Businesses where ratings drive decisions",
    commonlyUsedBy: "Hospitality, beauty, professional services",
    related: ["LOC-GBP"],
    workflow: "Happy customer is guided to leave a review -> future customers see trust signals.",
    notes: null,
  },
  "SEO-FND": {
    valueProp: "Lay the foundation for search visibility on your website.",
    whatItDoes: "SEO Foundation setup for on-page search basics.",
    included: ["Foundation SEO setup as scoped for this tier"],
    idealFor: "New sites that need correct search basics",
    commonlyUsedBy: "SMEs launching or rebuilding sites",
    related: ["SEO-PRO", "SEO-ADV", "LOC-GBP"],
    workflow: "We apply foundation SEO -> pages are structured for search engines.",
    notes: "Professional and Advanced SEO replace Foundation when selected (exclusive family).",
  },
  "SEO-PRO": {
    valueProp: "Stronger SEO setup for competitive search.",
    whatItDoes:
      "Professional SEO Setup - includes lower-tier SEO Foundation capability.",
    included: ["Professional SEO setup as scoped", "Includes Foundation-level capability"],
    idealFor: "Businesses competing for search attention in their category",
    commonlyUsedBy: "Professional firms, growing brands",
    related: ["SEO-FND", "SEO-ADV", "LOC-GBP"],
    workflow: "Professional SEO setup applied -> site better prepared for organic discovery.",
    notes: null,
  },
  "LANG-ENSW": {
    valueProp:
      "Let visitors switch between any two languages on your site - English and Swahili, or any other pair you need.",
    whatItDoes:
      "Two-language website functionality for bilingual audiences (any language pair, as scoped).",
    included: [
      "Language switching between two agreed languages",
      "Shared navigation and content structure across both languages",
    ],
    idealFor: "Businesses serving audiences in more than one language",
    commonlyUsedBy: "Tourism, NGOs, national brands, export businesses",
    related: ["LANG-ADD", "LANG-TRANS"],
    workflow:
      "Visitor taps language control -> content presents in the selected language.",
    notes:
      "Each further language is LANG-ADD. Three- and four-language packs are available below list price of buying languages separately.",
  },
  "LANG-ADD": {
    valueProp: "Add one more language to a bilingual site.",
    whatItDoes:
      "Each additional language beyond the bilingual base (LANG-ENSW / two-language functionality).",
    included: [
      "One additional language wired into the same language-switch experience",
      "Content structure aligned with the existing bilingual build",
    ],
    idealFor: "Sites that already have two languages and need a third or fourth",
    commonlyUsedBy: "Regional brands, tourism operators, NGOs",
    related: ["LANG-ENSW", "LANG-TRANS", "BND-LANG3"],
    workflow:
      "Visitor chooses among the available languages -> content presents in the selected language.",
    notes:
      "Priced per additional language. Prefer a Three- or Four-Language Pack when adding more than one.",
  },
  "LANG-TRANS": {
    valueProp: "Professional translation scoped and quoted for your content volume.",
    whatItDoes: "Professional translation services - custom quotation.",
    included: [
      "Translation scope confirmed in writing",
      "Delivery timeline confirmed on quotation",
    ],
    idealFor: "Teams that need translated copy, not only a language switcher",
    commonlyUsedBy: "Brands publishing polished multilingual content",
    related: ["LANG-ENSW", "LANG-ADD"],
    workflow: "We scope content volume -> quote translation -> deliver approved copy.",
    notes: "Custom quote - not a fixed catalog fee.",
  },
};

export function buildCapabilityGuides(): CapabilityGuide[] {
  const book = loadPriceBook();
  const codes = Object.keys(CAPABILITY_DOCS);
  return codes
    .map((code) => {
      const item = book.itemByCode.get(code);
      const doc = CAPABILITY_DOCS[code];
      if (!item || !doc) return null;
      const featureSlugMap: Record<string, string> = {
          "BKG-APT": "appointment-booking",
          "BKG-STAFF": "multi-staff-booking",
          "BKG-REST": "restaurant-reservations",
          "BKG-TOUR": "tour-booking",
          "PAY-STD": "payment-integration",
          "ECOM-START": "starter-store",
          "REST-MENU": "digital-menu",
          "REST-AMENU": "advanced-menu",
          "RE-LIST": "property-listings",
          "LOC-GBP": "google-business",
          "LOC-REV": "review-strategy",
          "SEO-FND": "seo-foundation",
          "SEO-PRO": "seo-professional",
          "LANG-ENSW": "multilingual",
          "LANG-ADD": "multilingual",
          "TOUR-CAT": "tour-catalog",
          "BKG-EXT": "appointment-booking",
        };
      const featureSlug = featureSlugMap[code] ?? code.toLowerCase();

      return {
        item,
        ...doc,
        related: doc.related.map((c) => {
          const it = book.itemByCode.get(c);
          return it ? it.name : c;
        }),
        seeLiveUrl: demoStudioUrl({
          industry: industryForFeature(code),
          package: "essential",
          feature: featureSlug,
        }),
      };
    })
    .filter(Boolean) as CapabilityGuide[];
}

function industryForFeature(code: string): string {
  if (code.startsWith("REST") || code === "BKG-REST") return "restaurant";
  if (code.startsWith("TOUR") || code === "BKG-TOUR") return "tourism";
  if (code.startsWith("RE-")) return "real-estate";
  if (code.startsWith("ECOM") || code === "PAY-STD") return "retail";
  if (code.startsWith("BKG")) return "beauty";
  return "general";
}

export function buildBundleGuides(): BundleGuide[] {
  const views = getBundleViews();
  return views.map((b) => {
    const bundlePrice = b.item.priceTsh;
    // Only use Price Book engine savings — never invent a "buy separately"
    // total that makes the bundle look more expensive (e.g. Beauty includes
    // Gallery + Social entitlements with no standalone prices).
    const showSavings =
      Boolean(b.savings?.showSavings) &&
      b.savings?.savingsTsh != null &&
      b.savings.savingsTsh > 0;
    const standaloneTotalTsh = showSavings
      ? (b.savings?.individualValueTsh ?? null)
      : null;

    return {
      code: b.item.code,
      name: b.item.name,
      valueProp: bundleValueProp(b.item.code, b.item.clientDescription),
      whyTogether: bundleWhy(b.item.code),
      components: b.chargeComponents,
      entitlements: b.entitlements.map((e) => e.name),
      standaloneTotalTsh,
      bundlePriceLabel: b.priceLabel,
      bundlePriceTsh: bundlePrice,
      savingsTsh: showSavings ? b.savings!.savingsTsh : null,
      showSavings,
      seeLiveUrl: demoStudioUrl({
        industry: industryForBundle(b.item.code),
        bundle: bundleSlug(b.item.code),
      }),
      industryHint: industryForBundle(b.item.code),
      pricingNote: showSavings
        ? null
        : b.entitlements.length > 0
          ? "Packaged outcome price. Included entitlements (listed above) are not sold as separate catalog line items, so a 'buy separately' total is not shown."
          : b.savings?.reasonIfHidden ??
            "No approved savings vs standalone chargeable components for this bundle.",
    };
  });
}

function bundleSlug(code: string): string {
  const map: Record<string, string> = {
    "BND-LAUNCH": "launch",
    "BND-BEAUTY": "beauty",
    "BND-REST": "restaurant",
    "BND-STORE": "store",
    "BND-TOUR": "tourism",
    "BND-RE": "real-estate",
    "BND-PRES": "presence",
    "BND-GROW": "growth",
    "BND-LANG3": "lang3",
    "BND-LANG4": "lang4",
  };
  return map[code] ?? code.toLowerCase();
}

function industryForBundle(code: string): string {
  const map: Record<string, string> = {
    "BND-BEAUTY": "beauty",
    "BND-REST": "restaurant",
    "BND-TOUR": "tourism",
    "BND-RE": "real-estate",
    "BND-STORE": "retail",
    "BND-PRES": "professional",
    "BND-LAUNCH": "general",
    "BND-GROW": "general",
    "BND-LANG3": "general",
    "BND-LANG4": "general",
  };
  return map[code] ?? "general";
}

function bundleValueProp(code: string, fallback: string): string {
  const map: Record<string, string> = {
    "BND-LAUNCH":
      "A fast, credible start - essential website, local Google presence, and business email setup together.",
    "BND-BEAUTY":
      "A focused beauty presence with booking path and local discovery so clients can find you and book.",
    "BND-REST":
      "Perfect for restaurants that want customers to discover the business, browse the menu, and reserve tables online.",
    "BND-STORE":
      "Website plus starter shop and payments so you can sell products online from day one.",
    "BND-TOUR":
      "Tourism site with tour catalog, itineraries, and enquiries - built for travellers who compare before they book.",
    "BND-RE":
      "Property website with listings, filters, and enquiries for serious buyers.",
    "BND-PRES":
      "A professional website with stronger SEO and Google Business Profile for firms that sell on trust.",
    "BND-GROW":
      "Monthly growth operations combining professional social and SEO growth (content care benefit as included entitlement).",
    "BND-LANG3":
      "Three languages on one site - bilingual base plus one additional language, priced below buying them separately.",
    "BND-LANG4":
      "Four languages on one site - bilingual base plus two additional languages, priced below buying them separately.",
  };
  return map[code] ?? fallback;
}

function bundleWhy(code: string): string {
  const map: Record<string, string> = {
    "BND-LAUNCH":
      "Most new businesses need a website people can trust, a way to be found on Google, and email that looks professional - these belong together at launch.",
    "BND-BEAUTY":
      "Beauty clients discover locally, judge the look of the brand, then book. Website, booking path, and Google profile reinforce each other.",
    "BND-REST":
      "Diners search Google, check the menu, then reserve. Separating those pieces creates friction; the bundle removes it.",
    "BND-STORE":
      "An online store without payments (or a site without a shop) is incomplete. This bundle completes the sell path.",
    "BND-TOUR":
      "Travellers need tours they can understand (catalog + itinerary) and a way to enquire - before payment complexity.",
    "BND-RE":
      "Buyers filter inventory, open listings, then enquire. Listings without filters or enquiry waste attention.",
    "BND-PRES":
      "Professional firms win on credibility: stronger site architecture, SEO setup, and local profile.",
    "BND-GROW":
      "Ongoing visibility needs coordinated social and SEO work - sold as a monthly growth bundle.",
    "BND-LANG3":
      "Once you need a third language, buying bilingual functionality plus one add-on language separately costs more than this pack.",
    "BND-LANG4":
      "Four-language sites usually buy bilingual functionality plus two add-on languages - this pack keeps that cheaper as one outcome.",
  };
  return map[code] ?? "Grouped so customers get a complete outcome instead of assembling parts.";
}

export type PlanGuide = {
  item: CatalogItem;
  valueProp: string;
  whoFor: string;
  included: string[];
  whenUpgrade: string;
  seeLiveUrl: string;
  notes: string | null;
};

export function buildCareGuides(): PlanGuide[] {
  const book = loadPriceBook();
  const codes = ["CARE-ESS", "CARE-STD", "CARE-BUS", "CARE-PRO", "CARE-PRI"];
  const docs: Record<string, Omit<PlanGuide, "item" | "seeLiveUrl">> = {
    "CARE-ESS": {
      valueProp: "Annual essential care for websites that need a reliable maintenance relationship.",
      whoFor: "Simple sites that need foundational ongoing care.",
      included: [
        "Website Care plan at the Essential tier (exact service list confirmed in your quotation)",
      ],
      whenUpgrade:
        "Move to Standard or Business Care when your site is more active or you need a closer care relationship.",
      notes:
        "Detailed hours, SLA, and backup allowances are confirmed by KasiTech in writing - not invented in this catalog.",
    },
    "CARE-STD": {
      valueProp: "Annual standard care for businesses that want steadier ongoing support.",
      whoFor: "Growing sites with regular content or feature needs.",
      included: [
        "Website Care plan at the Standard tier (exact service list confirmed in your quotation)",
      ],
      whenUpgrade: "Upgrade to Business Care or a monthly Professional/Priority plan when cadence increases.",
      notes:
        "Detailed hours, SLA, and backup allowances are confirmed by KasiTech in writing - not invented in this catalog.",
    },
    "CARE-BUS": {
      valueProp: "Annual business-level care for more active digital presence.",
      whoFor: "Organizations that treat the website as a primary channel.",
      included: [
        "Website Care plan at the Business tier (exact service list confirmed in your quotation)",
      ],
      whenUpgrade: "Consider monthly Professional or Priority Care when you need closer ongoing attention.",
      notes:
        "Detailed hours, SLA, and backup allowances are confirmed by KasiTech in writing - not invented in this catalog.",
    },
    "CARE-PRO": {
      valueProp: "Monthly professional care for higher-stakes websites.",
      whoFor: "Businesses that want a continuous monthly care relationship.",
      included: [
        "Website Care plan at the Professional tier (exact service list confirmed in your quotation)",
      ],
      whenUpgrade: "Priority Care when response urgency and closeness must increase.",
      notes:
        "Detailed hours, SLA, and backup allowances are confirmed by KasiTech in writing - not invented in this catalog.",
    },
    "CARE-PRI": {
      valueProp: "Monthly priority care - the closest approved care tier.",
      whoFor: "Mission-critical sites that need priority attention.",
      included: [
        "Website Care plan at the Priority tier (exact service list confirmed in your quotation)",
      ],
      whenUpgrade: "Highest approved Care tier - further needs are scoped with KasiTech.",
      notes:
        "Detailed hours, SLA, and backup allowances are confirmed by KasiTech in writing - not invented in this catalog.",
    },
  };

  return codes
    .map((code) => {
      const item = book.itemByCode.get(code);
      const doc = docs[code];
      if (!item || !doc) return null;
      return {
        item,
        ...doc,
        seeLiveUrl: demoStudioUrl({
          industry: "general",
          package: "essential",
          care: code.replace("CARE-", "").toLowerCase(),
        }),
      };
    })
    .filter(Boolean) as PlanGuide[];
}

export function buildKbGuides(): PlanGuide[] {
  const book = loadPriceBook();
  const launchModules = KB_MODULES.filter((m) => m.minPlan === "KB-LAUNCH").map(
    (m) => m.label,
  );
  const growthModules = KB_MODULES.filter((m) => m.minPlan === "KB-GROW").map(
    (m) => m.label,
  );

  const docs: Record<string, Omit<PlanGuide, "item" | "seeLiveUrl">> = {
    "KB-LAUNCH": {
      valueProp:
        "Owner tools for website basics and analytics - your site becomes manageable day to day.",
      whoFor: "Businesses that need to edit the site and see basic traffic signals.",
      included: [
        `Approved Launch modules: ${launchModules.join(", ")}`,
      ],
      whenUpgrade:
        "Upgrade to Growth when you need bookings, customers, catalog, events, QR, feedback, or locations.",
      notes: null,
    },
    "KB-GROW": {
      valueProp:
        "Turns the website into a lighter business platform - bookings, customers, and more.",
      whoFor: "Operators who take appointments, manage customers, or run events.",
      included: [
        `Everything available at Launch, plus Growth modules: ${growthModules.join(", ")}`,
      ],
      whenUpgrade:
        "Pro / Scale / Enterprise are priced for larger organisations; additional modules beyond Growth are scoped with KasiTech - not invented here.",
      notes: null,
    },
    "KB-PRO": {
      valueProp: "Higher commercial plan for organisations that need Pro-tier pricing.",
      whoFor: "Larger teams ready for a Pro commercial relationship.",
      included: [
        "Approved Demo Studio surface matches Growth modules today",
        "Additional modules beyond Growth are defined with KasiTech before sale",
      ],
      whenUpgrade: "Scale or Enterprise when organisational scope requires it.",
      notes: "No invented Pro-only modules in this catalog.",
    },
    "KB-SCALE": {
      valueProp: "Scale-tier commercial plan for expanding operations.",
      whoFor: "Multi-location or high-volume operators (as scoped).",
      included: [
        "Approved Demo Studio surface matches Growth modules today",
        "Additional modules beyond Growth are defined with KasiTech before sale",
      ],
      whenUpgrade: "Enterprise for custom organisational needs.",
      notes: "No invented Scale-only modules in this catalog.",
    },
    "KB-ENT": {
      valueProp: "Enterprise plan - custom quotation.",
      whoFor: "Enterprises with bespoke operational requirements.",
      included: [
        "Scoped in a formal enterprise quotation",
        "No modules invented beyond approved Growth surface in Demo Studio",
      ],
      whenUpgrade: "Highest listed plan - scope with KasiTech.",
      notes: "Custom quote - price confirmed before commencement.",
    },
  };

  return ["KB-LAUNCH", "KB-GROW", "KB-PRO", "KB-SCALE", "KB-ENT"]
    .map((code) => {
      const item = book.itemByCode.get(code);
      const doc = docs[code];
      if (!item || !doc) return null;
      return {
        item,
        ...doc,
        seeLiveUrl: demoStudioUrl({
          industry: "beauty",
          package: "essential",
          kb: kbSlug(code),
        }),
      };
    })
    .filter(Boolean) as PlanGuide[];
}

function kbSlug(code: string): string {
  const map: Record<string, string> = {
    "KB-LAUNCH": "launch",
    "KB-GROW": "growth",
    "KB-PRO": "pro",
    "KB-SCALE": "scale",
    "KB-ENT": "enterprise",
  };
  return map[code] ?? code.toLowerCase();
}

export const FAQ_ENTRIES: { q: string; a: string }[] = [
  {
    q: "Do I need a website package first?",
    a: "Most builds start with a website package or a bundle that already includes one. Features alone rarely replace a package unless scoped that way in a quotation.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. You can move to a higher website package, replace exclusive feature tiers (for example Appointment to Multi-staff), or add Care / KasiTech Business later. Upgrades are confirmed in a new or revised quotation.",
  },
  {
    q: "Can I combine bundles?",
    a: "Bundles are designed as complete outcomes. Combining bundles is uncommon and must be confirmed commercially so components are not double-charged incorrectly.",
  },
  {
    q: "Can I add features later?",
    a: "Yes. Features can be added after launch via quotation. If a feature is already included in your package or absorbed by a bundle, you are not charged again for that inclusion.",
  },
  {
    q: "Are domains included?",
    a: "Domain registration / renewal is a third-party cost (HOST-DOMAIN). We connect your domain as part of website baseline work; the registrar fee is separate.",
  },
  {
    q: "Is hosting included?",
    a: "Website hosting is typically a third-party cost (HOST-HOSTING). SSL is included with supported hosting. Confirm hosting arrangement in your quotation.",
  },
  {
    q: "Who owns the website?",
    a: "Ownership and licence terms are confirmed in your agreement / quotation. Ask KasiTech to state IP and handover terms in writing before commencement.",
  },
  {
    q: "Who owns the code?",
    a: "Code ownership and repository access are commercial terms confirmed in your agreement - not altered by this catalog.",
  },
  {
    q: "Can KasiTech update my website?",
    a: "Yes - through Website Care plans and/or scoped change requests. Without Care, updates are quoted as separate work.",
  },
  {
    q: "Do I need Website Care?",
    a: "Not mandatory to launch, but recommended once the site is live so updates, security, and care have a clear commercial home.",
  },
  {
    q: "Do I need KasiTech Business?",
    a: "Only if you want the owner dashboard modules (analytics, bookings, customers, etc.). Many sites launch without it and add it later.",
  },
  {
    q: "Can I use Website Care without KasiTech Business?",
    a: "Yes. Care and KasiTech Business are separate selections.",
  },
  {
    q: "Can I use KasiTech Business without Website Care?",
    a: "Yes. They are independent - though many operators eventually want both.",
  },
  {
    q: "What third-party fees are not included?",
    a: "Examples include domain registration, hosting, payment provider fees, Google / advertising spend, and SMS gateway fees. These are disclosed as third-party and confirmed before approval.",
  },
  {
    q: "What happens after I approve a quotation?",
    a: "We commence the agreed scope, collect required content/access, build, review with you (including revision rounds where included), and launch.",
  },
  {
    q: "How are payments made?",
    a: "Payment schedule is stated on your quotation / invoice (milestones as agreed). Catalog prices are not invoices.",
  },
  {
    q: "What happens after launch?",
    a: "You may continue with Website Care, add KasiTech Business, or request new features. Demo Studio remains available to explore additions before you buy.",
  },
];

export function formatMoney(n: number | null | undefined): string {
  if (n == null) return "Custom Quote";
  return formatTsh(n);
}
