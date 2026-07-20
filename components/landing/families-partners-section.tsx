import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";

const LIST_ITEMS = [
  "messages",
  "evaluations",
  "observations",
  "events",
  "daily menus",
  "multimedia gallery",
];

export function FamiliesPartnersSection() {
  return (
    <section className="bg-[#FAF2E1] py-16 sm:py-[70px] px-4 sm:px-10 lg:px-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

          {/* ── Left: Figma composite image ── */}
          <FadeUp className="relative shrink-0 w-full lg:w-[676px] h-[420px] sm:h-[520px] lg:h-[620px]">
            <Image
              src="/families-composite.png"
              alt="Parent and child with CEven crèche discovery and activity cards"
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 676px"
              priority
            />
          </FadeUp>

          {/* ── Right: text content ── */}
          <FadeUp className="flex-1 lg:pl-[70px]">
            <div className="flex flex-col items-start max-w-[565px]">
              {/* Heading */}
              <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-[32px] sm:text-[40px] lg:text-[48px] text-black leading-[1.2] mb-5">
                Families become partners in children&apos;s education
              </h2>

              {/* Bold intro */}
              <p className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#60657e] text-[15px] sm:text-[16px] leading-[24px] mb-5">
                A child does better when the adults around them — parent and caregiver — are working off the same picture, not reconstructing it after the fact.
              </p>

              {/* Regular body */}
              <p className="font-[family-name:var(--font-urbanist-import)] text-[#60657e] text-[15px] sm:text-[16px] leading-[24px] mb-5">
                All the information parents need to know about children&apos;s progress is safely stored and only one click away:
              </p>

              {/* Checklist */}
              <ul className="flex flex-col gap-2.5 mb-10">
                {LIST_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3.5">
                    <div className="w-5 h-5 shrink-0">
                      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M4 10L8 15L17 4" stroke="#C17C45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-[family-name:var(--font-urbanist-import)] text-[#60657e] text-[15px] sm:text-[16px] leading-[24px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#demo"
                className="inline-flex items-center h-12 px-6 rounded-xl font-[family-name:var(--font-urbanist-import)] font-medium text-[16px] text-[#faf2e1] bg-[#3b2513] hover:bg-[#2d1e0f] transition-colors shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)]"
              >
                Get a Free Demo
              </a>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
