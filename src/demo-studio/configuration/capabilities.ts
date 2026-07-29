import { loadPriceBook } from "@/commercial";
import type { CommercialConfigState } from "../types";
import { FEATURE_REGISTRY } from "../features/registry";
import {
  priceStudioConfiguration,
  selectionsFromCommercial,
} from "../commercial/bridge";

/** Active preview flags derived from commercial capabilities + entitlements. */
export type PreviewCapabilities = Record<string, boolean>;

export function resolvePreviewCapabilities(
  state: CommercialConfigState,
): PreviewCapabilities {
  const book = loadPriceBook();
  const pricing = priceStudioConfiguration(state);
  const active = new Set([
    ...pricing.resolvedCapabilityCodes,
    ...pricing.entitlements,
  ]);

  if (state.packageCode) {
    const incs = book.inclusionsByPackage.get(state.packageCode) ?? [];
    for (const c of incs) active.add(c);
  }

  const flags: PreviewCapabilities = {};
  for (const entry of FEATURE_REGISTRY) {
    if (!entry.demoSupported) continue;
    flags[entry.previewFlag] = active.has(entry.featureCode);
  }

  if (flags.bookingStaff) flags.bookingApt = true;
  if (flags.menuAdvanced) flags.menu = true;
  if (flags.trackingLive) flags.tracking = true;
  if (flags.storeAdvanced || flags.storeBusiness) flags.store = true;

  return flags;
}

export function activeCapabilitySet(state: CommercialConfigState): Set<string> {
  const pricing = priceStudioConfiguration(state);
  return new Set([...pricing.resolvedCapabilityCodes, ...pricing.entitlements]);
}

export function isIncludedWithoutCharge(
  code: string,
  state: CommercialConfigState,
): boolean {
  const pricing = priceStudioConfiguration(state);
  return pricing.suppressedCodes.some((s) => s.code === code);
}

export function buildSelectionList(state: CommercialConfigState): string[] {
  return selectionsFromCommercial(state);
}

export { priceStudioConfiguration };
