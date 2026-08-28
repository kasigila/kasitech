import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { CATALOG_ITEMS } from "@/commercial/price-book/seed/items";
import {
  JEMBE_BUNDLE_SAVINGS_TSH,
  JEMBE_CARE,
  JEMBE_COMMENCEMENT_TSH,
  JEMBE_DESIGN_TSH,
  JEMBE_INVOICE_REF,
  JEMBE_LAUNCH_TSH,
  JEMBE_LINE_ITEMS,
  JEMBE_ONE_TIME_TSH,
  JEMBE_PAYMENT,
  JEMBE_PROPOSAL_REF,
} from "@/proposals/jembe-group/commercial";

function catalogPrice(code: string): number {
  const item = CATALOG_ITEMS.find((i) => i.code === code);
  expect(item, `missing catalog code ${code}`).toBeTruthy();
  expect(item!.priceTsh, `${code} must have a catalog price`).toEqual(
    expect.any(Number),
  );
  return item!.priceTsh as number;
}

describe("Jembe Group commercial KT-JEM-WEB-2026-001", () => {
  it("uses catalog-valid SKUs and prices", () => {
    expect(catalogPrice("BND-PRES")).toBe(3_750_000);
    expect(catalogPrice("WEB-PRO")).toBe(3_250_000);
    expect(catalogPrice("SEO-PRO")).toBe(750_000);
    expect(catalogPrice("LOC-GBP")).toBe(150_000);
    expect(catalogPrice("ADD-QUOTE")).toBe(300_000);
    expect(catalogPrice("ADD-SRCH")).toBe(350_000);
    expect(catalogPrice("COPY-20")).toBe(1_100_000);
    expect(catalogPrice("CARE-PRO")).toBe(150_000);

    for (const line of JEMBE_LINE_ITEMS) {
      expect(line.amountTsh).toBe(catalogPrice(line.code));
    }
    expect(JEMBE_CARE.amountTsh).toBe(catalogPrice("CARE-PRO"));
  });

  it("adds line items to TSh 5,500,000 with documented bundle savings", () => {
    expect(JEMBE_ONE_TIME_TSH).toBe(5_500_000);
    expect(JEMBE_LINE_ITEMS.map((l) => l.code)).toEqual([
      "BND-PRES",
      "ADD-QUOTE",
      "ADD-SRCH",
      "COPY-20",
    ]);
    expect(JEMBE_BUNDLE_SAVINGS_TSH).toBe(400_000);
    const bnd = JEMBE_LINE_ITEMS[0];
    expect(bnd.standaloneWouldBeTsh - bnd.amountTsh).toBe(bnd.savingsTsh);
  });

  it("uses the catalog payment schedule for amounts above TSh 5,000,000", () => {
    expect(JEMBE_ONE_TIME_TSH).toBeGreaterThan(5_000_000);
    expect(JEMBE_PAYMENT).toEqual({
      commencementPct: 50,
      designApprovalPct: 30,
      launchPct: 20,
    });
    expect(JEMBE_COMMENCEMENT_TSH).toBe(2_750_000);
    expect(JEMBE_DESIGN_TSH).toBe(1_650_000);
    expect(JEMBE_LAUNCH_TSH).toBe(1_100_000);
    expect(
      JEMBE_COMMENCEMENT_TSH + JEMBE_DESIGN_TSH + JEMBE_LAUNCH_TSH,
    ).toBe(JEMBE_ONE_TIME_TSH);
  });

  it("keeps proposal and invoice references distinct", () => {
    expect(JEMBE_PROPOSAL_REF).toBe("KT-JEM-WEB-2026-001");
    expect(JEMBE_INVOICE_REF).toBe("KT-INV-JEM-2026-001");
    expect(JEMBE_INVOICE_REF).not.toBe(JEMBE_PROPOSAL_REF);
  });

  it("splits commencement 50% evenly across catalog lines", () => {
    const billed = JEMBE_LINE_ITEMS.map((l) => l.amountTsh / 2);
    expect(billed).toEqual([1_875_000, 150_000, 175_000, 550_000]);
    expect(billed.reduce((a, b) => a + b, 0)).toBe(JEMBE_COMMENCEMENT_TSH);
  });
});

describe("Jembe client-facing HTML stays on the commercial figures", () => {
  it("proposal HTML quotes the approved total, codes, and payment split", () => {
    const html = readFileSync(
      resolve(process.cwd(), "proposals/jembe-group/index.html"),
      "utf8",
    );
    expect(html).toContain("KT-JEM-WEB-2026-001");
    expect(html).toContain("TSh 5,500,000");
    expect(html).toContain("TSh 2,750,000");
    expect(html).toContain("TSh 1,650,000");
    expect(html).toContain("TSh 1,100,000");
    expect(html).toContain("BND-PRES");
    expect(html).toContain("ADD-QUOTE");
    expect(html).toContain("ADD-SRCH");
    expect(html).toContain("COPY-20");
    expect(html).toContain("CARE-PRO");
    expect(html).toContain("KT-INV-JEM-2026-001");
  });

  it("invoice HTML bills only the commencement instalment", () => {
    const html = readFileSync(
      resolve(process.cwd(), "proposals/jembe-invoice/index.html"),
      "utf8",
    );
    expect(html).toContain("KT-INV-JEM-2026-001");
    expect(html).toContain("1,875,000");
    expect(html).toContain("150,000");
    expect(html).toContain("175,000");
    expect(html).toContain("550,000");
    expect(html).toContain("TSh 2,750,000");
    expect(html).toContain("Do not pay any account that is not confirmed by KasiTech");
    expect(html).not.toContain("TSh 5,500,000 due");
  });
});
