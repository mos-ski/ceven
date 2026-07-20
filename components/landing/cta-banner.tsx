import Link from "next/link";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const ROLES = [
  {
    label: "I'm a crèche/daycare owner",
    href: "/contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" stroke="#c78c5f" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M1 21h22M9 21v-5h6v5" stroke="#c78c5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="7" width="2.5" height="3" rx="0.5" fill="#c78c5f" />
        <rect x="12.5" y="7" width="2.5" height="3" rx="0.5" fill="#c78c5f" />
        <rect x="9" y="12" width="2.5" height="3" rx="0.5" fill="#c78c5f" />
        <rect x="12.5" y="12" width="2.5" height="3" rx="0.5" fill="#c78c5f" />
      </svg>
    ),
  },
  {
    label: "I'm an independent caregiver",
    href: "/contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="#c78c5f" strokeWidth="1.8" />
        <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#c78c5f" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "I'm a parent/guardian",
    href: "/contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C12 21 4 16.5 4 10a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 6.5-8 11-8 11Z" stroke="#c78c5f" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function CtaBanner() {
  return (
    <section className="bg-[#c78c5f] py-16 min-h-screen px-4 sm:px-8 flex flex-col justify-center">
      <div className="max-w-[702px] mx-auto flex flex-col items-center gap-6 text-center">

        <FadeUp className="flex flex-col items-center gap-6 w-full">
          {/* Overline */}
          <p className="font-[family-name:var(--font-urbanist-import)] font-semibold text-[#f7f9ff]/80 text-[14px] sm:text-[16px] leading-[24px] uppercase tracking-widest">
            #1 childcare management software
          </p>

          {/* Heading */}
          <h2
            className="font-[family-name:var(--font-fraunces)] font-bold text-white text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.18] tracking-[-0.02em]"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            Ready to be the crèche<br className="hidden sm:block" /> that stands out?
          </h2>

          {/* Subtext */}
          <p className="font-[family-name:var(--font-urbanist-import)] font-semibold text-[#faf2e1] text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px]">
            Download CEven. Built for Nigerian crèches. Set up in 15 minutes.
          </p>
        </FadeUp>

        {/* Role selector */}
        <FadeUp className="w-full max-w-[390px] flex flex-col gap-4 mt-2" delay={0.1}>
          <p className="font-[family-name:var(--font-urbanist-import)] font-semibold text-white text-[18px] sm:text-[20px] leading-[1.4]">
            First, tell us about yourself.
          </p>
          <Stagger className="flex flex-col gap-3">
            {ROLES.map((role) => (
              <StaggerItem key={role.label}>
                <Link
                  href={role.href}
                  className="group flex items-center gap-4 bg-[#f7f9ff] border-2 border-[#ebeff4] rounded-2xl px-4 sm:px-6 py-[17px] hover:border-[#c78c5f]/40 hover:shadow-md transition-all duration-150"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#eef1ff] flex items-center justify-center shrink-0">
                    {role.icon}
                  </div>
                  <span className="font-[family-name:var(--font-urbanist-import)] font-semibold text-[#233243] text-[15px] sm:text-[18px] leading-[24px] flex-1 text-left">
                    {role.label}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#c78c5f] group-hover:translate-x-0.5 transition-transform">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeUp>

        {/* Login note */}
        <FadeUp delay={0.2}>
          <p className="font-[family-name:var(--font-urbanist-import)] text-white text-[14px] sm:text-[16px] leading-[24px]">
            Already Joined CEven?{" "}
            <Link href="/login" className="underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold">
              Login Now
            </Link>
          </p>
        </FadeUp>

      </div>
    </section>
  );
}
