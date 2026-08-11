import { Section } from "@/components/ui/Section";
import { buildPipeline } from "@/data/capabilities";

/**
 * Concise principles — supports Signature Path without repeating its thesis.
 * No large cards; one line of supporting content each.
 */
export function HowIBuild() {
  return (
    <Section
      eyebrow="How I build"
      title="Operating principles."
      description="Six moves from problem framing to production observation."
      tone="quiet"
      containerWidth="medium"
      className="!pt-8 !pb-16 sm:!pt-10 sm:!pb-20"
    >
      <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {buildPipeline.map((step) => (
          <li key={step.step} className="relative">
            <div className="mono-label mb-2">{step.step}</div>
            <h3 className="text-base tracking-tight text-heading sm:text-lg">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
