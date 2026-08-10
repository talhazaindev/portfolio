import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { social } from "@/data/social";
import { createMetadata } from "@/lib/seo";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Let's build something difficult — agentic AI, LLM systems, RAG, AI architecture, and applied ML with Talha Zain.",
  path: "/contact",
});

const collaboration = [
  "Agentic AI",
  "LLM Systems",
  "RAG",
  "AI Architecture",
  "Applied ML",
] as const;

export default function ContactPage() {
  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <Container className="max-w-3xl">
        <p className="mono-label mb-4">Contact</p>
        <h1 className="section-display text-balance">Let&apos;s build something difficult.</h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          Complex problems involving agents, retrieval, multimodal generation, and production
          reliability—not demos that die in notebooks.
        </p>

        <section className="mt-10">
          <h2 className="mono-label mb-3">Areas of collaboration</h2>
          <ul className="flex flex-wrap gap-2">
            {collaboration.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-surface/50 px-3 py-1.5 text-sm text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 grid gap-3">
          <TrackLink
            href={`mailto:${social.email}`}
            event={AnalyticsEvents.emailClick}
            payload={{ source: "contact" }}
            className="focus-ring flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface/50 px-4 py-4 text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
          >
            <span>
              <span className="mono-label block mb-1">Email</span>
              {social.email}
            </span>
            <ArrowUpRight className="h-4 w-4 text-accent-secondary" />
          </TrackLink>

          <TrackLink
            href={social.linkedin}
            event={AnalyticsEvents.linkedinClick}
            payload={{ source: "contact" }}
            className="focus-ring flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface/50 px-4 py-4 text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
            external
          >
            <span>
              <span className="mono-label block mb-1">LinkedIn</span>
              linkedin.com/in/talhazain10
            </span>
            <ArrowUpRight className="h-4 w-4 text-accent-secondary" />
          </TrackLink>

          {social.github ? (
            <TrackLink
              href={social.github}
              event={AnalyticsEvents.githubClick}
              payload={{ source: "contact" }}
              className="focus-ring flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface/50 px-4 py-4 text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
              external
            >
              <span>
                <span className="mono-label block mb-1">GitHub</span>
                github.com/talhazaindev
              </span>
              <ArrowUpRight className="h-4 w-4 text-accent-secondary" />
            </TrackLink>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
