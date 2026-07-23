export const afyaColors = {
  cream: "#FAF9F6",
  white: "#FFFFFF",
  sage: "#7A8F7A",
  sageSoft: "#E8EEE8",
  navy: "#1B2A4A",
  navyMuted: "#3A4A66",
  border: "#D8DED8",
  muted: "#6B756B",
} as const;

export type Specialty =
  | "General Practice"
  | "Cardiology"
  | "Pediatrics"
  | "Dermatology"
  | "Orthopedics"
  | "Mental Health"
  | "Obstetrics";

export type Language = "English" | "Swahili" | "French" | "Arabic";
export type LocationId =
  | "Masaki"
  | "Mikocheni"
  | "Upanga"
  | "Sinza"
  | "Telehealth";

export type Insurance =
  | "NHIF"
  | "AAR"
  | "Jubilee"
  | "Strategies"
  | "Self-pay";

export type Doctor = {
  id: string;
  name: string;
  title: string;
  specialty: Specialty;
  qualifications: string[];
  languages: Language[];
  location: LocationId;
  clinic: string;
  photo: string;
  bio: string;
  telehealth: boolean;
  insurance: Insurance[];
  nextAvailable: string;
  availability: string[];
  rating: number;
  years: number;
};

export type PortalAppointment = {
  id: string;
  doctor: string;
  specialty: string;
  when: string;
  type: "In-person" | "Telehealth";
  status: "Upcoming" | "Completed" | "Cancelled";
};

export type PortalDocument = {
  id: string;
  name: string;
  type: string;
  date: string;
};

export type PortalInvoice = {
  id: string;
  description: string;
  amount: string;
  status: "Paid" | "Due" | "Processing";
  date: string;
};

export type PortalMessage = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
};

export type PortalResult = {
  id: string;
  name: string;
  orderedBy: string;
  date: string;
  status: "Ready" | "Pending";
  plainLanguage?: string;
  resultValue?: string;
};

export type BizProvider = {
  id: string;
  name: string;
  specialty: Specialty;
  patientsToday: number;
  utilization: number;
};

export type BizAppointment = {
  id: string;
  patient: string;
  doctor: string;
  when: string;
  type: "In-person" | "Telehealth";
  status: "Checked-in" | "Scheduled" | "Completed" | "No-show";
};

export type BizInquiry = {
  id: string;
  name: string;
  topic: string;
  channel: "Web" | "Phone" | "WhatsApp";
  status: "New" | "Assigned" | "Closed";
  date: string;
};

export const specialties: Specialty[] = [
  "General Practice",
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Mental Health",
  "Obstetrics",
];

export const languages: Language[] = [
  "English",
  "Swahili",
  "French",
  "Arabic",
];

export const locations: LocationId[] = [
  "Masaki",
  "Mikocheni",
  "Upanga",
  "Sinza",
  "Telehealth",
];

export const insuranceOptions: Insurance[] = [
  "NHIF",
  "AAR",
  "Jubilee",
  "Strategies",
  "Self-pay",
];

export const timeSlots = [
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

export const heroImage =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80";

export const doctors: Doctor[] = [
  {
    id: "dr-asha",
    name: "Dr. Asha Mwangi",
    title: "MD, MRCP",
    specialty: "Cardiology",
    qualifications: ["MD: Muhimbili University", "MRCP (UK)", "Fellow, ESC"],
    languages: ["English", "Swahili"],
    location: "Masaki",
    clinic: "AFYA Heart Centre",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    bio: "Focuses on preventive cardiology and hypertension care for busy professionals across Dar.",
    telehealth: true,
    insurance: ["NHIF", "AAR", "Jubilee", "Self-pay"],
    nextAvailable: "Tomorrow 09:00",
    availability: ["Mon", "Tue", "Thu", "Fri"],
    rating: 4.9,
    years: 14,
  },
  {
    id: "dr-juma",
    name: "Dr. Juma Nyerere",
    title: "MBChB, MMed",
    specialty: "General Practice",
    qualifications: ["MBChB: UDSM", "MMed Family Medicine"],
    languages: ["English", "Swahili", "French"],
    location: "Mikocheni",
    clinic: "AFYA Family Clinic",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    bio: "Whole-family care with same-day slots for urgent concerns and calm follow-ups.",
    telehealth: true,
    insurance: ["NHIF", "AAR", "Strategies", "Self-pay"],
    nextAvailable: "Today 15:30",
    availability: ["Mon", "Wed", "Thu", "Sat"],
    rating: 4.8,
    years: 11,
  },
  {
    id: "dr-fatma",
    name: "Dr. Fatma Hassan",
    title: "MD, DCH",
    specialty: "Pediatrics",
    qualifications: ["MD: Kilimanjaro Medical", "DCH (SA)"],
    languages: ["English", "Swahili", "Arabic"],
    location: "Upanga",
    clinic: "AFYA Children’s Wing",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
    bio: "Gentle pediatric care from newborn checks through adolescent wellness.",
    telehealth: true,
    insurance: ["NHIF", "Jubilee", "AAR", "Self-pay"],
    nextAvailable: "Fri 10:30",
    availability: ["Tue", "Wed", "Fri"],
    rating: 4.9,
    years: 9,
  },
  {
    id: "dr-leo",
    name: "Dr. Leo Kimaro",
    title: "MBBS, FRCS",
    specialty: "Orthopedics",
    qualifications: ["MBBS: Makerere", "FRCS Orth"],
    languages: ["English", "Swahili"],
    location: "Masaki",
    clinic: "AFYA Sports & Joint",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    bio: "Sports injuries, joint preservation, and recovery plans you can actually follow.",
    telehealth: false,
    insurance: ["AAR", "Jubilee", "Strategies", "Self-pay"],
    nextAvailable: "Mon 08:30",
    availability: ["Mon", "Tue", "Thu"],
    rating: 4.7,
    years: 16,
  },
  {
    id: "dr-neema",
    name: "Dr. Neema Okello",
    title: "MD, MSc",
    specialty: "Dermatology",
    qualifications: ["MD: UDSM", "MSc Clinical Dermatology"],
    languages: ["English", "Swahili"],
    location: "Sinza",
    clinic: "AFYA Skin Studio",
    photo:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80",
    bio: "Medical dermatology with clear explanations, no jargon, no pressure.",
    telehealth: true,
    insurance: ["NHIF", "AAR", "Self-pay"],
    nextAvailable: "Wed 14:00",
    availability: ["Wed", "Thu", "Fri", "Sat"],
    rating: 4.8,
    years: 8,
  },
  {
    id: "dr-samira",
    name: "Dr. Samira Babu",
    title: "MD, MRCPsych",
    specialty: "Mental Health",
    qualifications: ["MD: Nairobi", "MRCPsych"],
    languages: ["English", "Swahili", "French"],
    location: "Telehealth",
    clinic: "AFYA Mind: Virtual",
    photo:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    bio: "Confidential telehealth therapy and medication review in a calm, private setting.",
    telehealth: true,
    insurance: ["AAR", "Jubilee", "Strategies", "Self-pay"],
    nextAvailable: "Today 16:00",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    rating: 4.9,
    years: 12,
  },
  {
    id: "dr-grace",
    name: "Dr. Grace Lyimo",
    title: "MD, MMed O&G",
    specialty: "Obstetrics",
    qualifications: ["MD: Muhimbili", "MMed Obstetrics & Gynaecology"],
    languages: ["English", "Swahili"],
    location: "Mikocheni",
    clinic: "AFYA Women’s Care",
    photo:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80",
    bio: "Prenatal journeys with clear milestones, birth planning, and postpartum support.",
    telehealth: true,
    insurance: ["NHIF", "AAR", "Jubilee", "Self-pay"],
    nextAvailable: "Thu 11:00",
    availability: ["Mon", "Wed", "Thu", "Fri"],
    rating: 4.9,
    years: 13,
  },
];

export function getDoctor(id: string) {
  return doctors.find((d) => d.id === id);
}

export function getDoctorFitReasons(
  doctor: Doctor,
  visitType: "In-person" | "Telehealth",
): string[] {
  const reasons: string[] = [];
  reasons.push(
    `Speaks ${doctor.languages.slice(0, 2).join(" and ")}${doctor.languages.length > 2 ? ", and more" : ""}`,
  );
  if (doctor.insurance.includes("NHIF")) {
    reasons.push("Accepts NHIF for eligible visits");
  } else {
    reasons.push(`Plans: ${doctor.insurance.slice(0, 3).join(", ")}`);
  }
  if (visitType === "Telehealth" && doctor.telehealth) {
    reasons.push("Telehealth slot with secure video check-in");
  } else if (doctor.telehealth) {
    reasons.push("Telehealth available if you need a follow-up from home");
  } else {
    reasons.push("In-person care at " + doctor.clinic);
  }
  return reasons;
}

export type CareCard = {
  bring: string[];
  nhifNote: string;
  telehealthNote?: string;
};

export function getCareCard(
  visitType: "In-person" | "Telehealth",
): CareCard {
  if (visitType === "Telehealth") {
    return {
      bring: [
        "Photo ID ready for screen share",
        "List of current medications",
        "Quiet room and stable connection",
      ],
      nhifNote:
        "NHIF telehealth claims vary by facility. Bring your member number; reception will confirm coverage before your visit.",
      telehealthNote:
        "Join from the portal 5 minutes early. Link activates at appointment time (demo).",
    };
  }
  return {
    bring: [
      "National ID or passport",
      "Insurance card or NHIF member number",
      "Prior labs or referral letters if you have them",
    ],
    nhifNote:
      "If using NHIF, arrive 15 minutes early for card verification at reception.",
    telehealthNote: undefined,
  };
}

export const portalAppointments: PortalAppointment[] = [
  {
    id: "PA-221",
    doctor: "Dr. Asha Mwangi",
    specialty: "Cardiology",
    when: "25 Jul 2026 · 09:00",
    type: "In-person",
    status: "Upcoming",
  },
  {
    id: "PA-198",
    doctor: "Dr. Juma Nyerere",
    specialty: "General Practice",
    when: "12 Jun 2026 · 15:30",
    type: "Telehealth",
    status: "Completed",
  },
  {
    id: "PA-174",
    doctor: "Dr. Neema Okello",
    specialty: "Dermatology",
    when: "03 May 2026 · 14:00",
    type: "In-person",
    status: "Completed",
  },
];

export const portalDocuments: PortalDocument[] = [
  {
    id: "DOC-41",
    name: "Referral letter: Cardiology",
    type: "PDF",
    date: "18 Jun 2026",
  },
  {
    id: "DOC-38",
    name: "Vaccination record",
    type: "PDF",
    date: "02 Mar 2026",
  },
  {
    id: "DOC-29",
    name: "Consent: Telehealth",
    type: "PDF",
    date: "12 Jun 2026",
  },
];

export const portalInvoices: PortalInvoice[] = [
  {
    id: "INV-8831",
    description: "Cardiology consult + ECG",
    amount: "TZS 185,000",
    status: "Due",
    date: "25 Jul 2026",
  },
  {
    id: "INV-8712",
    description: "GP telehealth visit",
    amount: "TZS 65,000",
    status: "Paid",
    date: "12 Jun 2026",
  },
  {
    id: "INV-8604",
    description: "Dermatology consult",
    amount: "TZS 95,000",
    status: "Paid",
    date: "03 May 2026",
  },
];

export const portalMessages: PortalMessage[] = [
  {
    id: "MSG-12",
    from: "AFYA Care Team",
    subject: "Prepare for your ECG",
    preview: "Please arrive 15 minutes early and wear a loose top…",
    date: "22 Jul 2026",
    unread: true,
  },
  {
    id: "MSG-09",
    from: "Dr. Juma Nyerere",
    subject: "Follow-up notes",
    preview: "Your blood pressure readings look steadier this month…",
    date: "13 Jun 2026",
    unread: false,
  },
];

export const portalResults: PortalResult[] = [
  {
    id: "RES-77",
    name: "Lipid panel",
    orderedBy: "Dr. Asha Mwangi",
    date: "20 Jul 2026",
    status: "Ready",
    resultValue: "Total cholesterol 5.1 mmol/L · LDL 3.2 · HDL 1.3",
    plainLanguage:
      "Your cholesterol is in a moderate range. LDL is slightly above the ideal target many clinicians use for heart risk. This does not mean you need medication today, but it is worth discussing diet, activity, and family history at your cardiology visit.",
  },
  {
    id: "RES-74",
    name: "CBC",
    orderedBy: "Dr. Juma Nyerere",
    date: "12 Jun 2026",
    status: "Ready",
  },
  {
    id: "RES-71",
    name: "HbA1c",
    orderedBy: "Dr. Juma Nyerere",
    date: "12 Jun 2026",
    status: "Pending",
  },
];

export const bizProviders: BizProvider[] = [
  {
    id: "bp1",
    name: "Dr. Asha Mwangi",
    specialty: "Cardiology",
    patientsToday: 7,
    utilization: 86,
  },
  {
    id: "bp2",
    name: "Dr. Juma Nyerere",
    specialty: "General Practice",
    patientsToday: 11,
    utilization: 92,
  },
  {
    id: "bp3",
    name: "Dr. Fatma Hassan",
    specialty: "Pediatrics",
    patientsToday: 9,
    utilization: 78,
  },
  {
    id: "bp4",
    name: "Dr. Samira Babu",
    specialty: "Mental Health",
    patientsToday: 6,
    utilization: 71,
  },
];

export const bizAppointments: BizAppointment[] = [
  {
    id: "BA-501",
    patient: "Maria K.",
    doctor: "Dr. Asha Mwangi",
    when: "Today 09:00",
    type: "In-person",
    status: "Checked-in",
  },
  {
    id: "BA-502",
    patient: "Hassan M.",
    doctor: "Dr. Juma Nyerere",
    when: "Today 09:30",
    type: "Telehealth",
    status: "Scheduled",
  },
  {
    id: "BA-503",
    patient: "Amina S.",
    doctor: "Dr. Fatma Hassan",
    when: "Today 10:00",
    type: "In-person",
    status: "Scheduled",
  },
  {
    id: "BA-488",
    patient: "Peter L.",
    doctor: "Dr. Leo Kimaro",
    when: "Yesterday 15:00",
    type: "In-person",
    status: "Completed",
  },
];

export const bizInquiries: BizInquiry[] = [
  {
    id: "INQ-91",
    name: "Rehema Otieno",
    topic: "NHIF coverage for cardiology",
    channel: "Web",
    status: "New",
    date: "Today",
  },
  {
    id: "INQ-88",
    name: "Daniel Mbeki",
    topic: "Same-day pediatric slot",
    channel: "WhatsApp",
    status: "Assigned",
    date: "Yesterday",
  },
  {
    id: "INQ-84",
    name: "Sofia Kim",
    topic: "Telehealth mental health",
    channel: "Phone",
    status: "Closed",
    date: "21 Jul",
  },
];

export const bizAnalytics = {
  bookingsThisWeek: 148,
  telehealthShare: 34,
  noShowRate: 4.2,
  avgWaitMin: 11,
  inquiryResponseHrs: 1.4,
  patientNps: 72,
};
