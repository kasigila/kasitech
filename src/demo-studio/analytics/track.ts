import type { DemoStudioEvent } from "./events";

export type { DemoStudioEvent } from "./events";

/**
 * Internal analytics abstraction — no invasive tracking in Phase 3.
 * Hooks for future integration.
 */
export function trackDemo(
  event: DemoStudioEvent,
  payload?: Record<string, string | number | boolean | undefined | null>,
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("kasi:analytics", {
      detail: { event, payload: payload ?? {}, t: Date.now(), source: "demo-studio" },
    }),
  );
  if (process.env.NODE_ENV === "development") {
    console.debug("[demo-studio]", event, payload ?? {});
  }
}
