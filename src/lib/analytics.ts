type AnalyticsEvent =
  | "start_project_click"
  | "project_view"
  | "demo_launch"
  | "case_study_view"
  | "portfolio_search"
  | "portfolio_route"
  | "whatsapp_click"
  | "form_start"
  | "form_complete"
  | "capability_view"
  | "card_save_contact";

export function track(
  event: AnalyticsEvent,
  payload?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("kasi:analytics", { detail: { event, payload, t: Date.now() } }),
  );
  if (process.env.NODE_ENV === "development") {
    console.debug("[kasi]", event, payload ?? {});
  }
}
