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
