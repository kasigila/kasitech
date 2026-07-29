import type { TierFamily } from "../../types";

/**
 * Exclusive families — only one member commercially active.
 * Upgrade families: higher rank replaces lower and includes lower capability.
 */
export const TIER_FAMILIES: TierFamily[] = [
  {
    code: "ECOM_STORE",
    name: "E-commerce store tier",
    members: [
      { code: "ECOM-START", rank: 1 },
      { code: "ECOM-BUS", rank: 2 },
      { code: "ECOM-ADV", rank: 3 },
      { code: "ECOM-CUS", rank: 4 },
    ],
  },
  {
    code: "SEO_SETUP",
    name: "SEO setup tier",
    members: [
      { code: "SEO-FND", rank: 1 },
      { code: "SEO-PRO", rank: 2, includesLower: true },
      { code: "SEO-ADV", rank: 3, includesLower: true },
    ],
  },
  {
    code: "SEO_RECURRING",
    name: "SEO recurring plan",
    members: [
      { code: "SEO-CARE", rank: 1 },
      { code: "SEO-GROW", rank: 2 },
      { code: "SEO-AUTH", rank: 3 },
    ],
  },
  {
    code: "SOCIAL_PLAN",
    name: "Social media plan",
    members: [
      { code: "SOC-ESS", rank: 1 },
      { code: "SOC-GROW", rank: 2 },
      { code: "SOC-PRO", rank: 3 },
      { code: "SOC-CORP", rank: 4 },
    ],
  },
  {
    code: "CARE_PLAN",
    name: "Care / maintenance plan",
    members: [
      { code: "CARE-ESS", rank: 1 },
      { code: "CARE-STD", rank: 2 },
      { code: "CARE-BUS", rank: 3 },
      { code: "CARE-PRO", rank: 4 },
      { code: "CARE-PRI", rank: 5 },
    ],
  },
  {
    code: "KB_PLAN",
    name: "KasiTech Business plan",
    members: [
      { code: "KB-LAUNCH", rank: 1 },
      { code: "KB-GROW", rank: 2 },
      { code: "KB-PRO", rank: 3 },
      { code: "KB-SCALE", rank: 4 },
      { code: "KB-ENT", rank: 5 },
    ],
  },
  {
    code: "BOOKING_APPOINTMENT",
    name: "Appointment booking tier",
    members: [
      { code: "BKG-APT", rank: 1 },
      { code: "BKG-STAFF", rank: 2, includesLower: true },
    ],
  },
  {
    code: "RESTAURANT_MENU",
    name: "Restaurant menu tier",
    members: [
      { code: "REST-MENU", rank: 1 },
      { code: "REST-AMENU", rank: 2, includesLower: true },
    ],
  },
  {
    code: "LOGISTICS_TRACKING",
    name: "Logistics tracking tier",
    members: [
      { code: "LOG-TRACK", rank: 1 },
      { code: "LOG-API", rank: 2, includesLower: true },
    ],
  },
  {
    code: "WEBSITE_PACKAGE",
    name: "Website package tier",
    members: [
      { code: "WEB-ONE", rank: 1 },
      { code: "WEB-ESS", rank: 2 },
      { code: "WEB-BUS", rank: 3 },
      { code: "WEB-BUSP", rank: 4 },
      { code: "WEB-PRO", rank: 5 },
      { code: "WEB-SIG", rank: 6 },
      { code: "WEB-CUS", rank: 7 },
    ],
  },
];
