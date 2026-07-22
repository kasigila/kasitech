import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Kasi Lab" };

export default function LabPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          KASI LAB
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
          EXPERIMENTS
          <br />
          IN PUBLIC.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-kasi-grey">
          Future technology, interactive research, AI prototypes and data
          visualization. This is where KasiTech explores before packaging.
        </p>

        <article className="mt-16 border border-kasi-border p-8 md:p-12">
          <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
            FLAGSHIP EXPERIMENT
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] md:text-5xl">
            DAR, LIVE
          </h2>
          <p className="mt-6 max-w-xl text-kasi-ivory/85">
            An interactive Dar es Salaam data experience—neighborhoods, business
            activity, mobility and public datasets. Ask questions like &quot;Where
            might a new coffee shop perform well?&quot; Analysis is exploratory,
            not guaranteed advice.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-kasi-green">
            IN PROGRESS · PROTOTYPE SURFACE
          </p>
        </article>

        <Link href="/company" className="mt-12 inline-block text-sm hover:text-kasi-green">
          ← About the Company
        </Link>
      </div>
    </div>
  );
}
