"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <nav className="flex items-center justify-between px-12 py-6">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-[#FAF2E1] rounded-full px-3 py-1.5">
          <CevenIcon />
          <span className="text-[#3B2513] font-bold text-sm tracking-tight">CEven</span>
        </div>
      </Link>

      <div className="flex items-center gap-1">
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

      <Link
        href="#"
        className={`text-sm font-medium px-5 py-2.5 rounded-full transition-colors ${
          isDark
            ? "bg-[#5B391E] hover:bg-[#4A2F18] text-[#FAF2E1]"
            : "bg-[#3B2513] hover:bg-[#5B391E] text-[#FAF2E1]"
        }`}
      >
        Download CEven
      </Link>
    </nav>
  );
}

function CevenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="10" r="6" fill="#9A6033" />
      <circle cx="13" cy="10" r="6" fill="#4A7C59" opacity="0.9" />
    </svg>
  );
}
