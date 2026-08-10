import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { social } from "@/data/social";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <Section className="pb-28">
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-gradient-to-br from-surface via-background-elevated to-surface px-6 py-12 sm:px-10 sm:py-16">
        <p className="mono-label mb-4">Next collaboration</p>
        <h2 className="section-display max-w-2xl text-balance">
          Building something
          <br />
          AI-native?
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted">
          Interested in complex problems involving agents, LLM systems, RAG,
          multimodal AI and production ML.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact">
            Start a Conversation
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Button>
          <TrackLink
            href={`mailto:${social.email}`}
            event={AnalyticsEvents.emailClick}
            payload={{ source: "final_cta" }}
            className="focus-ring inline-flex items-center rounded-md border border-border-strong px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent-soft"
          >
            Email
          </TrackLink>
          <TrackLink
            href={social.linkedin}
            event={AnalyticsEvents.linkedinClick}
            payload={{ source: "final_cta" }}
            className="focus-ring inline-flex items-center rounded-md px-4 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            external
          >
            LinkedIn
          </TrackLink>
          {social.github ? (
            <TrackLink
              href={social.github}
              event={AnalyticsEvents.githubClick}
              payload={{ source: "final_cta" }}
              className="focus-ring inline-flex items-center rounded-md px-4 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
              external
            >
              GitHub
            </TrackLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
