import Link from "next/link";
import { projects } from "@/data/projects";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

export function AllDemosStrip() {
  return (
    <section className="border-t border-kasi-border bg-kasi-black px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              EXAMPLE PRODUCTS
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] md:text-5xl">
              PICK AN INDUSTRY.
              <br />
              TRY THE EXPERIENCE.
            </h2>
            <p className="mt-4 max-w-xl text-kasi-grey">
              Twelve interactive examples. Find the one closest to what you need
              and click in. That&apos;s the kind of product we build.
            </p>
          </div>
          <Link
            href="/work/all"
            className="group inline-flex min-w-[16rem] flex-col border border-kasi-green bg-kasi-green/10 px-5 py-4 transition hover:bg-kasi-green hover:text-kasi-black"
          >
            <span className="font-mono text-[10px] tracking-[0.16em] text-kasi-green group-hover:text-kasi-black/70">
              12 INTERACTIVE EXAMPLES
            </span>
            <span className="mt-1.5 font-display text-xl tracking-[-0.02em]">
              Browse all example demos →
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={p.demoPath}
              className="group border border-kasi-border transition hover:border-kasi-green"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-kasi-border">
                <SafeImage
                  src={projectCovers[p.slug] ?? projectCovers.zuri}
                  alt=""
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  fallbackLabel={p.name}
                />
              </div>
              <div className="p-4">
                <p className="font-mono text-[10px] tracking-[0.14em] text-kasi-green">
                  {p.number} · {p.industry.toUpperCase()}
                </p>
                <h3 className="mt-2 font-display text-xl tracking-[-0.02em]">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs text-kasi-grey">
                  {p.tags.join(" · ")}
                </p>
                <p className="mt-3 text-xs text-kasi-ivory/70 group-hover:text-kasi-green">
                  Try demo ↗
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
