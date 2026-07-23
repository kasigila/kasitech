export type LocationId =
  | "Masaki"
  | "Oyster Bay"
  | "Upanga"
  | "Mikocheni"
  | "Mbezi Beach"
  | "Kigamboni";

export type PropertyType = "Apartment" | "Villa" | "Townhouse" | "Penthouse";

export type Listing = {
  id: string;
  title: string;
  location: LocationId;
  type: PropertyType;
  mode: "buy" | "rent";
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  images: string[];
  amenities: string[];
  neighborhood: string;
  agentId: string;
  description: string;
  floorPlanNote: string;
  mapX: number;
  mapY: number;
  featured?: boolean;
  compareTag?: string;
};

export type DayStripLabel = "Commute" | "Brunch" | "Beach" | "School run";

export type DayStripItem = {
  label: DayStripLabel;
  time: string;
  placeName: string;
  travelMin: number;
};

export type Agent = {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  listings: number;
};

export type PlaceCategory =
  | "Dining"
  | "Schools"
  | "Fitness"
  | "Shopping"
  | "Beach"
  | "Transport";

export type NeighborhoodPlace = {
  id: string;
  name: string;
  category: PlaceCategory;
  location: LocationId;
  travelMin: number;
  mapX: number;
  mapY: number;
};

export type Lead = {
  id: string;
  name: string;
  interest: string;
  status: "New" | "Contacted" | "Viewing" | "Offer";
  agent: string;
  date: string;
};

export type ViewingRow = {
  id: string;
  property: string;
  client: string;
  when: string;
  type: "In-person" | "Virtual";
  agent: string;
};

export const locations: LocationId[] = [
  "Masaki",
  "Oyster Bay",
  "Upanga",
  "Mikocheni",
  "Mbezi Beach",
  "Kigamboni",
];

export const propertyTypes: PropertyType[] = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
];

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Diana Mushi",
    phone: "+255 754 880 221",
    email: "diana@nest.demo",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    listings: 18,
  },
  {
    id: "a2",
    name: "James Kimaro",
    phone: "+255 713 442 009",
    email: "james@nest.demo",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    listings: 24,
  },
  {
    id: "a3",
    name: "Asha Ally",
    phone: "+255 768 115 334",
    email: "asha@nest.demo",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    listings: 11,
  },
];

export const listings: Listing[] = [
  {
    id: "masaki-harbour-apt",
    title: "Harbour View Apartment",
    location: "Masaki",
    type: "Apartment",
    mode: "rent",
    price: 2800000,
    beds: 3,
    baths: 2,
    sqm: 165,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Pool", "Generator", "Security 24/7", "Parking", "Sea glimpse"],
    neighborhood:
      "Quiet Masaki lane near diplomatic residences. Walk to brunch spots on Haile Selassie.",
    agentId: "a1",
    description:
      "Light-filled third-floor apartment with wraparound balcony and open kitchen. Freshly painted, fitted wardrobes, and a quiet courtyard pool.",
    floorPlanNote: "Open-plan living · Master with en-suite · Utility balcony",
    mapX: 62,
    mapY: 38,
    featured: true,
    compareTag: "Best for WFH",
  },
  {
    id: "oyster-garden-villa",
    title: "Garden Court Villa",
    location: "Oyster Bay",
    type: "Villa",
    mode: "buy",
    price: 850000000,
    beds: 5,
    baths: 4,
    sqm: 420,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Private garden", "Staff quarters", "Borehole", "Solar", "Garage"],
    neighborhood:
      "Tree-lined Oyster Bay: minutes to the beach club and Indian Ocean breeze.",
    agentId: "a2",
    description:
      "Colonial-inspired villa on a walled plot with mature mango trees. High ceilings, teak floors, and a covered outdoor dining terrace.",
    floorPlanNote: "Two wings · Separate guest suite · Rooftop lounge",
    mapX: 72,
    mapY: 48,
    featured: true,
    compareTag: "Best for family",
  },
  {
    id: "upanga-loft",
    title: "City Loft Residence",
    location: "Upanga",
    type: "Apartment",
    mode: "rent",
    price: 1600000,
    beds: 2,
    baths: 2,
    sqm: 110,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Elevator", "Backup power", "Fiber ready", "Concierge"],
    neighborhood:
      "Central Upanga: easy reach to CBD, hospitals, and evening cafés.",
    agentId: "a3",
    description:
      "Modern loft with double-height windows and a flexible mezzanine office. Ideal for professionals who want city energy without the commute.",
    floorPlanNote: "Open loft · Mezzanine desk · Compact kitchen island",
    mapX: 48,
    mapY: 55,
    compareTag: "Best for WFH",
  },
  {
    id: "mikocheni-townhouse",
    title: "Palm Grove Townhouse",
    location: "Mikocheni",
    type: "Townhouse",
    mode: "buy",
    price: 420000000,
    beds: 4,
    baths: 3,
    sqm: 280,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Shared pool", "Gym", "Gated", "Playground", "Parking x2"],
    neighborhood:
      "Family-friendly Mikocheni with schools and weekend markets nearby.",
    agentId: "a1",
    description:
      "End-unit townhouse with private patio and upstairs family lounge. Community amenities kept immaculate.",
    floorPlanNote: "3 levels · Patio BBQ · Laundry on ground floor",
    mapX: 40,
    mapY: 32,
    compareTag: "Best for family",
  },
  {
    id: "mbezi-cliff-home",
    title: "Cliffside Residence",
    location: "Mbezi Beach",
    type: "Villa",
    mode: "buy",
    price: 620000000,
    beds: 4,
    baths: 4,
    sqm: 350,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Ocean view", "Infinity pool", "Smart home", "Generator"],
    neighborhood:
      "Elevated Mbezi Beach plots with sunset views over the Indian Ocean.",
    agentId: "a2",
    description:
      "Contemporary cliffside home with floor-to-ceiling glass and an infinity edge that meets the horizon. Turnkey furnished option available.",
    floorPlanNote: "Split-level living · Cinema room · Rooftop deck",
    mapX: 28,
    mapY: 22,
    featured: true,
    compareTag: "Best for beach life",
  },
  {
    id: "kigamboni-cottage",
    title: "Ferry Point Cottage",
    location: "Kigamboni",
    type: "Villa",
    mode: "rent",
    price: 950000,
    beds: 3,
    baths: 2,
    sqm: 140,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Garden", "Water tank", "Quiet road", "Near ferry"],
    neighborhood:
      "Kigamboni calm: morning ferry to CBD, evenings by the shoreline.",
    agentId: "a3",
    description:
      "Charming cottage on a leafy plot. Perfect weekend escape or full-time home for those who prefer space over skyline.",
    floorPlanNote: "Single storey · Covered veranda · Outdoor kitchen",
    mapX: 78,
    mapY: 72,
  },
  {
    id: "masaki-penthouse",
    title: "Skyline Penthouse",
    location: "Masaki",
    type: "Penthouse",
    mode: "buy",
    price: 980000000,
    beds: 4,
    baths: 3,
    sqm: 310,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Private lift", "Terrace", "Wine room", "Concierge", "Gym"],
    neighborhood:
      "Masaki high-rise living with restaurants and embassies downstairs.",
    agentId: "a2",
    description:
      "Full-floor penthouse with 270° terrace. Italian stone kitchen, smart climate, and a private elevator lobby.",
    floorPlanNote: "Open living · Two master suites · Outdoor kitchen terrace",
    mapX: 58,
    mapY: 42,
  },
  {
    id: "oyster-studio",
    title: "Bay Studio Suite",
    location: "Oyster Bay",
    type: "Apartment",
    mode: "rent",
    price: 1100000,
    beds: 1,
    baths: 1,
    sqm: 68,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Furnished", "AC", "Pool access", "Secure parking"],
    neighborhood:
      "Steps from Oyster Bay beach road: coffee, ocean air, short Uber rides.",
    agentId: "a1",
    description:
      "Furnished studio with sea-breeze balcony. Ideal for diplomats on short assignment or remote workers.",
    floorPlanNote: "Studio + alcove · Built-in desk · Juliet balcony",
    mapX: 68,
    mapY: 52,
  },
  {
    id: "upanga-family",
    title: "Courtyard Family Flat",
    location: "Upanga",
    type: "Apartment",
    mode: "buy",
    price: 310000000,
    beds: 3,
    baths: 2,
    sqm: 145,
    images: [
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Courtyard", "Water backup", "Near schools", "Parking"],
    neighborhood:
      "Established Upanga block with multi-generational families and quiet evenings.",
    agentId: "a3",
    description:
      "Spacious flat overlooking a shared courtyard. Solid bones, recent kitchen remodel, ready to move.",
    floorPlanNote: "Classic layout · Separate dining · Store room",
    mapX: 45,
    mapY: 58,
  },
  {
    id: "mikocheni-apt",
    title: "Green Lane Apartment",
    location: "Mikocheni",
    type: "Apartment",
    mode: "rent",
    price: 1350000,
    beds: 2,
    baths: 2,
    sqm: 95,
    images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Balcony", "Generator", "CCTV", "Visitor parking"],
    neighborhood:
      "Leafy Mikocheni B: weekend markets and school runs made simple.",
    agentId: "a1",
    description:
      "Bright two-bed with cross-ventilation and a deep balcony for evening chai.",
    floorPlanNote: "Open kitchen · Two balconies · Laundry niche",
    mapX: 36,
    mapY: 36,
  },
];

export const neighborhoodPlaces: NeighborhoodPlace[] = [
  {
    id: "p1",
    name: "Coco Beach Club",
    category: "Beach",
    location: "Oyster Bay",
    travelMin: 8,
    mapX: 74,
    mapY: 55,
  },
  {
    id: "p2",
    name: "Slipway Dining",
    category: "Dining",
    location: "Masaki",
    travelMin: 6,
    mapX: 64,
    mapY: 44,
  },
  {
    id: "p3",
    name: "International School",
    category: "Schools",
    location: "Masaki",
    travelMin: 12,
    mapX: 55,
    mapY: 35,
  },
  {
    id: "p4",
    name: "Mikocheni Primary",
    category: "Schools",
    location: "Mikocheni",
    travelMin: 5,
    mapX: 38,
    mapY: 30,
  },
  {
    id: "p5",
    name: "Bay Fitness Club",
    category: "Fitness",
    location: "Oyster Bay",
    travelMin: 10,
    mapX: 70,
    mapY: 46,
  },
  {
    id: "p6",
    name: "Mlimani City",
    category: "Shopping",
    location: "Upanga",
    travelMin: 18,
    mapX: 42,
    mapY: 62,
  },
  {
    id: "p7",
    name: "Airtel House Stop",
    category: "Transport",
    location: "Upanga",
    travelMin: 4,
    mapX: 50,
    mapY: 52,
  },
  {
    id: "p8",
    name: "Kigamboni Ferry",
    category: "Transport",
    location: "Kigamboni",
    travelMin: 15,
    mapX: 82,
    mapY: 68,
  },
  {
    id: "p9",
    name: "Sea Cliff Mall",
    category: "Shopping",
    location: "Masaki",
    travelMin: 9,
    mapX: 60,
    mapY: 40,
  },
  {
    id: "p10",
    name: "Mbezi Sunrise Beach",
    category: "Beach",
    location: "Mbezi Beach",
    travelMin: 7,
    mapX: 25,
    mapY: 25,
  },
  {
    id: "p11",
    name: "The Deck Restaurant",
    category: "Dining",
    location: "Mbezi Beach",
    travelMin: 11,
    mapX: 30,
    mapY: 28,
  },
  {
    id: "p12",
    name: "Pulse Gym Mikocheni",
    category: "Fitness",
    location: "Mikocheni",
    travelMin: 8,
    mapX: 42,
    mapY: 34,
  },
];

export const placeCategories: PlaceCategory[] = [
  "Dining",
  "Schools",
  "Fitness",
  "Shopping",
  "Beach",
  "Transport",
];

export const businessLeads: Lead[] = [
  {
    id: "L-221",
    name: "Robert & Anna",
    interest: "Garden Court Villa",
    status: "Viewing",
    agent: "James Kimaro",
    date: "22 Jul",
  },
  {
    id: "L-218",
    name: "Fatma Said",
    interest: "Harbour View Apt",
    status: "New",
    agent: "Diana Mushi",
    date: "22 Jul",
  },
  {
    id: "L-214",
    name: "Erik Holm",
    interest: "Skyline Penthouse",
    status: "Offer",
    agent: "James Kimaro",
    date: "21 Jul",
  },
  {
    id: "L-209",
    name: "Joyce M.",
    interest: "Palm Grove TH",
    status: "Contacted",
    agent: "Diana Mushi",
    date: "20 Jul",
  },
];

export const businessViewings: ViewingRow[] = [
  {
    id: "V-88",
    property: "Harbour View",
    client: "Fatma Said",
    when: "Thu 10:00",
    type: "In-person",
    agent: "Diana",
  },
  {
    id: "V-87",
    property: "Cliffside Res.",
    client: "Carlos N.",
    when: "Thu 14:30",
    type: "Virtual",
    agent: "James",
  },
  {
    id: "V-86",
    property: "Garden Court",
    client: "Robert & Anna",
    when: "Fri 09:00",
    type: "In-person",
    agent: "James",
  },
];

export const performance = {
  listingsActive: 48,
  leadsThisWeek: 23,
  viewingsBooked: 17,
  avgDaysOnMarket: 28,
  conversion: "12%",
};

export const viewingSlots = [
  "09:00",
  "10:30",
  "12:00",
  "14:00",
  "15:30",
  "17:00",
];

export function formatPrice(n: number, mode: "buy" | "rent") {
  const formatted = `TZS ${n.toLocaleString("en-TZ")}`;
  return mode === "rent" ? `${formatted} / mo` : formatted;
}

export function getListing(id: string) {
  return listings.find((l) => l.id === id);
}

export function getAgent(id: string) {
  return agents.find((a) => a.id === id);
}

const dayStripSlots: Record<
  DayStripLabel,
  { time: string; category: PlaceCategory }
> = {
  Commute: { time: "07:30", category: "Transport" },
  Brunch: { time: "10:30", category: "Dining" },
  Beach: { time: "16:00", category: "Beach" },
  "School run": { time: "07:45", category: "Schools" },
};

/** Demo Tuesday rhythm for a neighborhood, built from nearby places. */
export function getTuesdayDayStrip(
  location: LocationId | "All",
): DayStripItem[] {
  const loc = location === "All" ? ("Masaki" as LocationId) : location;
  return (Object.keys(dayStripSlots) as DayStripLabel[]).map((label) => {
    const { time, category } = dayStripSlots[label];
    const match =
      neighborhoodPlaces.find(
        (p) => p.location === loc && p.category === category,
      ) ??
      neighborhoodPlaces.find((p) => p.category === category) ??
      neighborhoodPlaces[0];
    return {
      label,
      time,
      placeName: match.name,
      travelMin: match.travelMin,
    };
  });
}

export function buildViewingWhatsAppMessage(input: {
  listingTitle: string;
  date: string;
  time: string;
  type: string;
  confirmId: string;
  agentName: string;
}): string {
  return `Hi ${input.agentName}, I booked a viewing on NEST (demo).\n\nProperty: ${input.listingTitle}\nWhen: ${input.date} at ${input.time}\nType: ${input.type}\nConfirmation: ${input.confirmId}\n\nPlease confirm if this slot still works. Thank you.`;
}

export const demoAgentWhatsApp = "255754880221";

/** Simple payment estimator for buy (mortgage-ish) or rent affordability. */
export function estimatePayment(input: {
  price: number;
  mode: "buy" | "rent";
  downPct: number;
  years: number;
  rate: number;
}): { monthly: number; note: string } {
  if (input.mode === "rent") {
    return {
      monthly: input.price,
      note: "Monthly rent as listed. Budget ~3× income for approval demos.",
    };
  }
  const principal = input.price * (1 - input.downPct / 100);
  const r = input.rate / 100 / 12;
  const n = input.years * 12;
  const monthly =
    r === 0
      ? principal / n
      : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return {
    monthly: Math.round(monthly),
    note: `${input.downPct}% down · ${input.years} yrs · ${input.rate}% demo rate`,
  };
}
