import { describe, expect, it } from "vitest";
import {
  displayItemPrice,
  getWebsitePackages,
} from "@/commercial/catalog/presentation";
import { formatTsh } from "@/commercial/money";
import {
  convertFromTsh,
  formatCatalogItemPrice,
  formatCatalogMoney,
  PRICING_FX,
} from "@/lib/pricing-currency";

describe("pricing currency conversion", () => {
  it("keeps TZS identical to the catalog TSh formatter", () => {
    expect(formatCatalogMoney(650_000, "TZS")).toBe(formatTsh(650_000));
    expect(formatCatalogMoney(1_850_000, "TZS")).toBe(formatTsh(1_850_000));
  });

  it("converts TSh to USD and CAD using 3 Sep 2026 mid-market rates", () => {
    const usd = convertFromTsh(650_000, "USD");
    const cad = convertFromTsh(650_000, "CAD");
    expect(usd).toBeCloseTo(650_000 / PRICING_FX.tzsPerUsd, 6);
    expect(cad).toBeCloseTo(650_000 / PRICING_FX.tzsPerCad, 6);
    expect(formatCatalogMoney(650_000, "USD")).toBe("US$246");
    expect(formatCatalogMoney(650_000, "CAD")).toBe("CA$341");
  });

  it("keeps monthly / yearly suffixes when converting a catalog item", () => {
    const monthly = {
      priceTsh: 150_000,
      billing: "MONTHLY" as const,
    };
    expect(formatCatalogItemPrice(monthly, "TZS")).toBe("TSh 150,000 / month");
    expect(formatCatalogItemPrice(monthly, "USD")).toMatch(/^US\$\d+ \/ month$/);
    expect(formatCatalogItemPrice(monthly, "CAD")).toMatch(/^CA\$\d+ \/ month$/);
  });

  it("does not invent prices for custom / included items", () => {
    expect(
      formatCatalogItemPrice(
        { priceTsh: null, billing: "CUSTOM_QUOTE" },
        "USD",
      ),
    ).toBe("Custom Quote");
    expect(
      formatCatalogItemPrice({ priceTsh: null, billing: "INCLUDED" }, "CAD"),
    ).toBe("Included");
  });

  it("matches package TSh labels before conversion", () => {
    const one = getWebsitePackages().find((p) => p.code === "WEB-ONE");
    expect(one).toBeTruthy();
    expect(formatCatalogItemPrice(one!, "TZS")).toBe(displayItemPrice(one!));
  });
});
