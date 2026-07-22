import type { Metadata } from "next";
import Link from "next/link";
import { HowWeThink } from "@/components/home/HowWeThink";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            ABOUT
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
            DIGITAL SHOULD
            <br />
            MOVE BUSINESS FORWARD.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-kasi-grey">
            KasiTech is a premium digital technology studio based in Dar es
            Salaam, Tanzania, with global ambitions. We build websites, commerce,
            software and intelligent systems—starting where businesses need
            momentum most.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <Link href="/company" className="hover:text-kasi-green">
              Company →
            </Link>
            <Link href="/founder" className="hover:text-kasi-green">
              Founder →
            </Link>
            <Link href="/lab" className="hover:text-kasi-green">
              Kasi Lab →
            </Link>
          </div>
        </div>
      </section>
      <HowWeThink />
    </div>
  );
}
