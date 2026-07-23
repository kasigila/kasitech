import type { Metadata } from "next";
import Link from "next/link";
import { BuyCtas } from "@/components/site/BuyCtas";

export const metadata: Metadata = {
  title: "About",
  description:
    "KasiTech is a premium digital technology studio based in Dar es Salaam.",
};

/** Legacy /about route - primary story now lives on /company. */
export default function AboutPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[900px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          ABOUT
        </p>
        <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          DIGITAL SHOULD
          <br />
          MOVE BUSINESS FORWARD.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-kasi-grey">
          KasiTech is a premium digital technology studio based in Dar es Salaam,
          Tanzania, with global ambitions. We build websites, commerce, software
          and intelligent systems - starting where businesses need momentum most.
        </p>
        <div className="mt-10 flex flex-wrap gap-6 text-sm">
          <Link href="/company" className="text-kasi-green hover:underline">
            Read the full company story →
          </Link>
          <Link href="/founder" className="text-kasi-grey hover:text-kasi-ivory">
            Founder →
          </Link>
          <Link href="/faq" className="text-kasi-grey hover:text-kasi-ivory">
            FAQ →
          </Link>
        </div>
        <div className="mt-12">
          <BuyCtas source="about" />
        </div>
      </div>
    </div>
  );
}
