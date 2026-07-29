import type { EntitlementDef } from "../../types";

/**
 * Non-sellable entitlements — no invented standalone prices.
 * May affect demo, SOW, tasks, bundle benefit lists — never monetary savings
 * unless comparableStandaloneCode is set to an approved sellable SKU.
 */
export const ENTITLEMENTS: EntitlementDef[] = [
  {
    code: "ENT-GALLERY",
    name: "Gallery",
    description: "Image gallery presentation included where stated in package/bundle scope.",
    sellable: false,
    comparableStandaloneCode: null,
  },
  {
    code: "ENT-SOCIAL-INTEGRATION",
    name: "Social integration",
    description: "Social profile linking / light social presence integration where stated.",
    sellable: false,
    comparableStandaloneCode: null,
  },
  {
    code: "ENT-ENHANCED-SEO",
    name: "Enhanced SEO",
    description:
      "Enhanced on-page SEO level as described for Business-tier packages/bundles. Not a standalone SKU.",
    sellable: false,
    comparableStandaloneCode: null,
  },
  {
    code: "ENT-ANALYTICS-BASELINE",
    name: "Analytics (website baseline)",
    description: "Baseline analytics included with website packages.",
    sellable: false,
    comparableStandaloneCode: null,
  },
  {
    code: "ENT-GROWTH-WEBSITE-CONTENT",
    name: "Website Care & Content Support",
    description:
      "Included benefit of Digital Growth. Operational allowance undefined until commercially activated. No hours, SLA, backup, hosting, or standalone price invented.",
    sellable: false,
    comparableStandaloneCode: null,
  },
  {
    code: "ENT-WEB-BASELINE",
    name: "Website baseline inclusions",
    description:
      "Responsive design · SSL setup · basic security · contact form · WhatsApp · social links · Google Maps · analytics · basic SEO · performance · domain connection · QA · two revision rounds · launch support.",
    sellable: false,
    comparableStandaloneCode: null,
  },
];
