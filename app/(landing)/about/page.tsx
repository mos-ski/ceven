import { AboutHeroSection } from "@/components/landing/about-hero-section";
import { AboutStatsSection } from "@/components/landing/about-stats-section";
import { AboutOriginSection } from "@/components/landing/about-origin-section";
import { AboutMissionSection } from "@/components/landing/about-mission-section";
import { AboutSwayosooSection } from "@/components/landing/about-swayosoo-section";
import { CtaBanner } from "@/components/landing/cta-banner";

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutStatsSection />
      <AboutOriginSection />
      <AboutMissionSection />
      <AboutSwayosooSection />
      <CtaBanner />
    </>
  );
}
