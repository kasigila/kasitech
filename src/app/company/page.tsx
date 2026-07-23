import type { Metadata } from "next";
import Link from "next/link";
import { HowWeThink } from "@/components/home/HowWeThink";
import { KasiMeansSpeed } from "@/components/home/KasiMeansSpeed";
import { BeautifulIsntEnough } from "@/components/home/BeautifulIsntEnough";
import { BuyCtas } from "@/components/site/BuyCtas";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Company",
  description:
    "KasiTech is a digital technology studio in Dar es Salaam - why we exist, how we think, and where we're going.",
};

export default function CompanyPage() {
  return (
    <div className="pt-28">
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            COMPANY
          </p>
          <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
            A TECHNOLOGY
            <br />
            COMPANY IN MOTION.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-kasi-grey">
            KasiTech is a digital technology studio in Dar es Salaam. We design
            and build products that reduce friction - from first click to daily
            operations.
          </p>
        </div>
      </section>

      {/* Philosophy - migrated from homepage */}
      <BeautifulIsntEnough />

      <section className="border-y border-kasi-border px-5 py-24 md:px-8">
        <div className="mx-auto max-w-[1100px] space-y-20">
          <section id="who">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              WHO WE ARE
            </h2>
            <p className="mt-6 max-w-2xl text-2xl leading-snug tracking-[-0.02em] text-kasi-ivory md:text-3xl">
              A studio that builds websites, commerce, software, and intelligent
              systems - with the ambition to grow into reusable products.
            </p>
          </section>

          <section id="why">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              WHY KASITECH EXISTS
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-kasi-ivory/85">
              Because beautiful isn&apos;t enough. Digital should help businesses
              find, buy, book, operate, and decide faster - without rushing the
              craft.
            </p>
          </section>

          <section id="kasi">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              WHAT &ldquo;KASI&rdquo; MEANS
            </h2>
            <p className="mt-6 max-w-[12ch] font-display text-5xl tracking-[-0.04em] md:text-6xl">
              SPEED.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-kasi-grey">
              Not rushed work. Less friction, so business moves. The name is a
              commitment: every product should earn its place by making something
              faster, clearer, or more operable.
            </p>
          </section>

          <section id="build">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              WHAT WE BUILD
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-kasi-ivory/85">
              Experiences, commerce, systems, and intelligence. Client work and
              proprietary products grow side by side.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <Link href="/capabilities" className="text-kasi-green hover:underline">
                Capabilities →
              </Link>
              <Link href="/work" className="text-kasi-grey hover:text-kasi-ivory">
                Work →
              </Link>
            </div>
          </section>

          <section id="going">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              WHERE WE&apos;RE GOING
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-kasi-ivory/85">
              From trusted digital technology services toward reusable systems
              and proprietary products - ambition without fake scale claims.
            </p>
          </section>
        </div>
      </section>

      <div id="work">
        <HowWeThink />
      </div>
      <KasiMeansSpeed />

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-16 md:grid-cols-2">
            <section id="founder">
              <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                FOUNDER
              </h2>
              <p className="mt-4 text-lg">
                Karen Marie Kasigila
              </p>
              <Link
                href="/founder"
                className="mt-4 inline-block text-sm text-kasi-green hover:underline"
              >
                Meet the Founder →
              </Link>
            </section>

            <section id="products">
              <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                KASI PRODUCTS
              </h2>
              <div className="mt-4 flex flex-col gap-3 text-lg">
                <Link href="/work/kasi-flow" className="hover:text-kasi-green">
                  Kasi Flow
                </Link>
                <Link
                  href="/work/kasi-intelligence"
                  className="hover:text-kasi-green"
                >
                  Kasi Intelligence
                </Link>
              </div>
            </section>

            <section id="lab">
              <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                KASI LAB
              </h2>
              <p className="mt-4 text-base text-kasi-grey">
                Experiments and prototypes.
              </p>
              <Link
                href="/lab"
                className="mt-4 inline-block text-sm text-kasi-green hover:underline"
              >
                Enter the lab →
              </Link>
            </section>

            <section id="contact">
              <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                CONTACT
              </h2>
              <div className="mt-6">
                <BuyCtas source="company" />
              </div>
              {hasWhatsApp() && (
                <a
                  href={whatsappUrl()}
                  className="mt-4 inline-block text-sm text-kasi-grey hover:text-kasi-ivory"
                >
                  Or WhatsApp directly →
                </a>
              )}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
