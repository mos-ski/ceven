"use client";

import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  Audience: [
    { label: "For Parents", href: "/for-parents" },
    { label: "For Crèches", href: "/for-creches" },
    { label: "Download App", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Swayosoo™", href: "#" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Data & Children", href: "/data-and-children" },
  ],
};

export function LandingFooter() {
  return (
    <footer className="relative bg-[#3b2513] overflow-hidden">
      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        <img
          src="/Footer/Frame 1686561081.svg"
          alt=""
          role="presentation"
          style={{ width: "100%", height: "clamp(60px, 8vw, 110px)", display: "block", objectFit: "fill" }}
        />
      </div>

      {/* Main footer content */}
      <div className="px-6 sm:px-10 lg:px-16 pt-10 pb-6">
        <div className="max-w-[1600px] mx-auto">

          {/* Top row: logo left, nav right */}
          <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-start mb-10">

            {/* Logo + tagline */}
            <div className="flex flex-col gap-4 flex-shrink-0">
              <div className="bg-white rounded-[48px] shadow-[0px_4px_2px_rgba(0,0,0,0.25)] px-5 py-3 w-fit">
                <Image
                  src="/Frame 1686561079.png"
                  alt="CEven"
                  width={174}
                  height={50}
                  className="h-[42px] w-auto"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-white text-[20px] sm:text-[24px] leading-[28px]">
                  Life made easier for families
                </p>
                <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#faf2e1] text-[14px] sm:text-[16px] leading-[28px]">
                  A product by{" "}
                  <span className="font-semibold text-[#c78c5f]">Swayosoo™</span>
                </p>
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-[72px]">
              {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <div key={category} className="flex flex-col gap-3">
                  <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#c78c5f] text-[14px] sm:text-[16px] leading-[28px]">
                    {category}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#faf2e1] text-[14px] sm:text-[16px] leading-[28px] hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-[#faf2e1]/15 mb-5" />

          {/* Copyright bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#979797] text-[13px] sm:text-[16px] leading-[28px]">
              © 2025 CEven by Swayosoo™. All rights reserved.
            </p>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#faf2e1] text-[13px] sm:text-[16px] leading-[28px]">
              Lagos, Nigeria
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
