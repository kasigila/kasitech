import type { PackageInclusion } from "../../types";

/**
 * Package inclusions from approved catalog comparison (§15) + baseline.
 * Included features must not generate add-on charges.
 */
export const PACKAGE_INCLUSIONS: PackageInclusion[] = [
  // Baseline for all website packages
  ...["WEB-ONE", "WEB-ESS", "WEB-BUS", "WEB-BUSP", "WEB-PRO", "WEB-SIG"].flatMap(
    (pkg) =>
      [
        { packageCode: pkg, includedCode: "ENT-WEB-BASELINE", inclusionType: "BASELINE" as const },
        { packageCode: pkg, includedCode: "ENT-ANALYTICS-BASELINE", inclusionType: "ENTITLEMENT" as const },
      ],
  ),

  // Essential+
  { packageCode: "WEB-ESS", includedCode: "ENT-GALLERY", inclusionType: "ENTITLEMENT" },

  // Business+
  { packageCode: "WEB-BUS", includedCode: "ADD-BLOG", inclusionType: "FEATURE" },
  { packageCode: "WEB-BUS", includedCode: "ADD-PORT", inclusionType: "FEATURE" },
  { packageCode: "WEB-BUS", includedCode: "ENT-ENHANCED-SEO", inclusionType: "ENTITLEMENT" },
  { packageCode: "WEB-BUSP", includedCode: "ADD-BLOG", inclusionType: "FEATURE" },
  { packageCode: "WEB-BUSP", includedCode: "ADD-PORT", inclusionType: "FEATURE" },
  { packageCode: "WEB-BUSP", includedCode: "ADD-CASE", inclusionType: "FEATURE" },
  { packageCode: "WEB-BUSP", includedCode: "ADD-TEAM", inclusionType: "FEATURE" },
  { packageCode: "WEB-BUSP", includedCode: "ADD-RES", inclusionType: "FEATURE" },
  { packageCode: "WEB-PRO", includedCode: "ADD-BLOG", inclusionType: "FEATURE" },
  { packageCode: "WEB-PRO", includedCode: "ADD-PORT", inclusionType: "FEATURE" },
  { packageCode: "WEB-PRO", includedCode: "ADD-CASE", inclusionType: "FEATURE" },
  { packageCode: "WEB-PRO", includedCode: "ADD-TEAM", inclusionType: "FEATURE" },
  { packageCode: "WEB-PRO", includedCode: "ADD-RES", inclusionType: "FEATURE" },
  { packageCode: "WEB-PRO", includedCode: "ADD-CARE", inclusionType: "FEATURE" },
  { packageCode: "WEB-SIG", includedCode: "ADD-BLOG", inclusionType: "FEATURE" },
  { packageCode: "WEB-SIG", includedCode: "ADD-PORT", inclusionType: "FEATURE" },
  { packageCode: "WEB-SIG", includedCode: "ADD-CASE", inclusionType: "FEATURE" },
  { packageCode: "WEB-SIG", includedCode: "ADD-TEAM", inclusionType: "FEATURE" },
  { packageCode: "WEB-SIG", includedCode: "ADD-RES", inclusionType: "FEATURE" },
  { packageCode: "WEB-SIG", includedCode: "ADD-CARE", inclusionType: "FEATURE" },
];
