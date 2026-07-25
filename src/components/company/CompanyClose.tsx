"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

export function CompanyClose() {
  return (
    <section
      id="contact"
      className="border-t border-kasi-border bg-kasi-black px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          NEXT STEP
        </p>
        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.045em]">
          HAVE SOMETHING
          <br />
          WORTH BUILDING?
        </h2>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-kasi-grey md:text-lg">
          Whether you&apos;re starting with a website, improving an existing
          digital experience or building a system around your business, tell us
          what you&apos;re trying to accomplish.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Link
            href="/start"
            onClick={() => track("start_project_click", { source: "company_close" })}
            className="group border border-kasi-green bg-kasi-green px-6 py-3.5 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
          >
            Start a project{" "}
            <span className="inline-block transition group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          {hasWhatsApp() && (
            <a
              href={whatsappUrl()}
              onClick={() => track("whatsapp_click", { source: "company_close" })}
              className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
            >
              Talk to us on WhatsApp →
            </a>
          )}
        </div>
        <p className="mt-10 font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
          Dar es Salaam, Tanzania · Working worldwide
        </p>
      </div>
    </section>
  );
}
