import type { BillingType } from "@/commercial/types";

export type PricingCurrency = "TZS" | "CAD" | "USD";

export const PRICING_CURRENCIES: {
  code: PricingCurrency;
  label: string;
  name: string;
}[] = [
  { code: "TZS", label: "TZS", name: "Tanzanian Shilling" },
  { code: "CAD", label: "CAD", name: "Canadian Dollar" },
  { code: "USD", label: "USD", name: "US Dollar" },
];

/**
 * Mid-market rates as of 3 September 2026 (ExchangeRate-API, USD base).
 * Catalog source of truth remains integer TSh; CAD/USD are indicative.
 *
 * 1 USD = 2,644.109559 TZS
 * 1 USD = 1.386499 CAD → 1 CAD = 2,644.109559 / 1.386499 TZS
 */
export const PRICING_FX = {
  asOfIso: "2026-09-03",
  asOfLabel: "3 September 2026",
  source: "ExchangeRate-API mid-market",
  tzsPerUsd: 2644.109559,
  tzsPerCad: 2644.109559 / 1.386499,
} as const;

export function isPricingCurrency(value: unknown): value is PricingCurrency {
  return value === "TZS" || value === "CAD" || value === "USD";
}

export function tzsPerUnit(currency: PricingCurrency): number {
  if (currency === "TZS") return 1;
  if (currency === "USD") return PRICING_FX.tzsPerUsd;
  return PRICING_FX.tzsPerCad;
}

/** Convert a catalog TSh amount into the selected currency (unrounded). */
export function convertFromTsh(
  amountTsh: number,
  currency: PricingCurrency,
): number {
  return amountTsh / tzsPerUnit(currency);
}

export function formatCatalogMoney(
  amountTsh: number,
  currency: PricingCurrency,
): string {
  if (currency === "TZS") {
    return `TSh ${Math.round(amountTsh).toLocaleString("en-TZ")}`;
  }
  const converted = convertFromTsh(amountTsh, currency);
  const rounded = Math.round(converted);
  const grouped = rounded.toLocaleString(currency === "CAD" ? "en-CA" : "en-US");
  return currency === "CAD" ? `CA$${grouped}` : `US$${grouped}`;
}

type PricedItem = {
  priceTsh: number | null;
  billing: BillingType;
  clientDescription?: string;
};

export function formatCatalogItemPrice(
  item: PricedItem,
  currency: PricingCurrency,
): string {
  if (item.billing === "CUSTOM_QUOTE" || item.priceTsh == null) {
    if (item.billing === "SURCHARGE") {
      return item.clientDescription || "Surcharge";
    }
    if (item.billing === "THIRD_PARTY") return "Third-party";
    if (item.billing === "INCLUDED") return "Included";
    return "Custom Quote";
  }
  const base = formatCatalogMoney(item.priceTsh, currency);
  if (item.billing === "MONTHLY") return `${base} / month`;
  if (item.billing === "ANNUAL") return `${base} / year`;
  return base;
}

export function currencyShortNote(currency: PricingCurrency): string {
  if (currency === "TZS") return "All prices in TSh";
  return `Prices in ${currency} (from TSh)`;
}
