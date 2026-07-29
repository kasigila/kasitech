import type { DeliveryLevel } from "@/commercial";
import { loadPriceBook } from "@/commercial";

/**
 * Business-day calendar utility for delivery estimates.
 * Feature timelineImpact remains undefined for most SKUs — do not claim false precision.
 */

export function addBusinessDays(from: Date, businessDays: number): Date {
  const d = new Date(from);
  let remaining = businessDays;
  while (remaining > 0) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return d;
}

export type DeliveryEstimate = {
  level: DeliveryLevel;
  packageCode: string | null;
  baselineLabel: string;
  acceleratedLabel: string | null;
  /** Only set when package min/max days exist */
  calendarCompletion: { earliest: string; latest: string } | null;
  note: string;
  hasPreciseTimeline: boolean;
};

const ACCEL: Record<Exclude<DeliveryLevel, "STANDARD">, string> = {
  PRIORITY: "approximately 25% faster*",
  RUSH: "approximately 40% faster*",
  EMERGENCY: "approximately 50% faster*",
};

export function estimateDelivery(
  packageCode: string | null,
  level: DeliveryLevel,
  from: Date = new Date(),
): DeliveryEstimate {
  const book = loadPriceBook();
  const pkg = packageCode ? book.itemByCode.get(packageCode) : undefined;
  const min = pkg?.timelineMinDays ?? null;
  const max = pkg?.timelineMaxDays ?? null;

  const baselineLabel =
    min != null && max != null
      ? `${min}–${max} business days`
      : "Timeline confirmed after scope review";

  const note =
    "Estimates assume KasiTech capacity and timely client feedback. Feature timeline impacts are not yet fully quantified in KT-PB-2026.1.";

  if (min == null || max == null) {
    return {
      level,
      packageCode,
      baselineLabel,
      acceleratedLabel: level === "STANDARD" ? null : ACCEL[level],
      calendarCompletion: null,
      note,
      hasPreciseTimeline: false,
    };
  }

  const factor =
    level === "STANDARD"
      ? 1
      : level === "PRIORITY"
        ? 0.75
        : level === "RUSH"
          ? 0.6
          : 0.5;

  const adjMin = Math.max(1, Math.round(min * factor));
  const adjMax = Math.max(adjMin, Math.round(max * factor));

  return {
    level,
    packageCode,
    baselineLabel:
      level === "STANDARD"
        ? `${min}–${max} business days`
        : `${adjMin}–${adjMax} business days (${ACCEL[level]})`,
    acceleratedLabel: level === "STANDARD" ? null : ACCEL[level],
    calendarCompletion: {
      earliest: addBusinessDays(from, adjMin).toISOString().slice(0, 10),
      latest: addBusinessDays(from, adjMax).toISOString().slice(0, 10),
    },
    note,
    hasPreciseTimeline: true,
  };
}
