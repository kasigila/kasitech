export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  name: string;
  category: "Dresses" | "Tops" | "Bottoms" | "Outerwear" | "Accessories";
  price: number;
  colors: ProductColor[];
  sizes: string[];
  stock: Record<string, number>;
  images: string[];
  description: string;
  fabric: string;
  available: boolean;
  related: string[];
  lookId?: string;
};

export type LookPiece = {
  productId: string;
  role: string;
};

export type CampaignLook = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  pieces: LookPiece[];
};

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Returned";

export type DemoOrder = {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: string[];
  tracking?: string;
};

export type Address = {
  id: string;
  label: string;
  line: string;
  city: string;
  phone: string;
};

export type BusinessOrder = {
  id: string;
  customer: string;
  total: number;
  status: OrderStatus;
  channel: string;
  date: string;
};

export type InventoryRow = {
  sku: string;
  product: string;
  size: string;
  color: string;
  stock: number;
  reserved: number;
};

export type CustomerRow = {
  id: string;
  name: string;
  orders: number;
  spent: number;
  lastActive: string;
};

export type AbandonedCart = {
  id: string;
  email: string;
  value: number;
  items: number;
  abandonedAt: string;
};

export const categories = [
  "All",
  "Dresses",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
] as const;

export const allSizes = ["XS", "S", "M", "L", "XL"] as const;

export const products: Product[] = [
  {
    id: "linen-column-dress",
    name: "Linen Column Dress",
    category: "Dresses",
    price: 285000,
    colors: [
      { name: "Bone", hex: "#E8E2D6" },
      { name: "Ink", hex: "#1A1A1A" },
      { name: "Clay", hex: "#C4A484" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 8, M: 12, L: 6, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A floor-grazing column in washed linen with a clean boat neck and invisible side zip. Moves with coastal heat.",
    fabric: "100% washed linen · Made in Dar",
    available: true,
    related: ["silk-slip-cami", "structured-blazer", "woven-tote"],
    lookId: "look-between-worlds",
  },
  {
    id: "silk-slip-cami",
    name: "Silk Slip Cami",
    category: "Tops",
    price: 145000,
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Champagne", hex: "#D4C4A8" },
      { name: "Black", hex: "#0D0D0D" },
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: { XS: 5, S: 10, M: 9, L: 4 },
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Bias-cut silk cami with adjustable straps. Layer under the blazer or wear alone for evening.",
    fabric: "Mulberry silk · Dry clean",
    available: true,
    related: ["linen-column-dress", "wide-leg-trouser", "gold-hoop"],
    lookId: "look-between-worlds",
  },
  {
    id: "wide-leg-trouser",
    name: "Wide-Leg Trouser",
    category: "Bottoms",
    price: 195000,
    colors: [
      { name: "Sand", hex: "#C8B89A" },
      { name: "Olive", hex: "#5C6B4A" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 2, S: 7, M: 11, L: 8, XL: 3 },
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "High-rise wide leg with a pressed crease and concealed hook closure. Tailored for tropical humidity.",
    fabric: "Tropical wool blend",
    available: true,
    related: ["silk-slip-cami", "structured-blazer", "leather-mule"],
    lookId: "look-between-worlds",
  },
  {
    id: "structured-blazer",
    name: "Structured Blazer",
    category: "Outerwear",
    price: 420000,
    colors: [
      { name: "Ivory", hex: "#F0EBE3" },
      { name: "Charcoal", hex: "#3A3A3A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 4, M: 6, L: 5, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Single-breasted blazer with soft shoulder and raw-edge lining. The piece that finishes every look.",
    fabric: "Italian cotton blend",
    available: true,
    related: ["wide-leg-trouser", "silk-slip-cami", "woven-tote"],
    lookId: "look-between-worlds",
  },
  {
    id: "knit-polo",
    name: "Fine Knit Polo",
    category: "Tops",
    price: 165000,
    colors: [
      { name: "White", hex: "#FAFAFA" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Rust", hex: "#A0522D" },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 6, M: 9, L: 7, XL: 4 },
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Fine-gauge polo with mother-of-pearl buttons. Weekend polish without the heat.",
    fabric: "Merino-cotton knit",
    available: true,
    related: ["wide-leg-trouser", "leather-mule", "gold-hoop"],
  },
  {
    id: "midi-wrap-skirt",
    name: "Midi Wrap Skirt",
    category: "Bottoms",
    price: 175000,
    colors: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Terracotta", hex: "#B85C38" },
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: { XS: 4, S: 8, M: 5, L: 3 },
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Asymmetric wrap midi with a soft drape. Ties at the waist for adjustable fit.",
    fabric: "Cupro satin",
    available: true,
    related: ["silk-slip-cami", "knit-polo", "gold-hoop"],
  },
  {
    id: "woven-tote",
    name: "Woven Raffia Tote",
    category: "Accessories",
    price: 98000,
    colors: [{ name: "Natural", hex: "#D4C5A9" }],
    sizes: ["One Size"],
    stock: { "One Size": 15 },
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Handwoven raffia tote with leather handles and a detachable cotton pouch.",
    fabric: "Raffia · Leather trim",
    available: true,
    related: ["linen-column-dress", "leather-mule", "midi-wrap-skirt"],
  },
  {
    id: "leather-mule",
    name: "Leather Mule",
    category: "Accessories",
    price: 220000,
    colors: [
      { name: "Cognac", hex: "#8B5A2B" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    stock: { "36": 2, "37": 5, "38": 8, "39": 6, "40": 4, "41": 2 },
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Squared-toe mule in vegetable-tanned leather. Soft sole for city walking.",
    fabric: "Full-grain leather",
    available: true,
    related: ["wide-leg-trouser", "linen-column-dress", "woven-tote"],
  },
  {
    id: "gold-hoop",
    name: "Sculpted Gold Hoop",
    category: "Accessories",
    price: 65000,
    colors: [{ name: "Gold", hex: "#C9A227" }],
    sizes: ["One Size"],
    stock: { "One Size": 22 },
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Chunky sculpted hoop in gold-plated brass. Lightweight enough for all-day wear.",
    fabric: "Gold-plated brass",
    available: true,
    related: ["silk-slip-cami", "linen-column-dress", "knit-polo"],
  },
  {
    id: "cropped-trench",
    name: "Cropped Trench",
    category: "Outerwear",
    price: 380000,
    colors: [
      { name: "Stone", hex: "#B8A99A" },
      { name: "Black", hex: "#121212" },
    ],
    sizes: ["S", "M", "L"],
    stock: { S: 0, M: 3, L: 2 },
    images: [
      "https://images.unsplash.com/photo-1548625361-1adcab316530?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Cropped trench with storm flap and horn buttons. Rain-ready for Dar evenings.",
    fabric: "Water-resistant cotton",
    available: true,
    related: ["midi-wrap-skirt", "leather-mule", "knit-polo"],
  },
  {
    id: "ribbed-tank",
    name: "Ribbed Tank",
    category: "Tops",
    price: 78000,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Sage", hex: "#9CAF88" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 8, S: 14, M: 16, L: 10, XL: 5 },
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Everyday ribbed tank with a clean neckline. The foundation piece under everything.",
    fabric: "Organic cotton rib",
    available: true,
    related: ["wide-leg-trouser", "midi-wrap-skirt", "cropped-trench"],
  },
  {
    id: "evening-slip",
    name: "Evening Slip Dress",
    category: "Dresses",
    price: 340000,
    colors: [
      { name: "Midnight", hex: "#0C1445" },
      { name: "Wine", hex: "#5C1A1A" },
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: { XS: 1, S: 3, M: 4, L: 2 },
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Bias slip with a low back and subtle shimmer. For dinners that start late.",
    fabric: "Liquid satin",
    available: false,
    related: ["gold-hoop", "leather-mule", "structured-blazer"],
  },
];

export const campaignLook: CampaignLook = {
  id: "look-between-worlds",
  title: "BETWEEN WORLDS",
  subtitle: "Collection 02 · Four pieces, one evening",
  image:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80",
  pieces: [
    { productId: "silk-slip-cami", role: "Base" },
    { productId: "wide-leg-trouser", role: "Trouser" },
    { productId: "structured-blazer", role: "Layer" },
    { productId: "leather-mule", role: "Shoe" },
  ],
};

export const heroImage =
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=2000&q=80";

export const sizeGuide = {
  titles: ["Size", "Bust (cm)", "Waist (cm)", "Hip (cm)"],
  rows: [
    ["XS", "80-84", "62-66", "86-90"],
    ["S", "84-88", "66-70", "90-94"],
    ["M", "88-94", "70-76", "94-100"],
    ["L", "94-100", "76-82", "100-106"],
    ["XL", "100-106", "82-88", "106-112"],
  ],
};

export const accountOrders: DemoOrder[] = [
  {
    id: "SK-4821",
    date: "12 Jul 2026",
    total: 430000,
    status: "Delivered",
    items: ["Linen Column Dress", "Gold Hoop"],
    tracking: "TZ-DEL-9921",
  },
  {
    id: "SK-4790",
    date: "2 Jul 2026",
    total: 615000,
    status: "Shipped",
    items: ["Structured Blazer", "Silk Slip Cami"],
    tracking: "TZ-EXP-4410",
  },
  {
    id: "SK-4702",
    date: "18 Jun 2026",
    total: 195000,
    status: "Returned",
    items: ["Wide-Leg Trouser"],
  },
];

export const wishlistIds = ["evening-slip", "cropped-trench", "woven-tote"];

export const addresses: Address[] = [
  {
    id: "a1",
    label: "Home",
    line: "14 Ocean Road, Masaki",
    city: "Dar es Salaam",
    phone: "+255 754 221 890",
  },
  {
    id: "a2",
    label: "Office",
    line: "Floor 6, IT Plaza, Upanga",
    city: "Dar es Salaam",
    phone: "+255 713 440 112",
  },
];

export const rewards = {
  points: 1840,
  tier: "Silver",
  nextTier: "Gold at 2,500 points",
  perks: ["Free same-day Dar delivery", "Early access to drops", "Size hold 48h"],
};

export const businessOrders: BusinessOrder[] = [
  {
    id: "SK-4829",
    customer: "Amina J.",
    total: 505000,
    status: "Processing",
    channel: "M-Pesa",
    date: "22 Jul",
  },
  {
    id: "SK-4828",
    customer: "Grace M.",
    total: 285000,
    status: "Shipped",
    channel: "Card",
    date: "22 Jul",
  },
  {
    id: "SK-4825",
    customer: "Fatma K.",
    total: 763000,
    status: "Delivered",
    channel: "Airtel Money",
    date: "21 Jul",
  },
  {
    id: "SK-4821",
    customer: "Neema R.",
    total: 430000,
    status: "Delivered",
    channel: "M-Pesa",
    date: "20 Jul",
  },
  {
    id: "SK-4818",
    customer: "Sofia L.",
    total: 220000,
    status: "Processing",
    channel: "Card",
    date: "20 Jul",
  },
];

export const inventory: InventoryRow[] = [
  {
    sku: "LCD-M-BONE",
    product: "Linen Column Dress",
    size: "M",
    color: "Bone",
    stock: 12,
    reserved: 2,
  },
  {
    sku: "SB-M-IVORY",
    product: "Structured Blazer",
    size: "M",
    color: "Ivory",
    stock: 6,
    reserved: 1,
  },
  {
    sku: "WLT-OS",
    product: "Woven Raffia Tote",
    size: "OS",
    color: "Natural",
    stock: 15,
    reserved: 0,
  },
  {
    sku: "CT-S-STONE",
    product: "Cropped Trench",
    size: "S",
    color: "Stone",
    stock: 0,
    reserved: 0,
  },
  {
    sku: "ES-S-MID",
    product: "Evening Slip Dress",
    size: "S",
    color: "Midnight",
    stock: 3,
    reserved: 1,
  },
];

export const customers: CustomerRow[] = [
  {
    id: "c1",
    name: "Amina Juma",
    orders: 7,
    spent: 2140000,
    lastActive: "Today",
  },
  {
    id: "c2",
    name: "Grace Mwamba",
    orders: 4,
    spent: 980000,
    lastActive: "Yesterday",
  },
  {
    id: "c3",
    name: "Fatma Kassimu",
    orders: 12,
    spent: 4510000,
    lastActive: "2 days ago",
  },
  {
    id: "c4",
    name: "Neema Rweyemamu",
    orders: 3,
    spent: 720000,
    lastActive: "5 days ago",
  },
];

export const abandonedCarts: AbandonedCart[] = [
  {
    id: "ab1",
    email: "zara@…",
    value: 565000,
    items: 2,
    abandonedAt: "2h ago",
  },
  {
    id: "ab2",
    email: "hope@…",
    value: 145000,
    items: 1,
    abandonedAt: "5h ago",
  },
  {
    id: "ab3",
    email: "lila@…",
    value: 800000,
    items: 3,
    abandonedAt: "1d ago",
  },
];

export const businessStats = {
  revenueToday: 1573000,
  revenueWeek: 8940000,
  ordersOpen: 14,
  lowStock: 3,
  conversion: "3.8%",
};

export function formatTzs(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function recommendSize(input: {
  heightCm: number;
  bust: number;
  waist: number;
  hip: number;
  fit: "fitted" | "regular" | "relaxed";
}): { size: string; note: string } {
  const { bust, waist, hip, fit } = input;
  const avg = (bust + waist + hip) / 3;
  let size = "M";
  if (avg < 78) size = "XS";
  else if (avg < 84) size = "S";
  else if (avg < 92) size = "M";
  else if (avg < 100) size = "L";
  else size = "XL";

  if (fit === "fitted" && size !== "XS") {
    const order = ["XS", "S", "M", "L", "XL"];
    size = order[Math.max(0, order.indexOf(size) - 1)];
  }
  if (fit === "relaxed" && size !== "XL") {
    const order = ["XS", "S", "M", "L", "XL"];
    size = order[Math.min(order.length - 1, order.indexOf(size) + 1)];
  }

  const note =
    fit === "fitted"
      ? "Based on your measurements with a closer fit preference."
      : fit === "relaxed"
        ? "Sized up slightly for the relaxed preference you selected."
        : "Matched to your measurements with a regular ease.";

  return { size, note };
}
