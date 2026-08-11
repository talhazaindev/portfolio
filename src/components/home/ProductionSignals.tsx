import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { productionSignals } from "@/data/projects";
import { cn } from "@/lib/cn";

const SIGNAL_METRICS = new Set(["< 5s", "3–4 hrs/week"]);

/** Credibility strip — real project-linked metrics; amber only on key outcomes. */
export function ProductionSignals() {
  return (
    <Section
      eyebrow="Production signals"
      title="Measured outcomes from shipped systems."
      description="Figures tied to specific systems—not vanity company KPIs."
      className="border-y border-border/70 bg-background-elevated/40"
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
        {productionSignals.map((signal) => {
          const isSignal = SIGNAL_METRICS.has(signal.value);
          return (
            <Link
              key={`${signal.label}-${signal.value}`}
              href={`/work/${signal.projectSlug}`}
              className="focus-ring group bg-surface px-4 py-5 transition-colors duration-200 hover:bg-surface-raised"
            >
              <div
                className={cn(
                  "font-mono text-2xl tracking-tight sm:text-3xl",
                  isSignal ? "text-signal" : "text-foreground",
                )}
              >
                {signal.value}
              </div>
              <div className="mt-2 text-xs leading-snug text-muted group-hover:text-foreground/80">
                {signal.label}
              </div>
              {isSignal ? (
                <span className="mt-3 block h-px w-6 bg-signal/70" aria-hidden />
              ) : null}
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
