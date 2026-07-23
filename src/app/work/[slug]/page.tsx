import { CaseStudyView } from "@/components/site/CaseStudyView";
import { ClientCaseStudyView, clientCaseStudyMetadata } from "@/components/site/ClientCaseStudyView";
import { getProject, projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { getShippedWork, shippedWork } from "@/data/shipped-work";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [
    ...projects.map((p) => ({ slug: p.slug })),
    ...shippedWork.map((w) => ({ slug: w.slug })),
    { slug: "000" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const shipped = getShippedWork(slug);
  if (shipped) return clientCaseStudyMetadata(slug);

  const project = getProject(slug);
  const study = caseStudies[slug];
  return {
    title: project?.name ?? study?.name ?? "Work",
    description: project?.description ?? study?.strategic,
    openGraph: {
      title: `${project?.name ?? study?.name ?? "Work"} · KasiTech`,
      description: project?.description ?? study?.strategic,
    },
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;

  if (getShippedWork(slug)) {
    return <ClientCaseStudyView slug={slug} />;
  }

  if (!caseStudies[slug]) notFound();
  return <CaseStudyView slug={slug} />;
}
