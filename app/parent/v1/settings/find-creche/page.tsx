"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FindCrecheRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/parent/creche"); }, [router]);
  return null;
}
