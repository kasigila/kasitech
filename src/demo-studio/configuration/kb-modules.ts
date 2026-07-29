/**
 * Approved KasiTech Business modules only (Phase 0 / catalog).
 * Launch: website editor · basic analytics
 * Growth: customer DB · bookings · events · QR · standard analytics (+ catalog/locations shell)
 * Pro / Scale / Enterprise: no invented modules — same approved surface; higher plan is commercial only.
 */

export type KbModuleId =
  | "overview"
  | "website"
  | "analytics"
  | "catalog"
  | "bookings"
  | "customers"
  | "events"
  | "qr"
  | "feedback"
  | "locations";

export type KbModuleDef = {
  id: KbModuleId;
  label: string;
  /** Minimum plan that unlocks this module */
  minPlan: "KB-LAUNCH" | "KB-GROW";
  blurb: string;
};

export const KB_MODULES: KbModuleDef[] = [
  {
    id: "overview",
    label: "Overview",
    minPlan: "KB-LAUNCH",
    blurb: "Snapshot of activity across your digital presence.",
  },
  {
    id: "website",
    label: "Website",
    minPlan: "KB-LAUNCH",
    blurb: "Edit pages and publish updates.",
  },
  {
    id: "analytics",
    label: "Analytics",
    minPlan: "KB-LAUNCH",
    blurb: "Basic traffic and engagement signals.",
  },
  {
    id: "catalog",
    label: "Catalog / Services",
    minPlan: "KB-GROW",
    blurb: "Manage services or offerings visitors book.",
  },
  {
    id: "bookings",
    label: "Bookings",
    minPlan: "KB-GROW",
    blurb: "See and manage appointment or reservation requests.",
  },
  {
    id: "customers",
    label: "Customers",
    minPlan: "KB-GROW",
    blurb: "A simple customer directory.",
  },
  {
    id: "events",
    label: "Events",
    minPlan: "KB-GROW",
    blurb: "Publish and track events.",
  },
  {
    id: "qr",
    label: "QR",
    minPlan: "KB-GROW",
    blurb: "QR experiences linked to your site.",
  },
  {
    id: "feedback",
    label: "Feedback",
    minPlan: "KB-GROW",
    blurb: "Collect visitor feedback.",
  },
  {
    id: "locations",
    label: "Locations",
    minPlan: "KB-GROW",
    blurb: "Manage business locations (Growth supports up to 5).",
  },
];

const PLAN_RANK: Record<string, number> = {
  "KB-LAUNCH": 1,
  "KB-GROW": 2,
  "KB-PRO": 3,
  "KB-SCALE": 4,
  "KB-ENT": 5,
};

export function kbModuleState(
  kbPlan: string | null,
  module: KbModuleDef,
): "hidden" | "locked" | "open" {
  if (!kbPlan) return "hidden";
  const rank = PLAN_RANK[kbPlan] ?? 0;
  const need = PLAN_RANK[module.minPlan] ?? 99;
  if (rank < need) return "locked";
  return "open";
}

export function planLabel(code: string | null): string {
  if (!code) return "No KasiTech Business";
  const map: Record<string, string> = {
    "KB-LAUNCH": "Launch",
    "KB-GROW": "Growth",
    "KB-PRO": "Pro",
    "KB-SCALE": "Scale",
    "KB-ENT": "Enterprise",
  };
  return map[code] ?? code;
}
