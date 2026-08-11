import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SignalLine } from "@/components/brand/SignalLine";
import { social } from "@/data/social";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

/** Strongest concentrated amber signal moment on the site. */
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
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <p className="mono-label">Next system</p>
            <SignalLine compact />
          </div>
          <h2 className="section-display max-w-2xl text-balance">
            Building
            <br />
            something
            <br />
            AI-native?
          </h2>
          <p className="mt-6 max-w-md text-xl tracking-tight text-foreground/90 sm:text-2xl">
            Let&apos;s architect it.
            <span className="ml-2 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-signal shadow-[0_0_10px_rgba(255,181,71,0.55)]" aria-hidden />
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <TrackLink
              href={`mailto:${social.email}`}
              event={AnalyticsEvents.emailClick}
              payload={{ source: "final_cta" }}
              className="focus-ring group/cta relative inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-[background-color,border-color,color] duration-200 hover:border-system-blue-strong hover:bg-system-blue-strong/90 hover:text-white"
            >
              Email Talha
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-2 right-2 h-1 w-1 rounded-full bg-signal opacity-0 transition-opacity duration-200 group-hover/cta:opacity-100"
              />
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
