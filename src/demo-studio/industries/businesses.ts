import type { DemoIndustryId } from "../types";

export type FictionalBusiness = {
  key: string;
  industry: DemoIndustryId;
  name: string;
  tagline: string;
  city: string;
  phone: string;
  email: string;
  whatsapp: string;
  /** Accent used inside the fictional site (not KasiTech chrome) */
  accent: string;
  surface: string;
  ink: string;
  nav: string[];
  hero: { eyebrow: string; title: string; subtitle: string; cta: string };
  services: { name: string; blurb: string; priceLabel?: string }[];
  team: { name: string; role: string }[];
  galleryLabels: string[];
  products?: { name: string; priceLabel: string }[];
  tours?: { name: string; days: string; priceLabel: string }[];
  properties?: { title: string; area: string; priceLabel: string; beds: number }[];
  menu?: { category: string; items: { name: string; priceLabel: string }[] }[];
  courses?: { name: string; blurb: string }[];
  programs?: { name: string; blurb: string }[];
  practitioners?: { name: string; specialty: string }[];
  trackingDemoCode: string;
};

export const FICTIONAL_BUSINESSES: Record<DemoIndustryId, FictionalBusiness> = {
  beauty: {
    key: "amani-beauty",
    industry: "beauty",
    name: "Amani Beauty Studio",
    tagline: "Quiet luxury for hair, skin, and nails.",
    city: "Masaki, Dar es Salaam",
    phone: "+255 700 111 201",
    email: "hello@amanibeauty.demo",
    whatsapp: "+255700111201",
    accent: "#c45c7a",
    surface: "#fff8f6",
    ink: "#2a1a1f",
    nav: ["Services", "Gallery", "Book", "Contact"],
    hero: {
      eyebrow: "Masaki · by appointment",
      title: "Beauty, paced for you.",
      subtitle: "Hair, skin, and nail rituals in a calm studio setting.",
      cta: "Book appointment",
    },
    services: [
      { name: "Signature cut & style", blurb: "Consultation, cut, finish.", priceLabel: "From 45,000" },
      { name: "Glow facial", blurb: "Customised skin ritual.", priceLabel: "From 80,000" },
      { name: "Gel manicure", blurb: "Long-wear colour.", priceLabel: "From 35,000" },
    ],
    team: [
      { name: "Asha M.", role: "Lead stylist" },
      { name: "Neema K.", role: "Skin specialist" },
      { name: "Lia J.", role: "Nail artist" },
    ],
    galleryLabels: ["Studio", "Colour", "Nails", "Bridal"],
    trackingDemoCode: "AMANI-DEMO",
  },
  restaurant: {
    key: "jiko-house",
    industry: "restaurant",
    name: "Jiko House",
    tagline: "Coastal plates, open fire, long tables.",
    city: "Oyster Bay, Dar es Salaam",
    phone: "+255 700 111 202",
    email: "reservations@jikohouse.demo",
    whatsapp: "+255700111202",
    accent: "#c45a12",
    surface: "#faf6f0",
    ink: "#1c1410",
    nav: ["Menu", "Reserve", "Events", "Visit"],
    hero: {
      eyebrow: "Dinner · Oyster Bay",
      title: "Fire, spice, and the Indian Ocean breeze.",
      subtitle: "Seasonal coastal cooking with a neighbourhood table culture.",
      cta: "Reserve a table",
    },
    services: [
      { name: "Dinner service", blurb: "Tue–Sun from 17:00." },
      { name: "Private dining", blurb: "Up to 18 guests." },
      { name: "Weekend brunch", blurb: "Saturdays from 10:30." },
    ],
    team: [
      { name: "Chef Imani", role: "Head chef" },
      { name: "Baraka", role: "Floor manager" },
    ],
    galleryLabels: ["Dining room", "Grill", "Plates", "Terrace"],
    menu: [
      {
        category: "Starters",
        items: [
          { name: "Coconut ceviche", priceLabel: "28,000" },
          { name: "Cassava crisps & dip", priceLabel: "14,000" },
        ],
      },
      {
        category: "Mains",
        items: [
          { name: "Grilled kingfish", priceLabel: "52,000" },
          { name: "Jiko chicken", priceLabel: "38,000" },
          { name: "Garden bowl", priceLabel: "32,000" },
        ],
      },
    ],
    trackingDemoCode: "JIKO-DEMO",
  },
  hotel: {
    key: "bahari-house",
    industry: "hotel",
    name: "Bahari House",
    tagline: "Twelve rooms above the harbour.",
    city: "Stone Town, Zanzibar",
    phone: "+255 700 111 203",
    email: "stay@baharihouse.demo",
    whatsapp: "+255700111203",
    accent: "#1a6b8a",
    surface: "#f3f7f9",
    ink: "#12202a",
    nav: ["Rooms", "Stay", "Experiences", "Contact"],
    hero: {
      eyebrow: "Boutique stay · Stone Town",
      title: "Harbour light. Soft linen. Slow mornings.",
      subtitle: "A intimate house hotel for travellers who value craft and calm.",
      cta: "Check availability",
    },
    services: [
      { name: "Harbour Suite", blurb: "Sea view, balcony.", priceLabel: "From $180" },
      { name: "Courtyard Room", blurb: "Quiet garden side.", priceLabel: "From $120" },
      { name: "Breakfast terrace", blurb: "Included daily." },
    ],
    team: [
      { name: "Salma H.", role: "General manager" },
      { name: "Omar R.", role: "Guest experience" },
    ],
    galleryLabels: ["Suite", "Courtyard", "Breakfast", "Rooftop"],
    trackingDemoCode: "BAHARI-DEMO",
  },
  tourism: {
    key: "tembea-tanzania",
    industry: "tourism",
    name: "Tembea Tanzania",
    tagline: "Guided journeys across parks and coast.",
    city: "Arusha & Dar es Salaam",
    phone: "+255 700 111 204",
    email: "trips@tembea.demo",
    whatsapp: "+255700111204",
    accent: "#2f6b3a",
    surface: "#f5f7f2",
    ink: "#142016",
    nav: ["Tours", "Itineraries", "Enquire", "About"],
    hero: {
      eyebrow: "Safari & coast · Tanzania",
      title: "Travel that feels designed, not rushed.",
      subtitle: "Small-group and private itineraries with local guides.",
      cta: "Browse tours",
    },
    services: [
      { name: "Northern Circuit", blurb: "Serengeti, Ngorongoro, Tarangire." },
      { name: "Zanzibar add-on", blurb: "Beach recovery days." },
      { name: "Private guiding", blurb: "Your pace, your route." },
    ],
    team: [
      { name: "Joseph M.", role: "Lead guide" },
      { name: "Faraja N.", role: "Trip designer" },
    ],
    galleryLabels: ["Serengeti", "Crater", "Camp", "Coast"],
    tours: [
      { name: "Classic Northern 6-day", days: "6 days", priceLabel: "From $1,850" },
      { name: "Family safari 5-day", days: "5 days", priceLabel: "From $1,400" },
      { name: "Coast & spice 4-day", days: "4 days", priceLabel: "From $980" },
    ],
    trackingDemoCode: "TEMBEA-DEMO",
  },
  "real-estate": {
    key: "nuru-properties",
    industry: "real-estate",
    name: "Nuru Properties",
    tagline: "Homes and offices across Dar.",
    city: "Dar es Salaam",
    phone: "+255 700 111 205",
    email: "hello@nuruproperties.demo",
    whatsapp: "+255700111205",
    accent: "#8a6d3b",
    surface: "#f7f4ee",
    ink: "#1a1712",
    nav: ["Listings", "Agents", "Enquire", "About"],
    hero: {
      eyebrow: "Sales & lettings",
      title: "Property search without the noise.",
      subtitle: "Curated homes and workspaces with clear details and fast replies.",
      cta: "View listings",
    },
    services: [
      { name: "Residential sales", blurb: "Apartments and houses." },
      { name: "Commercial", blurb: "Offices and retail units." },
      { name: "Property management", blurb: "For landlords." },
    ],
    team: [
      { name: "Grace P.", role: "Senior agent" },
      { name: "Daniel O.", role: "Commercial lead" },
    ],
    galleryLabels: ["Mikocheni", "Masaki", "CBD", "Mbezi"],
    properties: [
      { title: "2BR apartment · Mikocheni", area: "Mikocheni", priceLabel: "TSh 280M", beds: 2 },
      { title: "Townhouse · Masaki", area: "Masaki", priceLabel: "TSh 720M", beds: 4 },
      { title: "Office suite · CBD", area: "CBD", priceLabel: "TSh 12M / yr", beds: 0 },
    ],
    trackingDemoCode: "NURU-DEMO",
  },
  retail: {
    key: "maua-market",
    industry: "retail",
    name: "Maua Market",
    tagline: "Home goods with Tanzanian makers.",
    city: "Dar es Salaam (online + pickup)",
    phone: "+255 700 111 206",
    email: "shop@mauamarket.demo",
    whatsapp: "+255700111206",
    accent: "#6b4fa0",
    surface: "#f8f5fb",
    ink: "#1a1222",
    nav: ["Shop", "Makers", "Cart", "Contact"],
    hero: {
      eyebrow: "Online store",
      title: "Objects for a calmer home.",
      subtitle: "Textiles, ceramics, and gifts from regional makers.",
      cta: "Shop collection",
    },
    services: [
      { name: "Nationwide delivery", blurb: "Tracked shipping." },
      { name: "Masaki pickup", blurb: "Same-day when stocked." },
    ],
    team: [{ name: "Winnie A.", role: "Founder" }],
    galleryLabels: ["Textiles", "Ceramics", "Gifts", "Studio"],
    products: [
      { name: "Kitenge throw", priceLabel: "TSh 85,000" },
      { name: "Clay pourer", priceLabel: "TSh 42,000" },
      { name: "Cedar tray", priceLabel: "TSh 58,000" },
      { name: "Candle set", priceLabel: "TSh 36,000" },
    ],
    trackingDemoCode: "MAUA-DEMO",
  },
  professional: {
    key: "apex-advisory",
    industry: "professional",
    name: "Apex Advisory",
    tagline: "Strategy for growing East African firms.",
    city: "Dar es Salaam",
    phone: "+255 700 111 207",
    email: "office@apexadvisory.demo",
    whatsapp: "+255700111207",
    accent: "#1e3a5f",
    surface: "#f4f6f8",
    ink: "#101820",
    nav: ["Services", "Work", "Team", "Contact"],
    hero: {
      eyebrow: "Advisory firm",
      title: "Clarity for complex growth decisions.",
      subtitle: "Market entry, operating model, and board-ready analysis.",
      cta: "Request a consultation",
    },
    services: [
      { name: "Growth strategy", blurb: "Priorities and sequencing." },
      { name: "Operating design", blurb: "Roles, rhythms, metrics." },
      { name: "Market scans", blurb: "East Africa focus." },
    ],
    team: [
      { name: "Dr. Mira S.", role: "Managing partner" },
      { name: "Kevin L.", role: "Principal" },
      { name: "Zawadi T.", role: "Engagement manager" },
    ],
    galleryLabels: ["Workshops", "Reports", "Clients", "Office"],
    trackingDemoCode: "APEX-DEMO",
  },
  education: {
    key: "brightstone-academy",
    industry: "education",
    name: "Brightstone Academy",
    tagline: "Primary education with curiosity at the centre.",
    city: "Mikocheni, Dar es Salaam",
    phone: "+255 700 111 208",
    email: "admissions@brightstone.demo",
    whatsapp: "+255700111208",
    accent: "#0f766e",
    surface: "#f2faf8",
    ink: "#10201e",
    nav: ["Programs", "Admissions", "Campus", "Contact"],
    hero: {
      eyebrow: "Primary school · Mikocheni",
      title: "Where curiosity becomes confidence.",
      subtitle: "A warm academic community for ages 4–12.",
      cta: "Start admissions",
    },
    services: [
      { name: "Early years", blurb: "Ages 4–6." },
      { name: "Primary", blurb: "Years 1–6." },
      { name: "After-school clubs", blurb: "Arts, coding, sport." },
    ],
    team: [
      { name: "Mrs. Halima", role: "Head of school" },
      { name: "Mr. Eric", role: "Academic lead" },
    ],
    galleryLabels: ["Classrooms", "Library", "Play", "Lab"],
    courses: [
      { name: "Early Years", blurb: "Play-based foundations." },
      { name: "Primary Pathway", blurb: "Literacy, numeracy, inquiry." },
      { name: "STEM Club", blurb: "After-school enrichment." },
    ],
    trackingDemoCode: "BRIGHT-DEMO",
  },
  ngo: {
    key: "mwangaza-foundation",
    industry: "ngo",
    name: "Mwangaza Foundation",
    tagline: "Light for girls' education across Tanzania.",
    city: "Dar es Salaam & regions",
    phone: "+255 700 111 209",
    email: "connect@mwangaza.demo",
    whatsapp: "+255700111209",
    accent: "#b45309",
    surface: "#fffaf3",
    ink: "#1c140c",
    nav: ["Programs", "Impact", "Donate", "Volunteer"],
    hero: {
      eyebrow: "Nonprofit · Tanzania",
      title: "Every girl deserves a clear path to learn.",
      subtitle: "Scholarships, mentoring, and community partnerships.",
      cta: "Donate",
    },
    services: [
      { name: "Scholarships", blurb: "Secondary school support." },
      { name: "Mentorship", blurb: "Peer and professional guides." },
      { name: "Community labs", blurb: "Safe study spaces." },
    ],
    team: [
      { name: "Rehema W.", role: "Executive director" },
      { name: "Paul N.", role: "Programs" },
    ],
    galleryLabels: ["Scholars", "Mentors", "Labs", "Events"],
    programs: [
      { name: "Scholar Fund", blurb: "Tuition and materials." },
      { name: "Mentor Circle", blurb: "Monthly guidance." },
      { name: "Community Lab", blurb: "Study hubs in partner schools." },
    ],
    trackingDemoCode: "MWANG-DEMO",
  },
  healthcare: {
    key: "afyacare-clinic",
    industry: "healthcare",
    name: "AfyaCare Clinic",
    tagline: "Primary care with time to listen.",
    city: "Upanga, Dar es Salaam",
    phone: "+255 700 111 210",
    email: "care@afyacare.demo",
    whatsapp: "+255700111210",
    accent: "#0e7490",
    surface: "#f0f9fb",
    ink: "#0f1c22",
    nav: ["Services", "Practitioners", "Book", "Visit"],
    hero: {
      eyebrow: "Family clinic · Upanga",
      title: "Care that starts with a conversation.",
      subtitle: "General practice, women's health, and chronic care follow-up.",
      cta: "Book appointment",
    },
    services: [
      { name: "General consultation", blurb: "Same-week slots." },
      { name: "Women's health", blurb: "Dedicated clinic hours." },
      { name: "Chronic care", blurb: "Structured follow-up." },
    ],
    team: [
      { name: "Dr. Amina", role: "General practitioner" },
      { name: "Dr. Felix", role: "Family medicine" },
      { name: "Nurse Joy", role: "Care coordinator" },
    ],
    galleryLabels: ["Reception", "Consult", "Lab", "Pharmacy"],
    practitioners: [
      { name: "Dr. Amina Yusuf", specialty: "General practice" },
      { name: "Dr. Felix Mboya", specialty: "Family medicine" },
      { name: "Nurse Joy Kimaro", specialty: "Care coordination" },
    ],
    trackingDemoCode: "AFYA-DEMO",
  },
  logistics: {
    key: "kasi-logistics",
    industry: "logistics",
    name: "Kasi Logistics",
    tagline: "Freight that moves on schedule.",
    city: "Dar es Salaam · East Africa corridors",
    phone: "+255 700 111 211",
    email: "ops@kasilogistics.demo",
    whatsapp: "+255700111211",
    accent: "#ea580c",
    surface: "#fff7ed",
    ink: "#1c1208",
    nav: ["Services", "Track", "Quote", "Contact"],
    hero: {
      eyebrow: "Freight & last-mile",
      title: "Shipments you can actually track.",
      subtitle: "Corridor freight, warehousing handoff, and local delivery.",
      cta: "Track shipment",
    },
    services: [
      { name: "Corridor freight", blurb: "Dar ↔ regional hubs." },
      { name: "Last-mile", blurb: "City distribution." },
      { name: "Warehousing", blurb: "Short-hold storage." },
    ],
    team: [
      { name: "Hassan B.", role: "Operations" },
      { name: "Irene D.", role: "Customer desk" },
    ],
    galleryLabels: ["Fleet", "Warehouse", "Hub", "Team"],
    trackingDemoCode: "KASI-TRACK-42",
  },
  general: {
    key: "mara-and-co",
    industry: "general",
    name: "Mara & Co.",
    tagline: "A modern East African services firm.",
    city: "Dar es Salaam",
    phone: "+255 700 111 212",
    email: "hello@maraandco.demo",
    whatsapp: "+255700111212",
    accent: "#334155",
    surface: "#f8fafc",
    ink: "#0f172a",
    nav: ["Services", "About", "Work", "Contact"],
    hero: {
      eyebrow: "Business services",
      title: "A clear digital front door for your firm.",
      subtitle: "Explain what you do, prove trust, and make it easy to enquire.",
      cta: "Talk to us",
    },
    services: [
      { name: "Advisory", blurb: "Structured problem-solving." },
      { name: "Implementation", blurb: "Hands-on delivery." },
      { name: "Retainers", blurb: "Ongoing partnership." },
    ],
    team: [
      { name: "Mara N.", role: "Founder" },
      { name: "Samir K.", role: "Delivery lead" },
    ],
    galleryLabels: ["Office", "Workshops", "Clients", "Team"],
    trackingDemoCode: "MARA-DEMO",
  },
};

export function businessForIndustry(industry: DemoIndustryId): FictionalBusiness {
  return FICTIONAL_BUSINESSES[industry];
}

export const ALL_INDUSTRIES: { id: DemoIndustryId; label: string }[] = [
  { id: "beauty", label: "Beauty & Wellness" },
  { id: "restaurant", label: "Restaurant" },
  { id: "hotel", label: "Hotel / Hospitality" },
  { id: "tourism", label: "Tourism / Tours" },
  { id: "real-estate", label: "Real Estate" },
  { id: "retail", label: "Retail / E-commerce" },
  { id: "professional", label: "Professional Services" },
  { id: "education", label: "Education" },
  { id: "ngo", label: "NGO" },
  { id: "healthcare", label: "Healthcare" },
  { id: "logistics", label: "Logistics" },
  { id: "general", label: "General Business" },
];
