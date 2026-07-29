import {
  PRICE_BOOK_VERSION,
  priceConfiguration,
  type DeliveryLevel,
  type PricingResult,
} from "@/commercial";
import type { CommercialConfigState } from "../types";

const DELIVERY_CODES: Record<DeliveryLevel, string> = {
  STANDARD: "DEL-STD",
  PRIORITY: "DEL-PRI",
  RUSH: "DEL-RUSH",
  EMERGENCY: "DEL-EMER",
};

/**
 * Map Demo Studio commercial state → Phase 1 priceConfiguration selections.
 * UI never totals independently.
 */
export function selectionsFromCommercial(
  state: CommercialConfigState,
): string[] {
  const selections: string[] = [];
  if (state.packageCode) selections.push(state.packageCode);
  if (state.bundleCode) selections.push(state.bundleCode);
  for (const code of state.featureCodes) selections.push(code);
  if (state.carePlan) selections.push(state.carePlan);
  if (state.kbPlan) selections.push(state.kbPlan);
  if (state.seoSetup) selections.push(state.seoSetup);
  if (state.seoRecurring) selections.push(state.seoRecurring);
  if (state.socialPlan) selections.push(state.socialPlan);
  // Delivery level is passed separately; do not also add DEL-* as chargeable selection
  // (engine applies surcharge via delivery option). Keep DEL code out of selections.
  void DELIVERY_CODES;
  return [...new Set(selections)];
}

export function priceStudioConfiguration(
  state: CommercialConfigState,
): PricingResult {
  return priceConfiguration({
    selections: selectionsFromCommercial(state),
    delivery: state.delivery,
  });
}

export function emptyCommercialState(): CommercialConfigState {
  return {
    industry: null,
    startMode: null,
    packageCode: null,
    bundleCode: null,
    featureCodes: [],
    carePlan: null,
    kbPlan: null,
    seoSetup: null,
    seoRecurring: null,
    socialPlan: null,
    delivery: "STANDARD",
  };
}

export function isCurrentPriceBook(version: string): boolean {
  return version === PRICE_BOOK_VERSION;
}

/** Client-friendly validation messages from engine issues. */
export function clientValidationMessages(result: PricingResult): string[] {
  return result.validation.issues
    .filter((i) => i.severity === "error")
    .map((i) => {
      if (i.code === "UNKNOWN_SELECTION") {
        return "One of the selected features is not available in the current catalog.";
      }
      return "This build needs a small adjustment before we can save or estimate it.";
    });
}
