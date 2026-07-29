import {
  applySurchargeBps,
  assertIntegerTsh,
  DELIVERY_SURCHARGE_BPS,
  first12Months,
  sumTsh,
} from "../money";
import type {
  BundleSavings,
  CommercialCharge,
  CommercialSnapshot,
  ConfigurationInput,
  DeliveryLevel,
  PricingResult,
  PricingTotals,
  ValidationIssue,
  ValidationResult,
} from "../types";
import { getItem, loadPriceBook, resolveToCanonical, type PriceBook } from "../price-book/load";

/**
 * SELECTION → CAPABILITIES → TECHNICAL DEPS → COMMERCIAL RULES → CHARGE RECORDS
 */
export function priceConfiguration(
  input: ConfigurationInput,
  book: PriceBook = loadPriceBook(),
): PricingResult {
  const suppressed: { code: string; reason: string }[] = [];
  const entitlements = new Set<string>();
  const issues: ValidationIssue[] = [];

  // 1. Resolve aliases → canonical capability codes
  const selected = new Set<string>();
  for (const raw of input.selections) {
    const code = resolveToCanonical(book, raw);
    if (!book.itemByCode.has(code) && !book.entitlementCodes.has(code)) {
      issues.push({
        code: "UNKNOWN_SELECTION",
        severity: "error",
        message: `Unknown selection: ${raw}`,
      });
      continue;
    }
    selected.add(code);
  }

  // 2. Expand bundles into absorbed capabilities (entitlements + suppressed individual charges)
  const activeBundles: string[] = [];
  for (const code of [...selected]) {
    const item = book.itemByCode.get(code);
    if (item?.kind !== "BUNDLE") continue;
    activeBundles.push(code);
    const comps = book.componentsByBundle.get(code) ?? [];
    for (const c of comps) {
      if (c.role === "ENTITLEMENT") {
        entitlements.add(c.componentCode);
      } else {
        // Component is covered by bundle price — suppress individual charge
        if (selected.has(c.componentCode)) {
          suppressed.push({
            code: c.componentCode,
            reason: `Absorbed by bundle ${code}`,
          });
        }
        selected.add(c.componentCode); // capability active
        // Mark for charge suppression via absorbed set
      }
    }
  }
  const absorbedByBundle = new Set(
    activeBundles.flatMap((b) =>
      (book.componentsByBundle.get(b) ?? [])
        .filter((c) => c.role === "CHARGE")
        .map((c) => c.componentCode),
    ),
  );

  // 3. Exclusive tier resolution — keep highest rank only
  for (const family of book.families) {
    const present = family.members
      .map((m) => ({ ...m, selected: selected.has(m.code) }))
      .filter((m) => m.selected);
    if (present.length <= 1) continue;
    present.sort((a, b) => b.rank - a.rank);
    const winner = present[0];
    for (const loser of present.slice(1)) {
      selected.delete(loser.code);
      suppressed.push({
        code: loser.code,
        reason: `Replaced by ${winner.code} in family ${family.code}`,
      });
    }
    // Higher includes lower capability for upgrade families
    if (winner.includesLower) {
      const lower = family.members.filter((m) => m.rank < winner.rank);
      for (const l of lower) {
        // capability conceptually included — do not charge
        suppressed.push({
          code: l.code,
          reason: `${winner.code} includes ${l.code} (upgrade family ${family.code})`,
        });
      }
    }
  }

  // 4. Package inclusions → suppress add-on charges for included features
  for (const code of selected) {
    const item = book.itemByCode.get(code);
    if (item?.kind !== "PACKAGE") continue;
    const incs = book.inclusionsByPackage.get(code) ?? [];
    for (const inc of incs) {
      if (book.entitlementCodes.has(inc)) {
        entitlements.add(inc);
      }
      if (selected.has(inc) && book.itemByCode.get(inc)?.kind === "SERVICE") {
        suppressed.push({
          code: inc,
          reason: `Included in package ${code} — no add-on charge`,
        });
      }
    }
  }

  // 5. Build commercial charges — NEVER from technical deps alone; NEVER auto PAY-STD
  const charges: CommercialCharge[] = [];
  const chargedCodes = new Set<string>();

  function addCharge(charge: CommercialCharge) {
    if (chargedCodes.has(charge.itemCode)) return;
    if (charge.amountTsh != null) assertIntegerTsh(charge.amountTsh, charge.itemCode);
    chargedCodes.add(charge.itemCode);
    charges.push(charge);
  }

  // Bundles first
  for (const b of activeBundles) {
    const item = book.itemByCode.get(b)!;
    if (item.priceTsh == null) {
      issues.push({
        code: "CUSTOM_QUOTE",
        severity: "warning",
        message: `${b} requires custom quote handling`,
      });
      continue;
    }
    addCharge({
      itemCode: b,
      name: item.name,
      amountTsh: item.priceTsh,
      billing: item.billing,
      source: "BUNDLE",
      rationale: "Approved bundle price",
    });
  }

  // Other selections
  for (const code of selected) {
    if (absorbedByBundle.has(code)) continue; // covered by bundle
    if (suppressed.some((s) => s.code === code && s.reason.includes("Included in package"))) {
      continue;
    }
    if (suppressed.some((s) => s.code === code && s.reason.includes("Replaced by"))) {
      continue;
    }
    if (suppressed.some((s) => s.code === code && s.reason.includes("includes"))) {
      continue;
    }

    const item = book.itemByCode.get(code);
    if (!item) continue;
    if (item.kind === "BUNDLE") continue; // already charged
    if (item.kind === "ENTITLEMENT" || book.entitlementCodes.has(code)) {
      entitlements.add(code);
      continue;
    }
    if (item.kind === "DELIVERY_OPTION") continue; // handled via delivery input
    if (item.billing === "INCLUDED") continue;
    if (item.billing === "THIRD_PARTY") {
      issues.push({
        code: "THIRD_PARTY",
        severity: "warning",
        message: `${code} is a third-party cost — disclose separately, not as KasiTech revenue`,
      });
      continue;
    }
    if (item.priceTsh == null || item.billing === "CUSTOM_QUOTE") {
      issues.push({
        code: "CUSTOM_QUOTE",
        severity: "warning",
        message: `${code} requires custom quote — no fixed charge emitted`,
      });
      continue;
    }
    if (item.billing === "SURCHARGE") continue;

    const source =
      item.kind === "PACKAGE"
        ? "PACKAGE"
        : item.kind === "SUBSCRIPTION_TIER"
          ? "SUBSCRIPTION_TIER"
          : "SERVICE";

    addCharge({
      itemCode: code,
      name: item.name,
      amountTsh: item.priceTsh,
      billing: item.billing,
      source,
      rationale: `Explicit selection of ${code}`,
    });
  }

  // 6. Delivery surcharge against one-time project fee (excludes monthly/annual)
  const delivery: DeliveryLevel = input.delivery ?? "STANDARD";
  if (delivery !== "STANDARD") {
    const oneTimeBase = sumTsh(
      charges.filter((c) => c.billing === "ONE_TIME").map((c) => c.amountTsh),
    );
    const bps = DELIVERY_SURCHARGE_BPS[delivery];
    const surcharge = applySurchargeBps(oneTimeBase, bps);
    if (surcharge > 0) {
      addCharge({
        itemCode: `DEL-${delivery}`,
        name: `${delivery} delivery surcharge`,
        amountTsh: surcharge,
        billing: "ONE_TIME",
        source: "DELIVERY_SURCHARGE",
        rationale: `${delivery} = +${bps / 100}% of one-time project fee ${oneTimeBase}`,
      });
    }
  }

  // Guard: never auto-added PAY-STD / PAY-REC
  for (const banned of book.neverAutoAdd) {
    if (
      chargedCodes.has(banned) &&
      !input.selections.some((s) => resolveToCanonical(book, s) === banned) &&
      !activeBundles.some((b) =>
        (book.componentsByBundle.get(b) ?? []).some(
          (c) => c.role === "CHARGE" && c.componentCode === banned,
        ),
      )
    ) {
      issues.push({
        code: "AUTO_ADD_VIOLATION",
        severity: "error",
        message: `${banned} was charged without explicit selection — forbidden`,
      });
    }
  }

  const totals = computeTotals(charges);
  const bundleSavings = computeBundleSavings(book, activeBundles);
  const validation = validateResult(issues, charges, selected, book);
  const snapshot = freezeSnapshot(input.selections, charges, totals, [...entitlements]);

  return {
    priceBookVersion: book.version,
    resolvedCapabilityCodes: [...selected].sort(),
    charges,
    suppressedCodes: suppressed,
    entitlements: [...entitlements].sort(),
    totals,
    bundleSavings,
    validation,
    snapshot,
  };
}

function computeTotals(charges: CommercialCharge[]): PricingTotals {
  const oneTimeTsh = sumTsh(
    charges.filter((c) => c.billing === "ONE_TIME").map((c) => c.amountTsh),
  );
  const monthlyTsh = sumTsh(
    charges.filter((c) => c.billing === "MONTHLY").map((c) => c.amountTsh),
  );
  const annualTsh = sumTsh(
    charges.filter((c) => c.billing === "ANNUAL").map((c) => c.amountTsh),
  );
  return {
    oneTimeTsh,
    monthlyTsh,
    annualTsh,
    thirdPartyDisclosed: false,
    customQuoteRequired: false,
    estimatedFirst12MonthsTsh: first12Months(oneTimeTsh, monthlyTsh, annualTsh),
  };
}

function computeBundleSavings(
  book: PriceBook,
  activeBundles: string[],
): BundleSavings | null {
  if (activeBundles.length !== 1) return null;
  const bundleCode = activeBundles[0];
  const bundle = book.itemByCode.get(bundleCode);
  if (!bundle || bundle.priceTsh == null) return null;

  const comps = book.componentsByBundle.get(bundleCode) ?? [];
  const chargeComps = comps.filter((c) => c.role === "CHARGE");
  const hasEntWithoutPrice = comps.some((c) => c.role === "ENTITLEMENT");

  let individual = 0;
  for (const c of chargeComps) {
    const item = getItem(book, c.componentCode);
    if (!item || item.priceTsh == null) {
      return {
        showSavings: false,
        individualValueTsh: null,
        savingsTsh: null,
        reasonIfHidden: `Component ${c.componentCode} lacks approved standalone price`,
      };
    }
    individual += item.priceTsh;
  }

  // If entitlements present without comparable standalone, hide monetary savings
  // EXCEPT when all CHARGE comps are priced — admin rule: entitlements without
  // comparableStandalone cannot contribute; savings MAY still show from chargeable
  // comps only when the catalog comparison is fully chargeable.
  // Rev 1.2 policy: only show savings when comparison is entirely from genuine
  // approved standalone prices (charge comps). Entitlements simply don't add to
  // individual value — savings from charge comps alone is allowed when every
  // CHARGE component has a price. Bundles that rely on entitlements for the
  // "value story" still can show charge-comp savings (Restaurant gallery ENT).
  // Business Launch has ENT + chargeable sum 1.2M vs 1.25M → would show negative
  // savings — hide if savings <= 0 OR if we want incomplete sets hidden.
  // Prior audit: hide when entitlements make the comparable set "incomplete"
  // for Business Launch / Beauty / Tourism / Digital Growth.
  const incompleteBundles = new Set([
    "BND-LAUNCH",
    "BND-BEAUTY",
    "BND-TOUR",
    "BND-GROW",
  ]);
  if (incompleteBundles.has(bundleCode) && hasEntWithoutPrice) {
    return {
      showSavings: false,
      individualValueTsh: null,
      savingsTsh: null,
      reasonIfHidden:
        "Bundle includes non-priced entitlements — show benefits without manufacturing savings",
    };
  }

  const savings = individual - bundle.priceTsh;
  if (savings <= 0) {
    return {
      showSavings: false,
      individualValueTsh: individual,
      savingsTsh: null,
      reasonIfHidden: "No positive approved savings vs standalone chargeable components",
    };
  }

  return {
    showSavings: true,
    individualValueTsh: individual,
    savingsTsh: savings,
    reasonIfHidden: null,
  };
}

function validateResult(
  issues: ValidationIssue[],
  charges: CommercialCharge[],
  selected: Set<string>,
  book: PriceBook,
): ValidationResult {
  // Duplicate charge codes
  const seen = new Set<string>();
  for (const c of charges) {
    if (seen.has(c.itemCode)) {
      issues.push({
        code: "DUPLICATE_CHARGE",
        severity: "error",
        message: `Duplicate charge for ${c.itemCode}`,
      });
    }
    seen.add(c.itemCode);
  }

  // Exclusive family: at most one charged member
  for (const family of book.families) {
    const chargedMembers = family.members.filter((m) => seen.has(m.code));
    if (chargedMembers.length > 1) {
      issues.push({
        code: "EXCLUSIVE_FAMILY_VIOLATION",
        severity: "error",
        message: `Multiple charges in family ${family.code}: ${chargedMembers.map((m) => m.code).join(", ")}`,
      });
    }
  }

  void selected;
  const ok = !issues.some((i) => i.severity === "error");
  return { ok, issues };
}

function freezeSnapshot(
  selections: string[],
  charges: CommercialCharge[],
  totals: PricingTotals,
  entitlements: string[],
): CommercialSnapshot {
  return {
    priceBookVersion: loadPriceBook().version,
    frozenAt: new Date().toISOString(),
    selections: [...selections],
    charges: charges.map((c) => ({ ...c })),
    totals: { ...totals },
    entitlements: [...entitlements],
  };
}
