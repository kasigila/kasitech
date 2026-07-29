import { PRICE_BOOK_VERSION, type CatalogItem } from "../types";
import { SERVICE_ALIASES } from "./seed/aliases";
import { BUNDLE_COMPONENTS } from "./seed/bundles";
import { CATALOG_ITEMS, CANONICAL_ITEM_COUNT } from "./seed/items";
import { TECHNICAL_DEPENDENCIES, NEVER_AUTO_ADD_CODES } from "./seed/dependencies";
import { ENTITLEMENTS } from "./seed/entitlements";
import { TIER_FAMILIES } from "./seed/families";
import { PACKAGE_INCLUSIONS } from "./seed/packages";

export type PriceBook = {
  version: typeof PRICE_BOOK_VERSION;
  items: CatalogItem[];
  itemByCode: Map<string, CatalogItem>;
  aliases: typeof SERVICE_ALIASES;
  aliasToCanonical: Map<string, string>;
  entitlements: typeof ENTITLEMENTS;
  entitlementCodes: Set<string>;
  families: typeof TIER_FAMILIES;
  familyByMember: Map<string, (typeof TIER_FAMILIES)[number]>;
  packageInclusions: typeof PACKAGE_INCLUSIONS;
  inclusionsByPackage: Map<string, string[]>;
  bundleComponents: typeof BUNDLE_COMPONENTS;
  componentsByBundle: Map<string, typeof BUNDLE_COMPONENTS>;
  technicalDependencies: typeof TECHNICAL_DEPENDENCIES;
  neverAutoAdd: Set<string>;
};

let cached: PriceBook | null = null;

export function loadPriceBook(): PriceBook {
  if (cached) return cached;

  if (CATALOG_ITEMS.length !== CANONICAL_ITEM_COUNT) {
    throw new Error(
      `Price Book integrity: expected ${CANONICAL_ITEM_COUNT} items, got ${CATALOG_ITEMS.length}`,
    );
  }

  const itemByCode = new Map(CATALOG_ITEMS.map((i) => [i.code, i]));
  const codes = new Set(itemByCode.keys());
  if (codes.size !== CATALOG_ITEMS.length) {
    throw new Error("Price Book integrity: duplicate catalog codes");
  }

  const aliasToCanonical = new Map<string, string>();
  for (const a of SERVICE_ALIASES) {
    if (!itemByCode.has(a.canonicalCode)) {
      throw new Error(`Alias ${a.aliasCode} points to missing ${a.canonicalCode}`);
    }
    if (aliasToCanonical.has(a.aliasCode)) {
      throw new Error(`Duplicate alias ${a.aliasCode}`);
    }
    aliasToCanonical.set(a.aliasCode, a.canonicalCode);
    // Also allow selecting by presentation label industry composite
    aliasToCanonical.set(a.label.toUpperCase().replace(/\s+/g, "-"), a.canonicalCode);
  }

  for (const e of ENTITLEMENTS) {
    if (e.sellable !== false) throw new Error(`${e.code} must be non-sellable`);
    if (e.comparableStandaloneCode != null) {
      throw new Error(
        `${e.code}: comparableStandaloneCode must be null unless admin approves a price`,
      );
    }
  }

  const familyByMember = new Map<string, (typeof TIER_FAMILIES)[number]>();
  for (const f of TIER_FAMILIES) {
    for (const m of f.members) {
      if (!itemByCode.has(m.code)) {
        throw new Error(`Family ${f.code} member missing: ${m.code}`);
      }
      if (familyByMember.has(m.code)) {
        throw new Error(`Code ${m.code} in multiple families`);
      }
      familyByMember.set(m.code, f);
    }
  }

  const inclusionsByPackage = new Map<string, string[]>();
  for (const inc of PACKAGE_INCLUSIONS) {
    const list = inclusionsByPackage.get(inc.packageCode) ?? [];
    list.push(inc.includedCode);
    inclusionsByPackage.set(inc.packageCode, list);
  }

  const componentsByBundle = new Map<string, typeof BUNDLE_COMPONENTS>();
  for (const c of BUNDLE_COMPONENTS) {
    const list = componentsByBundle.get(c.bundleCode) ?? [];
    list.push(c);
    componentsByBundle.set(c.bundleCode, list);
  }

  const entitlementCodes = new Set(ENTITLEMENTS.map((e) => e.code));
  // HOST-SSL is also an entitlement-kind catalog item
  for (const i of CATALOG_ITEMS) {
    if (i.kind === "ENTITLEMENT") entitlementCodes.add(i.code);
  }

  cached = {
    version: PRICE_BOOK_VERSION,
    items: CATALOG_ITEMS,
    itemByCode,
    aliases: SERVICE_ALIASES,
    aliasToCanonical,
    entitlements: ENTITLEMENTS,
    entitlementCodes,
    families: TIER_FAMILIES,
    familyByMember,
    packageInclusions: PACKAGE_INCLUSIONS,
    inclusionsByPackage,
    bundleComponents: BUNDLE_COMPONENTS,
    componentsByBundle,
    technicalDependencies: TECHNICAL_DEPENDENCIES,
    neverAutoAdd: new Set(NEVER_AUTO_ADD_CODES),
  };
  return cached;
}

export function resolveToCanonical(book: PriceBook, code: string): string {
  if (book.itemByCode.has(code)) return code;
  const viaAlias = book.aliasToCanonical.get(code);
  if (viaAlias) return viaAlias;
  // Try aliasCode match
  const alias = book.aliases.find((a) => a.aliasCode === code || a.label === code);
  if (alias) return alias.canonicalCode;
  return code;
}

export function getItem(book: PriceBook, code: string): CatalogItem | undefined {
  return book.itemByCode.get(resolveToCanonical(book, code));
}

export { CANONICAL_ITEM_COUNT };
