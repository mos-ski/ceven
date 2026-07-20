import { HeroSection } from "@/components/landing/hero-section";
import { PainPointsSection } from "@/components/landing/pain-points-section";
import { ParentFeaturesSection } from "@/components/landing/parent-features-section";
import { CaregiverFeaturesSection } from "@/components/landing/caregiver-features-section";
import { AdminFeaturesSection } from "@/components/landing/admin-features-section";
import { FeaturesTypesSection } from "@/components/landing/features-types-section";
import { FamiliesPartnersSection } from "@/components/landing/families-partners-section";
import { CtaBanner } from "@/components/landing/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <ParentFeaturesSection />
      <CaregiverFeaturesSection />
      <AdminFeaturesSection />
      <FeaturesTypesSection />
      <FamiliesPartnersSection />
      <CtaBanner />
    </>
  );
}
