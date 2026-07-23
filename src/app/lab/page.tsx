import type { Metadata } from "next";
import Link from "next/link";
import { BuyCtas } from "@/components/site/BuyCtas";

export const metadata: Metadata = { title: "Kasi Lab" };

export default function LabPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          KASI LAB
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
          WHERE WE
          <br />
          EXPERIMENT.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-kasi-grey">
          Interactive research, data prototypes, and future product surfaces.
          Lab work ships when it is ready to explore, not as a promise card.
        </p>

        <article className="mt-16 border border-kasi-border p-8 md:p-12">
          <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
            NEXT UP
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] md:text-5xl">
            DAR, LIVE
          </h2>
          <p className="mt-6 max-w-xl text-kasi-ivory/85">
            An interactive Dar es Salaam data experience, neighbourhoods,
            activity and public datasets. Not advice; exploratory analysis.
          </p>
          <p className="mt-8 text-sm text-kasi-grey">
            Meanwhile, explore the products already live:
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/demo/kasi-intelligence" className="text-kasi-green hover:underline">
              Kasi Intelligence →
            </Link>
            <Link href="/demo/kasi-flow" className="text-kasi-green hover:underline">
              Kasi Flow →
            </Link>
            <Link href="/work/all" className="text-kasi-grey hover:text-kasi-ivory">
              All demos →
            </Link>
          </div>
        </article>

        <div className="mt-12">
          <p className="mb-4 text-sm text-kasi-grey">
            Ready for client work instead of lab experiments?
          </p>
          <BuyCtas source="lab" />
        </div>

        <Link href="/company" className="mt-12 inline-block text-sm hover:text-kasi-green">
          ← About the Company
        </Link>
      </div>
    </div>
  );
}
