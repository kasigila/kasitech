import Link from "next/link";
import Image from "next/image";

export function FounderTeaser() {
  return (
    <section className="bg-kasi-ivory px-5 py-28 text-kasi-black md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-kasi-black/5">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
            alt="Editorial portrait placeholder for founder"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
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
            KasiTech was founded around a simple belief: digital products should
            do more than look impressive—they should make businesses work better.
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
