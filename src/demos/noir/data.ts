export const noirColors = {
  black: "#0A0A0A",
  nearBlack: "#111111",
  acid: "#FF2A2A",
  silver: "#C8C8C8",
  dim: "#6B6B6B",
  panel: "#161616",
} as const;

export const groteskStyle = {
  fontFamily:
    '"Helvetica Neue", Helvetica, Arial, "Arial Black", sans-serif',
  fontWeight: 900,
  letterSpacing: "-0.04em",
  textTransform: "uppercase" as const,
};

export type TicketTierId = "early-bird" | "general" | "vip";

export type TicketTier = {
  id: TicketTierId;
  name: string;
  price: number;
  perks: string[];
  remaining: number;
};

export type EventItem = {
  id: string;
  code: string;
  title: string;
  artist: string;
  dateLabel: string;
  dateISO: string;
  time: string;
  venue: string;
  city: string;
  poster: string;
  dressCode: string;
  age: string;
  vipAvailable: boolean;
  featured?: boolean;
  tiers: TicketTier[];
};

export type VipTable = {
  id: string;
  zone: "A" | "B" | "C";
  capacity: number;
  minSpend: number;
  status: "AVAILABLE" | "HELD" | "RESERVED";
  x: number;
  y: number;
  w: number;
  h: number;
};

export type GuestListEntry = {
  id: string;
  name: string;
  tier: string;
  checkedIn: boolean;
  table?: string;
};

export type TicketSale = {
  id: string;
  eventId: string;
  tier: string;
  guest: string;
  amount: number;
  time: string;
};

export const featuredEventId = "noir-025";

export const events: EventItem[] = [
  {
    id: "noir-025",
    code: "NOIR/025",
    title: "NOIR/025",
    artist: "DJ KAIRO + Special Guest",
    dateLabel: "SAT / 25 JUL",
    dateISO: "2026-07-25T22:00:00+03:00",
    time: "22:00: late",
    venue: "NOIR Warehouse",
    city: "Dar es Salaam",
    poster:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    dressCode: "All black. No logos. No exceptions.",
    age: "21+",
    vipAvailable: true,
    featured: true,
    tiers: [
      {
        id: "early-bird",
        name: "Early Bird",
        price: 25000,
        perks: ["Entry before 23:00", "One welcome drink"],
        remaining: 42,
      },
      {
        id: "general",
        name: "General",
        price: 40000,
        perks: ["Standard entry", "Cloakroom included"],
        remaining: 180,
      },
      {
        id: "vip",
        name: "VIP",
        price: 120000,
        perks: ["Fast lane", "VIP lounge access", "Bottle menu"],
        remaining: 28,
      },
    ],
  },
  {
    id: "noir-024",
    code: "NOIR/024",
    title: "NOIR/024: ARCHIVE",
    artist: "NIGHT SHIFT CREW",
    dateLabel: "SAT / 11 JUL",
    dateISO: "2026-07-11T22:00:00+03:00",
    time: "22:00: 04:00",
    venue: "NOIR Warehouse",
    city: "Dar es Salaam",
    poster:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    dressCode: "Black / silver accents",
    age: "21+",
    vipAvailable: false,
    tiers: [
      {
        id: "general",
        name: "General",
        price: 35000,
        perks: ["Entry"],
        remaining: 0,
      },
      {
        id: "vip",
        name: "VIP",
        price: 100000,
        perks: ["Lounge"],
        remaining: 0,
      },
      {
        id: "early-bird",
        name: "Early Bird",
        price: 20000,
        perks: ["Sold out"],
        remaining: 0,
      },
    ],
  },
  {
    id: "noir-026",
    code: "NOIR/026",
    title: "NOIR/026",
    artist: "AMINA LIVE + Resident DJs",
    dateLabel: "SAT / 08 AUG",
    dateISO: "2026-08-08T22:00:00+03:00",
    time: "22:00: late",
    venue: "NOIR Warehouse",
    city: "Dar es Salaam",
    poster:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    dressCode: "Monochrome only",
    age: "21+",
    vipAvailable: true,
    tiers: [
      {
        id: "early-bird",
        name: "Early Bird",
        price: 30000,
        perks: ["Early entry", "Welcome shot"],
        remaining: 96,
      },
      {
        id: "general",
        name: "General",
        price: 45000,
        perks: ["Standard entry"],
        remaining: 220,
      },
      {
        id: "vip",
        name: "VIP",
        price: 150000,
        perks: ["Booth priority", "Dedicated host"],
        remaining: 18,
      },
    ],
  },
];

/** Interactive floor plan tables: A07 is the signature demo target */
export const vipTables: VipTable[] = [
  { id: "A01", zone: "A", capacity: 4, minSpend: 500000, status: "RESERVED", x: 8, y: 12, w: 10, h: 10 },
  { id: "A02", zone: "A", capacity: 4, minSpend: 500000, status: "HELD", x: 22, y: 12, w: 10, h: 10 },
  { id: "A03", zone: "A", capacity: 6, minSpend: 750000, status: "AVAILABLE", x: 36, y: 12, w: 12, h: 10 },
  { id: "A04", zone: "A", capacity: 4, minSpend: 500000, status: "AVAILABLE", x: 52, y: 12, w: 10, h: 10 },
  { id: "A05", zone: "A", capacity: 6, minSpend: 750000, status: "RESERVED", x: 66, y: 12, w: 12, h: 10 },
  { id: "A06", zone: "A", capacity: 4, minSpend: 500000, status: "AVAILABLE", x: 82, y: 12, w: 10, h: 10 },
  { id: "A07", zone: "A", capacity: 6, minSpend: 750000, status: "AVAILABLE", x: 36, y: 28, w: 14, h: 12 },
  { id: "A08", zone: "A", capacity: 8, minSpend: 1000000, status: "AVAILABLE", x: 56, y: 28, w: 16, h: 12 },
  { id: "B01", zone: "B", capacity: 4, minSpend: 400000, status: "AVAILABLE", x: 8, y: 72, w: 10, h: 10 },
  { id: "B02", zone: "B", capacity: 4, minSpend: 400000, status: "RESERVED", x: 22, y: 72, w: 10, h: 10 },
  { id: "B03", zone: "B", capacity: 6, minSpend: 600000, status: "AVAILABLE", x: 72, y: 72, w: 12, h: 10 },
  { id: "C01", zone: "C", capacity: 10, minSpend: 1500000, status: "HELD", x: 40, y: 78, w: 20, h: 12 },
];

export const seedGuestList: GuestListEntry[] = [
  { id: "G-01", name: "Lina M.", tier: "VIP", checkedIn: true, table: "A01" },
  { id: "G-02", name: "Joseph K.", tier: "General", checkedIn: false },
  { id: "G-03", name: "Nadia R.", tier: "Early Bird", checkedIn: true },
  { id: "G-04", name: "VIP Party A05", tier: "VIP Table", checkedIn: false, table: "A05" },
  { id: "G-05", name: "Marco T.", tier: "General", checkedIn: false },
];

export const seedTicketSales: TicketSale[] = [
  { id: "TIX-901", eventId: "noir-025", tier: "Early Bird", guest: "Asha B.", amount: 25000, time: "14:22" },
  { id: "TIX-902", eventId: "noir-025", tier: "VIP", guest: "Chris O.", amount: 120000, time: "15:01" },
  { id: "TIX-903", eventId: "noir-025", tier: "General", guest: "Faith N.", amount: 40000, time: "16:44" },
  { id: "TIX-904", eventId: "noir-025", tier: "General", guest: "Ibrahim S.", amount: 40000, time: "17:12" },
];

export function formatTzs(amount: number) {
  return `TZS ${amount.toLocaleString("en-TZ")}`;
}

export function getFeaturedEvent() {
  return events.find((e) => e.id === featuredEventId) ?? events[0];
}

export const floorPlanZones = [
  {
    id: "booths-a",
    label: "VIP BOOTHS · ROW A",
    style: { left: "6%", top: "10%", width: "88%", height: "14%" },
  },
  {
    id: "booths-mid",
    label: "SIGNATURE BOOTHS",
    style: { left: "32%", top: "26%", width: "42%", height: "16%" },
  },
  {
    id: "booths-b",
    label: "VIP BOOTHS · ROW B",
    style: { left: "6%", top: "68%", width: "40%", height: "14%" },
  },
] as const;
