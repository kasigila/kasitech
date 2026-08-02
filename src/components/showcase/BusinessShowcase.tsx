import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { BuyCtas } from "@/components/site/BuyCtas";

function ExperienceCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border border-kasi-border">
      <Link
        href={project.demoPath}
        aria-label={`Explore ${project.name} for ${project.industry}`}
        className="relative block aspect-[16/10] overflow-hidden bg-kasi-border"
      >
        <SafeImage
          src={projectCovers[project.slug] ?? projectCovers.zuri}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 50vw, 33vw"
          fallbackLabel={project.name}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-green">
          {project.number} · {project.industry.toUpperCase()}
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.03em]">
          {project.name}
        </h2>
        <p className="mt-2 text-sm text-kasi-grey">
          {project.tags.join(" · ")}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-kasi-ivory/80">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href={project.demoPath}
            className="border border-kasi-green bg-kasi-green px-4 py-2 text-kasi-black"
          >
            Explore →
          </Link>
          <Link
            href={project.caseStudyPath}
            className="border border-kasi-border px-4 py-2 hover:border-kasi-green"
          >
            How it works →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BusinessShowcase() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          BUSINESS SHOWCASE
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          BUILT FOR
          <br />
          YOUR KIND OF BUSINESS.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-kasi-grey md:text-lg">
          Explore examples of websites, commerce, and systems designed around
          how different industries actually work. Scroll through and open any
          experience that feels close to yours.
        </p>

        <div className="mt-8">
          <BuyCtas source="showcase" compact />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ExperienceCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-20 border-t border-kasi-border pt-12">
          <h2 className="font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Don&apos;t see your industry?
          </h2>
          <p className="mt-4 max-w-lg text-kasi-grey">
            Every business is different. Tell us what you run and we&apos;ll
            shape the right system for it.
          </p>
          <Link
            href="/start"
            className="mt-8 inline-flex min-h-12 items-center border border-kasi-green bg-kasi-green px-6 py-3 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
          >
            START A PROJECT →
          </Link>
        </div>
      </div>
    </div>
  );
}
