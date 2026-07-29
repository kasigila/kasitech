/** Integer TSh arithmetic — no floating point money. */

export function assertIntegerTsh(n: number, label = "amount"): number {
  if (!Number.isInteger(n)) {
    throw new Error(`${label} must be an integer TSh value, got ${n}`);
  }
  if (n < 0) {
    throw new Error(`${label} must be >= 0, got ${n}`);
  }
  return n;
}

export function sumTsh(amounts: number[]): number {
  let total = 0;
  for (const a of amounts) {
    total += assertIntegerTsh(a);
  }
  return total;
}

export function formatTsh(amount: number): string {
  assertIntegerTsh(amount);
  return `TSh ${amount.toLocaleString("en-TZ")}`;
}

/** First-year estimate: one-time + 12×monthly + annual (when all known). */
export function first12Months(
  oneTime: number,
  monthly: number,
  annual: number,
): number {
  return sumTsh([oneTime, monthly * 12, annual]);
}

export const DELIVERY_SURCHARGE_BPS: Record<
  "PRIORITY" | "RUSH" | "EMERGENCY",
  number
> = {
  PRIORITY: 2500, // +25%
  RUSH: 4000,
  EMERGENCY: 5000,
};

/** Apply basis-points surcharge to an integer base (truncate toward zero). */
export function applySurchargeBps(baseTsh: number, bps: number): number {
  assertIntegerTsh(baseTsh, "surcharge base");
  assertIntegerTsh(bps, "bps");
  return Math.trunc((baseTsh * bps) / 10_000);
}
