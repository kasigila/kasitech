/**
 * Client-facing industry catalogue for the homepage
 * "Find Your Business" experience and Business Showcase.
 */

export type BusinessIndustryId =
  | "restaurant"
  | "hotel"
  | "clinic"
  | "beauty"
  | "retail"
  | "construction"
  | "tourism"
  | "real-estate"
  | "education"
  | "professional";

export type BusinessIndustry = {
  id: BusinessIndustryId;
  name: string;
  /** Short capability line shown in the modal, e.g. "Reservations · Ordering" */
  capabilities: string;
  /** One-line description for homepage preview cards */
  description: string;
  /** Destination experience path */
  href: string;
  /** Cover image for homepage preview cards */
  cover?: string;
  /** Project slug when a dedicated experience exists */
  projectSlug?: string;
};

/** Homepage static preview cards (visual only — not links). */
export const homepagePreviewIndustries: BusinessIndustryId[] = [
  "restaurant",
  "retail",
  "beauty",
];

export const businessIndustries: BusinessIndustry[] = [
  {
    id: "restaurant",
    name: "Restaurant",
    capabilities: "Reservations · Ordering · Digital Menus",
    description:
      "Menus, table reservations, and ordering — built for the dining floor.",
    href: "/demo/moto",
    cover: "/demos/screenshots/moto.png",
    projectSlug: "moto",
  },
  {
    id: "retail",
    name: "Retail",
    capabilities: "Online Store · Inventory · Payments",
    description:
      "Browse, checkout, and M-Pesa-ready payments for modern shops.",
    href: "/demo/soko",
    cover: "/demos/screenshots/soko.png",
    projectSlug: "soko",
  },
  {
    id: "beauty",
    name: "Beauty & Salon",
    capabilities: "Bookings · Client Management",
    description:
      "Appointment booking and client care for salons and wellness.",
    href: "/demo/glow",
    cover: "/demos/screenshots/glow.png",
    projectSlug: "glow",
  },
  {
    id: "hotel",
    name: "Hotel",
    capabilities: "Bookings · Guest Services · Management",
    description:
      "Discover the stay, check dates, and book with confidence.",
    href: "/demo/zuri",
    cover: "/demos/screenshots/zuri.png",
    projectSlug: "zuri",
  },
  {
    id: "clinic",
    name: "Clinic",
    capabilities: "Appointments · Patient Management",
    description:
      "Find care, book appointments, and manage the patient journey.",
    href: "/demo/afya",
    cover: "/demos/screenshots/afya.png",
    projectSlug: "afya",
  },
  {
    id: "construction",
    name: "Construction",
    capabilities: "Projects · Teams · Documents",
    description:
      "Keep projects, teams, and documents moving from one system.",
    href: "/demo/kasi-flow",
    cover: "/demos/screenshots/kasi-flow.png",
    projectSlug: "kasi-flow",
  },
  {
    id: "tourism",
    name: "Tourism",
    capabilities: "Bookings · Tours · Payments",
    description:
      "Tour discovery, itineraries, and booking for travel operators.",
    href: "/showcase?industry=tourism",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    capabilities: "Listings · Enquiries · CRM",
    description:
      "Property discovery, filters, and enquiry flows that convert.",
    href: "/demo/nest",
    cover: "/demos/screenshots/nest.png",
    projectSlug: "nest",
  },
  {
    id: "education",
    name: "Education",
    capabilities: "Students · Courses · Portals",
    description:
      "Programs, applications, and portals that reduce admissions friction.",
    href: "/demo/nuru",
    cover: "/demos/screenshots/nuru.png",
    projectSlug: "nuru",
  },
  {
    id: "professional",
    name: "Professional Services",
    capabilities: "Clients · Scheduling · Documents",
    description:
      "Credibility, clear services, and enquiry paths for firms.",
    href: "/demo/amani",
    cover: "/demos/screenshots/amani.png",
    projectSlug: "amani",
  },
];

export const SHOWCASE_HREF = "/showcase";

export function getBusinessIndustry(id: BusinessIndustryId) {
  return businessIndustries.find((i) => i.id === id);
}

export function getHomepagePreviews() {
  return homepagePreviewIndustries
    .map((id) => getBusinessIndustry(id))
    .filter((i): i is BusinessIndustry => Boolean(i));
}
