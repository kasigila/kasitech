export type EvidenceSource =
  | "Sales"
  | "Products"
  | "Locations"
  | "Traffic"
  | "Returns"
  | "Channels";

export type ChartPoint = { label: string; value: number };

export type QueryAnswer = {
  id: string;
  query: string;
  summary: string;
  explanation: string[];
  sources: EvidenceSource[];
  charts: { title: string; unit: string; points: ChartPoint[] }[];
  citations: string[];
};

export type HistoryItem = {
  id: string;
  query: string;
  at: string;
  answerId: string;
};

export type AutomationAction =
  | "Create CRM lead"
  | "Send acknowledgement"
  | "Notify salesperson"
  | "Schedule follow-up";

export const inspectionOrder: EvidenceSource[] = [
  "Sales",
  "Products",
  "Locations",
  "Traffic",
  "Returns",
  "Channels",
];

export const suggestedQueries = [
  "Why were sales down in June?",
  "Which products made the most gross profit last month?",
  "Where is response time losing us leads?",
];

export const juneSalesAnswer: QueryAnswer = {
  id: "june-sales",
  query: "Why were sales down in June?",
  summary:
    "June revenue fell 14% vs May. The drop concentrated in two channels and one product line, not a company-wide collapse.",
  explanation: [
    "Online store orders dropped 22% after a 9-day payment gateway outage (7-15 June).",
    "Spice gift boxes (SPC-02) stocked out mid-month; that SKU alone was 11% of May revenue.",
    "Walk-in traffic at Masaki was stable; Arusha weekend traffic dipped 8% during rains.",
    "Return rate stayed flat at 3.1%: quality is not the driver.",
  ],
  sources: ["Sales", "Products", "Locations", "Traffic", "Returns", "Channels"],
  charts: [
    {
      title: "Monthly revenue",
      unit: "TZS M",
      points: [
        { label: "Mar", value: 42 },
        { label: "Apr", value: 45 },
        { label: "May", value: 51 },
        { label: "Jun", value: 44 },
        { label: "Jul*", value: 48 },
      ],
    },
    {
      title: "June channel mix vs May",
      unit: "% change",
      points: [
        { label: "Online", value: -22 },
        { label: "Retail", value: -3 },
        { label: "Wholesale", value: 4 },
        { label: "Events", value: -8 },
      ],
    },
  ],
  citations: [
    "Sales ledger · Jun 2026 · demo extract",
    "Inventory snapshots · SPC-02 zero stock 12-28 Jun",
    "Gateway incident log · 7-15 Jun (9 days)",
    "Store footfall · Masaki & Arusha counters",
  ],
};

export const profitAnswer: QueryAnswer = {
  id: "gross-profit",
  query: "Which products made the most gross profit last month?",
  summary:
    "Last month (June), three SKUs produced 61% of gross profit. Ceramic mug sets led despite lower volume.",
  explanation: [
    "Ceramic mug set (MUG-04): TZS 4.8M gross profit · 58% margin.",
    "Cotton tote (TOT-12): TZS 3.1M · 42% margin on high volume.",
    "Cold brew concentrate (CBW-01): TZS 2.4M · 51% margin.",
    "Spice gift box underperformed on profit because of stockouts, not margin.",
  ],
  sources: ["Products", "Sales"],
  charts: [
    {
      title: "Gross profit by SKU (June)",
      unit: "TZS M",
      points: [
        { label: "MUG-04", value: 4.8 },
        { label: "TOT-12", value: 3.1 },
        { label: "CBW-01", value: 2.4 },
        { label: "NTB-08", value: 1.2 },
        { label: "SPC-02", value: 0.6 },
      ],
    },
  ],
  citations: [
    "Product margin table · Jun 2026",
    "COGS from Coastal Supplies & Kilimanjaro Roast POs",
  ],
};

export const responseTimeAnswer: QueryAnswer = {
  id: "response-time",
  query: "Where is response time losing us leads?",
  summary:
    "Afternoon inquiries wait too long. Median first reply was 2h 41m yesterday; leads unanswered after 2 hours converted at 4%.",
  explanation: [
    "Peak inquiry window 14:00-17:00 with one salesperson covering chat and phone.",
    "6 of 14 new leads yesterday had no follow-up logged.",
    "Under-30-minute replies convert at 31% in this demo set.",
  ],
  sources: ["Channels", "Sales"],
  charts: [
    {
      title: "Conversion by reply speed",
      unit: "%",
      points: [
        { label: "<30m", value: 31 },
        { label: "30-2h", value: 18 },
        { label: ">2h", value: 4 },
      ],
    },
  ],
  citations: [
    "CRM · 14 new inquiries · 22 Jul",
    "Median response 2h 41m",
  ],
};

export const answers: Record<string, QueryAnswer> = {
  "june-sales": juneSalesAnswer,
  "gross-profit": profitAnswer,
  "response-time": responseTimeAnswer,
};

export function resolveQuery(raw: string): QueryAnswer | null {
  const q = raw.toLowerCase();
  if (
    q.includes("gross profit") ||
    q.includes("most profit") ||
    (q.includes("product") && q.includes("profit"))
  ) {
    return profitAnswer;
  }
  if (
    q.includes("june") ||
    q.includes("sales down") ||
    (q.includes("why") && q.includes("sales"))
  ) {
    return juneSalesAnswer;
  }
  if (q.includes("stock") && (q.includes("spc") || q.includes("low"))) {
    return juneSalesAnswer;
  }
  if (
    q.includes("response") ||
    q.includes("lead") ||
    q.includes("reply")
  ) {
    return responseTimeAnswer;
  }
  return null;
}

export function unknownAnswer(query: string): QueryAnswer {
  const monthHint =
    /\b(july|august|september|october|november|december|202[7-9])\b/i.test(
      query,
    );
  return {
    id: "unknown",
    query,
    summary: monthHint
      ? "I don't know yet. That period isn't in the connected demo ledger - here's the latest month I can explain (June), and why."
      : "I don't know yet. I couldn't match that question to evidence in the demo data set.",
    explanation: [
      monthHint
        ? "Connected sources currently cover March-June 2026 (July is marked provisional)."
        : "Try a question that touches sales, product profit, stock, or response time.",
      "I refuse to invent numbers when sources are missing - that's the point of evidence-first answers.",
      "Suggested: “Why were sales down in June?” or “Which products made the most gross profit last month?”",
    ],
    sources: ["Sales"],
    charts: [],
    citations: [
      "No matching extract for this query",
      "Demo corpus · Mar-Jun 2026",
    ],
  };
}

export const initialHistory: HistoryItem[] = [
  {
    id: "h1",
    query: "Why were sales down in June?",
    at: "22 Jul 2026 · 16:40",
    answerId: "june-sales",
  },
  {
    id: "h2",
    query: "Which products made the most gross profit last month?",
    at: "21 Jul 2026 · 09:12",
    answerId: "gross-profit",
  },
];

export const opportunity = {
  headline:
    "We lost 14 leads yesterday because average response time exceeded two hours",
  detail:
    "Inquiry volume peaked 14:00-17:00. Median first reply was 2h 41m. Leads unanswered after 2 hours converted at 4% vs 31% under 30 minutes.",
  evidence: [
    "CRM · 14 new inquiries · 22 Jul",
    "Median response 2h 41m (target < 30m)",
    "6 of 14 went cold with no follow-up logged",
  ],
};

export const whenOptions = [
  "New inquiry",
  "Invoice overdue 7 days",
  "Stock below reorder",
  "Order paid",
] as const;

export const ifOptions = [
  "Channel is website or WhatsApp",
  "Amount over TZS 500,000",
  "Customer is Active or Lead",
  "No reply in 30 minutes",
] as const;

export const thenOptions: AutomationAction[] = [
  "Create CRM lead",
  "Send acknowledgement",
  "Notify salesperson",
  "Schedule follow-up",
];

export const suggestedAutomation = {
  when: "New inquiry" as const,
  ifCondition: "No reply in 30 minutes" as (typeof ifOptions)[number],
  then: [
    "Create CRM lead",
    "Send acknowledgement",
    "Notify salesperson",
    "Schedule follow-up",
  ] as AutomationAction[],
  preview:
    "When a new inquiry arrives and no human reply is logged within 30 minutes: create a CRM lead, send the standard acknowledgement, notify the on-duty salesperson on WhatsApp, and schedule a follow-up task for +2 hours.",
};
