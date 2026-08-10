import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/projects/CaseStudyView";
import {
  getCaseStudyProjects,
  getNextCaseStudy,
  getProjectBySlug,
} from "@/data/projects";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.caseStudy) {
    return createMetadata({ title: "System not found", path: `/work/${slug}` });
  }

  return createMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.caseStudy) notFound();

  const next = getNextCaseStudy(project.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${siteConfig.url}/work/${project.slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    keywords: [...project.categories, ...project.domains, ...project.technologies].join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyView project={project} next={next} />
    </>
  );
}
