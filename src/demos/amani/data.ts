export const amaniColors = {
  navy: "#0B1C2C",
  navyMid: "#132536",
  brass: "#C4A574",
  brassSoft: "#E8D9C4",
  warmWhite: "#F7F4EF",
  muted: "#8A939C",
  border: "#1F3347",
} as const;

export const serif = {
  fontFamily: 'Georgia, "Times New Roman", Times, serif',
} as const;

export type ExpertiseArea = {
  id: string;
  title: string;
  summary: string;
};

export type Industry = {
  id: string;
  name: string;
  note: string;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  photo: string;
  experience: string[];
  education: string[];
  expertise: string[];
  bio: string;
};

export type Insight = {
  id: string;
  title: string;
  type: "Article" | "Report" | "Brief";
  topic: string;
  date: string;
  excerpt: string;
  readMin: number;
  body?: string;
};

export type CaseMilestone = {
  year: string;
  title: string;
  detail: string;
};

export type CaseMetric = {
  label: string;
  value: string;
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  interest: string;
  status: "New" | "Qualified" | "Meeting" | "Closed";
  date: string;
};

export type DownloadRow = {
  id: string;
  title: string;
  downloads: number;
  last: string;
};

export const heroImage =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80";

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: "strategy",
    title: "Strategy",
    summary:
      "Board-level agendas, competitive repositioning, and multi-year operating models for East African growth.",
  },
  {
    id: "capital",
    title: "Capital",
    summary:
      "Capital allocation frameworks, investor narratives, and transaction readiness for regional expansion.",
  },
  {
    id: "transformation",
    title: "Transformation",
    summary:
      "Operating model redesign, digital foundations, and execution offices that survive the first year.",
  },
];

export const industries: Industry[] = [
  {
    id: "financial",
    name: "Financial institutions",
    note: "Banks, insurers, and fintech platforms scaling across corridors.",
  },
  {
    id: "infra",
    name: "Infrastructure & energy",
    note: "Power, logistics hubs, and industrial parks with patient capital.",
  },
  {
    id: "consumer",
    name: "Consumer & retail",
    note: "Brand systems entering new cities without losing unit economics.",
  },
  {
    id: "public",
    name: "Public & development",
    note: "Programs that need clarity of mandate and measurable delivery.",
  },
];

export const people: Person[] = [
  {
    id: "p-amina",
    name: "Amina Okello",
    role: "Managing Partner, Strategy",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    experience: [
      "18 years advising CEOs across East Africa",
      "Former strategy lead, regional conglomerate",
      "Led 40+ board offsites on growth and capital",
    ],
    education: [
      "MBA: London Business School",
      "BCom: University of Nairobi",
    ],
    expertise: ["Corporate strategy", "M&A readiness", "Board facilitation"],
    bio: "Amina builds decision systems that survive political cycles and market shocks.",
  },
  {
    id: "p-daniel",
    name: "Daniel Mwamba",
    role: "Partner, Capital",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    experience: [
      "14 years in private markets and corporate finance",
      "Closed USD 1.2B+ in regional transactions",
      "Advisor to family offices and DFIs",
    ],
    education: [
      "CFA Charterholder",
      "MSc Finance: Cass Business School",
    ],
    expertise: ["Capital structure", "Investor narratives", "Valuation"],
    bio: "Daniel translates expansion ambition into fundable, disciplined capital plans.",
  },
  {
    id: "p-zawadi",
    name: "Zawadi Kimaro",
    role: "Partner, Transformation",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    experience: [
      "12 years operating model and digital transformation",
      "Built PMO offices for banks and logistics groups",
      "Published on East African operating excellence",
    ],
    education: [
      "MSc Systems Engineering: MIT",
      "BEng: University of Dar es Salaam",
    ],
    expertise: ["Operating models", "Change programs", "Digital foundations"],
    bio: "Zawadi makes transformation measurable, milestones, owners, and consequences.",
  },
  {
    id: "p-ibrahim",
    name: "Ibrahim Hassan",
    role: "Principal, Industries",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    experience: [
      "10 years infrastructure and energy strategy",
      "Supported corridor and port modernization cases",
      "Former policy analyst, regional trade body",
    ],
    education: [
      "MPP: Harvard Kennedy School",
      "BA Economics: Makerere University",
    ],
    expertise: ["Infrastructure", "Trade corridors", "Public-private"],
    bio: "Ibrahim connects policy reality with commercial discipline on the ground.",
  },
];

export function getPerson(id: string) {
  return people.find((p) => p.id === id);
}

export const insights: Insight[] = [
  {
    id: "ins-1",
    title: "Pricing power after the corridor opens",
    type: "Article",
    topic: "Strategy",
    date: "Jun 2026",
    excerpt:
      "When transport friction falls, margin stories change. How boards should rethink pricing before competitors do.",
    readMin: 8,
  },
  {
    id: "ins-2",
    title: "East African Market Expansion Playbook",
    type: "Report",
    topic: "Expansion",
    date: "May 2026",
    excerpt:
      "A structured approach to sequencing markets, capital, talent, and regulatory readiness across five countries.",
    readMin: 24,
    body: `Expansion across East Africa rarely fails for lack of ambition. It fails when capital, talent, and regulatory reality diverge from the map on the slide.

This playbook opens with market sequencing: score corridors on FX stability, import dependency, and time-to-first revenue. Kenya and Rwanda often lead when logistics and payments rails are mature. Uganda may follow as a build market with staged capex. Ethiopia belongs in a deferred lane until FX and repatriation rules are legible to your treasury team.

Capital structure comes next. Ring-fenced SPVs per country, shared services for finance and HR, and a committee that can stop funding when milestones miss. We document kill criteria up front so boards do not debate them mid-crisis.

Operating model is the third pillar. Country P&Ls, a regional PMO, and decision cycles measured in weeks, not quarters. The firms that win treat expansion as a portfolio, not a chain of heroic exceptions.

This report is fictional AMANI demo content for the KasiTech concept. It illustrates how institutional counsel packages thinking for executives evaluating regional moves.`,
  },
  {
    id: "ins-3",
    title: "Family capital, institutional discipline",
    type: "Brief",
    topic: "Capital",
    date: "Apr 2026",
    excerpt:
      "How family-owned groups can adopt investment committee rigor without losing speed.",
    readMin: 6,
  },
  {
    id: "ins-4",
    title: "Transformation that survives year two",
    type: "Article",
    topic: "Transformation",
    date: "Mar 2026",
    excerpt:
      "Most programs fail after the launch theatre. Operating cadence is the real product.",
    readMin: 11,
  },
  {
    id: "ins-5",
    title: "Energy offtake and bankability",
    type: "Report",
    topic: "Infrastructure",
    date: "Feb 2026",
    excerpt:
      "What lenders actually stress-test in regional power projects, and what sponsors overlook.",
    readMin: 18,
  },
  {
    id: "ins-6",
    title: "The quiet cost of unclear mandates",
    type: "Brief",
    topic: "Governance",
    date: "Jan 2026",
    excerpt:
      "Ambiguous ownership of decisions slows capital more than interest rates ever will.",
    readMin: 5,
  },
];

export const insightTopics = [
  "All",
  "Strategy",
  "Expansion",
  "Capital",
  "Transformation",
  "Infrastructure",
  "Governance",
] as const;

export const caseMilestones: CaseMilestone[] = [
  {
    year: "2023",
    title: "Mandate",
    detail:
      "A Dar-based industrial group asked AMANI to design a five-country expansion with capital discipline.",
  },
  {
    year: "2024 Q1",
    title: "Market sequencing",
    detail:
      "Prioritized Kenya and Rwanda first; deferred Ethiopia pending FX clarity; staged Uganda logistics.",
  },
  {
    year: "2024 Q3",
    title: "Capital structure",
    detail:
      "Blended DFI mezzanine with family equity; ring-fenced country SPVs with shared services.",
  },
  {
    year: "2025",
    title: "Operating model",
    detail:
      "Stood up a regional PMO, country P&Ls, and a monthly capital committee with kill criteria.",
  },
  {
    year: "2026",
    title: "Outcome",
    detail:
      "Two markets live, one in build, revenue +38% vs baseline plan, with lower working-capital drag.",
  },
];

export const caseMetrics: CaseMetric[] = [
  { label: "Markets live", value: "2" },
  { label: "Markets in build", value: "1" },
  { label: "Revenue vs plan", value: "+38%" },
  { label: "Working capital days", value: "−12" },
  { label: "Capital raised", value: "$84M" },
  { label: "Decision cycle", value: "21 days" },
];

export const mapCountries = [
  { id: "tz", name: "Tanzania", status: "HQ", x: 52, y: 62 },
  { id: "ke", name: "Kenya", status: "Live", x: 58, y: 42 },
  { id: "rw", name: "Rwanda", status: "Live", x: 42, y: 48 },
  { id: "ug", name: "Uganda", status: "Build", x: 48, y: 38 },
  { id: "et", name: "Ethiopia", status: "Deferred", x: 62, y: 22 },
] as const;

export type MapCountryId = (typeof mapCountries)[number]["id"];

export const defaultExpansionSequence: MapCountryId[] = [
  "ke",
  "rw",
  "ug",
  "tz",
  "et",
];

export const countryFocusNotes: Record<
  MapCountryId,
  { timelineNote: string; mapNote: string }
> = {
  ke: {
    timelineNote:
      "Kenya live: Nairobi hub operational, payments and distributor network scaled first.",
    mapNote: "Live market · revenue ahead of year-one plan",
  },
  rw: {
    timelineNote:
      "Rwanda live: Kigali launch used as regulatory template for smaller markets.",
    mapNote: "Live market · shared services pilot",
  },
  ug: {
    timelineNote:
      "Uganda in build: logistics corridor staged; capex gated to warehouse milestone.",
    mapNote: "Build phase · capital committee review monthly",
  },
  tz: {
    timelineNote:
      "Tanzania HQ: group treasury and PMO anchor decisions for the portfolio.",
    mapNote: "HQ · mandate origin and capital allocation",
  },
  et: {
    timelineNote:
      "Ethiopia deferred: FX repatriation and import timing still unclear. Revisit when treasury can model three scenarios with confidence.",
    mapNote: "Deferred · FX and repatriation watchlist",
  },
};

export const careers = [
  {
    id: "c1",
    title: "Engagement Manager: Strategy",
    location: "Dar es Salaam",
    type: "Full-time",
  },
  {
    id: "c2",
    title: "Analyst: Capital Markets",
    location: "Nairobi / Dar",
    type: "Full-time",
  },
  {
    id: "c3",
    title: "Research Associate: Insights",
    location: "Remote · EAT",
    type: "Contract",
  },
];

export const cmsPages = [
  { id: "home", title: "Home", status: "Published", updated: "22 Jul 2026" },
  {
    id: "expertise",
    title: "Expertise",
    status: "Published",
    updated: "18 Jul 2026",
  },
  {
    id: "case",
    title: "East Africa Case",
    status: "Published",
    updated: "20 Jul 2026",
  },
  {
    id: "careers",
    title: "Careers",
    status: "Draft",
    updated: "15 Jul 2026",
  },
];

export const bizLeads: Lead[] = [
  {
    id: "L-441",
    name: "Grace Mutua",
    company: "Horizon Ports",
    interest: "Corridor strategy",
    status: "New",
    date: "Today",
  },
  {
    id: "L-438",
    name: "Samir Patel",
    company: "Lake Region Energy",
    interest: "Capital advisory",
    status: "Qualified",
    date: "Yesterday",
  },
  {
    id: "L-429",
    name: "Helen Ngowi",
    company: "Family Office TZ",
    interest: "Expansion playbook",
    status: "Meeting",
    date: "20 Jul",
  },
];

export const bizDownloads: DownloadRow[] = [
  {
    id: "dl1",
    title: "East African Market Expansion Playbook",
    downloads: 412,
    last: "Today",
  },
  {
    id: "dl2",
    title: "Energy offtake and bankability",
    downloads: 188,
    last: "Yesterday",
  },
  {
    id: "dl3",
    title: "Family capital brief",
    downloads: 96,
    last: "19 Jul",
  },
];

export const bizAnalytics = {
  visitors: "18.4k",
  insightReads: "6.2k",
  leadConversion: "3.8%",
  caseCompletions: 842,
  avgSession: "4m 12s",
  downloadRate: "11%",
};

export function buildEnquiryBrief(input: {
  name: string;
  email: string;
  company: string;
  message: string;
}): string {
  const org = input.company.trim() || "Organisation not provided";
  const snippet =
    input.message.trim().length > 120
      ? input.message.trim().slice(0, 120) + "…"
      : input.message.trim();
  return `${input.name} (${input.email}) from ${org} is exploring: ${snippet} AMANI will route this to the right practice lead within two business days.`;
}
