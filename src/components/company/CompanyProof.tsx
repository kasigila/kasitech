"use client";

import Link from "next/link";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const projects = [
  {
    id: "climate",
    name: "Africa Climate Finance",
    category: "Institutional website",
    line: "Credibility, services, and a clear path to collaborate.",
    href: "/work/africa-climate-finance",
    image: "/work/africa-climate-finance.jpg",
    featured: true,
  },
  {
    id: "byz",
    name: "BYZ",
    category: "Events platform",
    line: "Nights, tables, and lineups - built for Dar es Salaam.",
    href: "/work/byz",
    image: "/work/byz.jpg",
    featured: false,
  },
  {
    id: "flow",
    name: "Kasi Flow",
    category: "Operations software",
    line: "CRM, finance, inventory - one operating surface.",
    href: "/work/kasi-flow",
    image: projectCovers["kasi-flow"],
    featured: false,
  },
] as const;

export function CompanyProof() {
  const featured = projects.find((p) => p.featured)!;
  const supporting = projects.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className="border-t border-kasi-border bg-kasi-ivory px-5 py-20 text-kasi-black md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-black/70">
              SELECTED WORK
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] tracking-[-0.04em]">
              BUILT, NOT JUST SAID.
            </h2>
          </div>
          <Link
            href="/work"
            className="text-sm tracking-wide text-kasi-black/60 underline decoration-kasi-black/20 underline-offset-4 transition hover:decoration-kasi-black"
          >
            All work →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.65fr_1fr] lg:gap-5">
          <Link
            href={featured.href}
            className="group relative min-h-[320px] overflow-hidden border border-kasi-black/10 bg-kasi-black md:min-h-[440px]"
          >
            <SafeImage
              src={featured.image}
              alt=""
              fill
              className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 65vw"
              fallbackLabel={featured.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kasi-black via-kasi-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                {featured.category.toUpperCase()}
              </p>
              <h3 className="mt-2 font-display text-3xl tracking-[-0.03em] text-kasi-ivory md:text-4xl">
                {featured.name}
              </h3>
              <p className="mt-2 max-w-md text-sm text-kasi-ivory/75">
                {featured.line}
              </p>
              <p className="mt-4 text-sm text-kasi-ivory/80 transition group-hover:text-kasi-green">
                View project →
              </p>
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            {supporting.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="group relative min-h-[200px] overflow-hidden border border-kasi-black/10 bg-kasi-black lg:min-h-0 lg:flex-1"
              >
                <SafeImage
                  src={p.image}
                  alt=""
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 50vw, 35vw"
                  fallbackLabel={p.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kasi-black via-kasi-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-kasi-green">
                    {p.category.toUpperCase()}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl tracking-[-0.03em] text-kasi-ivory">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-kasi-ivory/70">{p.line}</p>
                  <p className="mt-3 text-xs text-kasi-ivory/75 transition group-hover:text-kasi-green">
                    View project →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
