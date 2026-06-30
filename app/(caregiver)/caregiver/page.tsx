"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cgGet } from "@/lib/caregiver/storage";

export default function CaregiverRoot() {
  const router = useRouter();

  useEffect(() => {
    const onboardingSeen = cgGet("onboarding");
    if (onboardingSeen) {
      router.replace("/caregiver/auth");
    } else {
      router.replace("/caregiver/splash");
    }
  }, [router]);

  return null;
}
