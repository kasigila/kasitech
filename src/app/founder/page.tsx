import type { Metadata } from "next";
import Link from "next/link";
import { BuyCtas } from "@/components/site/BuyCtas";
import { hasLinkedIn, social } from "@/lib/social";

export const metadata: Metadata = {
  title: "Founder - Karen Marie Kasigila",
  description:
    "Karen Marie Kasigila - Founder of KasiTech. Data Science × Technology × Entrepreneurship.",
  openGraph: {
    title: "Karen Marie Kasigila · Founder, KasiTech",
    description:
      "Data Science × Technology × Entrepreneurship. Building digital products that work from Dar es Salaam.",
  },
};

export default function FounderPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Intro */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-kasi-black p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#242424,transparent_55%)]" />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                EST. 2026 · DAR ES SALAAM
              </p>
              <p className="mt-6 max-w-[14ch] font-display text-3xl leading-[1.1] tracking-[-0.03em] text-kasi-ivory md:text-5xl">
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
            <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-6xl lg:text-7xl">
              KAREN MARIE
              <br />
              KASIGILA
            </h1>
            <p className="mt-4 text-kasi-grey">Founder, KasiTech</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-green">
              Data Science × Technology × Entrepreneurship
            </p>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-kasi-ivory/85">
              Building a technology studio that can start with a website and grow
              into software, automation, and products - without sacrificing craft.
            </p>
          </div>
        </div>

        {/* Editorial story */}
        <div className="mx-auto mt-28 max-w-[720px] space-y-20">
          <section>
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              ORIGIN
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-kasi-ivory/90 md:text-2xl">
              KasiTech started in Dar es Salaam around a practical idea: digital
              products should reduce friction - help people find, book, buy,
              operate and decide faster - without rushing the craft.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              INTERSECTION
            </h2>
            <p className="mt-6 text-base leading-relaxed text-kasi-ivory/80">
              With a background spanning data science and building systems, Karen
              leads KasiTech at the intersection of technical depth and
              entrepreneurial judgment. That combination shapes how the studio
              scopes work: understand the business first, then design the
              interface and the system behind it.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              APPROACH
            </h2>
            <p className="mt-6 text-base leading-relaxed text-kasi-ivory/80">
              Looking good isn&apos;t the job. Every experience should attract,
              convert, or help the business operate. KasiTech grows with clients
              - from a first website into commerce, internal tools, and
              intelligence - when the business is ready.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              VISION
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-kasi-ivory/90 md:text-2xl">
              A technology company in motion - trusted services today, reusable
              systems and proprietary products tomorrow. Ambition without fake
              scale.
            </p>
          </section>
        </div>

        <div className="mx-auto mt-24 max-w-[720px] space-y-6">
          <BuyCtas source="founder" />
          <div className="flex flex-wrap gap-6 text-sm">
            {hasLinkedIn() && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-kasi-grey hover:text-kasi-green"
              >
                LinkedIn ↗
              </a>
            )}
            <Link
              href="/card"
              className="text-kasi-grey hover:text-kasi-green"
            >
              Digital business card →
            </Link>
            <Link
              href="/company"
              className="text-kasi-grey hover:text-kasi-green"
            >
              Company →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
