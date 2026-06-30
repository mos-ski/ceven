"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CaregiverRoot() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/caregiver/home");
  }, [router]);

  return null;
}
