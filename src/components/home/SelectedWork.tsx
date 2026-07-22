import Link from "next/link";
import { getProject } from "@/data/projects";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const featuredOrder = ["zuri", "noir", "soko", "kasi-flow"] as const;

export function SelectedWork() {
  return (
    <section className="bg-kasi-black px-5 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          SELECTED WORK
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          DON&apos;T TAKE
          <br />
          OUR WORD FOR IT.
        </h2>
        <p className="mt-6 text-lg text-kasi-grey">
          Four featured concepts — then all twelve live demos below.
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-[1400px] space-y-28">
        {featuredOrder.map((slug, i) => {
          const p = getProject(slug)!;
          const reverse = i % 2 === 1;
          return (
            <article
              key={slug}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-kasi-border">
                <SafeImage
                  src={projectCovers[slug]}
                  alt={`${p.name} concept preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fallbackLabel={p.name}
                  priority={i === 0}
                />
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{ background: `${p.accent}33` }}
                />
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                  {p.number} / {p.industry.toUpperCase()}
                </p>
                <h3 className="mt-4 font-display text-5xl tracking-[-0.04em] md:text-6xl">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm text-kasi-grey">{p.summary}</p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-kasi-ivory/85">
                  {p.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={p.demoPath}
                    className="border border-kasi-green bg-kasi-green px-5 py-3 text-sm text-kasi-black"
                  >
                    {slug === "kasi-flow" ? "Try Product Demo ↗" : "Try Demo ↗"}
                  </Link>
                  <Link
                    href={p.caseStudyPath}
                    className="border border-kasi-border px-5 py-3 text-sm tracking-wide hover:border-kasi-green"
                  >
                    How it works →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
