import type { ServiceAlias } from "../../types";

/** Industry / category presentation aliases → single canonical charge. */
export const SERVICE_ALIASES: ServiceAlias[] = [
  {
    aliasCode: "ALIAS-REST-RSV",
    label: "Reservations",
    canonicalCode: "BKG-REST",
    industryTag: "Restaurant",
  },
  {
    aliasCode: "ALIAS-TOUR-BKG",
    label: "Tour Booking",
    canonicalCode: "BKG-TOUR",
    industryTag: "Tourism",
  },
  {
    aliasCode: "ALIAS-HLTH-APT",
    label: "Appointments",
    canonicalCode: "BKG-APT",
    industryTag: "Healthcare",
  },
  {
    aliasCode: "ALIAS-NGO-DON",
    label: "Donations",
    canonicalCode: "PAY-DON",
    industryTag: "NGO",
  },
  {
    aliasCode: "ALIAS-ADS-LAND",
    label: "Campaign Landing Page",
    canonicalCode: "ADD-LAND",
    industryTag: "Advertising",
  },
];
