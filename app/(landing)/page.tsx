import { HeroSection } from "@/components/landing/hero-section";
import { PainPointsSection } from "@/components/landing/pain-points-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ParentFeaturesSection } from "@/components/landing/parent-features-section";
import { CaregiverFeaturesSection } from "@/components/landing/caregiver-features-section";
import { AdminFeaturesSection } from "@/components/landing/admin-features-section";
import { FamiliesPartnersSection } from "@/components/landing/families-partners-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { AmbitionsSection } from "@/components/landing/ambitions-section";
import { FeaturesTypesSection } from "@/components/landing/features-types-section";
import { FamiliesCtaSection } from "@/components/landing/families-cta-section";
import { CtaBanner } from "@/components/landing/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <TestimonialsSection />
      <FamiliesPartnersSection />
      <FeaturesSection />
      <ParentFeaturesSection />
      <CaregiverFeaturesSection />
      <AdminFeaturesSection />
      <HowItWorksSection />
      <AmbitionsSection />
      <FeaturesTypesSection />
      <FamiliesCtaSection />
      <CtaBanner />
    </>
  );
}
