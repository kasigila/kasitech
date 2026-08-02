export const glowColors = {
  cream: "#FFF8F6",
  white: "#FFFFFF",
  rose: "#C45C7A",
  roseSoft: "#F7E6EB",
  plum: "#2A1A1F",
  plumMuted: "#5C434C",
  muted: "#7C6670",
  border: "#E8D7DD",
} as const;

export type ServiceCategory = "Hair" | "Skin" | "Nails" | "Makeup" | "Wellness";

export type Service = {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  durationMin: number;
  price: number;
  image: string;
  popular?: boolean;
};

export type Stylist = {
  id: string;
  name: string;
  role: string;
  specialties: ServiceCategory[];
  languages: string[];
  photo: string;
  bio: string;
  nextAvailable: string;
  rating: number;
};

export type ClientAppointment = {
  id: string;
  service: string;
  stylist: string;
  when: string;
  status: "Upcoming" | "Completed" | "Cancelled";
};

export type ClientPackage = {
  id: string;
  name: string;
  remaining: number;
  expires: string;
};

export type ClientNote = {
  id: string;
  title: string;
  body: string;
  date: string;
};

export type SalonBooking = {
  id: string;
  client: string;
  service: string;
  stylist: string;
  when: string;
  status: "Confirmed" | "Checked-in" | "Completed" | "No-show";
};

export const serviceCategories: ServiceCategory[] = [
  "Hair",
  "Skin",
  "Nails",
  "Makeup",
  "Wellness",
];

export const heroImage =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80";

export const services: Service[] = [
  {
    id: "silk-press",
    category: "Hair",
    name: "Silk Press & Finish",
    description: "Wash, deep condition, press, and soft set for lasting shine.",
    durationMin: 90,
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "braids-install",
    category: "Hair",
    name: "Protective Braids",
    description: "Clean parts, lightweight tension, and scalp care finish.",
    durationMin: 180,
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "glow-facial",
    category: "Skin",
    name: "Glow Facial",
    description: "Cleanse, extract, hydrate, and LED finish for clear skin.",
    durationMin: 60,
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "gel-set",
    category: "Nails",
    name: "Gel Manicure",
    description: "Shape, cuticle care, gel colour, and high-shine seal.",
    durationMin: 55,
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bridal-glam",
    category: "Makeup",
    name: "Bridal Soft Glam",
    description: "Trial-ready soft glam with long-wear products for photos.",
    durationMin: 75,
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1487412947147-5d3d4f1c6b0f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "scalp-ritual",
    category: "Wellness",
    name: "Scalp Ritual",
    description: "Massage, steam, and oil treatment to reset stressed scalps.",
    durationMin: 45,
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1200&q=80",
  },
];

export const stylists: Stylist[] = [
  {
    id: "amina",
    name: "Amina Hassan",
    role: "Senior Stylist",
    specialties: ["Hair", "Wellness"],
    languages: ["English", "Swahili"],
    photo:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    bio: "Protective styles and silk finishes with a gentle hand.",
    nextAvailable: "Today · 14:30",
    rating: 4.9,
  },
  {
    id: "neema",
    name: "Neema Okello",
    role: "Skin Specialist",
    specialties: ["Skin", "Wellness"],
    languages: ["English", "Swahili"],
    photo:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
    bio: "Calm facials and clear aftercare plans clients actually follow.",
    nextAvailable: "Tomorrow · 10:00",
    rating: 4.8,
  },
  {
    id: "lulu",
    name: "Lulu Mwanga",
    role: "Nail & Makeup Artist",
    specialties: ["Nails", "Makeup"],
    languages: ["English", "Swahili", "French"],
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Clean gel work and soft glam for events that photograph well.",
    nextAvailable: "Today · 16:00",
    rating: 4.9,
  },
];

export const timeSlots = [
  "09:00",
  "10:30",
  "12:00",
  "14:00",
  "15:30",
  "17:00",
];

export const portalAppointments: ClientAppointment[] = [
  {
    id: "a1",
    service: "Glow Facial",
    stylist: "Neema Okello",
    when: "Sat 2 Aug · 10:00",
    status: "Upcoming",
  },
  {
    id: "a2",
    service: "Gel Manicure",
    stylist: "Lulu Mwanga",
    when: "Fri 18 Jul · 15:30",
    status: "Completed",
  },
];

export const portalPackages: ClientPackage[] = [
  {
    id: "p1",
    name: "Facial Membership · 4 visits",
    remaining: 2,
    expires: "30 Sep 2026",
  },
  {
    id: "p2",
    name: "Nail Care Pack · 3 visits",
    remaining: 1,
    expires: "15 Aug 2026",
  },
];

export const portalNotes: ClientNote[] = [
  {
    id: "n1",
    title: "Skin preference",
    body: "Sensitive around cheeks. Prefer fragrance-light products.",
    date: "18 Jul 2026",
  },
  {
    id: "n2",
    title: "Hair note",
    body: "Low tension on edges. Prefers silk press over heat comb.",
    date: "02 Jun 2026",
  },
];

export const salonBookings: SalonBooking[] = [
  {
    id: "b1",
    client: "Zara M.",
    service: "Silk Press & Finish",
    stylist: "Amina",
    when: "Today · 09:00",
    status: "Checked-in",
  },
  {
    id: "b2",
    client: "Fatma K.",
    service: "Glow Facial",
    stylist: "Neema",
    when: "Today · 10:30",
    status: "Confirmed",
  },
  {
    id: "b3",
    client: "Irene D.",
    service: "Gel Manicure",
    stylist: "Lulu",
    when: "Today · 12:00",
    status: "Confirmed",
  },
  {
    id: "b4",
    client: "Asha N.",
    service: "Bridal Soft Glam",
    stylist: "Lulu",
    when: "Today · 14:00",
    status: "Confirmed",
  },
];

export const salonAnalytics = [
  { label: "Bookings today", value: "18" },
  { label: "No-shows (7d)", value: "2%" },
  { label: "Deposit collected", value: "TSh 420k" },
  { label: "Repeat clients", value: "61%" },
];

export function getService(id: string) {
  return services.find((s) => s.id === id);
}

export function getStylist(id: string) {
  return stylists.find((s) => s.id === id);
}

export function formatTsh(amount: number) {
  return `TSh ${amount.toLocaleString("en-TZ")}`;
}
