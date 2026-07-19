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

          {/* ── Left: blob image + UI overlays ── */}
          <FadeUp className="relative shrink-0 w-full lg:w-[676px] h-[420px] sm:h-[480px] lg:h-[524px]">
            {/* Blob-shaped photo */}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%",
              }}
            >
              <Image
                src="/families-child-photo.jpg"
                alt="Child at a crèche"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 676px"
                priority
              />
            </div>

            {/* Overlay: Creche card (top-left, outside blob) */}
            <div className="absolute -left-2 top-[20%] sm:top-[22%] bg-white rounded-2xl shadow-lg px-3 py-3 w-[190px] sm:w-[210px] flex items-center gap-2.5 z-10">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <Image src="/families-child-photo.jpg" alt="Creche" fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1a1209] text-[11px] leading-tight">
                  St. Greg Creche
                </p>
                <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6b7280] text-[9px]">
                  Victoria Island, Lagos
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-[#6b7280]">
                  <span>📍 0.7 km</span>
                  <span>⭐ 4.0</span>
                  <span>👥 5 spots</span>
                </div>
              </div>
            </div>

            {/* Overlay: Photo thumbnails grid (top-right) */}
            <div className="absolute right-2 sm:right-4 top-6 grid grid-cols-2 gap-1.5 z-10">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative w-[56px] h-[48px] sm:w-[64px] sm:h-[56px] rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/families-child-photo.jpg"
                    alt="Classroom photo"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ))}
            </div>

            {/* Overlay: Activity card (bottom) */}
            <div className="absolute bottom-6 left-[8%] bg-white rounded-2xl shadow-lg px-3 py-3 w-[220px] sm:w-[240px] flex items-start gap-2.5 z-10">
              <div className="w-8 h-8 rounded-full bg-[#FAF2E1] border border-[#E8DFD0] flex items-center justify-center shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <polygon points="4,2 10,6 4,10" fill="#3b2513" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1a1209] text-[11px]">
                    Art &amp; Craft
                  </p>
                  <span className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#9b9b9b] text-[9px] shrink-0">
                    09:30 AM
                  </span>
                </div>
                <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6b7280] text-[10px] leading-[1.4]">
                  Art session: Esther created a beautiful painting! 👋
                </p>
              </div>
            </div>
          </FadeUp>

          {/* ── Right: text content ── */}
          <FadeUp className="flex-1 lg:pl-[70px]">
            <div className="flex flex-col items-start max-w-[565px]">
              {/* Heading */}
              <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-[32px] sm:text-[40px] lg:text-[48px] text-black leading-[1.2] mb-5">
                Families become partners in children&apos;s education
              </h2>

              {/* Bold intro */}
              <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#60657e] text-[15px] sm:text-[16px] leading-[24px] mb-5">
                A child does better when the adults around them — parent and caregiver — are working off the same picture, not reconstructing it after the fact.
              </p>

              {/* Regular body */}
              <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#60657e] text-[15px] sm:text-[16px] leading-[24px] mb-5">
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
                    <span className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#60657e] text-[15px] sm:text-[16px] leading-[24px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#demo"
                className="inline-flex items-center h-12 px-6 rounded-xl font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-[16px] text-[#faf2e1] bg-[#3b2513] hover:bg-[#2d1e0f] transition-colors shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)]"
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
