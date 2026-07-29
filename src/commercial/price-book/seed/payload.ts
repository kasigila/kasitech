import { loadPriceBook, CANONICAL_ITEM_COUNT } from "../load";
import { CATALOG_ITEMS } from "./items";
import { SERVICE_ALIASES } from "./aliases";
import { ENTITLEMENTS } from "./entitlements";
import { TIER_FAMILIES } from "./families";
import { PACKAGE_INCLUSIONS } from "./packages";
import { BUNDLE_COMPONENTS } from "./bundles";
import { PRICE_BOOK_VERSION } from "../../types";

/**
 * SQL-oriented seed payload for KT-PB-2026.1.
 * Apply via drizzle seed script when DATABASE_URL is configured.
 */
export function buildSeedPayload() {
  const book = loadPriceBook();
  return {
    priceBook: {
      version: PRICE_BOOK_VERSION,
      active: true,
      notes: "Frozen administrator-approved catalog 2026 v2",
    },
    items: CATALOG_ITEMS,
    aliases: SERVICE_ALIASES,
    entitlements: ENTITLEMENTS,
    families: TIER_FAMILIES,
    packageInclusions: PACKAGE_INCLUSIONS,
    bundleComponents: BUNDLE_COMPONENTS,
    meta: {
      canonicalItemCount: CANONICAL_ITEM_COUNT,
      aliasCount: SERVICE_ALIASES.length,
      entitlementCount: ENTITLEMENTS.length,
      familyCount: TIER_FAMILIES.length,
      loadedVersion: book.version,
    },
  };
}
