export const atlasColors = {
  white: "#FFFFFF",
  fog: "#F4F6F8",
  blue: "#1E4A7A",
  blueSoft: "#E8EEF4",
  orange: "#FF6A00",
  ink: "#0F1A24",
  muted: "#5A6A7A",
  border: "#D0D7DE",
} as const;

export const mono = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
} as const;

export type TrackStop = {
  id: string;
  label: string;
  detail: string;
  time: string;
  mapX: number;
  mapY: number;
};

export type Shipment = {
  id: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  weight: string;
};

export type Invoice = {
  id: string;
  shipment: string;
  amount: string;
  status: "Paid" | "Due" | "Overdue";
  date: string;
};

export type DocRow = {
  id: string;
  name: string;
  shipment: string;
  type: string;
};

export type RouteRow = {
  id: string;
  name: string;
  corridor: string;
  transitHrs: number;
  active: number;
};

export type PodRow = {
  id: string;
  shipment: string;
  signedBy: string;
  when: string;
  location: string;
};

export type Vehicle = {
  id: string;
  plate: string;
  type: string;
  driver: string;
  route: string;
  fuel: number;
  status: "En route" | "Idle" | "Maintenance" | "Loading";
};

export type Driver = {
  id: string;
  name: string;
  license: string;
  vehicle: string;
  hours: number;
  status: "On duty" | "Rest" | "Off";
};

export type Alert = {
  id: string;
  severity: "Critical" | "Warn" | "Info";
  message: string;
  time: string;
  shipmentId?: string;
};

export const demoTrackId = "ATL-48291";

export const trackStops: TrackStop[] = [
  {
    id: "collected",
    label: "Collected",
    detail: "Picked up from shipper warehouse: Mwanza Industrial",
    time: "21 Jul 06:40",
    mapX: 28,
    mapY: 28,
  },
  {
    id: "dar",
    label: "Dar es Salaam",
    detail: "Arrived hub · sorted for coastal distribution",
    time: "22 Jul 14:15",
    mapX: 72,
    mapY: 58,
  },
  {
    id: "transit",
    label: "In Transit",
    detail: "On trunk route toward regional DC",
    time: "22 Jul 18:50",
    mapX: 58,
    mapY: 48,
  },
  {
    id: "distribution",
    label: "Distribution",
    detail: "At Arusha distribution centre · final mile staged",
    time: "23 Jul 08:20",
    mapX: 48,
    mapY: 22,
  },
  {
    id: "ofd",
    label: "Out for Delivery",
    detail: "Courier en route · ETA window 11:00-13:00",
    time: "23 Jul 10:05",
    mapX: 44,
    mapY: 18,
  },
];

export const cities = [
  "Dar es Salaam",
  "Arusha",
  "Mwanza",
  "Dodoma",
  "Mbeya",
  "Zanzibar",
  "Nairobi",
  "Kampala",
] as const;

export const goodsTypes = [
  "General cargo",
  "Electronics",
  "Pharma (ambient)",
  "Perishables",
  "Documents",
  "Industrial parts",
] as const;

export function estimateQuote(opts: {
  origin: string;
  destination: string;
  weightKg: number;
  length: number;
  width: number;
  height: number;
  goods: string;
}): {
  base: number;
  fuel: number;
  handling: number;
  total: number;
  days: number;
  actualKg: number;
  volumetricKg: number;
  chargeableKg: number;
} {
  const vol = (opts.length * opts.width * opts.height) / 5000;
  const chargeable = Math.max(opts.weightKg, vol);
  const distanceFactor =
    opts.origin === opts.destination
      ? 0.4
      : opts.origin.includes("Nairobi") ||
          opts.destination.includes("Nairobi") ||
          opts.origin.includes("Kampala") ||
          opts.destination.includes("Kampala")
        ? 1.35
        : 1;
  const goodsFactor =
    opts.goods.includes("Pharma") || opts.goods.includes("Perish")
      ? 1.25
      : opts.goods === "Documents"
        ? 0.7
        : 1;
  const base = Math.round(45000 + chargeable * 2200 * distanceFactor * goodsFactor);
  const fuel = Math.round(base * 0.12);
  const handling = Math.round(18000 + chargeable * 180);
  const total = base + fuel + handling;
  const days =
    distanceFactor > 1.2 ? 3 : opts.origin === opts.destination ? 1 : 2;
  return {
    base,
    fuel,
    handling,
    total,
    days,
    actualKg: opts.weightKg,
    volumetricKg: Math.round(vol * 10) / 10,
    chargeableKg: Math.round(chargeable * 10) / 10,
  };
}

export function formatTzs(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

export const bizShipments: Shipment[] = [
  {
    id: "ATL-48291",
    origin: "Mwanza",
    destination: "Arusha",
    status: "Out for Delivery",
    eta: "Today 12:00",
    weight: "48 kg",
  },
  {
    id: "ATL-48102",
    origin: "Dar es Salaam",
    destination: "Dodoma",
    status: "In Transit",
    eta: "24 Jul 16:00",
    weight: "120 kg",
  },
  {
    id: "ATL-47988",
    origin: "Nairobi",
    destination: "Dar es Salaam",
    status: "At Hub",
    eta: "25 Jul 10:00",
    weight: "86 kg",
  },
  {
    id: "ATL-47810",
    origin: "Mbeya",
    destination: "Dar es Salaam",
    status: "Delivered",
    eta: "Delivered",
    weight: "32 kg",
  },
];

export const bizInvoices: Invoice[] = [
  {
    id: "INV-9021",
    shipment: "ATL-48291",
    amount: "TZS 186,400",
    status: "Due",
    date: "23 Jul 2026",
  },
  {
    id: "INV-8994",
    shipment: "ATL-47810",
    amount: "TZS 94,200",
    status: "Paid",
    date: "18 Jul 2026",
  },
  {
    id: "INV-8970",
    shipment: "ATL-47655",
    amount: "TZS 241,000",
    status: "Overdue",
    date: "10 Jul 2026",
  },
];

export const bizDocs: DocRow[] = [
  {
    id: "DOC-1",
    name: "Commercial invoice",
    shipment: "ATL-48291",
    type: "PDF",
  },
  {
    id: "DOC-2",
    name: "Packing list",
    shipment: "ATL-48291",
    type: "PDF",
  },
  {
    id: "DOC-3",
    name: "Customs entry",
    shipment: "ATL-47988",
    type: "PDF",
  },
];

export const bizRoutes: RouteRow[] = [
  {
    id: "r1",
    name: "Lake-Coast Trunk",
    corridor: "Mwanza → Dar",
    transitHrs: 18,
    active: 6,
  },
  {
    id: "r2",
    name: "Northern Loop",
    corridor: "Dar → Arusha",
    transitHrs: 9,
    active: 11,
  },
  {
    id: "r3",
    name: "Central Spine",
    corridor: "Dar → Dodoma",
    transitHrs: 7,
    active: 4,
  },
];

export const bizPods: PodRow[] = [
  {
    id: "POD-771",
    shipment: "ATL-47810",
    signedBy: "J. Mushi",
    when: "18 Jul 15:42",
    location: "Dar es Salaam",
  },
  {
    id: "POD-760",
    shipment: "ATL-47501",
    signedBy: "R. Otieno",
    when: "16 Jul 11:08",
    location: "Arusha",
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    plate: "T 482 ATK",
    type: "12t Rigid",
    driver: "Baraka Juma",
    route: "Northern Loop",
    fuel: 62,
    status: "En route",
  },
  {
    id: "v2",
    plate: "T 119 DM",
    type: "Van",
    driver: "Neema Said",
    route: "Arusha Last Mile",
    fuel: 38,
    status: "En route",
  },
  {
    id: "v3",
    plate: "T 903 KL",
    type: "Trailer",
    driver: "Hassan Ally",
    route: "Lake-Coast Trunk",
    fuel: 71,
    status: "Loading",
  },
  {
    id: "v4",
    plate: "T 220 PQ",
    type: "7t Box",
    driver: "Peter Lyimo",
    route: ": ",
    fuel: 15,
    status: "Maintenance",
  },
  {
    id: "v5",
    plate: "T 551 WR",
    type: "Van",
    driver: "Amina K.",
    route: ": ",
    fuel: 88,
    status: "Idle",
  },
];

export const drivers: Driver[] = [
  {
    id: "d1",
    name: "Baraka Juma",
    license: "CE",
    vehicle: "T 482 ATK",
    hours: 6.5,
    status: "On duty",
  },
  {
    id: "d2",
    name: "Neema Said",
    license: "B",
    vehicle: "T 119 DM",
    hours: 4.2,
    status: "On duty",
  },
  {
    id: "d3",
    name: "Hassan Ally",
    license: "CE",
    vehicle: "T 903 KL",
    hours: 2.0,
    status: "On duty",
  },
  {
    id: "d4",
    name: "Peter Lyimo",
    license: "C",
    vehicle: "T 220 PQ",
    hours: 0,
    status: "Rest",
  },
];

export const fleetAlerts: Alert[] = [
  {
    id: "a1",
    severity: "Warn",
    message: "T 220 PQ fuel critically low · scheduled maintenance bay 2",
    time: "09:41",
  },
  {
    id: "a2",
    severity: "Info",
    message: "Northern Loop running 22 min ahead of plan",
    time: "10:02",
  },
  {
    id: "a3",
    severity: "Critical",
    message: "Temperature excursion risk on pharma lane ATL-48102",
    time: "10:18",
    shipmentId: "ATL-48102",
  },
];

export const bizAnalytics = {
  onTime: "94.2%",
  activeShipments: 128,
  avgTransitHrs: 11.4,
  fuelBurnL: "4,820 L",
  podCapture: "98%",
  quoteToBook: "41%",
};
