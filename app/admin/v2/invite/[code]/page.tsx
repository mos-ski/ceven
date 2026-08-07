"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Mail, ShieldCheck, ArrowRight, Copy, Check } from "lucide-react";

import { getInviteByCode, type StaffInvite } from "@/lib/staff-invites";
import { Button } from "@/components/ui/button";

export default function InvitePage() {
 const router = useRouter();
 const params = useParams();
 const code = params.code as string;
 const [invite, setInvite] = useState<StaffInvite | null>(null);
 const [loading, setLoading] = useState(true);
 const [copied, setCopied] = useState(false);

 useEffect(() => {
  if (typeof window === "undefined") return;
  const found = getInviteByCode(code);
  setInvite(found ?? null);
  setLoading(false);
 }, [code]);

 function copyCredentials() {
  if (!invite) return;
  const text = `Email: ${invite.email}\nTemporary password: ${invite.tempPassword}\nActivation link: ${window.location.origin}/admin/v2/invite/${invite.code}`;
  navigator.clipboard.writeText(text).then(() => {
   setCopied(true);
   setTimeout(() => setCopied(false), 2000);
  });
 }

 if (loading) {
  return (
   <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-4">
    <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">Loading invite...</p>
   </div>
  );
  }

 if (!invite) {
  return (
   <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-4">
    <div className="w-full max-w-md rounded-2xl border border-black/[0.07] bg-white p-8 text-center shadow-sm">
     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fde8e8]">
      <ShieldCheck className="size-8 text-[#ef4444]" />
     </div>
     <h1 className="mt-4 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
      Invite not found
     </h1>
     <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
      This invite link may have expired or is invalid.
     </p>
    </div>
   </div>
  );
 }

 return (
  <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-4 py-10">
   {/* Email card */}
   <div className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)]">
    {/* Header */}
    <div className="bg-[#3b2513] px-8 py-6">
     <div className="flex items-center gap-3">
      <img src="/Logo/icon.svg" alt="CEven" className="h-8 w-8" />
      <span className="font-[family-name:var(--font-mogra)] text-xl text-[#faf2e1]">CEven</span>
     </div>
    </div>

    {/* Body */}
    <div className="px-8 py-8">
     <div className="flex items-center gap-2">
      <Mail className="size-5 text-[#c47b2c]" />
      <span className="font-[family-name:var(--font-urbanist)] text-xs font-semibold uppercase tracking-wide text-[#c47b2c]">
       Invitation
      </span>
     </div>

     <h1 className="mt-4 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
      You&apos;ve been invited to CEven
     </h1>

     <p className="mt-3 font-[family-name:var(--font-urbanist)] text-sm leading-6 text-[#6b7280]">
      Hi <strong>{invite.name}</strong>,
     </p>
     <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm leading-6 text-[#6b7280]">
      You have been invited to join the <strong>CEven Crèche Admin</strong> dashboard as a{" "}
      <strong>{invite.role}</strong>. Click the button below to activate your account and create a secure password.
     </p>

     {/* Role badge */}
     <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#faf2e1] px-4 py-2">
      <span className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]">
       Role: {invite.role}
      </span>
     </div>

     {/* Credentials box */}
     <div className="mt-6 rounded-xl border border-[#e6ebf3] bg-[#faf9f7] p-5">
      <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
       Your login credentials
      </p>
      <div className="mt-4 space-y-3 font-[family-name:var(--font-urbanist)] text-sm">
       <div className="flex items-center justify-between gap-4">
        <span className="text-[#6b7280]">Email</span>
        <span className="font-medium text-[#2d1810]">{invite.email}</span>
       </div>
       <div className="flex items-center justify-between gap-4">
        <span className="text-[#6b7280]">Temporary password</span>
        <span className="font-mono font-medium text-[#2d1810]">{invite.tempPassword}</span>
       </div>
      </div>
      <button
       type="button"
       onClick={copyCredentials}
       className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#d0d5dd] bg-white py-2 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
      >
       {copied ? <Check className="size-3.5 text-[#009061]" /> : <Copy className="size-3.5" />}
       {copied ? "Copied" : "Copy credentials"}
      </button>
     </div>

     {/* CTA */}
     <div className="mt-8">
      <Button
       onClick={() => router.push(`/admin/v2/invite/${code}/set-password`)}
       className="h-12 w-full bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#3b2513]/90"
      >
       Activate Account
       <ArrowRight className="ml-2 size-4" />
      </Button>
     </div>

     <p className="mt-6 text-center font-[family-name:var(--font-urbanist)] text-xs text-[#9ca3af]">
      For security, you will be asked to create a new password before accessing your dashboard.
     </p>
    </div>

    {/* Footer */}
    <div className="border-t border-[#e6ebf3] bg-[#faf9f7] px-8 py-4">
     <p className="text-center font-[family-name:var(--font-urbanist)] text-xs text-[#9ca3af]">
      If you did not expect this invitation, please ignore this email.
     </p>
    </div>
   </div>
  </div>
 );
}
