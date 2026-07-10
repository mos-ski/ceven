import { CrechesHeroSection } from "@/components/landing/creches-hero-section";
import { CrechesTestimonialsSection } from "@/components/landing/creches-testimonials-section";
import { CrechesPlatformSection } from "@/components/landing/creches-platform-section";
import { CrechesTimelineSection } from "@/components/landing/creches-timeline-section";
import { CrechesGettingStartedSection } from "@/components/landing/creches-getting-started-section";
import { CrechesTransparencySection } from "@/components/landing/creches-transparency-section";
import { CrechesCTASection } from "@/components/landing/creches-cta-section";

export default function ForCrechesPage() {
  return (
    <>
      <CrechesHeroSection />
      <CrechesTestimonialsSection />
      <CrechesPlatformSection />
      <CrechesTimelineSection />
      <CrechesGettingStartedSection />
      <CrechesTransparencySection />
      <CrechesCTASection />
    </>
  );
}
