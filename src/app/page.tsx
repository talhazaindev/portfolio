import { Hero } from "@/components/hero/Hero";
import { ProductionSignals } from "@/components/home/ProductionSignals";
import { SelectedSystems } from "@/components/projects/SelectedSystems";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { ProductionAssembly } from "@/components/home/ProductionAssembly";
import { HowIBuild } from "@/components/method/HowIBuild";
import { TrajectoryPreview } from "@/components/experience/TrajectoryPreview";
import { EngineerPortrait } from "@/components/home/EngineerPortrait";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductionSignals />
      <SelectedSystems />
      <CapabilitiesSection />
      <ProductionAssembly />
      <HowIBuild />
      <TrajectoryPreview />
      <EngineerPortrait />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
