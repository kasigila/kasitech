"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { hasLinkedIn, social } from "@/lib/social";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

export function FounderConnect() {
  return (
    <section className="border-t border-kasi-border bg-kasi-black px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div className="relative flex min-h-[280px] items-end overflow-hidden border border-kasi-border bg-[#0d0d0d] p-7 md:min-h-[340px] md:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(199,255,0,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(36,36,36,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(36,36,36,0.4)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                STILL BUILDING
              </p>
              <p className="mt-5 max-w-[12ch] font-display text-3xl leading-[1.05] tracking-[-0.03em] md:text-4xl">
                Still in
                <br />
                motion.
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              STILL BUILDING
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.04em]">
              CURIOUS ABOUT
              <br />
              WHAT COMES NEXT.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-kasi-grey md:text-base">
              KasiTech is actively being built, tested and improved - one real
              business problem at a time.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {hasLinkedIn() && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="tracking-wide text-kasi-ivory underline decoration-kasi-border underline-offset-4 transition hover:text-kasi-green hover:decoration-kasi-green"
                >
                  LINKEDIN ↗
                </a>
              )}
              <Link
                href="/card"
                className="tracking-wide text-kasi-ivory underline decoration-kasi-border underline-offset-4 transition hover:text-kasi-green hover:decoration-kasi-green"
              >
                DIGITAL BUSINESS CARD ↗
              </Link>
              <Link
                href="/company"
                className="tracking-wide text-kasi-ivory underline decoration-kasi-border underline-offset-4 transition hover:text-kasi-green hover:decoration-kasi-green"
              >
                KASITECH ↗
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-kasi-border pt-14">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            WORK WITH KASITECH
          </p>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-[-0.045em]">
            HAVE SOMETHING
            <br />
            WORTH BUILDING?
          </h2>
          <p className="mt-6 max-w-md text-base text-kasi-grey">
            Tell us what you&apos;re trying to make easier.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/start"
              onClick={() =>
                track("start_project_click", { source: "founder_close" })
              }
              className="group border border-kasi-green bg-kasi-green px-6 py-3.5 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
            >
              START A PROJECT{" "}
              <span className="inline-block transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            {hasWhatsApp() ? (
              <a
                href={whatsappUrl()}
                onClick={() =>
                  track("whatsapp_click", { source: "founder_close" })
                }
                className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
              >
                TALK TO US →
              </a>
            ) : (
              <Link
                href="/company#contact"
                className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
              >
                TALK TO US →
              </Link>
            )}
          </div>
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
            Dar es Salaam, Tanzania · Working worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
