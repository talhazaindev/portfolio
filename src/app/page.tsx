import { Hero } from "@/components/hero/Hero";
import { ProductionSignals } from "@/components/home/ProductionSignals";
import { SelectedSystems } from "@/components/projects/SelectedSystems";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { TrajectoryPreview } from "@/components/experience/TrajectoryPreview";
import { HowIBuild } from "@/components/method/HowIBuild";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductionSignals />
      <SelectedSystems />
      <CapabilitiesSection />
      <TrajectoryPreview />
      <HowIBuild />
      <section className="border-t border-border/70 py-16">
        <Container className="max-w-3xl">
          <p className="mono-label mb-4">About</p>
          <h2 className="section-display text-balance">
            AI engineering is not about calling a model.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            I focus on the systems surrounding the model—retrieval, orchestration, state,
            tools, data, evaluation, reliability, APIs and deployment—because that is what
            turns an AI capability into a production product.
          </p>
          <p className="mono-label mt-6">
            {siteConfig.location} · {siteConfig.role}
          </p>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
