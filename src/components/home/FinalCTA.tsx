"use client";

import Link from "next/link";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <section className="bg-kasi-black px-5 py-32 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          HAVE SOMETHING IN MIND?
        </p>
        <h2 className="mt-8 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl lg:text-8xl">
          LET&apos;S BUILD
          <br />
          WHAT&apos;S NEXT.
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Link
            href="/start"
            className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm tracking-wide text-kasi-black"
          >
            START A PROJECT ↗
          </Link>
          {hasWhatsApp() && (
            <a
              href={whatsappUrl()}
              className="text-sm text-kasi-grey hover:text-kasi-ivory"
            >
              WhatsApp →
            </a>
          )}
        </div>
        <p className="mt-6 text-[12px] text-kasi-grey">
          We reply within 24 hours on business days.
        </p>
      </div>
    </section>
  );
}
