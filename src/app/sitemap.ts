import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { shippedWork } from "@/data/shipped-work";

const base = "https://kasitechinnovations.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/work/all",
    "/capabilities",
    "/company",
    "/founder",
    "/start",
    "/about",
    "/faq",
    "/lab",
    "/privacy",
    "/terms",
    "/card",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const conceptRoutes = projects.map((p) => ({
    url: `${base}${p.caseStudyPath}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const clientRoutes = shippedWork.map((w) => ({
    url: `${base}${w.caseStudyPath}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...clientRoutes, ...conceptRoutes];
}
