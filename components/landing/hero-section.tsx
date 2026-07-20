import Image from "next/image";
import Link from "next/link";

const TABS = ["Attendance", "Billing", "Communication", "Registration", "Paperwork", "Payroll", "AI"];

const LOGOS = [
  { src: "/hero/logo-gan-sinai.png",  alt: "Gan Sinai Early Learning Center",          w: 103, h: 36 },
  { src: "/hero/logo-yakima.png",     alt: "Yakima Valley Memorial",                   w: 119, h: 31 },
  { src: "/hero/logo-child-dev.png",  alt: "Child Development Consortium of LA",       w: 176, h: 40 },
  { src: "/hero/logo-st-john.png",    alt: "St. John Lutheran Church",                 w: 103, h: 30 },
  { src: "/hero/logo-weston.png",     alt: "The Weston School Early Childhood",        w: 179, h: 54 },
];

export function HeroSection() {
  return (
    <section className="bg-[#FAF2E1] overflow-hidden">

      {/* Headline + body + CTA */}
      <div className="text-center px-4 mt-[14px]">
        <h1
          className="font-[family-name:var(--font-merriweather-import)] font-bold text-[#3b2513] mx-auto"
          style={{
            fontSize: "clamp(38px, 5vw, 72px)",
            letterSpacing: "-0.06em",
            lineHeight: "1.208",
            maxWidth: "862px",
          }}
        >
          Be the creche parents choose. And{" "}
          <span className="text-[#c17c45] italic">never leave</span>
          {"."}
        </h1>

        <p
          className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#3d444f] text-[16px] leading-[24px] mx-auto mt-[22px]"
          style={{ maxWidth: "518px" }}
        >
          CEven turns your daily operations into the reason parents trust you — real-time updates, accountable staff, a business that runs like the professional operation it already is.
        </p>

        <div className="mt-[24px] flex flex-col items-center gap-[15px]">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#3b2513] text-[#faf2e1] font-[family-name:var(--font-urbanist-import)] font-medium text-[16px] leading-[20px] h-[48px] px-6 rounded-[12px] shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)] hover:opacity-90 transition-opacity"
          >
            Get a Free Demo
          </Link>

          <p className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#3d444f] text-[16px] leading-[28px]">
            Already Joined CEven?{" "}
            <Link
              href="#"
              className="underline decoration-solid underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="mt-[20px] px-4 flex justify-center">
        <div
          className="w-full bg-[rgba(255,255,255,0.46)]"
          style={{ maxWidth: "980px", borderRadius: "8px 8px 0 0" }}
        >
          {/* Tabs row */}
          <div className="bg-white border-b border-[rgba(68,25,6,0.08)] flex">
            {TABS.map((tab, i) => (
              <div
                key={tab}
                className="flex-1 flex items-center justify-center px-1 py-3 relative"
              >
                <span
                  className="font-[family-name:var(--font-urbanist-import)] font-semibold text-[14px] leading-[20px] whitespace-nowrap"
                  style={{ color: i === 0 ? "#233243" : "#667085" }}
                >
                  {tab}
                </span>
                {i === 0 && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#3b2513] rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* Screenshot */}
          <div className="bg-[rgba(68,25,6,0.04)] p-[8px]">
            <div className="overflow-hidden rounded-sm shadow-[0px_1px_1px_0.5px_rgba(68,25,6,0.04),0px_3px_3px_1.5px_rgba(68,25,6,0.04),0px_6px_6px_-3px_rgba(68,25,6,0.04),0px_12px_12px_-6px_rgba(68,25,6,0.04),0px_24px_24px_-12px_rgba(68,25,6,0.04)]">
              <Image
                src="/hero/dashboard.png"
                alt="CEven admin dashboard"
                width={964}
                height={557}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="py-10">
        <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[15px] leading-[21.9px] text-[#6a7074] text-center tracking-[-0.024em] mb-5 px-4">
          Trusted by owners, directors, teachers, and families across Nigeria
        </p>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#FAF2E1] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#FAF2E1] to-transparent pointer-events-none" />

          <div className="flex gap-10 items-center animate-marquee" style={{ width: "max-content" }}>
            {[...Array(6)].flatMap(() => LOGOS).map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center h-[60px]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  className="object-contain max-h-[54px] w-auto opacity-70"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
