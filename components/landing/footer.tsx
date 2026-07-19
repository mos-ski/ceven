"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

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
    <footer className="relative bg-[#3B2513]">
      <CloudWaveTop />
      <FadeUp amount={0.05}>
        <div className="px-4 sm:px-8 lg:px-16 pt-12 pb-8">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-start mb-10">
            <div className="flex-shrink-0">
              <div className="mb-4">
                <Image
                  src="/Frame 1686561079.png"
                  alt="CEven"
                  width={120}
                  height={46}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-[#FAF2E1] text-base font-medium mb-1">Life made easier for families</p>
              <p className="text-[#FAF2E1]/60 text-sm">
                A product by{" "}
                <span className="text-[#9A6033] font-medium">Swayosoo™</span>
              </p>
            </div>

            <Stagger className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
              {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <StaggerItem key={category}>
                  <div>
                    <p className="text-[#9A6033] text-sm font-semibold mb-4">{category}</p>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-[#FAF2E1]/70 text-sm hover:text-[#FAF2E1] hover:translate-x-0.5 transition-all duration-150 inline-block"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="border-t border-[#FAF2E1]/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-[#FAF2E1]/50 text-sm">
              © 2025 CEven by Swayosoo™. All rights reserved.
            </p>
            <p className="text-[#FAF2E1]/50 text-sm">Lagos, Nigeria</p>
          </div>
        </div>
      </FadeUp>
    </footer>
  );
}

function CloudWaveTop() {
  return (
    <div className="w-full overflow-hidden leading-none">
      <img
        src="/Footer/Frame 1686561081.svg"
        alt=""
        role="presentation"
        style={{ width: "100%", height: "80px", display: "block", objectFit: "fill" }}
      />
    </div>
  );
}
