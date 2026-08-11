import { ArrowUpRight } from "lucide-react";
import { SectionEnvironment } from "@/components/ui/SectionEnvironment";
import { Container } from "@/components/ui/Container";
import { SignalLine } from "@/components/brand/SignalLine";
import { social } from "@/data/social";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

/** Strongest warm signal moment — amber ambient, dark cobalt CTA. */
export function FinalCTA() {
  return (
    <SectionEnvironment tone="signal" grid className="py-20 sm:py-24 lg:pb-32">
      <Container width="wide">
        <div className="relative px-1 py-10 sm:py-14 lg:py-16">
          <div className="relative z-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <p className="mono-label">Next system</p>
              <SignalLine compact />
            </div>
            <h2 className="section-display max-w-2xl text-balance text-heading">
              Building
              <br />
              something
              <br />
              AI-native?
            </h2>
            <p className="mt-8 max-w-md text-xl tracking-tight text-heading sm:text-2xl">
              Let&apos;s architect it.
              <span
                className="ml-2 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-signal"
                aria-hidden
              />
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              <TrackLink
                href={`mailto:${social.email}`}
                event={AnalyticsEvents.emailClick}
                payload={{ source: "final_cta" }}
                className="focus-ring group/cta relative inline-flex items-center gap-1.5 rounded-md border border-system-blue-strong/70 bg-system-blue-strong/85 px-5 py-2.5 text-sm font-medium text-heading transition-[background-color,border-color] duration-200 hover:bg-system-blue-strong"
              >
                Email Talha
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  aria-hidden
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2 right-2 h-1 w-1 rounded-full bg-signal"
                />
              </TrackLink>
              <TrackLink
                href={social.linkedin}
                event={AnalyticsEvents.linkedinClick}
                payload={{ source: "final_cta" }}
                className="focus-ring inline-flex items-center gap-1 rounded-md border border-border-strong px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-accent-soft"
                external
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </TrackLink>
            </div>
          </div>
        </div>
      </Container>
    </SectionEnvironment>
  );
}
