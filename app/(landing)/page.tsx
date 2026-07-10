import { HeroSection } from "@/components/landing/hero-section";
import { PainPointsSection } from "@/components/landing/pain-points-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { AmbitionsSection } from "@/components/landing/ambitions-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CtaBanner } from "@/components/landing/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AmbitionsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
