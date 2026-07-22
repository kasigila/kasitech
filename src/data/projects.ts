export type ProjectStatus = "ready" | "coming";

export type Project = {
  id: string;
  number: string;
  slug: string;
  name: string;
  industry: string;
  tags: string[];
  summary: string;
  description: string;
  featured?: boolean;
  routes: ("website" | "sell" | "platform" | "automation")[];
  keywords: string[];
  status: ProjectStatus;
  accent: string;
  caseStudyPath: string;
  demoPath: string;
};

export const projects: Project[] = [
  {
    id: "zuri",
    number: "01",
    slug: "zuri",
    name: "ZURI",
    industry: "Hospitality",
    tags: ["Booking", "Guest Experience"],
    summary: "Digital hospitality · Booking · Guest experience",
    description:
      "A complete digital guest journey, from discovering Zanzibar to booking the stay.",
    featured: true,
    routes: ["sell"],
    keywords: [
      "hotel",
      "resort",
      "hospitality",
      "zanzibar",
      "booking",
      "guest",
      "villa",
      "safari lodge",
      "accommodation",
    ],
    status: "ready",
    accent: "#E8DDCB",
    caseStudyPath: "/work/zuri",
    demoPath: "/demo/zuri",
  },
  {
    id: "moto",
    number: "02",
    slug: "moto",
    name: "MOTO",
    industry: "Restaurant",
    tags: ["Reservations", "Ordering"],
    summary: "Restaurant · Reservations · Ordering",
    description:
      "Open-fire dining with menu, reservations, ordering and kitchen-ready operations.",
    routes: ["sell"],
    keywords: [
      "restaurant",
      "food",
      "menu",
      "reservation",
      "ordering",
      "delivery",
      "dining",
      "cafe",
    ],
    status: "ready",
    accent: "#C45C26",
    caseStudyPath: "/work/moto",
    demoPath: "/demo/moto",
  },
  {
    id: "noir",
    number: "03",
    slug: "noir",
    name: "NOIR",
    industry: "Entertainment",
    tags: ["Events", "Ticketing"],
    summary: "Events · Ticketing · VIP reservations",
    description:
      "Nightlife energy with event discovery, ticketing and interactive VIP floor plans.",
    featured: true,
    routes: ["sell"],
    keywords: [
      "nightlife",
      "club",
      "events",
      "tickets",
      "vip",
      "concert",
      "party",
      "entertainment",
    ],
    status: "ready",
    accent: "#FF2A2A",
    caseStudyPath: "/work/noir",
    demoPath: "/demo/noir",
  },
  {
    id: "soko",
    number: "04",
    slug: "soko",
    name: "SOKO",
    industry: "Commerce",
    tags: ["Ecommerce", "Payments"],
    summary: "Ecommerce · Payments · Inventory",
    description:
      "Premium fashion ecommerce with size tools, local payments and operational inventory.",
    featured: true,
    routes: ["sell"],
    keywords: [
      "ecommerce",
      "fashion",
      "shop",
      "retail",
      "clothes",
      "instagram",
      "payments",
      "mpesa",
      "store",
    ],
    status: "ready",
    accent: "#F4F2EA",
    caseStudyPath: "/work/soko",
    demoPath: "/demo/soko",
  },
  {
    id: "nest",
    number: "05",
    slug: "nest",
    name: "NEST",
    industry: "Real Estate",
    tags: ["Search", "Listings"],
    summary: "Real Estate · Search · Listings",
    description:
      "Property discovery with maps, filters, viewings and neighborhood intelligence.",
    routes: ["sell", "platform"],
    keywords: [
      "real estate",
      "property",
      "house",
      "apartment",
      "rent",
      "buy",
      "listings",
      "agent",
      "car rental",
    ],
    status: "ready",
    accent: "#2F5D50",
    caseStudyPath: "/work/nest",
    demoPath: "/demo/nest",
  },
  {
    id: "afya",
    number: "06",
    slug: "afya",
    name: "AFYA",
    industry: "Healthcare",
    tags: ["Appointments", "Portal"],
    summary: "Healthcare · Appointments · Portal",
    description:
      "Trusted care journeys: find a doctor, book, and manage a calm patient portal.",
    routes: ["website", "platform"],
    keywords: [
      "healthcare",
      "clinic",
      "hospital",
      "doctor",
      "appointment",
      "patient",
      "medical",
      "telehealth",
    ],
    status: "ready",
    accent: "#7A8F7A",
    caseStudyPath: "/work/afya",
    demoPath: "/demo/afya",
  },
  {
    id: "amani",
    number: "07",
    slug: "amani",
    name: "AMANI",
    industry: "Professional Services",
    tags: ["Corporate", "Content"],
    summary: "Corporate · Content · Credibility",
    description:
      "Institutional presence for strategy firms, law practices and professional services.",
    routes: ["website"],
    keywords: [
      "law",
      "lawyer",
      "consulting",
      "corporate",
      "firm",
      "professional",
      "strategy",
      "finance",
      "accounting",
    ],
    status: "ready",
    accent: "#C4A574",
    caseStudyPath: "/work/amani",
    demoPath: "/demo/amani",
  },
  {
    id: "atlas",
    number: "08",
    slug: "atlas",
    name: "ATLAS",
    industry: "Logistics",
    tags: ["Tracking", "Operations"],
    summary: "Logistics · Tracking · Operations",
    description:
      "Shipment tracking, quoting, fleet visibility and B2B logistics portals.",
    routes: ["platform", "automation"],
    keywords: [
      "logistics",
      "shipping",
      "freight",
      "tracking",
      "fleet",
      "delivery",
      "courier",
      "transport",
    ],
    status: "ready",
    accent: "#FF6A00",
    caseStudyPath: "/work/atlas",
    demoPath: "/demo/atlas",
  },
  {
    id: "nuru",
    number: "09",
    slug: "nuru",
    name: "NURU",
    industry: "Education",
    tags: ["Admissions", "Portal"],
    summary: "Education · Admissions · Portal",
    description:
      "Program discovery, applications and student portals that reduce admissions friction.",
    routes: ["website", "platform"],
    keywords: [
      "school",
      "university",
      "education",
      "admissions",
      "students",
      "college",
      "training",
      "academy",
    ],
    status: "ready",
    accent: "#1E4FD6",
    caseStudyPath: "/work/nuru",
    demoPath: "/demo/nuru",
  },
  {
    id: "impact",
    number: "10",
    slug: "impact",
    name: "IMPACT",
    industry: "Nonprofit",
    tags: ["Storytelling", "Donations"],
    summary: "Nonprofit · Storytelling · Donations",
    description:
      "Human stories, transparent impact reporting and donation journeys that build trust.",
    routes: ["website"],
    keywords: [
      "ngo",
      "nonprofit",
      "charity",
      "foundation",
      "donation",
      "impact",
      "community",
    ],
    status: "ready",
    accent: "#8B7355",
    caseStudyPath: "/work/impact",
    demoPath: "/demo/impact",
  },
  {
    id: "kasi-flow",
    number: "11",
    slug: "kasi-flow",
    name: "KASI FLOW",
    industry: "Software",
    tags: ["Operations", "Analytics"],
    summary: "Operations · CRM · Analytics",
    description:
      "Custom business software for CRM, finance, inventory, team and command-driven ops.",
    featured: true,
    routes: ["platform", "automation"],
    keywords: [
      "dashboard",
      "crm",
      "operations",
      "software",
      "inventory",
      "invoices",
      "admin",
      "fleet",
      "system",
      "portal",
    ],
    status: "ready",
    accent: "#C7FF00",
    caseStudyPath: "/work/kasi-flow",
    demoPath: "/demo/kasi-flow",
  },
  {
    id: "kasi-intelligence",
    number: "12",
    slug: "kasi-intelligence",
    name: "KASI INTELLIGENCE",
    industry: "AI",
    tags: ["Data", "Automation"],
    summary: "AI · Data · Automation",
    description:
      "Ask your business questions, see evidence, and approve automations before they run.",
    routes: ["automation"],
    keywords: [
      "ai",
      "automation",
      "analytics",
      "data",
      "intelligence",
      "workflow",
      "integration",
      "insights",
    ],
    status: "ready",
    accent: "#C7FF00",
    caseStudyPath: "/work/kasi-intelligence",
    demoPath: "/demo/kasi-intelligence",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export type PortfolioRoute = {
  id: "website" | "sell" | "platform" | "automation";
  title: string;
  description: string;
  projectSlugs: string[];
};

export const portfolioRoutes: PortfolioRoute[] = [
  {
    id: "website",
    title: "I NEED A WEBSITE",
    description: "Brand, corporate, healthcare, education and local business.",
    projectSlugs: ["amani", "afya", "nuru", "impact"],
  },
  {
    id: "sell",
    title: "I NEED TO SELL OR TAKE BOOKINGS",
    description: "Ecommerce, hospitality, restaurants and events.",
    projectSlugs: ["zuri", "moto", "noir", "soko", "nest"],
  },
  {
    id: "platform",
    title: "I NEED A PLATFORM OR SYSTEM",
    description: "Portals, marketplaces, dashboards and operational software.",
    projectSlugs: ["kasi-flow", "nest", "atlas", "afya", "nuru"],
  },
  {
    id: "automation",
    title: "I WANT TO AUTOMATE MY BUSINESS",
    description: "AI, data, workflows and integrations.",
    projectSlugs: ["kasi-intelligence", "kasi-flow", "atlas"],
  },
];

export type SearchResult = {
  headline: string;
  explanation: string;
  projects: Project[];
  exact: boolean;
};

export function searchProjects(query: string): SearchResult {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      headline: "TELL US WHAT YOU RUN.",
      explanation: "Describe your business in plain language.",
      projects: [],
      exact: false,
    };
  }

  const scored = projects
    .map((project) => {
      let score = 0;
      for (const keyword of project.keywords) {
        if (q.includes(keyword) || keyword.includes(q)) score += 3;
        if (q.split(/\s+/).some((w) => keyword.includes(w) && w.length > 3))
          score += 1;
      }
      if (project.name.toLowerCase().includes(q)) score += 5;
      if (project.industry.toLowerCase().includes(q)) score += 4;
      if (project.tags.some((t) => q.includes(t.toLowerCase()))) score += 2;
      return { project, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      headline: "WE DON'T HAVE AN EXACT MATCH.",
      explanation:
        "But these are the systems we'd combine for a custom solution.",
      projects: [
        getProject("kasi-flow")!,
        getProject("soko")!,
        getProject("amani")!,
        getProject("kasi-intelligence")!,
      ],
      exact: false,
    };
  }

  return {
    headline: "WE'D START HERE.",
    explanation:
      "Your project could combine these capabilities into one coherent system.",
    projects: scored.slice(0, 4).map((s) => s.project),
    exact: scored[0].score >= 3,
  };
}
