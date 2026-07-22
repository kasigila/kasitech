import Link from "next/link";
import { projects } from "@/data/projects";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Work",
};

export default function AllWorkPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          ALL 12 DEMOS
        </p>
        <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] md:text-6xl">
          EVERYTHING.
        </h1>
        <p className="mt-6 max-w-xl text-kasi-grey">
          Each concept is a working product you can click through — guest view
          and business view where it matters.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="flex flex-col border border-kasi-border"
            >
              <Link href={p.demoPath} className="relative aspect-[16/10] block overflow-hidden bg-kasi-border">
                <SafeImage
                  src={projectCovers[p.slug] ?? projectCovers.zuri}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  fallbackLabel={p.name}
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-green">
                  {p.number} · {p.industry.toUpperCase()}
                </p>
                <h2 className="mt-3 font-display text-3xl tracking-[-0.03em]">
                  {p.name}
                </h2>
                <p className="mt-2 text-sm text-kasi-grey">
                  {p.tags.join(" · ")}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-kasi-ivory/80">
                  {p.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <Link
                    href={p.demoPath}
                    className="border border-kasi-green bg-kasi-green px-4 py-2 text-kasi-black"
                  >
                    Try demo ↗
                  </Link>
                  <Link
                    href={p.caseStudyPath}
                    className="border border-kasi-border px-4 py-2 hover:border-kasi-green"
                  >
                    How it works →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
