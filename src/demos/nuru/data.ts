export type DegreeLevel = "Certificate" | "Diploma" | "Bachelor" | "Master";
export type Field =
  | "Business"
  | "Technology"
  | "Health"
  | "Design"
  | "Education"
  | "Agriculture";
export type Duration = "6 months" | "1 year" | "2 years" | "3 years" | "4 years";
export type Campus = "Dar es Salaam" | "Arusha" | "Mwanza" | "Online";

export type Program = {
  id: string;
  name: string;
  level: DegreeLevel;
  field: Field;
  interestTags: string[];
  duration: Duration;
  campus: Campus;
  feePerTerm: number;
  overview: string;
  curriculum: string[];
  requirements: string[];
  faculty: { name: string; title: string; focus: string }[];
  careers: string[];
  deadline: string;
  image: string;
  seats: number;
};

export type Course = {
  code: string;
  name: string;
  credits: number;
  grade: string;
  status: "In progress" | "Completed";
};

export type ScheduleItem = {
  day: string;
  time: string;
  course: string;
  room: string;
};

export type Announcement = {
  id: string;
  title: string;
  date: string;
  body: string;
};

export type ApplicationRow = {
  id: string;
  name: string;
  program: string;
  status: "Submitted" | "Review" | "Interview" | "Offer";
  date: string;
};

export const degreeLevels: DegreeLevel[] = [
  "Certificate",
  "Diploma",
  "Bachelor",
  "Master",
];

export const fields: Field[] = [
  "Business",
  "Technology",
  "Health",
  "Design",
  "Education",
  "Agriculture",
];

export const durations: Duration[] = [
  "6 months",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
];

export const campuses: Campus[] = [
  "Dar es Salaam",
  "Arusha",
  "Mwanza",
  "Online",
];

export const interestOptions = [
  "Leadership",
  "Coding",
  "Community health",
  "Creative studios",
  "Teaching",
  "Food systems",
  "Startups",
  "Data",
];

export const programs: Program[] = [
  {
    id: "bba-entrepreneurship",
    name: "BBA Entrepreneurship",
    level: "Bachelor",
    field: "Business",
    interestTags: ["Leadership", "Startups"],
    duration: "3 years",
    campus: "Dar es Salaam",
    feePerTerm: 1850000,
    overview:
      "Build ventures that serve East African markets, finance, operations, and founder craft in one program.",
    curriculum: [
      "Venture design studio",
      "Financial modeling for SMEs",
      "Market research in emerging cities",
      "Pitch & capital raising",
      "Operations & supply chains",
      "Capstone: launch a live venture",
    ],
    requirements: [
      "Form VI or equivalent",
      "Pass in Mathematics & English",
      "Personal statement (500 words)",
      "Two references",
    ],
    faculty: [
      {
        name: "Dr. Asha Kimaro",
        title: "Program Lead",
        focus: "SME finance & growth",
      },
      {
        name: "Joseph Mtei",
        title: "Lecturer",
        focus: "Product & go-to-market",
      },
    ],
    careers: [
      "Founder / Co-founder",
      "Business development",
      "Operations manager",
      "Investment analyst",
    ],
    deadline: "15 Aug 2026",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    seats: 48,
  },
  {
    id: "bsc-software",
    name: "BSc Software Engineering",
    level: "Bachelor",
    field: "Technology",
    interestTags: ["Coding", "Data"],
    duration: "4 years",
    campus: "Dar es Salaam",
    feePerTerm: 2100000,
    overview:
      "Ship reliable systems for local industry, full-stack engineering, mobile, and cloud foundations.",
    curriculum: [
      "Programming foundations",
      "Data structures & algorithms",
      "Web & mobile studios",
      "Databases & APIs",
      "DevOps & reliability",
      "Industry practicum",
    ],
    requirements: [
      "Form VI science track preferred",
      "Mathematics pass",
      "Portfolio or coding challenge",
    ],
    faculty: [
      {
        name: "Eng. Neema Lyimo",
        title: "Head of Computing",
        focus: "Distributed systems",
      },
      {
        name: "Brian Owino",
        title: "Senior Lecturer",
        focus: "Mobile products",
      },
    ],
    careers: [
      "Software engineer",
      "Product engineer",
      "QA lead",
      "Technical founder",
    ],
    deadline: "22 Aug 2026",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    seats: 60,
  },
  {
    id: "diploma-nursing",
    name: "Diploma in Community Nursing",
    level: "Diploma",
    field: "Health",
    interestTags: ["Community health"],
    duration: "2 years",
    campus: "Mwanza",
    feePerTerm: 1450000,
    overview:
      "Train for clinic and community care across the Lake Zone, hands-on rotations from year one.",
    curriculum: [
      "Anatomy & physiology",
      "Community health practice",
      "Maternal & child health",
      "Clinical skills lab",
      "Ethics & patient communication",
      "Rural placement",
    ],
    requirements: [
      "Form IV / Form VI biology",
      "Medical fitness certificate",
      "Interview",
    ],
    faculty: [
      {
        name: "Sr. Grace Mwita",
        title: "Clinical Director",
        focus: "Primary care",
      },
      {
        name: "Dr. Peter Kisanga",
        title: "Lecturer",
        focus: "Public health",
      },
    ],
    careers: [
      "Community nurse",
      "Clinic supervisor",
      "Public health officer",
      "NGO field nurse",
    ],
    deadline: "1 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    seats: 40,
  },
  {
    id: "ba-design",
    name: "BA Communication Design",
    level: "Bachelor",
    field: "Design",
    interestTags: ["Creative studios"],
    duration: "3 years",
    campus: "Dar es Salaam",
    feePerTerm: 1750000,
    overview:
      "Visual storytelling for brands, culture, and civic campaigns, studio critique every week.",
    curriculum: [
      "Typography & layout",
      "Brand systems",
      "Motion basics",
      "Photography for designers",
      "Client studio",
      "Thesis exhibition",
    ],
    requirements: [
      "Form VI or diploma",
      "Portfolio of 8–12 works",
      "Statement of purpose",
    ],
    faculty: [
      {
        name: "Lulu Bakari",
        title: "Studio Lead",
        focus: "Brand identity",
      },
      {
        name: "Samir Hassan",
        title: "Lecturer",
        focus: "Editorial design",
      },
    ],
    careers: [
      "Brand designer",
      "Art director",
      "UX visual designer",
      "Creative strategist",
    ],
    deadline: "10 Aug 2026",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80",
    seats: 36,
  },
  {
    id: "certificate-teaching",
    name: "Certificate in Classroom Practice",
    level: "Certificate",
    field: "Education",
    interestTags: ["Teaching"],
    duration: "6 months",
    campus: "Arusha",
    feePerTerm: 780000,
    overview:
      "A fast track into secondary classrooms, lesson design, classroom management, and practicum.",
    curriculum: [
      "Lesson planning",
      "Assessment design",
      "Inclusive classrooms",
      "Practicum in partner schools",
    ],
    requirements: [
      "Form VI or diploma",
      "Clearance letter",
      "Motivation letter",
    ],
    faculty: [
      {
        name: "Hilda Njovu",
        title: "Program Coordinator",
        focus: "Pedagogy",
      },
    ],
    careers: [
      "Teaching assistant",
      "Secondary teacher (pathway)",
      "Education NGO facilitator",
    ],
    deadline: "30 Jul 2026",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80",
    seats: 55,
  },
  {
    id: "diploma-agri",
    name: "Diploma in Agribusiness",
    level: "Diploma",
    field: "Agriculture",
    interestTags: ["Food systems", "Startups"],
    duration: "2 years",
    campus: "Arusha",
    feePerTerm: 1320000,
    overview:
      "Connect farms to markets, production planning, cold chain basics, and rural enterprise.",
    curriculum: [
      "Crop & livestock systems",
      "Agri value chains",
      "Cooperative finance",
      "Post-harvest handling",
      "Field enterprise project",
    ],
    requirements: [
      "Form IV / Form VI",
      "Interest in rural enterprise",
      "Interview",
    ],
    faculty: [
      {
        name: "Dr. Musa Ndunguru",
        title: "Faculty Lead",
        focus: "Value chains",
      },
      {
        name: "Rehema Mushi",
        title: "Lecturer",
        focus: "Rural finance",
      },
    ],
    careers: [
      "Agribusiness manager",
      "Cooperative officer",
      "Supply chain coordinator",
      "Farm enterprise founder",
    ],
    deadline: "5 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80",
    seats: 42,
  },
  {
    id: "msc-data",
    name: "MSc Applied Data",
    level: "Master",
    field: "Technology",
    interestTags: ["Data", "Coding"],
    duration: "2 years",
    campus: "Online",
    feePerTerm: 2450000,
    overview:
      "Decision-grade analytics for operators. Python, statistics, and dashboards that teams actually use.",
    curriculum: [
      "Statistical inference",
      "Machine learning for business",
      "Data engineering basics",
      "Experiment design",
      "Capstone with industry partner",
    ],
    requirements: [
      "Bachelor in STEM or related",
      "Transcript",
      "CV + statement",
    ],
    faculty: [
      {
        name: "Prof. Irene Kajembe",
        title: "Director",
        focus: "Applied ML",
      },
    ],
    careers: [
      "Data analyst",
      "Analytics manager",
      "Product analyst",
      "Research associate",
    ],
    deadline: "20 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    seats: 28,
  },
  {
    id: "diploma-digital-health",
    name: "Diploma in Digital Health Ops",
    level: "Diploma",
    field: "Health",
    interestTags: ["Community health", "Data"],
    duration: "1 year",
    campus: "Online",
    feePerTerm: 980000,
    overview:
      "Run clinic workflows, EMR basics, and outreach reporting for modern health facilities.",
    curriculum: [
      "Health information systems",
      "Clinic operations",
      "Patient flow design",
      "Reporting & indicators",
    ],
    requirements: [
      "Form VI or health certificate",
      "Basic computer literacy",
    ],
    faculty: [
      {
        name: "Dr. Fatuma Ally",
        title: "Program Lead",
        focus: "Health systems",
      },
    ],
    careers: [
      "Health records officer",
      "Clinic operations coordinator",
      "M&E assistant",
    ],
    deadline: "12 Aug 2026",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    seats: 50,
  },
];

export const studentCourses: Course[] = [
  {
    code: "ENT 210",
    name: "Venture Design Studio",
    credits: 4,
    grade: ": ",
    status: "In progress",
  },
  {
    code: "FIN 205",
    name: "SME Financial Modeling",
    credits: 3,
    grade: ": ",
    status: "In progress",
  },
  {
    code: "MKT 180",
    name: "Market Research Methods",
    credits: 3,
    grade: "A-",
    status: "Completed",
  },
  {
    code: "OPS 160",
    name: "Operations Foundations",
    credits: 3,
    grade: "B+",
    status: "Completed",
  },
];

export const schedule: ScheduleItem[] = [
  {
    day: "Mon",
    time: "09:00–11:00",
    course: "Venture Design Studio",
    room: "Studio B",
  },
  {
    day: "Tue",
    time: "11:15–13:15",
    course: "SME Financial Modeling",
    room: "Lab 3",
  },
  {
    day: "Wed",
    time: "14:00–16:00",
    course: "Venture Design Studio",
    room: "Studio B",
  },
  {
    day: "Thu",
    time: "09:00–10:30",
    course: "Career Lab",
    room: "Hall A",
  },
  {
    day: "Fri",
    time: "10:00–12:00",
    course: "SME Financial Modeling",
    room: "Lab 3",
  },
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "Fee payment window opens",
    date: "18 Jul 2026",
    body: "Term 2 fees are due by 5 August. Pay via M-Pesa Paybill 889900 or campus cashier.",
  },
  {
    id: "a2",
    title: "Career fair: founders & operators",
    date: "12 Jul 2026",
    body: "Meet 24 employers on 2 August in Hall A. Register in the portal by 28 July.",
  },
  {
    id: "a3",
    title: "Library hours extended",
    date: "8 Jul 2026",
    body: "Exam-prep hours: Mon–Thu until 22:00 through end of July.",
  },
];

export const portalDocuments = [
  { name: "Admission letter", type: "PDF", updated: "3 Jan 2026" },
  { name: "Fee structure 2026", type: "PDF", updated: "12 Jan 2026" },
  { name: "Student ID card", type: "PDF", updated: "20 Jan 2026" },
  { name: "Transcript (provisional)", type: "PDF", updated: "1 Jun 2026" },
];

export const feeBalance = {
  due: 925000,
  paid: 925000,
  nextDue: "5 Aug 2026",
  term: "Term 2 · 2026",
};

export const applicationsAdmin: ApplicationRow[] = [
  {
    id: "NU-2401",
    name: "Amina Juma",
    program: "BBA Entrepreneurship",
    status: "Interview",
    date: "14 Jul 2026",
  },
  {
    id: "NU-2398",
    name: "Kelvin Mwakyusa",
    program: "BSc Software Engineering",
    status: "Review",
    date: "13 Jul 2026",
  },
  {
    id: "NU-2392",
    name: "Farida Hassan",
    program: "Diploma in Community Nursing",
    status: "Offer",
    date: "11 Jul 2026",
  },
  {
    id: "NU-2387",
    name: "Daniel Kimaro",
    program: "BA Communication Design",
    status: "Submitted",
    date: "10 Jul 2026",
  },
];

export const futureInterestOptions = [
  "Building products",
  "Helping people heal",
  "Teaching others",
  "Growing food systems",
  "Running a business",
  "Making visual work",
  "Working with data",
];

export const strengthOptions = [
  "Problem solving",
  "Communication",
  "Hands-on making",
  "Empathy",
  "Numbers & logic",
  "Leadership",
  "Creativity",
];

export const careerGoalOptions = [
  "Start my own company",
  "Join a high-growth team",
  "Serve my community",
  "Become a specialist",
  "Teach / mentor",
  "Work internationally",
];

export function getProgram(id: string) {
  return programs.find((p) => p.id === id);
}

export function formatTzs(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

export function suggestFromFuture(input: {
  interests: string[];
  strengths: string[];
  goals: string[];
}) {
  const scored = programs.map((p) => {
    let score = 0;
    if (
      input.interests.some((i) =>
        p.interestTags.some((t) =>
          t.toLowerCase().includes(i.toLowerCase().split(" ")[0] ?? ""),
        ),
      )
    )
      score += 3;
    if (
      input.interests.includes("Building products") &&
      (p.field === "Technology" || p.field === "Business")
    )
      score += 2;
    if (
      input.interests.includes("Helping people heal") &&
      p.field === "Health"
    )
      score += 3;
    if (input.interests.includes("Teaching others") && p.field === "Education")
      score += 3;
    if (
      input.interests.includes("Growing food systems") &&
      p.field === "Agriculture"
    )
      score += 3;
    if (
      input.interests.includes("Running a business") &&
      p.field === "Business"
    )
      score += 2;
    if (
      input.interests.includes("Making visual work") &&
      p.field === "Design"
    )
      score += 3;
    if (
      input.interests.includes("Working with data") &&
      p.interestTags.includes("Data")
    )
      score += 3;
    if (
      input.strengths.includes("Numbers & logic") &&
      (p.field === "Technology" || p.field === "Business")
    )
      score += 1;
    if (
      input.strengths.includes("Creativity") &&
      p.field === "Design"
    )
      score += 1;
    if (
      input.strengths.includes("Empathy") &&
      (p.field === "Health" || p.field === "Education")
    )
      score += 1;
    if (
      input.goals.includes("Start my own company") &&
      (p.id.includes("entrepreneur") || p.field === "Business")
    )
      score += 2;
    if (
      input.goals.includes("Serve my community") &&
      (p.field === "Health" || p.field === "Education" || p.field === "Agriculture")
    )
      score += 2;
    return { program: p, score };
  });

  const top = scored
    .sort((a, b) => b.score - a.score)
    .filter((s) => s.score > 0)
    .slice(0, 3);

  const fallback = scored.sort((a, b) => b.score - a.score).slice(0, 3);
  const picks = (top.length ? top : fallback).map((s) => s.program);

  const careers = Array.from(
    new Set(picks.flatMap((p) => p.careers).slice(0, 6)),
  );

  return { programs: picks, careers };
}

export const heroImage =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80";

export const applySteps = [
  "Personal",
  "Education",
  "Documents",
  "Essay",
  "Payment",
  "Submit",
] as const;
