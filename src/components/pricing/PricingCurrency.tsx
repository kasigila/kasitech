"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  PRICING_CURRENCIES,
  PRICING_FX,
  currencyShortNote,
  formatCatalogItemPrice,
  formatCatalogMoney,
  type PricingCurrency,
} from "@/lib/pricing-currency";
import type { BillingType } from "@/commercial/types";

type PricingCurrencyContextValue = {
  currency: PricingCurrency;
  setCurrency: (currency: PricingCurrency) => void;
  format: (amountTsh: number) => string;
  formatItem: (item: {
    priceTsh: number | null;
    billing: BillingType;
    clientDescription?: string;
  }) => string;
  note: string;
};

const PricingCurrencyContext =
  createContext<PricingCurrencyContextValue | null>(null);

export function PricingCurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<PricingCurrency>("TZS");

  const setCurrency = useCallback((next: PricingCurrency) => {
    setCurrencyState(next);
  }, []);

  const value = useMemo<PricingCurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      format: (amountTsh: number) => formatCatalogMoney(amountTsh, currency),
      formatItem: (item) => formatCatalogItemPrice(item, currency),
      note: currencyShortNote(currency),
    }),
    [currency, setCurrency],
  );

  return (
    <PricingCurrencyContext.Provider value={value}>
      {children}
    </PricingCurrencyContext.Provider>
  );
}

export function usePricingCurrency() {
  const ctx = useContext(PricingCurrencyContext);
  if (!ctx) {
    throw new Error("usePricingCurrency must be used within PricingCurrencyProvider");
  }
  return ctx;
}

export function CurrencySwitcher({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const { currency, setCurrency } = usePricingCurrency();
  const dark = tone === "dark";

  return (
    <div
      role="group"
      aria-label="Catalog currency"
      className={cn(
        "inline-flex border",
        dark ? "border-white/20" : "border-[#0A0A0A]/20",
        className,
      )}
    >
      {PRICING_CURRENCIES.map((option) => {
        const active = currency === option.code;
        return (
          <button
            key={option.code}
            type="button"
            aria-pressed={active}
            aria-label={`Show prices in ${option.name}`}
            onClick={() => setCurrency(option.code)}
            className={cn(
              "min-h-10 min-w-14 px-3 font-mono text-[11px] tracking-[0.14em] transition",
              active
                ? dark
                  ? "bg-[#C7FF00] text-[#0A0A0A]"
                  : "bg-[#0A0A0A] text-[#F4F2EA]"
                : dark
                  ? "text-[#F4F2EA]/70 hover:text-[#F4F2EA]"
                  : "text-[#5C5C57] hover:text-[#0A0A0A]",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function CurrencyRateNote({ className }: { className?: string }) {
  const { currency } = usePricingCurrency();
  if (currency === "TZS") return null;

  const usd = Math.round(PRICING_FX.tzsPerUsd).toLocaleString("en-TZ");
  const cad = Math.round(PRICING_FX.tzsPerCad).toLocaleString("en-TZ");

  return (
    <p className={cn("font-mono text-[10px] tracking-[0.12em] text-[#5C5C57]", className)}>
      Indicative from TSh · 1 USD ≈ TSh {usd} · 1 CAD ≈ TSh {cad} ·{" "}
      {PRICING_FX.asOfLabel}. Quotations stay in TSh unless agreed otherwise.
    </p>
  );
}
