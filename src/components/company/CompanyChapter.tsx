"use client";

import Link from "next/link";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const beyond = [
  {
    name: "KASI FLOW",
    line: "Operations software that keeps work moving.",
    href: "/work/kasi-flow",
    image: projectCovers["kasi-flow"],
    lab: false,
  },
  {
    name: "KASI INTELLIGENCE",
    line: "Ask questions. See evidence. Approve automation.",
    href: "/work/kasi-intelligence",
    image: projectCovers["kasi-intelligence"],
    lab: false,
  },
  {
    name: "KASI LAB",
    line: "Experiments and prototypes before they scale.",
    href: "/lab",
    image: projectCovers.nuru,
    lab: true,
  },
] as const;

export function CompanyChapter() {
  return (
    <section className="border-t border-kasi-border bg-kasi-black px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div id="kasi">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            OUR NAME
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] tracking-[-0.05em]">
            KASI MEANS
            <br />
            SPEED.
          </h2>
          <p className="mt-4 text-lg text-kasi-ivory/85">Not rushed work.</p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-kasi-grey">
            Speed through clarity. Speed through better systems. Speed through
            less friction.
          </p>
        </div>

        <div
          id="founder"
          className="mt-20 grid items-stretch gap-8 border-t border-kasi-border pt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        >
          <div className="relative flex min-h-[320px] items-end overflow-hidden bg-[#111] p-8 md:min-h-[380px] md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#242424,transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(199,255,0,0.08),transparent_40%)]" />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                EST. 2026 · DAR ES SALAAM, TANZANIA
              </p>
              <p className="mt-6 max-w-[12ch] font-display text-3xl leading-[1.1] tracking-[-0.03em] text-kasi-ivory md:text-4xl">
                Founder,
                <br />
                KasiTech
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              FOUNDER
            </p>
            <h3 className="mt-4 font-display text-4xl tracking-[-0.04em] md:text-5xl">
              KAREN MARIE
              <br />
              KASIGILA
            </h3>
            <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-kasi-green">
              Data Science × Technology × Entrepreneurship
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-kasi-grey">
              Building a studio that can start with a website and grow into
              software, automation, and products - without sacrificing craft.
            </p>
            <Link
              href="/founder"
              className="mt-8 inline-block text-sm tracking-wide text-kasi-ivory underline decoration-kasi-border underline-offset-4 transition hover:text-kasi-green hover:decoration-kasi-green"
            >
              Meet the founder →
            </Link>
          </div>
        </div>

        <div id="products" className="mt-20 border-t border-kasi-border pt-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              BEYOND CLIENT WORK
            </p>
            <h3 className="mt-3 font-display text-3xl tracking-[-0.035em] md:text-4xl">
              WE&apos;RE ALSO BUILDING WHAT COMES NEXT.
            </h3>
          </div>

          <div
            id="lab"
            className="-mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
          >
            {beyond.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  item.lab
                    ? "group relative w-[78%] shrink-0 snap-start overflow-hidden border border-dashed border-kasi-green/50 bg-[#0d0d0d] transition hover:border-kasi-green md:w-auto"
                    : "group relative w-[78%] shrink-0 snap-start overflow-hidden border border-kasi-border bg-[#111] transition hover:border-kasi-green md:w-auto"
                }
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeImage
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover object-top opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    sizes="(max-width: 768px) 78vw, 33vw"
                    fallbackLabel={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="font-display text-xl tracking-[-0.03em] transition group-hover:text-kasi-green">
                    {item.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-kasi-grey">
                    {item.line}
                  </p>
                  <p className="mt-4 text-xs tracking-wide text-kasi-ivory/70 group-hover:text-kasi-green">
                    Explore →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
