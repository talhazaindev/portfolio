import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { certifications, education, siteConfig } from "@/data/site";
import { social } from "@/data/social";
import { createMetadata } from "@/lib/seo";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Talha Zain — Applied AI Engineer focused on agentic AI, LLM systems, RAG, and production AI engineering.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <Container className="max-w-3xl">
        <p className="mono-label mb-4">About</p>
        <h1 className="section-display text-balance">
          AI engineering is not about calling a model.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          I focus on the systems surrounding the model—retrieval, orchestration, state, tools,
          data, evaluation, reliability, APIs and deployment—because that is what turns an AI
          capability into a production product.
        </p>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="mono-label">Location</dt>
            <dd className="mt-2 text-foreground">{siteConfig.location}</dd>
          </div>
          <div>
            <dt className="mono-label">Focus</dt>
            <dd className="mt-2 text-foreground">{siteConfig.specialties.join(" · ")}</dd>
          </div>
        </dl>

        <section className="mt-12 border-t border-border pt-10">
          <h2 className="mono-label mb-3">Education</h2>
          <p className="text-lg text-foreground">{education.school}</p>
          <p className="mt-1 text-sm text-muted">
            {education.degree} · {education.period}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="mono-label mb-3">Certifications</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {certifications.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-surface/40 px-3 py-2 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/work">
            Explore Systems
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
          <Button href="/contact" variant="secondary">
            Let&apos;s Talk
          </Button>
          {social.resumePath ? (
            <TrackLink
              href={social.resumePath}
              event={AnalyticsEvents.resumeClick}
              payload={{ source: "about" }}
              className="focus-ring inline-flex items-center gap-1 rounded-md px-4 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
              external
            >
              View Résumé
              <ArrowUpRight className="h-3.5 w-3.5" />
            </TrackLink>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
