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

export const answers: Record<string, QueryAnswer> = {
  "june-sales": juneSalesAnswer,
  "gross-profit": profitAnswer,
};

export function resolveQuery(raw: string): QueryAnswer {
  const q = raw.toLowerCase();
  if (
    q.includes("gross profit") ||
    q.includes("most profit") ||
    (q.includes("product") && q.includes("profit"))
  ) {
    return profitAnswer;
  }
  if (q.includes("june") || q.includes("sales down") || q.includes("why")) {
    return juneSalesAnswer;
  }
  return juneSalesAnswer;
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
