import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { social } from "@/data/social";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <Section className="pb-28">
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-gradient-to-br from-surface via-background-elevated to-surface px-6 py-14 sm:px-10 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 grid-overlay"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-accent/20 bg-accent-soft/30 blur-2xl"
        />

        <div className="relative z-10">
          <p className="mono-label mb-5">Next system</p>
          <h2 className="section-display max-w-2xl text-balance">
            Building
            <br />
            something
            <br />
            AI-native?
          </h2>
          <p className="mt-6 max-w-md text-xl tracking-tight text-foreground/90 sm:text-2xl">
            Let&apos;s architect it.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <TrackLink
              href={`mailto:${social.email}`}
              event={AnalyticsEvents.emailClick}
              payload={{ source: "final_cta" }}
              className="focus-ring inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(59,130,246,0.45),0_10px_30px_rgba(59,130,246,0.18)] transition-colors hover:bg-[#4b8fff]"
            >
              Email Talha
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </TrackLink>
            <TrackLink
              href={social.linkedin}
              event={AnalyticsEvents.linkedinClick}
              payload={{ source: "final_cta" }}
              className="focus-ring inline-flex items-center gap-1 rounded-md border border-border-strong px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent-soft"
              external
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </TrackLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
