"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InviteSuccessPage() {
 return (
  <div className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4">
   <div className="w-full max-w-[420px] rounded-2xl border border-black/[0.07] bg-white p-8 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfff8]">
     <CheckCircle2 className="size-8 text-[#009061]" />
    </div>
    <h1 className="mt-4 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
     Password saved
    </h1>
    <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
     Your account is ready. Sign in with your new password to access your dashboard.
    </p>
    <Link
     href="/login"
     className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#3b2513]/90"
    >
     Sign in
     <ArrowRight className="ml-2 size-4" />
    </Link>
   </div>
  </div>
 );
}
