export type Region =
  | "Dar es Salaam"
  | "Arusha"
  | "Mwanza"
  | "Dodoma"
  | "Mbeya"
  | "Tanga"
  | "Morogoro"
  | "Kigoma";

export type Story = {
  id: string;
  name: string;
  age: number;
  region: Region;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  programId: string;
};

export type Program = {
  id: string;
  name: string;
  focus: string;
  regions: Region[];
  peopleServed: number;
  description: string;
  image: string;
};

export type Project = {
  id: string;
  name: string;
  region: Region;
  programId: string;
  status: "Active" | "Completed";
  mapX: number;
  mapY: number;
  outcome: string;
};

export type Report = {
  id: string;
  title: string;
  year: number;
  type: "Annual" | "Financial" | "Methodology";
  summary: string;
};

export type Partner = {
  name: string;
  role: string;
  since: number;
};

export type DonationRow = {
  id: string;
  donor: string;
  amount: number;
  type: "Monthly" | "One-time";
  method: "M-Pesa" | "Card";
  date: string;
  program: string;
};

export const regions: Region[] = [
  "Dar es Salaam",
  "Arusha",
  "Mwanza",
  "Dodoma",
  "Mbeya",
  "Tanga",
  "Morogoro",
  "Kigoma",
];

export const neemaStory: Story = {
  id: "neema",
  name: "Neema",
  age: 14,
  region: "Mwanza",
  title: "THIS IS NEEMA.",
  excerpt:
    "Before the water point, Neema walked ninety minutes each morning. Now she is first in her class.",
  body: "Neema lives on the edge of Ilemela. For years her mornings began before sunrise, bucket, path, queue, so her younger siblings could drink before school. When IMPACT, and the ward committee finished the community water point in March, her walk became twelve minutes. She uses the time for mathematics. Her teacher says she is first in her class for the first time. This is not a metaphor. This is what reliable water does for a teenager who wants to become a nurse.",
  image:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
  programId: "water",
};

export const stories: Story[] = [
  neemaStory,
  {
    id: "joseph",
    name: "Joseph",
    age: 31,
    region: "Mbeya",
    title: "Joseph kept his harvest.",
    excerpt:
      "A shared cold room meant his tomatoes reached market instead of spoiling on the roadside.",
    body: "Joseph farms two acres outside Mbeya. Last season, heat ruined a third of his tomatoes before buyers arrived. Through the Food Systems program he joined a cooperative cold room. His first refrigerated load sold at a 40% better price. He paid school fees for his daughter the same week.",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=80",
    programId: "food",
  },
  {
    id: "aisha",
    name: "Aisha",
    age: 22,
    region: "Dar es Salaam",
    title: "Aisha teaches girls to code.",
    excerpt:
      "After the digital skills lab, she runs Saturday classes for twenty girls in Temeke.",
    body: "Aisha finished Form VI with no clear path into tech. The Girls Digital Lab gave her a laptop stipend, mentorship, and a first freelance job. She now teaches Saturdays, HTML, spreadsheets, and confidence, in a room that used to store broken desks.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1400&q=80",
    programId: "skills",
  },
  {
    id: "baraka",
    name: "Baraka",
    age: 9,
    region: "Kigoma",
    title: "Baraka can read aloud.",
    excerpt:
      "Community tutors and a solar lamp turned evening into study time.",
    body: "Baraka's village had one teacher for three grades. IMPACT's Learning Circles paired him with a tutor and a solar lamp. He read his first full story aloud to his mother in June. She cried. He asked for another book.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80",
    programId: "learning",
  },
];

export const programs: Program[] = [
  {
    id: "water",
    name: "Clean Water Access",
    focus: "Water points, hygiene, maintenance committees",
    regions: ["Mwanza", "Kigoma", "Dodoma"],
    peopleServed: 48200,
    description:
      "Community-owned water points with trained caretakers and spare-parts funds.",
    image:
      "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "food",
    name: "Food Systems",
    focus: "Cold chain, co-ops, market access",
    regions: ["Mbeya", "Morogoro", "Arusha"],
    peopleServed: 12600,
    description:
      "Post-harvest infrastructure and cooperative training for smallholder farmers.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "skills",
    name: "Girls Digital Lab",
    focus: "Digital skills, mentorship, first jobs",
    regions: ["Dar es Salaam", "Arusha", "Tanga"],
    peopleServed: 3100,
    description:
      "Labs, stipends, and employer pathways for young women entering tech and ops roles.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "learning",
    name: "Learning Circles",
    focus: "Community tutors, solar study, reading",
    regions: ["Kigoma", "Dodoma", "Mwanza"],
    peopleServed: 8900,
    description:
      "After-school circles with tutors, lamps, and book kits for early literacy.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    name: "Ilemela water point",
    region: "Mwanza",
    programId: "water",
    status: "Active",
    mapX: 42,
    mapY: 28,
    outcome: "1,840 households with reliable water",
  },
  {
    id: "p2",
    name: "Mbeya cold room co-op",
    region: "Mbeya",
    programId: "food",
    status: "Active",
    mapX: 38,
    mapY: 72,
    outcome: "62 farmers reducing post-harvest loss",
  },
  {
    id: "p3",
    name: "Temeke digital lab",
    region: "Dar es Salaam",
    programId: "skills",
    status: "Active",
    mapX: 72,
    mapY: 58,
    outcome: "120 girls trained this year",
  },
  {
    id: "p4",
    name: "Kigoma reading circles",
    region: "Kigoma",
    programId: "learning",
    status: "Active",
    mapX: 18,
    mapY: 48,
    outcome: "340 children in weekly circles",
  },
  {
    id: "p5",
    name: "Dodoma borehole cluster",
    region: "Dodoma",
    programId: "water",
    status: "Completed",
    mapX: 48,
    mapY: 48,
    outcome: "3 boreholes handed to wards",
  },
  {
    id: "p6",
    name: "Arusha market link",
    region: "Arusha",
    programId: "food",
    status: "Active",
    mapX: 55,
    mapY: 22,
    outcome: "18 co-ops selling to hotels",
  },
  {
    id: "p7",
    name: "Tanga skills satellite",
    region: "Tanga",
    programId: "skills",
    status: "Active",
    mapX: 78,
    mapY: 32,
    outcome: "45 graduates placed",
  },
  {
    id: "p8",
    name: "Morogoro seed bank",
    region: "Morogoro",
    programId: "food",
    status: "Completed",
    mapX: 58,
    mapY: 55,
    outcome: "Community seed bank operational",
  },
];

export const impactStats = [
  { label: "People reached", value: "72,800" },
  { label: "Active projects", value: "48" },
  { label: "Regions", value: "8" },
  { label: "Funds to programs", value: "87%" },
];

export const reports: Report[] = [
  {
    id: "r1",
    title: "Annual Report 2025",
    year: 2025,
    type: "Annual",
    summary:
      "Programs, stories, and audited outcomes across eight regions.",
  },
  {
    id: "r2",
    title: "Financial Statements 2025",
    year: 2025,
    type: "Financial",
    summary:
      "Income, expenditure, program allocation, and reserves: audited.",
  },
  {
    id: "r3",
    title: "Impact Methodology",
    year: 2025,
    type: "Methodology",
    summary:
      "How we count beneficiaries, verify water uptime, and publish corrections.",
  },
  {
    id: "r4",
    title: "Annual Report 2024",
    year: 2024,
    type: "Annual",
    summary: "Expansion into Kigoma and first Girls Digital Lab cohort.",
  },
];

export const partners: Partner[] = [
  { name: "Lake Zone Water Trust", role: "Technical partner", since: 2019 },
  { name: "Temeke Municipal Council", role: "Local government", since: 2021 },
  { name: "Sunrise Cooperative Union", role: "Farmer networks", since: 2020 },
  { name: "Open Skills Foundation", role: "Curriculum & mentors", since: 2022 },
  { name: "Solar Light TZ", role: "Hardware partner", since: 2018 },
];

export const donationPresets = [25000, 50000, 100000, 250000];

export const followPath = [
  {
    id: "donation",
    label: "Donation",
    detail: "TZS 100,000 · one-time · M-Pesa · Clean Water Access",
  },
  {
    id: "program",
    label: "Program",
    detail: "Clean Water Access: community points & hygiene training",
  },
  {
    id: "region",
    label: "Region",
    detail: "Mwanza · Ilemela ward partnership",
  },
  {
    id: "activity",
    label: "Activity",
    detail: "Pump install, caretaker training, spare-parts fund seeded",
  },
  {
    id: "outcome",
    label: "Outcome",
    detail: "1,840 households · average fetch time cut from 90 to 12 minutes",
  },
  {
    id: "reporting",
    label: "Reporting",
    detail: "Monthly uptime log · published in Q2 field note & annual report",
  },
] as const;

export const adminDonations: DonationRow[] = [
  {
    id: "DN-8821",
    donor: "Anonymous",
    amount: 100000,
    type: "One-time",
    method: "M-Pesa",
    date: "21 Jul 2026",
    program: "Clean Water Access",
  },
  {
    id: "DN-8814",
    donor: "Grace Mushi",
    amount: 50000,
    type: "Monthly",
    method: "Card",
    date: "20 Jul 2026",
    program: "Girls Digital Lab",
  },
  {
    id: "DN-8802",
    donor: "Dar Tech Meetup",
    amount: 500000,
    type: "One-time",
    method: "Card",
    date: "18 Jul 2026",
    program: "Learning Circles",
  },
  {
    id: "DN-8791",
    donor: "J. Okello",
    amount: 25000,
    type: "Monthly",
    method: "M-Pesa",
    date: "15 Jul 2026",
    program: "Food Systems",
  },
];

export function getProgram(id: string) {
  return programs.find((p) => p.id === id);
}

export function getStory(id: string) {
  return stories.find((s) => s.id === id);
}

export function buildFollowPath(
  programId: string,
  amount: number,
  freq: "one-time" | "monthly",
  method: "mpesa" | "card",
) {
  const program = getProgram(programId);
  const name = program?.name ?? "Program";
  const project =
    projects.find((p) => p.programId === programId && p.status === "Active") ??
    projects[0];
  const payLabel = method === "mpesa" ? "M-Pesa" : "card";
  const freqLabel = freq === "monthly" ? "monthly" : "one-time";

  const middleByProgram: Record<
    string,
    { activity: string; outcome: string }
  > = {
    water: {
      activity: "Pump install, caretaker training, spare-parts fund seeded",
      outcome: `${project.outcome} · average fetch time cut from 90 to 12 minutes`,
    },
    food: {
      activity: "Cold room prep, co-op ledger setup, market buyer intros",
      outcome: `${project.outcome} · better prices at first sale window`,
    },
    skills: {
      activity: "Lab kits, mentor pairing, employer showcase day",
      outcome: `${project.outcome} · stipends and first freelance placements`,
    },
    learning: {
      activity: "Tutor training, solar lamp kits, reading circle launch",
      outcome: `${project.outcome} · weekly literacy circles running`,
    },
  };

  const mid =
    middleByProgram[programId] ?? middleByProgram.water;

  const activityDetail =
    amount >= 250000
      ? `${mid.activity} · accelerated tranche unlocked at ${formatTzs(amount)}`
      : amount >= 100000
        ? `${mid.activity} · standard field tranche at ${formatTzs(amount)}`
        : `${mid.activity} · seed tranche at ${formatTzs(amount)}`;

  return [
    {
      id: "donation",
      label: "Donation",
      detail: `${formatTzs(amount)} · ${freqLabel} · ${payLabel} · ${name}`,
    },
    {
      id: "program",
      label: "Program",
      detail: `${name}: ${program?.focus ?? "field work"}`,
    },
    {
      id: "region",
      label: "Region",
      detail: `${project.region} · ${project.name}`,
    },
    {
      id: "activity",
      label: "Activity",
      detail: activityDetail,
    },
    {
      id: "outcome",
      label: "Outcome",
      detail: mid.outcome,
    },
    {
      id: "reporting",
      label: "Reporting",
      detail:
        "Monthly field note · uptime or attendance log · annual report citation",
    },
  ] as const;
}

export function formatTzs(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

export const heroImage = neemaStory.image;
