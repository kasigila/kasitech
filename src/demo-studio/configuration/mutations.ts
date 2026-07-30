import { loadPriceBook, priceConfiguration, formatTsh } from "@/commercial";
import type { CommercialConfigState, PriceChangeEntry } from "../types";
import { priceStudioConfiguration } from "../commercial/bridge";

export function exclusiveFamilyFor(code: string): string | null {
  const book = loadPriceBook();
  for (const f of book.families) {
    if (f.members.some((m) => m.code === code)) return f.code;
  }
  return null;
}

export function replaceExclusiveMember(
  featureCodes: string[],
  nextCode: string,
): string[] {
  const book = loadPriceBook();
  const family = book.families.find((f) =>
    f.members.some((m) => m.code === nextCode),
  );
  if (!family) {
    return featureCodes.includes(nextCode)
      ? featureCodes
      : [...featureCodes, nextCode];
  }
  const memberCodes = new Set(family.members.map((m) => m.code));
  const without = featureCodes.filter((c) => !memberCodes.has(c));
  return [...without, nextCode];
}

export function detectEligibleBundles(
  state: CommercialConfigState,
): {
  bundleCode: string;
  name: string;
  showSavings: boolean;
  savingsTsh: number | null;
  matches: boolean;
}[] {
  const book = loadPriceBook();
  const withoutBundle = {
    ...state,
    bundleCode: null,
  };
  const current = new Set(
    priceStudioConfiguration(withoutBundle).resolvedCapabilityCodes,
  );

  const out: {
    bundleCode: string;
    name: string;
    showSavings: boolean;
    savingsTsh: number | null;
    matches: boolean;
  }[] = [];

  for (const item of book.items.filter((i) => i.kind === "BUNDLE")) {
    const comps = (book.componentsByBundle.get(item.code) ?? []).filter(
      (c) => c.role === "CHARGE",
    );
    if (!comps.length) continue;
    const matches = comps.every((c) => current.has(c.componentCode));
    if (!matches) continue;
    const priced = priceConfiguration({
      selections: [item.code],
      delivery: "STANDARD",
    });
    out.push({
      bundleCode: item.code,
      name: item.name,
      showSavings: priced.bundleSavings?.showSavings ?? false,
      savingsTsh: priced.bundleSavings?.savingsTsh ?? null,
      matches: true,
    });
  }
  return out;
}

export function makeChangeEntry(
  label: string,
  before: ReturnType<typeof priceStudioConfiguration>,
  after: ReturnType<typeof priceStudioConfiguration>,
): PriceChangeEntry {
  return {
    id: `chg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    label,
    deltaOneTimeTsh: after.totals.oneTimeTsh - before.totals.oneTimeTsh,
    deltaMonthlyTsh: after.totals.monthlyTsh - before.totals.monthlyTsh,
    deltaAnnualTsh: after.totals.annualTsh - before.totals.annualTsh,
  };
}

export function formatDelta(n: number | null): string {
  if (n == null || n === 0) return "";
  const sign = n > 0 ? "+" : "−";
  return `${sign} ${formatTsh(Math.abs(n))}`;
}

/** Website package codes included as CHARGE components inside a bundle. */
export function bundleWebsitePackageCode(bundleCode: string): string | null {
  const book = loadPriceBook();
  const comps = book.componentsByBundle.get(bundleCode) ?? [];
  for (const c of comps) {
    if (c.role !== "CHARGE") continue;
    if (c.componentCode.startsWith("WEB-")) return c.componentCode;
  }
  return null;
}

export type PackageBundleOverlap = {
  bundleCode: string;
  bundleName: string;
  bundleWebsiteCode: string;
  packageCode: string;
  packageName: string;
  message: string;
};

/**
 * When a website package and a bundle that already includes a website are both
 * selected, surface a clear commercial explanation (engine still authoritative).
 */
export function detectPackageBundleOverlap(
  state: CommercialConfigState,
): PackageBundleOverlap | null {
  if (!state.bundleCode || !state.packageCode) return null;
  const book = loadPriceBook();
  const bundleWeb = bundleWebsitePackageCode(state.bundleCode);
  if (!bundleWeb) return null;
  const bundle = book.itemByCode.get(state.bundleCode);
  const pkg = book.itemByCode.get(state.packageCode);
  if (!bundle || !pkg) return null;
  return {
    bundleCode: state.bundleCode,
    bundleName: bundle.name,
    bundleWebsiteCode: bundleWeb,
    packageCode: state.packageCode,
    packageName: pkg.name,
    message: `Your selected bundle (${bundle.name}) already includes website setup (${book.itemByCode.get(bundleWeb)?.name ?? bundleWeb}). Keeping an additional website package adds a separate package charge unless you remove one of them.`,
  };
}

/** Clear all members of an exclusive family from feature codes. */
export function clearExclusiveFamily(
  featureCodes: string[],
  familyCode: string,
): string[] {
  const book = loadPriceBook();
  const family = book.families.find((f) => f.code === familyCode);
  if (!family) return featureCodes;
  const memberCodes = new Set(family.members.map((m) => m.code));
  return featureCodes.filter((c) => !memberCodes.has(c));
}

export function activeExclusiveCode(
  featureCodes: string[],
  familyCode: string,
): string | null {
  const book = loadPriceBook();
  const family = book.families.find((f) => f.code === familyCode);
  if (!family) return null;
  const present = family.members
    .filter((m) => featureCodes.includes(m.code))
    .sort((a, b) => b.rank - a.rank);
  return present[0]?.code ?? null;
}
