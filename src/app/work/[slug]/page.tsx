import { CaseStudyView } from "@/components/site/CaseStudyView";
import { getProject, projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [
    ...projects.map((p) => ({ slug: p.slug })),
    { slug: "000" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const study = caseStudies[slug];
  return {
    title: project?.name ?? study?.name ?? "Work",
    description: project?.description ?? study?.strategic,
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  if (!caseStudies[slug]) notFound();
  return <CaseStudyView slug={slug} />;
}
