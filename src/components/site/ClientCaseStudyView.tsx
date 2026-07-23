import type { Metadata } from "next";
import Link from "next/link";
import { getShippedWork, shippedWork } from "@/data/shipped-work";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SafeImage } from "@/components/ui/SafeImage";
import { BuyCtas } from "@/components/site/BuyCtas";

export function ClientCaseStudyView({ slug }: { slug: string }) {
  const work = getShippedWork(slug);
  if (!work) return null;

  const related = shippedWork.filter((w) => w.slug !== slug).slice(0, 2);

  return (
    <article className="bg-kasi-black text-kasi-ivory">
      <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-32 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          CLIENT WORK · {work.year}
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
          {work.name}
        </h1>
        <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
          {work.role.toUpperCase()} · {work.industry.toUpperCase()} ·{" "}
          {work.location.toUpperCase()}
        </p>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-kasi-ivory/90">
          {work.outcome}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={work.url}
            target="_blank"
            rel="noreferrer"
            className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
          >
            Visit live site ↗
          </a>
          <Link
            href="/start"
            className="border border-kasi-border px-6 py-3 text-sm"
          >
            Start a similar project →
          </Link>
        </div>

        <div className="mt-14">
          <BrowserFrame
            url={work.url
              .replace(/^https?:\/\//, "")
              .replace(/\/index\.html$/, "")}
          >
            <div className="relative aspect-[21/10] overflow-hidden">
              {work.cover ? (
                <SafeImage
                  src={work.cover}
                  alt={`${work.name} live website`}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                  priority
                  fallbackLabel={work.name}
                />
              ) : null}
            </div>
          </BrowserFrame>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-2">
          <section>
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              CHALLENGE
            </h2>
            <p className="mt-4 text-base leading-relaxed text-kasi-ivory/85">
              {work.challenge}
            </p>
          </section>
          <section>
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              SOLUTION
            </h2>
            <p className="mt-4 text-base leading-relaxed text-kasi-ivory/85">
              {work.summary}
            </p>
          </section>
        </div>

        <section className="mt-20">
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
            KEY CAPABILITIES
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {work.capabilities.map((item) => (
              <li
                key={item}
                className="border-b border-kasi-border pb-3 text-sm text-kasi-ivory/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 border-t border-kasi-border pt-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            OUTCOME
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-kasi-ivory/90">
            {work.outcome}
          </p>
          <p className="mt-4 text-sm text-kasi-grey">
            No invented metrics. Results speak through the shipped product.
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-20 border-t border-kasi-border pt-12">
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              MORE CLIENT WORK
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={r.caseStudyPath}
                  className="font-display text-2xl tracking-[-0.03em] hover:text-kasi-green"
                >
                  {r.name} →
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-20">
          <BuyCtas source="client_case_study" />
          <Link
            href="/work#client-work"
            className="mt-8 inline-block text-sm text-kasi-grey hover:text-kasi-green"
          >
            ← Back to Work
          </Link>
        </section>
      </div>
    </article>
  );
}

export function clientCaseStudyMetadata(slug: string): Metadata {
  const work = getShippedWork(slug);
  if (!work) return { title: "Work" };
  return {
    title: work.name,
    description: work.outcome,
    openGraph: {
      title: `${work.name} · KasiTech`,
      description: work.outcome,
      type: "article",
    },
  };
}
