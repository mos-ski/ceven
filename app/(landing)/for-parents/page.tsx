import { ParentsHeroSection } from "@/components/landing/parents-hero-section";
import { ParentsGapSection } from "@/components/landing/parents-gap-section";
import { ParentsComparisonSection } from "@/components/landing/parents-comparison-section";
import { ParentsFAQSection } from "@/components/landing/parents-faq-section";
import { ParentsPhotoCTASection } from "@/components/landing/parents-photo-cta-section";

export default function ForParentsPage() {
  return (
    <>
      <ParentsHeroSection />
      <ParentsGapSection />
      <ParentsComparisonSection />
      <ParentsFAQSection />
      <ParentsPhotoCTASection />
    </>
  );
}
