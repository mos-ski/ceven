"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";

import { getInviteByCode, setInvitePassword } from "@/lib/staff-invites";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/auth/password-field";

export default function SetPasswordPage() {
 const router = useRouter();
 const params = useParams();
 const code = params.code as string;
 const [invite, setInvite] = useState<ReturnType<typeof getInviteByCode>>(undefined);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [submitting, setSubmitting] = useState(false);

 useEffect(() => {
  if (typeof window === "undefined") return;
  const found = getInviteByCode(code);
  setInvite(found);
  setLoading(false);
 }, [code]);

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");

  const formData = new FormData(e.currentTarget);
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password.length < 8) {
   setError("Password must be at least 8 characters.");
   return;
  }
  if (password !== confirmPassword) {
   setError("Passwords do not match.");
   return;
  }

  setSubmitting(true);
  const updated = setInvitePassword(code, password);
  if (!updated) {
   setError("Invite not found. Please request a new invite.");
   setSubmitting(false);
   return;
  }
  router.push(`/admin/v2/invite/${code}/success`);
 }

 if (loading) {
  return (
   <div className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
    <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">Loading...</p>
   </div>
  );
 }

 if (!invite) {
  return (
   <div className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4">
    <div className="w-full max-w-md rounded-2xl border border-black/[0.07] bg-white p-8 text-center">
     <ShieldCheck className="mx-auto size-10 text-[#ef4444]" />
     <h1 className="mt-4 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
      Invite not found
     </h1>
     <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
      This invite link is invalid or has expired.
     </p>
    </div>
   </div>
  );
 }

 return (
  <div className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4">
   <div className="w-full max-w-[420px] rounded-2xl border border-black/[0.07] bg-white p-8">
    <button
     type="button"
     onClick={() => router.back()}
     className="mb-4 flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#6b7280] hover:text-[#2d1810]"
    >
     <ArrowLeft className="size-4" /> Back
    </button>

    <div className="mb-6 text-center">
     <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#faf2e1]">
      <KeyRound className="size-7 text-[#3b2513]" />
     </div>
     <h1 className="mt-4 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
      Create a new password
     </h1>
     <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
      Set a secure password for <strong>{invite.email}</strong>.
     </p>
    </div>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
     <div className="space-y-4">
      <PasswordField
       id="password"
       name="password"
       label="New Password"
       hint="Must contain 1 uppercase letter, 1 number or symbol, min. 8 characters."
       showStrength
       autoComplete="new-password"
       disabled={submitting}
      />
      <PasswordField
       id="confirmPassword"
       name="confirmPassword"
       label="Confirm Password"
       autoComplete="new-password"
       disabled={submitting}
      />
     </div>

     {error && (
      <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#ef4444]">{error}</p>
     )}

     <Button
      type="submit"
      loading={submitting}
      className="h-11 w-full bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#3b2513]/90"
     >
      Save password
     </Button>
    </form>
   </div>
  </div>
 );
}
