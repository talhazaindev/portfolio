import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WorkIndex } from "@/components/projects/WorkIndex";
import { getArchiveProjects, getFeaturedProjects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Systems",
  description:
    "Featured production AI systems and engineering archive — agentic AI, generative media, semantic search, and clinical data platforms by Talha Zain.",
  path: "/work",
});

export default function WorkPage() {
  const featured = getFeaturedProjects();
  const archive = getArchiveProjects();

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <Container>
        <header className="mb-12 max-w-3xl">
          <p className="mono-label mb-4">Systems</p>
          <h1 className="section-display text-balance">
            Selected systems & engineering archive.
          </h1>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Flagship case studies first. Archive entries extend the record of systems shipped
            without implying a four-project career.
          </p>
        </header>
        <WorkIndex featured={featured} archive={archive} />
      </Container>
    </div>
  );
}
