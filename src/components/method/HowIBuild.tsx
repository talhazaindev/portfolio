import { Section } from "@/components/ui/Section";
import { buildPipeline } from "@/data/capabilities";

export function HowIBuild() {
  return (
    <Section
      eyebrow="How I build"
      title="From model capability to production system."
      description="Methodology over tool lists—understand, design, orchestrate, evaluate, ship, observe."
    >
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {buildPipeline.map((step, index) => (
          <li
            key={step.step}
            className="relative rounded-[var(--radius-md)] border border-border bg-surface/50 p-5"
          >
            <div className="mono-label mb-3">{step.step}</div>
            <h3 className="text-lg tracking-tight text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.detail}</p>
            {index < buildPipeline.length - 1 ? (
              <span className="mono-label absolute right-4 top-5 hidden text-accent-secondary lg:block">
                ↓
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
