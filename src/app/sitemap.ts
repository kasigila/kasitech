import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { shippedWork } from "@/data/shipped-work";
import { SITE_LAST_MODIFIED, SITE_URL } from "@/lib/site";

const lastModified = new Date(SITE_LAST_MODIFIED);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/work/all",
    "/showcase",
    "/capabilities",
    "/pricing",
    "/demo-studio",
    "/company",
    "/founder",
    "/start",
    "/faq",
    "/lab",
    "/privacy",
    "/terms",
    "/card",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const conceptRoutes = projects.map((p) => ({
    url: `${SITE_URL}${p.caseStudyPath}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const clientRoutes = shippedWork.map((w) => ({
    url: `${SITE_URL}${w.caseStudyPath}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...clientRoutes, ...conceptRoutes];
}
