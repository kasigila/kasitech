import type { BundleComponent } from "../../types";

/**
 * Bundle compositions — CHARGE components use approved standalone SKUs.
 * ENTITLEMENT components never contribute to monetary savings.
 */
export const BUNDLE_COMPONENTS: BundleComponent[] = [
  // Business Launch
  { bundleCode: "BND-LAUNCH", componentCode: "WEB-ESS", role: "CHARGE" },
  { bundleCode: "BND-LAUNCH", componentCode: "LOC-GBP", role: "CHARGE" },
  { bundleCode: "BND-LAUNCH", componentCode: "HOST-EMAIL", role: "CHARGE" },
  { bundleCode: "BND-LAUNCH", componentCode: "ENT-ENHANCED-SEO", role: "ENTITLEMENT" },
  { bundleCode: "BND-LAUNCH", componentCode: "ENT-ANALYTICS-BASELINE", role: "ENTITLEMENT" },

  // Beauty & Booking
  { bundleCode: "BND-BEAUTY", componentCode: "WEB-ONE", role: "CHARGE" },
  { bundleCode: "BND-BEAUTY", componentCode: "BKG-EXT", role: "CHARGE" },
  { bundleCode: "BND-BEAUTY", componentCode: "LOC-GBP", role: "CHARGE" },
  { bundleCode: "BND-BEAUTY", componentCode: "ENT-GALLERY", role: "ENTITLEMENT" },
  { bundleCode: "BND-BEAUTY", componentCode: "ENT-SOCIAL-INTEGRATION", role: "ENTITLEMENT" },

  // Restaurant
  { bundleCode: "BND-REST", componentCode: "WEB-ESS", role: "CHARGE" },
  { bundleCode: "BND-REST", componentCode: "REST-MENU", role: "CHARGE" },
  { bundleCode: "BND-REST", componentCode: "BKG-REST", role: "CHARGE" },
  { bundleCode: "BND-REST", componentCode: "LOC-GBP", role: "CHARGE" },
  { bundleCode: "BND-REST", componentCode: "ENT-GALLERY", role: "ENTITLEMENT" },

  // Online Store
  { bundleCode: "BND-STORE", componentCode: "WEB-ESS", role: "CHARGE" },
  { bundleCode: "BND-STORE", componentCode: "ECOM-START", role: "CHARGE" },
  { bundleCode: "BND-STORE", componentCode: "PAY-STD", role: "CHARGE" },

  // Tourism
  { bundleCode: "BND-TOUR", componentCode: "WEB-BUS", role: "CHARGE" },
  { bundleCode: "BND-TOUR", componentCode: "TOUR-CAT", role: "CHARGE" },
  { bundleCode: "BND-TOUR", componentCode: "TOUR-ITIN", role: "CHARGE" },
  { bundleCode: "BND-TOUR", componentCode: "TOUR-INQ", role: "CHARGE" },
  { bundleCode: "BND-TOUR", componentCode: "ENT-ENHANCED-SEO", role: "ENTITLEMENT" },

  // Real Estate
  { bundleCode: "BND-RE", componentCode: "WEB-BUS", role: "CHARGE" },
  { bundleCode: "BND-RE", componentCode: "RE-LIST", role: "CHARGE" },
  { bundleCode: "BND-RE", componentCode: "RE-FILT", role: "CHARGE" },
  { bundleCode: "BND-RE", componentCode: "RE-INQ", role: "CHARGE" },

  // Professional Presence
  { bundleCode: "BND-PRES", componentCode: "WEB-PRO", role: "CHARGE" },
  { bundleCode: "BND-PRES", componentCode: "SEO-PRO", role: "CHARGE" },
  { bundleCode: "BND-PRES", componentCode: "LOC-GBP", role: "CHARGE" },

  // Digital Growth (monthly)
  { bundleCode: "BND-GROW", componentCode: "SOC-PRO", role: "CHARGE" },
  { bundleCode: "BND-GROW", componentCode: "SEO-GROW", role: "CHARGE" },
  {
    bundleCode: "BND-GROW",
    componentCode: "ENT-GROWTH-WEBSITE-CONTENT",
    role: "ENTITLEMENT",
  },
];
