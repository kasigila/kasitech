import type { TechnicalDependency } from "../../types";

/**
 * Technical dependencies — may activate infrastructure WITHOUT creating charges.
 * PAY-* never auto-adds PAY-STD commercially (P1-A / P1-E).
 */
export const TECHNICAL_DEPENDENCIES: TechnicalDependency[] = [
  {
    fromCode: "PAY-DEP",
    toCode: "PAY-INFRA",
    note: "Deposit flows reuse payment infrastructure internally.",
    createsCharge: false,
  },
  {
    fromCode: "PAY-REC",
    toCode: "PAY-INFRA",
    note: "Recurring flows reuse payment infrastructure internally.",
    createsCharge: false,
  },
  {
    fromCode: "PAY-DON",
    toCode: "PAY-INFRA",
    note: "Donation flows reuse payment infrastructure internally.",
    createsCharge: false,
  },
  {
    fromCode: "EDU-FEE",
    toCode: "PAY-INFRA",
    note: "Fee payments may reuse payment infrastructure without PAY-STD/PAY-REC charges.",
    createsCharge: false,
  },
  {
    fromCode: "BKG-STAFF",
    toCode: "BKG-APT",
    note: "Multi-staff includes appointment-booking capability (commercial replace).",
    createsCharge: false,
  },
  {
    fromCode: "REST-AMENU",
    toCode: "REST-MENU",
    note: "Advanced Menu includes Digital Menu capability (commercial replace).",
    createsCharge: false,
  },
  {
    fromCode: "LOG-API",
    toCode: "LOG-TRACK",
    note: "Live Tracking API includes customer-facing tracking capability (commercial replace).",
    createsCharge: false,
  },
];

/** Codes that must NEVER be auto-added as commercial charges (P1-A). */
export const NEVER_AUTO_ADD_CODES = ["PAY-STD", "PAY-REC"] as const;
