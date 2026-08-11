import { Section } from "@/components/ui/Section";
import { CapabilityGraph } from "@/components/capabilities/CapabilityGraph";
import { capabilities } from "@/data/capabilities";

/** Capability topology — relationships over badge walls. */
export function CapabilitiesSection() {
  const primary = capabilities.filter((domain) => domain.primary);

  return (
    <Section
      id="capabilities"
      eyebrow="Engineering capabilities"
      title="Specialization first. Supporting stack second."
      description="Agentic AI, LLM systems, RAG, and production engineering define the practice. The graph shows how those domains interconnect."
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-5">
          {primary.map((domain) => (
            <article key={domain.id} className="border-l-2 border-accent/40 pl-4">
              <div className="mono-label mb-2">
                {domain.number} · Primary
              </div>
              <h3 className="text-lg tracking-tight text-foreground">{domain.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{domain.description}</p>
            </article>
          ))}
          <p className="text-sm text-muted">
            Supporting domains: machine learning, computer vision, data engineering, and cloud
            deployment — used in service of production AI systems.
          </p>
        </div>
        <CapabilityGraph />
      </div>
    </Section>
  );
}
