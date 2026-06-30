"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cgGet } from "@/lib/caregiver/storage";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const onboardingSeen = cgGet("onboarding");
      router.replace(onboardingSeen ? "/caregiver/auth" : "/caregiver/onboarding");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-cg-bg">
      <div className="flex flex-col items-center gap-3">
        {/* Logo mark — placeholder SVG matching Figma icon */}
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill="#3B2513" />
          <circle cx="28" cy="20" r="8" fill="#C9956A" />
          <circle cx="44" cy="18" r="6" fill="#8FA89A" />
          <circle cx="50" cy="28" r="5" fill="#4A7C7C" />
          <path d="M18 52 Q36 30 54 52" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
        <span
          className="text-3xl font-bold tracking-tight text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          CEven
        </span>
      </div>
    </div>
  );
}
