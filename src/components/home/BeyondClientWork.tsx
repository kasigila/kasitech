import Link from "next/link";

export function BeyondClientWork() {
  return (
    <section className="bg-kasi-black px-5 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          BEYOND CLIENT WORK
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          WE DON&apos;T JUST
          <br />
          BUILD FOR BUSINESSES.
        </h2>
        <p className="mt-8 max-w-xl font-display text-2xl tracking-[-0.03em] md:text-4xl">
          WE BUILD
          <br />
          TECHNOLOGY TOO.
        </p>

        <div className="mt-14 flex flex-wrap gap-8 font-display text-2xl md:text-3xl">
          <Link href="/work/kasi-flow" className="hover:text-kasi-green">
            Kasi Flow
          </Link>
          <Link href="/work/kasi-intelligence" className="hover:text-kasi-green">
            Kasi Intelligence
          </Link>
          <Link href="/lab" className="hover:text-kasi-green">
            Kasi Lab
          </Link>
        </div>

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-kasi-grey">
          KasiTech explores reusable technology, intelligent systems and digital
          products alongside client work.
        </p>

        <div className="mt-10 flex flex-wrap gap-6 text-sm">
          <Link href="/company#products" className="hover:text-kasi-green">
            Explore Kasi Products →
          </Link>
          <Link href="/company" className="text-kasi-grey hover:text-kasi-ivory">
            About the Company →
          </Link>
        </div>
      </div>
    </section>
  );
}
