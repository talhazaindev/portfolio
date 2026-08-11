import { Section } from "@/components/ui/Section";
import { CapabilityGraph } from "@/components/capabilities/CapabilityGraph";
import { capabilities } from "@/data/capabilities";

/** Capability topology — return to deep dark after illuminated interfaces. */
export function CapabilitiesSection() {
  const primary = capabilities.filter((domain) => domain.primary);

  return (
    <Section
      id="capabilities"
      eyebrow="Engineering capabilities"
      title="Specialization first. Supporting stack second."
      description="Agentic AI, LLM systems, RAG, and production engineering define the practice. The graph shows how those domains interconnect."
      tone="deep"
      grid
      containerWidth="medium"
      className="!py-24 sm:!py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="space-y-8">
          {primary.map((domain) => (
            <article key={domain.id} className="border-l border-accent/35 pl-5">
              <div className="mono-label mb-2">
                {domain.number} · Primary
              </div>
              <h3 className="text-lg tracking-tight text-heading">{domain.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                {domain.description}
              </p>
            </article>
          ))}
          <p className="max-w-sm text-sm text-muted">
            Supporting domains: machine learning, computer vision, data engineering, and cloud
            deployment — used in service of production AI systems.
          </p>
        </div>
        <CapabilityGraph />
      </div>
    </Section>
  );
}
