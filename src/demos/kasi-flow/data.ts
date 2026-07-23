export type CustomerStatus = "Lead" | "Active" | "At risk" | "Churned";

export type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  value: number;
  notes: string[];
  history: { date: string; event: string }[];
};

export type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue";
  issued: string;
  due: string;
  daysOverdue: number;
};

export type Expense = {
  id: string;
  category: string;
  amount: number;
  date: string;
  vendor: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorderAt: number;
  supplier: string;
  unitCost: number;
};

export type PurchaseOrder = {
  id: string;
  supplier: string;
  items: string;
  status: "Draft" | "Sent" | "Received";
  total: number;
  date: string;
};

export type Employee = {
  id: string;
  name: string;
  role: string;
  permissions: string[];
  lastActive: string;
};

export type Task = {
  id: string;
  title: string;
  owner: string;
  due: string;
  status: "Open" | "Done";
  priority: "High" | "Medium" | "Low";
};

export type Approval = {
  id: string;
  title: string;
  requester: string;
  amount?: number;
  status: "Pending" | "Approved" | "Rejected";
};

export const demoUser = {
  name: "Demo User",
  role: "Owner",
};

export function todayLabel() {
  return "Thursday, 23 July 2026";
}

export const homeMetrics = [
  { label: "Revenue (MTD)", value: "TZS 48.2M", delta: "+12%" },
  { label: "Orders", value: "186", delta: "+8%" },
  { label: "Customers", value: "412", delta: "+5%" },
  { label: "Bookings", value: "27", delta: "−3%" },
  { label: "Invoices unpaid", value: "14", delta: "TZS 9.4M" },
  { label: "Open tasks", value: "11", delta: "3 high" },
];

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Amina Juma",
    company: "Bahari Logistics",
    email: "amina@bahari.demo",
    phone: "+255 754 221 009",
    status: "Active",
    value: 12400000,
    notes: [
      "Prefers WhatsApp for reminders.",
      "Q3 expansion into Mwanza: watch inventory needs.",
    ],
    history: [
      { date: "20 Jul", event: "Paid INV-1042" },
      { date: "12 Jul", event: "Placed order #8841" },
      { date: "2 Jul", event: "Call: contract renewal" },
    ],
  },
  {
    id: "c2",
    name: "Daniel Kimaro",
    company: "Kimaro Retail",
    email: "daniel@kimaro.demo",
    phone: "+255 713 880 441",
    status: "At risk",
    value: 6200000,
    notes: ["Late on last two invoices.", "Requested payment plan."],
    history: [
      { date: "18 Jul", event: "Invoice INV-1055 overdue 34 days" },
      { date: "1 Jul", event: "Support ticket: delivery delay" },
    ],
  },
  {
    id: "c3",
    name: "Grace Mushi",
    company: "Mushi Events",
    email: "grace@mushi.demo",
    phone: "+255 765 110 220",
    status: "Lead",
    value: 0,
    notes: ["Interested in quarterly retainer."],
    history: [
      { date: "21 Jul", event: "Demo booked" },
      { date: "19 Jul", event: "Inbound form" },
    ],
  },
  {
    id: "c4",
    name: "Joseph Okello",
    company: "Okello Farms",
    email: "joseph@okello.demo",
    phone: "+255 758 990 331",
    status: "Active",
    value: 8900000,
    notes: ["Seasonal peak Oct–Dec."],
    history: [
      { date: "15 Jul", event: "PO received" },
      { date: "8 Jul", event: "Paid INV-1038" },
    ],
  },
  {
    id: "c5",
    name: "Farida Hassan",
    company: "Hassan Studio",
    email: "farida@hassan.demo",
    phone: "+255 712 445 667",
    status: "Churned",
    value: 2100000,
    notes: ["Left for competitor pricing: re-engage in Sep."],
    history: [{ date: "30 May", event: "Cancelled subscription" }],
  },
];

export const invoices: Invoice[] = [
  {
    id: "INV-1055",
    customer: "Kimaro Retail",
    amount: 1850000,
    status: "Overdue",
    issued: "18 Jun 2026",
    due: "18 Jun 2026",
    daysOverdue: 35,
  },
  {
    id: "INV-1051",
    customer: "Bahari Logistics",
    amount: 920000,
    status: "Unpaid",
    issued: "5 Jul 2026",
    due: "5 Aug 2026",
    daysOverdue: 0,
  },
  {
    id: "INV-1048",
    customer: "Okello Farms",
    amount: 2400000,
    status: "Overdue",
    issued: "10 Jun 2026",
    due: "10 Jun 2026",
    daysOverdue: 43,
  },
  {
    id: "INV-1042",
    customer: "Bahari Logistics",
    amount: 3100000,
    status: "Paid",
    issued: "1 Jun 2026",
    due: "1 Jul 2026",
    daysOverdue: 0,
  },
  {
    id: "INV-1039",
    customer: "Mushi Events",
    amount: 780000,
    status: "Overdue",
    issued: "12 Jun 2026",
    due: "12 Jun 2026",
    daysOverdue: 41,
  },
  {
    id: "INV-1038",
    customer: "Okello Farms",
    amount: 1500000,
    status: "Paid",
    issued: "28 May 2026",
    due: "28 Jun 2026",
    daysOverdue: 0,
  },
  {
    id: "INV-1033",
    customer: "Kimaro Retail",
    amount: 1120000,
    status: "Overdue",
    issued: "20 May 2026",
    due: "20 May 2026",
    daysOverdue: 64,
  },
];

export const expenses: Expense[] = [
  {
    id: "EX-221",
    category: "Rent",
    amount: 4500000,
    date: "1 Jul 2026",
    vendor: "Masaki Properties",
  },
  {
    id: "EX-218",
    category: "Inventory",
    amount: 8200000,
    date: "8 Jul 2026",
    vendor: "Coastal Supplies",
  },
  {
    id: "EX-214",
    category: "Salaries",
    amount: 12600000,
    date: "5 Jul 2026",
    vendor: "Payroll",
  },
  {
    id: "EX-210",
    category: "Marketing",
    amount: 980000,
    date: "12 Jul 2026",
    vendor: "Local Ads TZ",
  },
];

export const products: Product[] = [
  {
    id: "pr1",
    name: "Ceramic mug set",
    sku: "MUG-04",
    stock: 18,
    reorderAt: 25,
    supplier: "Coastal Supplies",
    unitCost: 12000,
  },
  {
    id: "pr2",
    name: "Cotton tote",
    sku: "TOT-12",
    stock: 140,
    reorderAt: 40,
    supplier: "Textile Hub",
    unitCost: 8500,
  },
  {
    id: "pr3",
    name: "Spice gift box",
    sku: "SPC-02",
    stock: 7,
    reorderAt: 20,
    supplier: "Okello Farms",
    unitCost: 22000,
  },
  {
    id: "pr4",
    name: "Notebook A5",
    sku: "NTB-08",
    stock: 210,
    reorderAt: 50,
    supplier: "Coastal Supplies",
    unitCost: 4500,
  },
  {
    id: "pr5",
    name: "Cold brew concentrate",
    sku: "CBW-01",
    stock: 32,
    reorderAt: 30,
    supplier: "Kilimanjaro Roast",
    unitCost: 18000,
  },
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-441",
    supplier: "Coastal Supplies",
    items: "MUG-04 × 100",
    status: "Sent",
    total: 1200000,
    date: "19 Jul 2026",
  },
  {
    id: "PO-438",
    supplier: "Okello Farms",
    items: "SPC-02 × 80",
    status: "Draft",
    total: 1760000,
    date: "21 Jul 2026",
  },
  {
    id: "PO-430",
    supplier: "Textile Hub",
    items: "TOT-12 × 200",
    status: "Received",
    total: 1700000,
    date: "8 Jul 2026",
  },
];

export const team: Employee[] = [
  {
    id: "e1",
    name: "Demo User",
    role: "Owner",
    permissions: ["All"],
    lastActive: "Just now",
  },
  {
    id: "e2",
    name: "Lulu Bakari",
    role: "Finance",
    permissions: ["Invoices", "Payments", "Reports"],
    lastActive: "12 min ago",
  },
  {
    id: "e3",
    name: "Brian Owino",
    role: "Ops",
    permissions: ["Inventory", "POs", "Tasks"],
    lastActive: "1 hr ago",
  },
  {
    id: "e4",
    name: "Neema Lyimo",
    role: "Sales",
    permissions: ["CRM", "Quotes"],
    lastActive: "Yesterday",
  },
];

export const activityLog = [
  { time: "09:14", text: "Lulu marked INV-1042 paid" },
  { time: "08:52", text: "Brian drafted PO-438" },
  { time: "08:10", text: "Neema added note on Kimaro Retail" },
  { time: "Yesterday", text: "Stock alert: SPC-02 below reorder" },
  { time: "Yesterday", text: "Grace Mushi booked demo" },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Send overdue invoice reminders",
    owner: "Lulu Bakari",
    due: "Today",
    status: "Open",
    priority: "High",
  },
  {
    id: "t2",
    title: "Reorder spice gift boxes",
    owner: "Brian Owino",
    due: "Tomorrow",
    status: "Open",
    priority: "High",
  },
  {
    id: "t3",
    title: "Prepare Q3 revenue pack",
    owner: "Demo User",
    due: "28 Jul",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "t4",
    title: "Follow up Grace Mushi demo",
    owner: "Neema Lyimo",
    due: "24 Jul",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "t5",
    title: "Close May expense review",
    owner: "Lulu Bakari",
    due: "15 Jul",
    status: "Done",
    priority: "Low",
  },
];

export const approvals: Approval[] = [
  {
    id: "ap1",
    title: "PO-438 Okello Farms",
    requester: "Brian Owino",
    amount: 1760000,
    status: "Pending",
  },
  {
    id: "ap2",
    title: "Marketing spend July",
    requester: "Neema Lyimo",
    amount: 980000,
    status: "Pending",
  },
  {
    id: "ap3",
    title: "Refund INV-1020",
    requester: "Lulu Bakari",
    amount: 240000,
    status: "Approved",
  },
];

export const notifications = [
  { id: "n1", text: "4 invoices overdue > 30 days", urgent: true },
  { id: "n2", text: "SPC-02 stock critical", urgent: true },
  { id: "n3", text: "2 approvals waiting", urgent: false },
  { id: "n4", text: "Grace Mushi demo tomorrow 10:00", urgent: false },
];

export const revenueByWeek = [
  { label: "W1", value: 9.2 },
  { label: "W2", value: 11.4 },
  { label: "W3", value: 10.1 },
  { label: "W4", value: 17.5 },
];

export const revenuePrev = [
  { label: "W1", value: 8.4 },
  { label: "W2", value: 9.8 },
  { label: "W3", value: 12.2 },
  { label: "W4", value: 14.0 },
];

export function formatTzs(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

export function unpaidOver30() {
  return invoices.filter((i) => i.status === "Overdue" && i.daysOverdue > 30);
}

export const commandSuggestions = [
  "show unpaid invoices over 30 days",
  "show stock alerts",
  "show pending approvals",
  "go to customers",
  "go to finance",
];
