import Link from "next/link";

export function FounderTeaser() {
  return (
    <section className="bg-kasi-ivory px-5 py-28 text-kasi-black md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
        <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-kasi-black p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#242424,transparent_55%)]" />
          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              EST. 2026 · DAR
            </p>
            <p className="mt-6 max-w-[12ch] font-display text-3xl leading-[1.1] tracking-[-0.03em] text-kasi-ivory md:text-4xl">
              Founder,
              <br />
              KasiTech
            </p>
          </div>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            FOUNDER
          </p>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
            KAREN MARIE
            <br />
            KASIGILA
          </h2>
          <p className="mt-4 text-sm text-kasi-black/70">Founder, KasiTech</p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-grey">
            Data Science × Technology × Entrepreneurship
          </p>
          <p className="mt-8 max-w-md text-base leading-relaxed text-kasi-black/75">
            KasiTech exists because digital products should make businesses work
            better, not just look finished. From Dar es Salaam, building for
            operators who need speed without shortcuts.
          </p>
          <Link
            href="/founder"
            className="mt-8 inline-block text-sm tracking-wide hover:underline"
          >
            Meet the Founder →
          </Link>
        </div>
      </div>
    </section>
  );
}
