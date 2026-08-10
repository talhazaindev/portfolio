import { Section } from "@/components/ui/Section";
import { CapabilityGraph } from "@/components/capabilities/CapabilityGraph";
import { capabilities } from "@/data/capabilities";

export function CapabilitiesSection() {
  return (
    <Section
      id="capabilities"
      eyebrow="Engineering capabilities"
      title="Specialization first. Supporting stack second."
      description="Agentic AI, LLM systems, RAG, and production engineering define the practice. ML, cloud, and data infrastructure support delivery."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          {capabilities.map((domain) => (
            <article
              key={domain.id}
              className="rounded-[var(--radius-md)] border border-border bg-surface/40 p-4 sm:p-5"
            >
              <div className="mono-label mb-2">
                {domain.number}
                {domain.primary ? " · Primary" : ""}
              </div>
              <h3 className="text-lg tracking-tight text-foreground">{domain.title}</h3>
              <p className="mt-2 text-sm text-muted">{domain.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {domain.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-border/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <CapabilityGraph />
      </div>
    </Section>
  );
}
