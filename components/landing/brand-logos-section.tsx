import { FadeUp } from "@/components/animations/fade-up";

const BRANDS = [
  "AT Learning",
  "Jabi Kids",
  "Dayton Academy",
  "KidSchool",
  "Memorial Crèche",
  "Cedar House",
  "Kidschool Plus",
  "Crane Academy",
];

export function BrandLogosSection() {
  return (
    <section className="bg-white border-t border-[#E8DFD0] py-10">
      <FadeUp>
        <div className="px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto flex flex-col items-center gap-7">
          <p className="text-[#3b2513]/50 text-sm font-[family-name:var(--font-urbanist-import)] text-center">
            Join 500,000+ owners, directors, teachers, and families already on CEven
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {BRANDS.map((brand) => (
              <span
                key={brand}
                className="text-[#3b2513]/30 font-[family-name:var(--font-urbanist-import)] font-semibold text-sm tracking-wide uppercase select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
