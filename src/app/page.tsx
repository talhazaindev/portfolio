import { Hero } from "@/components/hero/Hero";
import { ProductionSignals } from "@/components/home/ProductionSignals";
import { SelectedSystems } from "@/components/projects/SelectedSystems";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { TrajectoryPreview } from "@/components/experience/TrajectoryPreview";
import { EngineerPortrait } from "@/components/home/EngineerPortrait";
import { ProductionAssembly } from "@/components/home/ProductionAssembly";
import { HowIBuild } from "@/components/method/HowIBuild";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductionSignals />
      <SelectedSystems />
      <CapabilitiesSection />
      <TrajectoryPreview />
      <EngineerPortrait />
      <ProductionAssembly />
      <HowIBuild />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
