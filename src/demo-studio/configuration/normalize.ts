import { loadPriceBook } from "@/commercial";

/**
 * Collapse exclusive-family selections to a single highest-rank member
 * so recommended starts and restored configs never imply additive tiers.
 */
export function normalizeExclusiveFeatureCodes(codes: string[]): string[] {
  const book = loadPriceBook();
  const keep = new Set(codes);
  for (const family of book.families) {
    const present = family.members
      .filter((m) => keep.has(m.code))
      .sort((a, b) => b.rank - a.rank);
    if (present.length <= 1) continue;
    for (const m of present.slice(1)) keep.delete(m.code);
  }
  return codes.filter((c) => keep.has(c));
}
