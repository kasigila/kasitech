"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

/** Shared Start + WhatsApp close for deep pages. */
export function BuyCtas({
  source,
  className = "",
  compact = false,
}: {
  source: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <Link
        href="/start"
        onClick={() => track("start_project_click", { source })}
        className={
          compact
            ? "text-[13px] text-kasi-green hover:underline"
            : "border border-kasi-green bg-kasi-green px-5 py-3 text-sm text-kasi-black"
        }
      >
        {compact ? "Start my project →" : "START MY PROJECT ↗"}
      </Link>
      {hasWhatsApp() && (
        <a
          href={whatsappUrl()}
          onClick={() => track("whatsapp_click", { source })}
          className={
            compact
              ? "text-[13px] text-kasi-grey hover:text-kasi-ivory"
              : "text-sm text-kasi-grey hover:text-kasi-ivory"
          }
        >
          WhatsApp →
        </a>
      )}
    </div>
  );
}
