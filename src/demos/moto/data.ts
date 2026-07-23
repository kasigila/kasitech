export const motoColors = {
  charcoal: "#1A1614",
  cream: "#F3EDE4",
  burnt: "#C45C26",
  deepRed: "#8B1E1E",
  smoke: "#2A2420",
  ash: "#8A7E74",
} as const;

export const condensedStyle = {
  fontFamily:
    '"Arial Narrow", "Helvetica Neue Condensed", "Franklin Gothic Condensed", Impact, sans-serif',
  fontWeight: 700,
  letterSpacing: "-0.02em",
} as const;

export type Dietary =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "halal";

export type Allergen =
  | "gluten"
  | "dairy"
  | "nuts"
  | "shellfish"
  | "egg"
  | "soy"
  | "sesame";

export type MenuCategoryId =
  | "small-plates"
  | "from-the-fire"
  | "seafood"
  | "mains"
  | "dessert"
  | "drinks";

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  price: number;
  dietary: Dietary[];
  allergens: Allergen[];
  spice: 0 | 1 | 2 | 3;
  image: string;
  soldOut?: boolean;
  popular?: boolean;
};

export type Reservation = {
  id: string;
  name: string;
  partySize: number;
  date: string;
  time: string;
  seating: "Indoor" | "Terrace" | "Chef's Counter";
  occasion: string;
  status: "confirmed" | "seated" | "cancelled";
};

export type OrderRecord = {
  id: string;
  type: "pickup" | "delivery";
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "preparing" | "ready" | "out" | "delivered";
  scheduledFor: string;
  address?: string;
};

export const categories: { id: MenuCategoryId; label: string }[] = [
  { id: "small-plates", label: "SMALL PLATES" },
  { id: "from-the-fire", label: "FROM THE FIRE" },
  { id: "seafood", label: "SEAFOOD" },
  { id: "mains", label: "MAINS" },
  { id: "dessert", label: "DESSERT" },
  { id: "drinks", label: "DRINKS" },
];

export const menuItems: MenuItem[] = [
  {
    id: "sp-ash-bread",
    category: "small-plates",
    name: "Ash Bread & Smoked Butter",
    description:
      "Wood-oven flatbread dusted in charcoal ash, whipped smoked butter, sea salt.",
    price: 12000,
    dietary: ["vegetarian"],
    allergens: ["gluten", "dairy"],
    spice: 0,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "sp-plantain",
    category: "small-plates",
    name: "Charred Plantain Chips",
    description:
      "Crisp plantain, peri peri dust, lime, fermented chilli mayo.",
    price: 10000,
    dietary: ["vegan", "gluten-free", "dairy-free"],
    allergens: [],
    spice: 2,
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sp-octopus",
    category: "small-plates",
    name: "Fire Octopus",
    description:
      "Charred tentacles, citrus oil, pickled onion, coriander ash.",
    price: 28000,
    dietary: ["gluten-free", "dairy-free", "halal"],
    allergens: ["shellfish"],
    spice: 1,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "sp-bone-marrow",
    category: "small-plates",
    name: "Roasted Bone Marrow",
    description:
      "Open-fire marrow bones, parsley salad, grilled sourdough soldiers.",
    price: 24000,
    dietary: [],
    allergens: ["gluten"],
    spice: 0,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ff-brisket",
    category: "from-the-fire",
    name: "12-Hour Brisket",
    description:
      "Low-and-slow oak smoke, black pepper bark, pickles, house sauce.",
    price: 42000,
    dietary: ["dairy-free", "halal"],
    allergens: [],
    spice: 1,
    image:
      "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "ff-ribs",
    category: "from-the-fire",
    name: "Sticky Pork Ribs",
    description:
      "Tamarind glaze, chilli heat, sesame crunch, grilled lime.",
    price: 38000,
    dietary: ["dairy-free"],
    allergens: ["sesame", "soy"],
    spice: 2,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ff-chicken",
    category: "from-the-fire",
    name: "Half Fire Chicken",
    description:
      "Spatchcock chicken, berbere rub, lemon thyme, dripping juices.",
    price: 34000,
    dietary: ["gluten-free", "dairy-free", "halal"],
    allergens: [],
    spice: 2,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "ff-lamb",
    category: "from-the-fire",
    name: "Lamb Shoulder Chop",
    description:
      "Coal-grilled chop, rosemary smoke, yoghurt, charred aubergine.",
    price: 46000,
    dietary: ["gluten-free", "halal"],
    allergens: ["dairy"],
    spice: 1,
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sf-prawns",
    category: "seafood",
    name: "Tiger Prawns al Fuego",
    description:
      "Head-on prawns, garlic chilli butter, smoked paprika, grilled bread.",
    price: 48000,
    dietary: [],
    allergens: ["shellfish", "dairy", "gluten"],
    spice: 2,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "sf-snapper",
    category: "seafood",
    name: "Whole Snapper",
    description:
      "Open-fire whole fish, coconut chilli relish, island greens.",
    price: 52000,
    dietary: ["gluten-free", "dairy-free", "halal"],
    allergens: [],
    spice: 2,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sf-oysters",
    category: "seafood",
    name: "Fire-Kissed Oysters",
    description:
      "Half-dozen, chilli oil, shallot vinegar, wood smoke finish.",
    price: 36000,
    dietary: ["gluten-free", "dairy-free"],
    allergens: ["shellfish"],
    spice: 1,
    image:
      "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mn-pilau",
    category: "mains",
    name: "Smoked Pilau",
    description:
      "Fire-smoked rice, slow goat, cardamom, fried onions, kachumbari.",
    price: 32000,
    dietary: ["dairy-free", "halal"],
    allergens: [],
    spice: 2,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mn-steak",
    category: "mains",
    name: "MOTO Ribeye",
    description:
      "400g dry-aged ribeye, bone marrow butter, fire greens, salt crust.",
    price: 68000,
    dietary: ["gluten-free"],
    allergens: ["dairy"],
    spice: 0,
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80",
    popular: true,
  },
  {
    id: "mn-veg",
    category: "mains",
    name: "Cauliflower Steak",
    description:
      "Charred cauliflower, tahini, pomegranate, toasted nuts, herb oil.",
    price: 28000,
    dietary: ["vegan", "dairy-free"],
    allergens: ["nuts", "sesame"],
    spice: 1,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ds-chocolate",
    category: "dessert",
    name: "Burnt Chocolate Tart",
    description:
      "Dark tart shell, smoked chocolate, sea salt, olive oil.",
    price: 18000,
    dietary: ["vegetarian"],
    allergens: ["gluten", "dairy", "egg"],
    spice: 0,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ds-pineapple",
    category: "dessert",
    name: "Flame Pineapple",
    description:
      "Caramelised pineapple, coconut ice cream, chilli sugar, mint.",
    price: 16000,
    dietary: ["vegetarian", "gluten-free"],
    allergens: ["dairy"],
    spice: 1,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "dr-negroni",
    category: "drinks",
    name: "Smoke Negroni",
    description: "Gin, Campari, vermouth, oak smoke, orange oil.",
    price: 18000,
    dietary: ["vegan", "gluten-free", "dairy-free"],
    allergens: [],
    spice: 0,
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "dr-ginger",
    category: "drinks",
    name: "Fire & Ginger",
    description:
      "Fresh ginger, chilli syrup, lime, soda: zero proof heat.",
    price: 9000,
    dietary: ["vegan", "gluten-free", "dairy-free"],
    allergens: [],
    spice: 3,
    image:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "dr-beer",
    category: "drinks",
    name: "Local Lager",
    description: "Ice-cold Tanzanian lager, perfect with smoke.",
    price: 8000,
    dietary: ["vegan", "dairy-free"],
    allergens: ["gluten"],
    spice: 0,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=900&q=80",
  },
];

export const heroImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80";

export const seatingOptions = ["Indoor", "Terrace", "Chef's Counter"] as const;

export const occasions = [
  "Just dining",
  "Date night",
  "Birthday",
  "Business",
  "Celebration",
] as const;

export const timeSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
] as const;

export const seedReservations: Reservation[] = [
  {
    id: "RSV-1042",
    name: "Amina Juma",
    partySize: 4,
    date: "2026-07-23",
    time: "19:00",
    seating: "Terrace",
    occasion: "Birthday",
    status: "confirmed",
  },
  {
    id: "RSV-1043",
    name: "Daniel Okello",
    partySize: 2,
    date: "2026-07-23",
    time: "20:00",
    seating: "Chef's Counter",
    occasion: "Date night",
    status: "confirmed",
  },
  {
    id: "RSV-1044",
    name: "Sarah Mwangi",
    partySize: 6,
    date: "2026-07-24",
    time: "19:30",
    seating: "Indoor",
    occasion: "Business",
    status: "confirmed",
  },
];

export const seedOrders: OrderRecord[] = [
  {
    id: "ORD-8821",
    type: "pickup",
    items: [
      { name: "12-Hour Brisket", qty: 1, price: 42000 },
      { name: "Ash Bread & Smoked Butter", qty: 2, price: 12000 },
    ],
    total: 66000,
    status: "preparing",
    scheduledFor: "Today 19:15",
  },
  {
    id: "ORD-8822",
    type: "delivery",
    items: [
      { name: "Tiger Prawns al Fuego", qty: 1, price: 48000 },
      { name: "Flame Pineapple", qty: 1, price: 16000 },
    ],
    total: 64000,
    status: "out",
    scheduledFor: "Today 20:00",
    address: "Masaki, Oyster Bay Rd",
  },
  {
    id: "ORD-8820",
    type: "pickup",
    items: [{ name: "Half Fire Chicken", qty: 2, price: 34000 }],
    total: 68000,
    status: "ready",
    scheduledFor: "Today 18:45",
  },
];

export function formatTzs(amount: number) {
  return `TZS ${amount.toLocaleString("en-TZ")}`;
}

export function spiceLabel(level: 0 | 1 | 2 | 3) {
  if (level === 0) return "Mild";
  if (level === 1) return "Warm";
  if (level === 2) return "Hot";
  return "Fire";
}
