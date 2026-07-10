"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "For Crèches", href: "/for-creches" },
  { label: "For Parents", href: "/for-parents" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function LandingNav({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const pathname = usePathname();
  const isDark = variant === "dark";
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-5">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Frame 1686561079.png"
            alt="CEven"
            width={110}
            height={42}
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const activeClass = isDark
              ? "text-[#FAF2E1] after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-px after:bg-[#FAF2E1]"
              : "text-[#3B2513] after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-px after:bg-[#3B2513]";
            const inactiveClass = isDark
              ? "text-[#FAF2E1]/70 hover:text-[#FAF2E1] hover:bg-white/10"
              : "text-[#3B2513]/60 hover:text-[#3B2513] hover:bg-[#3B2513]/5";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm transition-colors rounded-full relative ${isActive ? activeClass : inactiveClass}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <Link
          href="#"
          className={`hidden md:flex items-center font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-base px-6 h-10 rounded-[8px] transition-colors shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)] ${
            isDark
              ? "bg-[#3B2513] hover:bg-[#5B391E] text-[#FAF2E1]"
              : "bg-[#3B2513] hover:bg-[#5B391E] text-[#FAF2E1]"
          }`}
        >
          Download CEven
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          className={`md:hidden p-2 rounded-lg ${isDark ? "text-[#FAF2E1]" : "text-[#3B2513]"}`}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className={`md:hidden fixed inset-0 z-50 flex flex-col ${
            isDark ? "bg-[#3B2513]" : "bg-[#F5EFE4]"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-5">
            <Image
              src="/Frame 1686561079.png"
              alt="CEven"
              width={110}
              height={42}
              className="h-9 w-auto"
            />
            <button
              onClick={() => setOpen(false)}
              className={`p-2 ${isDark ? "text-[#FAF2E1]" : "text-[#3B2513]"}`}
              aria-label="Close menu"
            >
              <XIcon />
            </button>
          </div>

          <div className="flex flex-col items-center gap-1 pt-10 flex-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium py-3 px-8 rounded-full w-full text-center transition-colors ${
                    isDark
                      ? isActive
                        ? "text-[#FAF2E1] bg-white/10"
                        : "text-[#FAF2E1]/70"
                      : isActive
                      ? "text-[#3B2513] bg-[#3B2513]/10"
                      : "text-[#3B2513]/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-8">
              <Link
                href="#"
                onClick={() => setOpen(false)}
                className={`text-sm font-semibold px-8 py-3.5 rounded-full ${
                  isDark
                    ? "bg-[#FAF2E1] text-[#3B2513]"
                    : "bg-[#3B2513] text-[#FAF2E1]"
                }`}
              >
                Download CEven
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
