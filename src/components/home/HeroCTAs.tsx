"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

export function HeroCTAs() {
  return (
    <div className="mt-10 flex flex-col items-start gap-4">
      <Link
        href="/start"
        onClick={() =>
          track("start_project_click", { source: "home_hero_work_with_us" })
        }
        className="inline-flex min-h-12 items-center border border-kasi-green bg-kasi-green px-6 py-3.5 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
      >
        WORK WITH US →
      </Link>
      {hasWhatsApp() ? (
        <a
          href={whatsappUrl(
            "Hi KasiTech: I'd like to talk about a project for my business.",
          )}
          onClick={() =>
            track("whatsapp_click", { source: "home_hero_contact_me" })
          }
          className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
        >
          CONTACT ME →
        </a>
      ) : (
        <Link
          href="/start"
          className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
        >
          CONTACT ME →
        </Link>
      )}
    </div>
  );
}
