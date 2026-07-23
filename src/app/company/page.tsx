import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Company" };

export default function CompanyPage() {
  const sections = [
    {
      id: "who",
      t: "WHO WE ARE",
      d: "KasiTech is a digital technology studio in Dar es Salaam. We design and build products that reduce friction, from first click to daily operations.",
    },
    {
      id: "build",
      t: "WHAT WE BUILD",
      d: "Experiences, commerce, systems, and intelligence. Client work and proprietary products grow side by side.",
    },
    {
      id: "why",
      t: "WHY KASITECH EXISTS",
      d: "Because beautiful isn’t enough. Digital should make businesses find, buy, book, operate, and decide faster, without rushed work.",
    },
    {
      id: "work",
      t: "HOW WE WORK",
      d: "Understand → Design → Build → Improve. Strategy informs the interface. Performance is brand proof.",
    },
    {
      id: "going",
      t: "WHERE WE’RE GOING",
      d: "From trusted digital technology services toward reusable systems and proprietary products, ambition without fake scale claims.",
    },
  ];

  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          COMPANY
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
          A TECHNOLOGY
          <br />
          COMPANY IN MOTION.
        </h1>

        <div className="mt-20 space-y-16">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                {s.t}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-kasi-ivory/90">
                {s.d}
              </p>
            </section>
          ))}

          <section id="founder">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              FOUNDER
            </h2>
            <p className="mt-4 text-lg">
              Karen Marie Kasigila : {" "}
              <Link href="/founder" className="text-kasi-green hover:underline">
                Meet the Founder →
              </Link>
            </p>
          </section>

          <section id="products">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              KASI PRODUCTS
            </h2>
            <div className="mt-6 flex flex-wrap gap-6 text-lg">
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
            <p className="mt-4 text-lg">
              Experiments and prototypes.{" "}
              <Link href="/lab" className="text-kasi-green hover:underline">
                Enter the lab →
              </Link>
            </p>
          </section>

          <section id="partnerships">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              PARTNERSHIPS
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-kasi-ivory/90">
              We partner with ambitious operators, agencies, and investors who
              care about craft and systems, not templates.
            </p>
          </section>

          <section id="contact">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              CONTACT
            </h2>
            <p className="mt-4 text-lg">
              <Link href="/start" className="text-kasi-green hover:underline">
                Start a Project ↗
              </Link>
              {" · "}
              <a href={whatsappUrl()} className="hover:underline">
                WhatsApp
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
