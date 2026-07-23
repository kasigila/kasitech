export const zuriColors = {
  sand: "#E8DDCB",
  earth: "#27251F",
  ocean: "#52777A",
  bone: "#F7F3EA",
} as const;

export const serifStyle = {
  fontFamily: 'Georgia, "Times New Roman", serif',
} as const;

export type RoomId = "ocean-villa" | "garden-residence" | "pool-suite";

export type Room = {
  id: RoomId;
  name: string;
  tagline: string;
  description: string;
  sqm: number;
  occupancy: number;
  bed: string;
  view: string;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  floorPlanNote: string;
  availableByDefault: boolean;
  units: number;
};

export type Addon = {
  id: string;
  name: string;
  description: string;
  price: number;
  per: "stay" | "person" | "night" | "session";
};

export type DayMoment = {
  id: string;
  time: string;
  title: string;
  blurb: string;
  detail: string;
  image: string;
};

export type ConciergeQA = {
  id: string;
  question: string;
  answer: string;
  actions: { label: string; target: "book" | "spa" | "transfer" | "day" | "eat" }[];
};

export type DemoBooking = {
  id: string;
  guest: string;
  roomId: RoomId;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "arriving" | "in-house" | "departed";
  total: number;
  addons: string[];
  /** Set when created from guest checkout; shown in business list */
  justNow?: boolean;
};

export type ItineraryItem = {
  time: string;
  title: string;
  note: string;
  highlighted?: boolean;
};

/** Personal day view after booking; reflects spa / transfer add-ons */
export function buildPersonalItinerary(selectedAddonIds: string[]): ItineraryItem[] {
  const hasSpa = selectedAddonIds.includes("spa");
  const hasTransfer = selectedAddonIds.includes("airport-transfer");
  const hasBreakfast = selectedAddonIds.includes("breakfast");
  const hasStoneTown = selectedAddonIds.includes("stone-town");
  const hasDinner = selectedAddonIds.includes("private-dinner");

  const items: ItineraryItem[] = [];

  if (hasTransfer) {
    items.push({
      time: "Arrival",
      title: "Private airport transfer",
      note: "Driver meets you landside at ZNZ with cool towels. About forty-five minutes to Zuri.",
      highlighted: true,
    });
  }

  for (const moment of dayMoments) {
    let note = moment.blurb;
    let highlighted = false;

    if (moment.id === "spa" && hasSpa) {
      note = "Your coastal spa ritual is reserved. Pavilion or in-villa, team confirms by SMS.";
      highlighted = true;
    } else if (moment.id === "breakfast" && hasBreakfast) {
      note = "Daily breakfast included on your terrace or at Ocean Terrace.";
      highlighted = true;
    } else if (moment.id === "stone-town" && hasStoneTown) {
      note = "Half-day Stone Town guide is on your stay. Concierge shares meet time tonight.";
      highlighted = true;
    } else if (moment.id === "dinner" && hasDinner) {
      note = "Private beach dinner is held for you. Menu and time confirmed before sunset.";
      highlighted = true;
    }

    items.push({
      time: moment.time,
      title: moment.title,
      note,
      highlighted,
    });
  }

  return items;
}

const conciergeKeywords: { keys: string[]; id: string }[] = [
  { keys: ["tomorrow", "today", "plan", "itinerary", "do"], id: "tomorrow" },
  { keys: ["massage", "spa", "ritual", "treatment"], id: "massage" },
  { keys: ["breakfast", "morning meal", "brunch"], id: "breakfast-time" },
  {
    keys: ["airport", "transfer", "transport", "flight", "pickup", "znz"],
    id: "airport",
  },
  { keys: ["book", "reserve", "room", "stay"], id: "tomorrow" },
];

/** Match free-text Ask Zuri questions to demo answers */
export function findConciergeByQuery(raw: string): ConciergeQA | null {
  const q = raw.trim().toLowerCase();
  if (!q) return null;

  const exact = conciergeQuestions.find(
    (c) => c.question.toLowerCase() === q,
  );
  if (exact) return exact;

  let best: ConciergeQA | null = null;
  let bestScore = 0;

  for (const entry of conciergeKeywords) {
    const template = conciergeQuestions.find((c) => c.id === entry.id);
    if (!template) continue;
    let score = 0;
    for (const key of entry.keys) {
      if (q.includes(key)) score += key.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = template;
    }
  }

  if (best) {
    return {
      ...best,
      question: raw.trim(),
    };
  }

  return {
    id: "custom",
    question: raw.trim(),
    answer:
      "I can help with your rhythm at Zuri, spa rituals, airport transfers, or starting a reservation. Try asking about tomorrow, a massage, breakfast times, or transport from the airport.",
    actions: [
      { label: "See Your Day", target: "day" },
      { label: "Start booking", target: "book" },
    ],
  };
}

export type GuestRequest = {
  id: string;
  guest: string;
  room: string;
  request: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in-progress" | "done";
};

export const navItems = [
  { id: "stay", label: "STAY" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "eat", label: "EAT" },
  { id: "zanzibar", label: "ZANZIBAR" },
  { id: "book", label: "BOOK" },
] as const;

export const rooms: Room[] = [
  {
    id: "ocean-villa",
    name: "Ocean Villa",
    tagline: "Where the tide sets the pace",
    description:
      "A freestanding villa on the coral fringe with a private deck that meets the Indian Ocean. Morning light arrives through teak shutters; evenings close with the sound of water.",
    sqm: 168,
    occupancy: 2,
    bed: "King canopy",
    view: "Direct ocean",
    pricePerNight: 890,
    amenities: [
      "Private plunge deck",
      "Outdoor rainfall shower",
      "Butler service",
      "Sunrise breakfast terrace",
      "Air conditioning",
      "Mini bar & espresso",
    ],
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlanNote: "Open living · sleeping loft · ocean deck · outdoor bath",
    availableByDefault: true,
    units: 4,
  },
  {
    id: "garden-residence",
    name: "Garden Residence",
    tagline: "Shade, spice, and stillness",
    description:
      "Set within a walled garden of frangipani and clove. Ideal for guests who want quiet mornings, dappled light, and a short walk to the beach path.",
    sqm: 142,
    occupancy: 3,
    bed: "King + daybed",
    view: "Tropical garden",
    pricePerNight: 640,
    amenities: [
      "Private garden courtyard",
      "Outdoor daybed",
      "Indoor-outdoor living",
      "Rainfall shower",
      "Air conditioning",
      "Yoga mat & kettle",
    ],
    images: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlanNote: "Courtyard entry · suite · garden bath · reading nook",
    availableByDefault: true,
    units: 6,
  },
  {
    id: "pool-suite",
    name: "Private Pool Suite",
    tagline: "Privacy without leaving the shore",
    description:
      "A suite with its own heated pool, shaded pavilion, and ocean horizon. Designed for longer stays, celebrations, and guests who rarely need the public areas.",
    sqm: 210,
    occupancy: 4,
    bed: "King + twin option",
    view: "Pool & ocean",
    pricePerNight: 1240,
    amenities: [
      "Private heated pool",
      "Pavilion dining",
      "Dedicated host",
      "In-suite spa setup",
      "Wine cellar selection",
      "Sunset loungers",
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlanNote: "Entry court · suite · pool pavilion · outdoor kitchenette",
    availableByDefault: true,
    units: 3,
  },
];

export const addons: Addon[] = [
  {
    id: "airport-transfer",
    name: "Airport transfer",
    description: "Private car from Abeid Amani Karume International, timed to your flight.",
    price: 95,
    per: "stay",
  },
  {
    id: "breakfast",
    name: "Daily breakfast",
    description: "Ocean-view breakfast with spice-island produce and fresh juice.",
    price: 48,
    per: "person",
  },
  {
    id: "spa",
    name: "Spa ritual",
    description: "Ninety-minute coastal massage with clove and coconut oils.",
    price: 160,
    per: "session",
  },
  {
    id: "stone-town",
    name: "Stone Town guide",
    description: "Half-day walking story of doors, spice markets, and the old fort.",
    price: 120,
    per: "stay",
  },
  {
    id: "snorkeling",
    name: "Reef snorkeling",
    description: "Morning boat to the house reef with masks, fins, and soft drinks.",
    price: 85,
    per: "person",
  },
  {
    id: "private-dinner",
    name: "Private beach dinner",
    description: "Table for two on the sand, chef menu, lanterns, and a slow evening.",
    price: 280,
    per: "stay",
  },
];

export const dayMoments: DayMoment[] = [
  {
    id: "sunrise",
    time: "06:14",
    title: "Sunrise Swim",
    blurb: "The water is still. The day has not decided anything yet.",
    detail:
      "Guests often begin here, barefoot on the coral sand, a short swim before anyone else wakes. Towels, and ginger tea wait on the deck.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "breakfast",
    time: "08:30",
    title: "Breakfast",
    blurb: "Fruit, spice, and the slow pour of coffee.",
    detail:
      "Served on the terrace or in your villa. Passion fruit, coconut pancakes, smoked fish, and Swahili chai. No rush; kitchens stay open until late morning.",
    image:
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "stone-town",
    time: "11:00",
    title: "Stone Town",
    blurb: "Doors, alleyways, and the scent of cloves.",
    detail:
      "A guided half-day through the UNESCO old town, carved doors, the House of Wonders façade, and a stop at the spice market before the heat peaks.",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "spa",
    time: "16:30",
    title: "Spa",
    blurb: "Cool stone floors and ocean air through the screens.",
    detail:
      "A coastal massage using local oils. Book the pavilion overlooking the garden or request an in-villa setup for complete privacy.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "sunset",
    time: "19:12",
    title: "Sunset",
    blurb: "Sky turns copper. Dhows cut the horizon.",
    detail:
      "Join the quiet deck ritual with a glass of something cold or take a short dhow sail as the light drops behind the mainland.",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "dinner",
    time: "21:00",
    title: "Dinner",
    blurb: "Lanterns, grilled catch, and conversation that stretches.",
    detail:
      "À la carte in the open dining room or a private table on the sand. Menus lean local, lobster, coconut rice, Zanzibar lime.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
  },
];

export const conciergeQuestions: ConciergeQA[] = [
  {
    id: "tomorrow",
    question: "What should I do tomorrow?",
    answer:
      "If the tide is kind, begin with a sunrise swim, then breakfast on your terrace. Mid-morning suits Stone Town before the heat; return for spa at 16:30 and watch sunset from the deck. We can reserve each piece for you.",
    actions: [
      { label: "See Your Day", target: "day" },
      { label: "Enhance stay", target: "book" },
    ],
  },
  {
    id: "massage",
    question: "Can I book a massage?",
    answer:
      "Yes. The coastal spa ritual runs ninety minutes and can be held in the pavilion or your villa. Prefer late afternoon, the light is softer, and the breeze arrives.",
    actions: [
      { label: "Add spa ritual", target: "spa" },
      { label: "Open booking", target: "book" },
    ],
  },
  {
    id: "breakfast-time",
    question: "When is breakfast?",
    answer:
      "Breakfast is served from 07:00 to 11:00 on the ocean terrace or anytime in-villa by request. Tell us dietary notes the evening before and the kitchen will adjust.",
    actions: [
      { label: "Add daily breakfast", target: "book" },
      { label: "Dining notes", target: "eat" },
    ],
  },
  {
    id: "airport",
    question: "Can you arrange airport transport?",
    answer:
      "Absolutely. Private transfer from Abeid Amani Karume takes about forty-five minutes depending on traffic. Share your flight number and we meet you landside with cool towels.",
    actions: [
      { label: "Add transfer", target: "transfer" },
      { label: "Start booking", target: "book" },
    ],
  },
];

export const experiences = [
  {
    title: "House reef morning",
    copy: "Snorkel the coral shelf before the wind rises. Soft corals, parrotfish, and clear shallows.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Spice farm walk",
    copy: "Clove, cinnamon, and vanilla under canopy shade, with tea at the farmhouse afterward.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Dhow at dusk",
    copy: "A quiet sail as the sky turns copper. Soft drinks, light bites, no itinerary.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
];

export const diningNotes = [
  {
    title: "Ocean Terrace",
    copy: "Breakfast and long lunches facing the water. Catch of the day, coconut rice, Zanzibar lime.",
  },
  {
    title: "Candle Pavilion",
    copy: "Dinner under a thatched roof. Tasting menus change with the market boats.",
  },
  {
    title: "Sand Table",
    copy: "Private beach dinners for two, or four. Lanterns, chef menu, your own stretch of shore.",
  },
];

export const zanzibarNotes = [
  {
    title: "Stone Town",
    copy: "UNESCO alleys, carved doors, and the old fort, best before midday heat.",
  },
  {
    title: "Tides & light",
    copy: "Low tide reveals tidal flats; high tide softens swimming. We share daily tide notes at reception.",
  },
  {
    title: "Getting here",
    copy: "Fly into Abeid Amani Karume (ZNZ). Private transfer is forty-five minutes to the property.",
  },
];

export const initialBookings: DemoBooking[] = [
  {
    id: "ZURI-BK-1842",
    guest: "Amira Hassan",
    roomId: "ocean-villa",
    checkIn: "2026-08-12",
    checkOut: "2026-08-17",
    guests: 2,
    status: "confirmed",
    total: 5120,
    addons: ["Airport transfer", "Daily breakfast", "Private beach dinner"],
  },
  {
    id: "ZURI-BK-1901",
    guest: "James & Lena Okello",
    roomId: "pool-suite",
    checkIn: "2026-08-14",
    checkOut: "2026-08-20",
    guests: 3,
    status: "arriving",
    total: 8940,
    addons: ["Airport transfer", "Spa ritual", "Reef snorkeling"],
  },
  {
    id: "ZURI-BK-1766",
    guest: "Sofia Mendes",
    roomId: "garden-residence",
    checkIn: "2026-08-08",
    checkOut: "2026-08-13",
    guests: 2,
    status: "in-house",
    total: 3680,
    addons: ["Daily breakfast", "Stone Town guide"],
  },
  {
    id: "ZURI-BK-1690",
    guest: "David Chen",
    roomId: "ocean-villa",
    checkIn: "2026-07-28",
    checkOut: "2026-08-02",
    guests: 2,
    status: "departed",
    total: 4450,
    addons: ["Airport transfer"],
  },
];

export const initialGuestRequests: GuestRequest[] = [
  {
    id: "req-1",
    guest: "Sofia Mendes",
    room: "Garden Residence 2",
    request: "Early breakfast tomorrow at 07:15 in villa, gluten-free toast.",
    priority: "medium",
    status: "open",
  },
  {
    id: "req-2",
    guest: "James Okello",
    room: "Private Pool Suite 1",
    request: "Arrange late checkout and a 16:30 spa for two.",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "req-3",
    guest: "Amira Hassan",
    room: "Ocean Villa 3",
    request: "Confirm private beach dinner on Aug 15, anniversary setup.",
    priority: "high",
    status: "open",
  },
];

export const revenueSnapshot = [
  { label: "Room nights", value: "$48,420", delta: "+12% vs last month" },
  { label: "Add-ons", value: "$9,860", delta: "+18% vs last month" },
  { label: "Avg. daily rate", value: "$812", delta: "+$44" },
  { label: "Occupancy", value: "78%", delta: "Next 14 days" },
];

export const contentBlocks = [
  {
    id: "hero",
    title: "Hero headline",
    body: "TIME MOVES DIFFERENTLY HERE.",
    status: "published" as const,
  },
  {
    id: "stay-intro",
    title: "Stay intro",
    body: "FIND YOUR SPACE. Three residences, one shoreline.",
    status: "published" as const,
  },
  {
    id: "day",
    title: "Your Day at Zuri",
    body: "A suggested rhythm, swim, eat, wander, restore.",
    status: "draft" as const,
  },
];

export const heroImage =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80";

export const coordinates = "6°09′S · 39°11′E · ZANZIBAR";
