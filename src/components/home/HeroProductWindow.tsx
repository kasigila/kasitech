"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { getProjectBlurb } from "@/data/project-blurbs";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

/** Hero preview - cycles all concept demos. */
export function HeroProductWindow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const project = projects[index];
  const blurb = getProjectBlurb(project.slug, project.description);

  return (
    <div className="relative mx-auto w-full max-w-md md:mx-0">
      <div className="mb-3 flex items-end justify-between gap-3">
        <p className="max-w-[14rem] text-sm leading-relaxed text-kasi-grey">
          Examples of what yours could feel like. Tap one to try it.
        </p>
        <p className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
          {project.number} / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            <Link
              href={project.demoPath}
              className="group block border border-kasi-border bg-kasi-black transition hover:border-kasi-green"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-kasi-border">
                <SafeImage
                  src={projectCovers[project.slug] ?? projectCovers.zuri}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  fallbackLabel={project.name}
                  priority={index === 0}
                />
              </div>
              <div className="p-4">
                <p className="font-mono text-[10px] tracking-[0.14em] text-kasi-green">
                  {project.number} · {project.industry.toUpperCase()}
                </p>
                <h3 className="mt-2 font-display text-xl tracking-[-0.02em]">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-kasi-grey">
                  {blurb}
                </p>
                <p className="mt-3 text-xs text-kasi-ivory/70 group-hover:text-kasi-green">
                  Try demo ↗
                </p>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Show ${p.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-4 bg-kasi-green"
                  : "w-1.5 bg-kasi-border hover:bg-kasi-grey"
              }`}
            />
          ))}
        </div>

        <Link
          href="/work#concepts"
          className="group mt-6 flex w-full items-center justify-between gap-4 border border-kasi-green bg-kasi-green/10 px-5 py-4 transition hover:bg-kasi-green hover:text-kasi-black"
        >
          <span className="text-left">
            <span className="block font-mono text-[10px] tracking-[0.16em] text-kasi-green group-hover:text-kasi-black/70">
              12 INTERACTIVE EXAMPLES
            </span>
            <span className="mt-1.5 block font-display text-xl tracking-[-0.02em] md:text-2xl">
              Browse all example demos
            </span>
            <span className="mt-1 block text-sm text-kasi-grey group-hover:text-kasi-black/75">
              Hotels, shops, clinics, logistics, and more. Pick one and try it.
            </span>
          </span>
          <span
            aria-hidden
            className="shrink-0 font-display text-2xl text-kasi-green transition group-hover:translate-x-1 group-hover:text-kasi-black"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
