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
  | "form_delivery_failed"
  | "capability_view"
  | "card_save_contact"
  | "card_view_catalog"
  | "card_download_catalog";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean | undefined> },
    ) => void;
  }
}

export function track(
  event: AnalyticsEvent,
  payload?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;

  const detail = { event, payload, t: Date.now() };
  window.dispatchEvent(new CustomEvent("kasi:analytics", { detail }));

  // GA4 / GTM via dataLayer when present
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: `kasi_${event}`,
    ...payload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  // Plausible custom events when script is loaded
  if (typeof window.plausible === "function") {
    window.plausible(event, { props: payload });
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[kasi]", event, payload ?? {});
  }
}
