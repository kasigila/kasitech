export type JourneyStage = {
  id: string;
  num: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  visual: "data" | "technology" | "entrepreneurship" | "kasitech";
};

export type ThinkingQuestion = {
  id: string;
  num: string;
  question: string;
  answer: string;
  highlight: string[];
  principle: string;
};

export type BuildingStage = {
  id: string;
  num: string;
  label: string;
  line: string;
};

export const journeyStages: JourneyStage[] = [
  {
    id: "data",
    num: "01",
    label: "DATA",
    title: "LOOK FOR THE PATTERN.",
    description:
      "Data science shapes how Karen approaches problems: observe behavior, find patterns, question assumptions, and decide with evidence.",
    points: [
      "Understand behavior",
      "Identify patterns",
      "Question assumptions",
      "Decide with evidence",
    ],
    visual: "data",
  },
  {
    id: "technology",
    num: "02",
    label: "TECHNOLOGY",
    title: "TURN UNDERSTANDING INTO SYSTEMS.",
    description:
      "Knowing what should happen is different from building something capable of making it happen.",
    points: ["INPUT", "LOGIC", "INTERFACE", "ACTION"],
    visual: "technology",
  },
  {
    id: "entrepreneurship",
    num: "03",
    label: "ENTREPRENEURSHIP",
    title: "SOLVE SOMETHING THAT MATTERS.",
    description:
      "Business thinking keeps the work honest: customer, value, operations, and whether the solution can actually live.",
    points: ["CUSTOMER", "EXPERIENCE", "ACTION", "BUSINESS"],
    visual: "entrepreneurship",
  },
  {
    id: "kasitech",
    num: "04",
    label: "KASITECH",
    title: "BRING IT TOGETHER.",
    description:
      "KasiTech exists where evidence, systems, and business judgment meet - building technology that earns its place.",
    points: ["DATA", "SYSTEMS", "BUSINESS", "KASITECH"],
    visual: "kasitech",
  },
];

export const thinkingQuestions: ThinkingQuestion[] = [
  {
    id: "who",
    num: "01",
    question: "WHO IS THIS FOR?",
    answer:
      "Start with the person on the other side of the screen - what they need, what they already understand, and what would make the next step obvious.",
    highlight: ["PERSON", "NEED"],
    principle: "UNDERSTAND",
  },
  {
    id: "do",
    num: "02",
    question: "WHAT ARE THEY TRYING TO DO?",
    answer:
      "Map the path from intention to action. The experience should remove hesitation, not decorate it.",
    highlight: ["NEED", "EXPERIENCE", "ACTION"],
    principle: "REMOVE FRICTION",
  },
  {
    id: "business",
    num: "03",
    question: "WHAT DOES THE BUSINESS NEED TO HAPPEN?",
    answer:
      "Every interaction should connect to a real outcome - enquiry, booking, purchase, operation, or decision.",
    highlight: ["ACTION", "BUSINESS"],
    principle: "CONNECT",
  },
  {
    id: "tech",
    num: "04",
    question: "WHAT SHOULD TECHNOLOGY ACTUALLY DO?",
    answer:
      "Technology earns its place when it makes the right thing easier - then feeds signals back so the system can improve.",
    highlight: ["BUSINESS", "SYSTEM", "SIGNAL"],
    principle: "BUILD",
  },
];

export const thinkingNodes = [
  "PERSON",
  "NEED",
  "EXPERIENCE",
  "ACTION",
  "BUSINESS",
  "SYSTEM",
  "SIGNAL",
] as const;

export const buildingStages: BuildingStage[] = [
  {
    id: "client",
    num: "01",
    label: "CLIENT WORK",
    line: "Solve specific problems for real businesses.",
  },
  {
    id: "patterns",
    num: "02",
    label: "REPEATED PATTERNS",
    line: "Notice what businesses need again and again.",
  },
  {
    id: "systems",
    num: "03",
    label: "REUSABLE SYSTEMS",
    line: "Turn repeatable solutions into infrastructure.",
  },
  {
    id: "products",
    num: "04",
    label: "KASITECH PRODUCTS",
    line: "Build technology capable of serving many.",
  },
];

export const founderProducts = [
  {
    name: "Kasi Flow",
    href: "/work/kasi-flow",
    line: "Operations software for CRM, finance, inventory, and daily work.",
  },
  {
    name: "Kasi Intelligence",
    href: "/work/kasi-intelligence",
    line: "Ask the business questions, see evidence, approve automation.",
  },
] as const;
