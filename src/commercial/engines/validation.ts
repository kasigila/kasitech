import { loadPriceBook, CANONICAL_ITEM_COUNT } from "../price-book/load";
import type { ValidationIssue } from "../types";

/** Static integrity checks for KT-PB-2026.1 before any pricing run. */
export function validatePriceBookIntegrity(): {
  ok: boolean;
  issues: ValidationIssue[];
} {
  const issues: ValidationIssue[] = [];
  const book = loadPriceBook();

  if (book.items.length !== CANONICAL_ITEM_COUNT) {
    issues.push({
      code: "COUNT",
      severity: "error",
      message: `Expected ${CANONICAL_ITEM_COUNT} canonical items, got ${book.items.length}`,
    });
  }

  for (const a of book.aliases) {
    if (!book.itemByCode.has(a.canonicalCode)) {
      issues.push({
        code: "ALIAS",
        severity: "error",
        message: `${a.aliasCode} → missing ${a.canonicalCode}`,
      });
    }
  }

  for (const e of book.entitlements) {
    if (e.sellable) {
      issues.push({
        code: "ENTITLEMENT",
        severity: "error",
        message: `${e.code} must not be sellable`,
      });
    }
    if (e.comparableStandaloneCode != null) {
      issues.push({
        code: "ENTITLEMENT_PRICE",
        severity: "error",
        message: `${e.code} must not invent a comparable standalone price`,
      });
    }
  }

  const requiredFamilies = [
    "ECOM_STORE",
    "SEO_SETUP",
    "SEO_RECURRING",
    "SOCIAL_PLAN",
    "CARE_PLAN",
    "KB_PLAN",
    "BOOKING_APPOINTMENT",
    "RESTAURANT_MENU",
    "LOGISTICS_TRACKING",
    "WEBSITE_PACKAGE",
  ];
  for (const code of requiredFamilies) {
    if (!book.families.some((f) => f.code === code)) {
      issues.push({
        code: "FAMILY",
        severity: "error",
        message: `Missing exclusive family ${code}`,
      });
    }
  }

  for (const item of book.items) {
    if (item.priceTsh != null && !Number.isInteger(item.priceTsh)) {
      issues.push({
        code: "MONEY",
        severity: "error",
        message: `${item.code} priceTsh is not an integer`,
      });
    }
    if (item.timelineImpactDays != null) {
      issues.push({
        code: "TIMELINE",
        severity: "warning",
        message: `${item.code} has timelineImpactDays set — confirm admin approval`,
      });
    }
  }

  return { ok: !issues.some((i) => i.severity === "error"), issues };
}
