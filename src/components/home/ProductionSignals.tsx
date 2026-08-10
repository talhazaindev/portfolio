import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { productionSignals } from "@/data/projects";

/** Credibility strip — real project-linked metrics only. */
export function ProductionSignals() {
  return (
    <Section
      eyebrow="Production signals"
      title="Measured outcomes from shipped systems."
      description="Figures tied to specific systems—not vanity company KPIs."
      className="border-y border-border/70 bg-background-elevated/40"
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
        {productionSignals.map((signal) => (
          <Link
            key={`${signal.label}-${signal.value}`}
            href={`/work/${signal.projectSlug}`}
            className="focus-ring group bg-surface px-4 py-5 transition-colors duration-200 hover:bg-surface-raised"
          >
            <div className="font-mono text-2xl tracking-tight text-foreground sm:text-3xl">
              {signal.value}
            </div>
            <div className="mt-2 text-xs leading-snug text-muted group-hover:text-foreground/80">
              {signal.label}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
