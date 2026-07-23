import Link from "next/link";

export function BeyondClientWork() {
  return (
    <section className="bg-kasi-black px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-10 border-t border-kasi-border pt-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              BEYOND CLIENT WORK
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-5xl">
              WE BUILD
              <br />
              TECHNOLOGY TOO.
            </h2>
          </div>

          <div>
            <div className="flex flex-col gap-3 font-display text-xl md:text-2xl">
              <Link href="/demo/kasi-flow" className="hover:text-kasi-green">
                Kasi Flow →
              </Link>
              <Link
                href="/demo/kasi-intelligence"
                className="hover:text-kasi-green"
              >
                Kasi Intelligence →
              </Link>
              <Link href="/lab" className="hover:text-kasi-green">
                Kasi Lab →
              </Link>
            </div>
            <Link
              href="/company#products"
              className="mt-8 inline-block text-sm text-kasi-grey hover:text-kasi-ivory"
            >
              About the company →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
