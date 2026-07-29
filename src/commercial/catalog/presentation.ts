import { formatTsh } from "../money";
import { loadPriceBook, type PriceBook } from "../price-book/load";
import { priceConfiguration } from "../engines/pricing";
import type { BillingType, CatalogItem, CatalogKind } from "../types";
import { PRICE_BOOK_VERSION } from "../types";

/** Public catalog navigation categories (decision-oriented). */
export type CatalogNavId =
  | "websites"
  | "features"
  | "booking"
  | "payments"
  | "ecommerce"
  | "industries"
  | "seo"
  | "social"
  | "advertising"
  | "branding"
  | "kasitech-business"
  | "care"
  | "bundles"
  | "custom"
  | "delivery"
  | "hosting";

export const CATALOG_NAV: { id: CatalogNavId; label: string }[] = [
  { id: "websites", label: "Websites" },
  { id: "features", label: "Features" },
  { id: "booking", label: "Booking" },
  { id: "payments", label: "Payments" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "industries", label: "Industries" },
  { id: "seo", label: "SEO & Search" },
  { id: "social", label: "Social" },
  { id: "advertising", label: "Advertising" },
  { id: "branding", label: "Branding" },
  { id: "kasitech-business", label: "KasiTech Business" },
  { id: "care", label: "Care" },
  { id: "bundles", label: "Bundles" },
  { id: "custom", label: "Custom" },
  { id: "delivery", label: "Delivery" },
  { id: "hosting", label: "Hosting" },
];

export const INDUSTRIES = [
  { id: "beauty", label: "Beauty & Wellness", tags: ["beauty", "salon", "spa", "wellness"] },
  { id: "restaurant", label: "Restaurant / Hospitality", tags: ["restaurant", "hospitality", "food", "menu"] },
  { id: "tourism", label: "Tourism / Tours", tags: ["tourism", "tours", "safari"] },
  { id: "hotel", label: "Hotel / Hospitality", tags: ["hotel", "hospitality", "booking"] },
  { id: "real-estate", label: "Real Estate", tags: ["real estate", "property"] },
  { id: "retail", label: "Retail / E-commerce", tags: ["retail", "e-commerce", "store", "shop"] },
  { id: "professional", label: "Professional Services", tags: ["professional", "services", "agency"] },
  { id: "education", label: "Education", tags: ["education", "school", "university", "student"] },
  { id: "ngo", label: "NGO", tags: ["ngo", "charity", "nonprofit", "donor"] },
  { id: "healthcare", label: "Healthcare", tags: ["healthcare", "clinic", "hospital", "patient"] },
  { id: "logistics", label: "Logistics", tags: ["logistics", "shipping", "freight", "tracking"] },
  { id: "general", label: "General Business", tags: ["business", "company"] },
] as const;

/** Non-commercial positioning copy for packages — not inclusions. */
export const PACKAGE_POSITIONING: Record<
  string,
  { bestFor: string; plain: string }
> = {
  "WEB-ONE": {
    bestFor: "A focused presence — campaign, personal brand, or single offer.",
    plain: "One scrolling page that explains who you are and how to reach you.",
  },
  "WEB-ESS": {
    bestFor: "Small businesses that need a complete professional website.",
    plain: "Several pages, clear structure, and content your team can update.",
  },
  "WEB-BUS": {
    bestFor: "Growing businesses with more services and content to publish.",
    plain: "Room for blog, portfolio, and richer forms — still clear for visitors.",
  },
  "WEB-BUSP": {
    bestFor: "Organizations managing team, case studies, and resources online.",
    plain: "More structure for departments, proof, and downloadable materials.",
  },
  "WEB-PRO": {
    bestFor: "Organizations with multiple audiences and content types.",
    plain: "Advanced architecture for directories, careers, news, and tracking.",
  },
  "WEB-SIG": {
    bestFor: "Brands that need a bespoke digital experience.",
    plain: "Custom interaction and premium craft — scoped as a signature build.",
  },
  "WEB-CUS": {
    bestFor: "Portals, dashboards, and operational systems beyond a brochure site.",
    plain: "Scoped and priced after we understand the workflows involved.",
  },
};

/** Search synonyms — discovery only; does not change commercial records. */
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  appointments: ["BKG-APT", "ALIAS-HLTH-APT", "BKG-STAFF"],
  booking: ["BKG-APT", "BKG-EXT", "BKG-REST", "BKG-TOUR", "BKG-HOTINT", "BKG-HOTCUS"],
  "sell products": ["ECOM-START", "ECOM-BUS", "ECOM-ADV", "BND-STORE"],
  shop: ["ECOM-START", "ECOM-BUS", "ECOM-ADV"],
  restaurant: ["REST-MENU", "REST-AMENU", "BKG-REST", "REST-ORDER", "BND-REST", "REST-QR"],
  school: ["EDU-ADM", "EDU-COURSE", "EDU-STUD", "EDU-PAR", "EDU-FEE", "EDU-FAC"],
  education: ["EDU-ADM", "EDU-COURSE", "EDU-STUD", "EDU-PAR", "EDU-FEE"],
  instagram: ["SOC-ESS", "SOC-GROW", "SOC-PRO", "SOC-CORP", "ENT-SOCIAL-INTEGRATION", "ADD-FEED"],
  social: ["SOC-ESS", "SOC-GROW", "SOC-PRO", "SOC-CORP", "BR-SOCIAL"],
  property: ["RE-LIST", "RE-FILT", "RE-AGENT", "RE-INQ", "RE-MAP", "BND-RE"],
  house: ["RE-LIST", "RE-FILT", "BND-RE"],
  safari: ["TOUR-CAT", "TOUR-BKG", "BKG-TOUR", "BND-TOUR", "TOUR-ITIN"],
  tourism: ["TOUR-CAT", "TOUR-INQ", "TOUR-BUILD", "BND-TOUR"],
  hotel: ["BKG-HOTINT", "BKG-HOTCUS", "BKG-CAL"],
  donate: ["PAY-DON", "ALIAS-NGO-DON", "NGO-PORT", "NGO-PROG"],
  ngo: ["NGO-PROG", "NGO-PUB", "NGO-VOL", "NGO-PORT", "PAY-DON"],
  clinic: ["HLTH-DIR", "HLTH-FORM", "HLTH-PORT", "HLTH-TELE", "BKG-APT"],
  doctor: ["HLTH-DIR", "BKG-APT", "HLTH-PORT"],
  shipping: ["LOG-QUOTE", "LOG-INQ", "LOG-TRACK", "LOG-API", "LOG-PORT"],
  tracking: ["LOG-TRACK", "LOG-API"],
  mpesa: ["PAY-STD", "PAY-DEP", "PAY-REC", "PAY-DON"],
  payment: ["PAY-STD", "PAY-DEP", "PAY-REC", "PAY-DON", "EDU-FEE"],
  seo: ["SEO-FND", "SEO-PRO", "SEO-ADV", "SEO-CARE", "SEO-GROW", "SEO-AUTH", "LOC-GBP"],
  logo: ["BR-LOGO", "BR-LOGOR", "BR-VIS", "BR-GUIDE"],
  salon: ["BND-BEAUTY", "BKG-EXT", "BKG-APT"],
  beauty: ["BND-BEAUTY", "BKG-EXT"],
};

export type PublicBillingLabel =
  | "ONE-TIME"
  | "PER MONTH"
  | "PER YEAR"
  | "THIRD-PARTY"
  | "CUSTOM QUOTE"
  | "INCLUDED"
  | "SURCHARGE";

export function billingLabel(billing: BillingType): PublicBillingLabel {
  switch (billing) {
    case "ONE_TIME":
      return "ONE-TIME";
    case "MONTHLY":
      return "PER MONTH";
    case "ANNUAL":
      return "PER YEAR";
    case "THIRD_PARTY":
      return "THIRD-PARTY";
    case "CUSTOM_QUOTE":
      return "CUSTOM QUOTE";
    case "INCLUDED":
      return "INCLUDED";
    case "SURCHARGE":
      return "SURCHARGE";
    default:
      return "ONE-TIME";
  }
}

export function displayItemPrice(item: CatalogItem): string {
  if (item.billing === "CUSTOM_QUOTE" || item.priceTsh == null) {
    if (item.billing === "SURCHARGE") {
      return item.clientDescription || "Surcharge";
    }
    if (item.billing === "THIRD_PARTY") return "Third-party";
    if (item.billing === "INCLUDED") return "Included";
    return "Custom Quote";
  }
  const base = formatTsh(item.priceTsh);
  if (item.billing === "MONTHLY") return `${base} / month`;
  if (item.billing === "ANNUAL") return `${base} / year`;
  return base;
}

export function navIdForItem(item: CatalogItem): CatalogNavId {
  const cat = item.category.toLowerCase();
  if (item.kind === "PACKAGE" || cat === "websites") return "websites";
  if (item.kind === "BUNDLE") return "bundles";
  if (cat.includes("website features") || cat === "languages") return "features";
  if (cat.includes("booking")) return "booking";
  if (cat.includes("payment")) return "payments";
  if (cat.includes("e-commerce")) return "ecommerce";
  if (cat.includes("industry")) return "industries";
  if (cat.includes("seo") || cat.includes("local")) return "seo";
  if (cat.includes("social")) return "social";
  if (cat.includes("advertising")) return "advertising";
  if (cat.includes("branding") || cat.includes("copy") || cat.includes("production"))
    return "branding";
  if (cat.includes("kasitech business")) return "kasitech-business";
  if (cat.includes("care")) return "care";
  if (cat.includes("custom") || cat.includes("discovery")) return "custom";
  if (cat.includes("delivery")) return "delivery";
  if (cat.includes("hosting")) return "hosting";
  return "features";
}

/** Plain-language “what this means” — short, not essays. */
export function whatThisMeans(item: CatalogItem): string {
  const map: Record<string, string> = {
    "ADD-BLOG": "A place on your site to publish news or articles your team can update.",
    "ADD-BOT": "Automated answers to common website questions — not a full AI replacement for staff.",
    "BKG-APT": "Customers pick a service, date, and time — you get the booking details.",
    "BKG-STAFF": "Booking that respects each staff member’s calendar and availability.",
    "PAY-STD": "Connect payments (such as M-Pesa or cards) so customers can pay on your site.",
    "ECOM-START": "An online shop with products, cart, checkout, and basic stock tracking.",
    "SEO-FND": "Technical basics so search engines can understand and index your pages.",
    "SEO-GROW": "Ongoing work to improve visibility — billed every month.",
    "CARE-BUS": "Ongoing maintenance and limited content help after launch — billed yearly.",
    "KB-GROW": "A business dashboard for customers, bookings, and day-to-day operations.",
    "HOST-DOMAIN": "Your web address (example.com) — usually paid to a domain registrar, not KasiTech.",
    "HOST-HOSTING": "Where your site lives online — may be separate from KasiTech’s build fee.",
  };
  return (
    map[item.code] ??
    "A scoped KasiTech service from the approved catalog. Ask us if you need it explained for your business."
  );
}

export type CatalogServiceView = {
  item: CatalogItem;
  navId: CatalogNavId;
  priceLabel: string;
  billingLabel: PublicBillingLabel;
  whatThisMeans: string;
  includedInPackages: string[];
  includedInBundles: string[];
  industries: string[];
  upgradeIncludes?: string;
};

function industriesFor(item: CatalogItem, book: PriceBook): string[] {
  const tags: string[] = [];
  if (item.category.includes("Tourism")) tags.push("Tourism / Tours");
  if (item.category.includes("Real Estate")) tags.push("Real Estate");
  if (item.category.includes("Restaurant")) tags.push("Restaurant / Hospitality");
  if (item.category.includes("Education")) tags.push("Education");
  if (item.category.includes("NGO")) tags.push("NGO");
  if (item.category.includes("Healthcare")) tags.push("Healthcare");
  if (item.category.includes("Logistics")) tags.push("Logistics");
  for (const a of book.aliases) {
    if (a.canonicalCode === item.code) {
      const ind = INDUSTRIES.find(
        (i) => i.label.toLowerCase().includes(a.industryTag.toLowerCase()) ||
          a.industryTag.toLowerCase().includes(i.id),
      );
      if (ind && !tags.includes(ind.label)) tags.push(ind.label);
      else if (!tags.includes(a.industryTag)) tags.push(a.industryTag);
    }
  }
  if (item.code.startsWith("ECOM") || item.code === "BND-STORE") tags.push("Retail / E-commerce");
  if (item.code === "BND-BEAUTY") tags.push("Beauty & Wellness");
  return tags;
}

export function getBrowsableItems(book: PriceBook = loadPriceBook()): CatalogServiceView[] {
  const browseKinds: CatalogKind[] = [
    "SERVICE",
    "PACKAGE",
    "BUNDLE",
    "SUBSCRIPTION_TIER",
    "CUSTOM_QUOTE_ITEM",
    "THIRD_PARTY_COST",
    "DELIVERY_OPTION",
  ];

  const upgradeNote = (code: string): string | undefined => {
    for (const f of book.families) {
      const m = f.members.find((x) => x.code === code);
      if (m?.includesLower) {
        const lower = f.members.filter((x) => x.rank < m.rank).map((x) => x.code);
        const names = lower
          .map((c) => book.itemByCode.get(c)?.name)
          .filter(Boolean)
          .join(", ");
        if (names) return `Includes ${names}`;
      }
    }
    return undefined;
  };

  return book.items
    .filter((i) => i.active && browseKinds.includes(i.kind))
    .map((item) => {
      const includedInPackages = book.packageInclusions
        .filter((p) => p.includedCode === item.code)
        .map((p) => p.packageCode);
      const includedInBundles = book.bundleComponents
        .filter((b) => b.componentCode === item.code)
        .map((b) => b.bundleCode);
      return {
        item,
        navId: navIdForItem(item),
        priceLabel: displayItemPrice(item),
        billingLabel: billingLabel(item.billing),
        whatThisMeans: whatThisMeans(item),
        includedInPackages,
        includedInBundles,
        industries: industriesFor(item, book),
        upgradeIncludes: upgradeNote(item.code),
      };
    });
}

export function getWebsitePackages(book: PriceBook = loadPriceBook()) {
  return ["WEB-ONE", "WEB-ESS", "WEB-BUS", "WEB-BUSP", "WEB-PRO", "WEB-SIG", "WEB-CUS"]
    .map((code) => book.itemByCode.get(code)!)
    .filter(Boolean);
}

export function getPackageInclusionCodes(
  packageCode: string,
  book: PriceBook = loadPriceBook(),
): string[] {
  return book.inclusionsByPackage.get(packageCode) ?? [];
}

export type BundleView = {
  item: CatalogItem;
  priceLabel: string;
  billingLabel: PublicBillingLabel;
  chargeComponents: { code: string; name: string; priceLabel: string }[];
  entitlements: { code: string; name: string }[];
  savings: ReturnType<typeof priceConfiguration>["bundleSavings"];
};

export function getBundleViews(book: PriceBook = loadPriceBook()): BundleView[] {
  return book.items
    .filter((i) => i.kind === "BUNDLE")
    .map((item) => {
      const comps = book.componentsByBundle.get(item.code) ?? [];
      const priced = priceConfiguration({ selections: [item.code] }, book);
      return {
        item,
        priceLabel: displayItemPrice(item),
        billingLabel: billingLabel(item.billing),
        chargeComponents: comps
          .filter((c) => c.role === "CHARGE")
          .map((c) => {
            const it = book.itemByCode.get(c.componentCode)!;
            return {
              code: c.componentCode,
              name: it.name,
              priceLabel: displayItemPrice(it),
            };
          }),
        entitlements: comps
          .filter((c) => c.role === "ENTITLEMENT")
          .map((c) => {
            const ent = book.entitlements.find((e) => e.code === c.componentCode);
            return {
              code: c.componentCode,
              name: ent?.name ?? c.componentCode,
            };
          }),
        savings: priced.bundleSavings,
      };
    });
}

export function searchCatalog(
  query: string,
  items: CatalogServiceView[],
  book: PriceBook = loadPriceBook(),
): CatalogServiceView[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  const synonymHits = new Set<string>();
  for (const [phrase, codes] of Object.entries(SEARCH_SYNONYMS)) {
    if (q.includes(phrase) || phrase.includes(q)) {
      codes.forEach((c) => synonymHits.add(c));
    }
  }

  return items.filter((v) => {
    if (synonymHits.has(v.item.code)) return true;
    const hay = [
      v.item.name,
      v.item.clientDescription,
      v.item.category,
      v.item.code,
      ...v.industries,
      v.whatThisMeans,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q) || q.split(/\s+/).every((w) => hay.includes(w));
  });
}

export function catalogMeta() {
  return {
    version: PRICE_BOOK_VERSION,
    title: "Services & Pricing",
    tagline: "Clear scope. Clear pricing. Built around your business.",
    currencyNote: "All prices in Tanzanian Shillings (TSh).",
    disclaimer:
      "Prices are fixed for the stated scope unless marked Custom Quote. No additional work is billed without written approval. Formal quotations confirm final scope.",
  };
}

export function coverageReport(book: PriceBook = loadPriceBook()) {
  const browsable = getBrowsableItems(book);
  const codes = new Set(browsable.map((b) => b.item.code));
  const missing = book.items
    .filter(
      (i) =>
        i.active &&
        i.kind !== "ENTITLEMENT" &&
        i.kind !== "SERVICE_ALIAS" &&
        !codes.has(i.code),
    )
    .map((i) => i.code);
  return {
    browsableCount: browsable.length,
    canonicalCount: book.items.length,
    missingFromBrowse: missing,
  };
}
