"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bell, CheckCircle2, Copy, LogIn, AlertTriangle, Send, ShieldCheck, Trash2, UserPlus, X } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockChild, mockParentUser, mockAttendanceHistory, mockChildIncidents, mockChildMedication } from "@/lib/parent/mock-data";
import {
  createIndependentCaregiverInvite,
  formatInviteExpiry,
  getAcceptedIndependentCaregiverRelationships,
  getPendingIndependentCaregiverInvites,
  removeIndependentCaregiverRelationship,
  revokeIndependentCaregiverInvite,
  type IndependentCaregiverInvite,
} from "@/lib/independent-caregiver-invites";

export default function ChildPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [caregiverName, setCaregiverName] = useState("");
  const [caregiverPhone, setCaregiverPhone] = useState("");
  const [generatedInvite, setGeneratedInvite] = useState<IndependentCaregiverInvite | null>(null);
  const [acceptedCaregivers, setAcceptedCaregivers] = useState<IndependentCaregiverInvite[]>(() =>
    getAcceptedIndependentCaregiverRelationships(mockChild.id)
  );
  const [pendingInvites, setPendingInvites] = useState<IndependentCaregiverInvite[]>(() =>
    getPendingIndependentCaregiverInvites(mockChild.id)
  );

  function refreshInvites() {
    setAcceptedCaregivers(getAcceptedIndependentCaregiverRelationships(mockChild.id));
    setPendingInvites(getPendingIndependentCaregiverInvites(mockChild.id));
  }

  useEffect(() => {
    window.addEventListener("storage", refreshInvites);
    window.addEventListener("ceven-independent-invites-updated", refreshInvites);
    return () => {
      window.removeEventListener("storage", refreshInvites);
      window.removeEventListener("ceven-independent-invites-updated", refreshInvites);
    };
  }, []);

  const inviteLink = useMemo(() => {
    if (!generatedInvite || typeof window === "undefined") return "";
    return `${window.location.origin}/caregiver/invite/${generatedInvite.code}`;
  }, [generatedInvite]);

  function handleCreateInvite() {
    if (!caregiverName.trim() || caregiverPhone.replace(/\D/g, "").length < 7) return;

    const invite = createIndependentCaregiverInvite({
      caregiverName,
      caregiverPhone,
      child: mockChild,
      parentName: mockParentUser.name,
      parentInitials: mockParentUser.avatarInitials,
    });
    setGeneratedInvite(invite);
    refreshInvites();
  }

  async function handleShare() {
    if (!generatedInvite || !inviteLink) return;
    const text = `${mockParentUser.name} invited you to care for ${mockChild.name} on CEven. Use this single-use link before ${formatInviteExpiry(generatedInvite.expiresAt)}: ${inviteLink}`;

    if (navigator.share) {
      await navigator.share({ title: "CEven caregiver invite", text, url: inviteLink });
      return;
    }

    await navigator.clipboard?.writeText(text);
  }

  function closeInviteModal() {
    setShowInviteModal(false);
    setCaregiverName("");
    setCaregiverPhone("");
    setGeneratedInvite(null);
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
              JM
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Welcome Back,</p>
              <p className="text-xs font-semibold text-cg-brand">James Miller</p>
            </div>
          </div>
          <Link href="/parent/notifications" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell size={18} className="text-gray-500" />
          </Link>
        </div>

        {acceptedCaregivers.length > 0 && (
          <div className="mb-4 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold">Independent caregiver connected</p>
              <p className="text-xs leading-relaxed">
                {acceptedCaregivers[0].caregiverName} accepted the invite and can now send updates for {mockChild.name}.
              </p>
            </div>
          </div>
        )}

        {/* Child profile */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cg-accent-muted text-xl font-bold text-cg-brand">
              LS
            </div>
            <div>
              <h1 className="text-lg font-bold text-cg-brand">{mockChild.name}</h1>
              <p className="text-sm text-gray-400">{mockChild.age} &middot; {mockChild.room}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm text-gray-500">Classroom</span>
              <span className="text-sm font-semibold text-cg-brand">{mockChild.room}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm text-gray-500">Creche caregiver</span>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cg-brand text-[10px] font-bold text-white">
                  {mockChild.caregiverInitials}
                </div>
                <span className="text-sm font-semibold text-cg-brand">{mockChild.caregiver}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm text-gray-500">Age</span>
              <span className="text-sm font-semibold text-cg-brand">{mockChild.age}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 border-b border-gray-100 pb-4">
              <Link href="/parent/attendance" className="rounded-xl bg-emerald-50 p-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-emerald-700">
                  <LogIn size={13} />
                  <span className="text-[11px] font-semibold">Today</span>
                </div>
                <p className="text-xs font-bold text-emerald-800">
                  {mockAttendanceHistory[0].checkInTime
                    ? `Checked in ${mockAttendanceHistory[0].checkInTime}`
                    : "Not checked in yet"}
                </p>
              </Link>
              <Link href="/parent/incidents" className="rounded-xl bg-amber-50 p-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-amber-700">
                  <AlertTriangle size={13} />
                  <span className="text-[11px] font-semibold">Incidents</span>
                </div>
                <p className="text-xs font-bold text-amber-800">
                  {mockChildIncidents.length === 0 ? "None reported" : `${mockChildIncidents.length} reported`}
                </p>
              </Link>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <p className="mb-2 text-sm text-gray-500">Today&apos;s medication</p>
              {mockChildMedication.filter((m) => m.date === "Today").length === 0 ? (
                <p className="text-xs text-gray-400">No medication scheduled today.</p>
              ) : (
                <div className="space-y-2">
                  {mockChildMedication
                    .filter((m) => m.date === "Today")
                    .map((dose) => (
                      <div key={dose.id} className="flex items-center justify-between rounded-xl bg-pink-50 px-3 py-2.5">
                        <div>
                          <p className="text-xs font-bold text-cg-brand">{dose.medication} · {dose.dosage}</p>
                          <p className="text-[11px] text-gray-500">Scheduled {dose.scheduledTime}</p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                            dose.status === "administered"
                              ? "bg-emerald-100 text-emerald-700"
                              : dose.status === "missed"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {dose.status === "administered" ? `Given ${dose.administeredAt}` : dose.status}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">Independent caregiver</span>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="inline-flex items-center gap-1 rounded-full bg-cg-brand px-3 py-1.5 text-xs font-bold text-white"
                >
                  <UserPlus size={13} />
                  Invite
                </button>
              </div>

              {acceptedCaregivers.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-bold text-cg-brand">No caregiver assigned</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    Invite a private caregiver for direct daily updates alongside the creche team.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {acceptedCaregivers.map((caregiver) => (
                    <div key={caregiver.code} className="flex items-center justify-between rounded-2xl bg-cg-quick-action p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-cg-brand">
                          {caregiver.caregiverName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-cg-brand">{caregiver.caregiverName}</p>
                          <p className="text-[11px] text-gray-500">Parent-invited caregiver</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          removeIndependentCaregiverRelationship(caregiver.code);
                          refreshInvites();
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500"
                        aria-label={`Remove ${caregiver.caregiverName}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {pendingInvites.length > 0 && (
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-bold text-cg-brand">Pending invites</p>
            <div className="space-y-2">
              {pendingInvites.map((invite) => (
                <div key={invite.code} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                  <div>
                    <p className="text-sm font-semibold text-cg-brand">{invite.caregiverName}</p>
                    <p className="text-[11px] text-gray-500">Expires {formatInviteExpiry(invite.expiresAt)}</p>
                  </div>
                  <button
                    onClick={() => {
                      revokeIndependentCaregiverInvite(invite.code);
                      refreshInvites();
                    }}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-red-500"
                  >
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ParentBottomNav />

      {showInviteModal && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/35">
          <div className="w-full rounded-t-3xl bg-white px-5 pb-6 pt-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Private caregiver</p>
                <h2 className="text-xl font-bold text-cg-brand">Invite caregiver</h2>
              </div>
              <button onClick={closeInviteModal} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {!generatedInvite ? (
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-gray-500">Caregiver name</span>
                  <input
                    value={caregiverName}
                    onChange={(event) => setCaregiverName(event.target.value)}
                    placeholder="e.g. Ada Nwosu"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-cg-brand outline-none focus:border-cg-brand"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-gray-500">Phone number for OTP</span>
                  <input
                    value={caregiverPhone}
                    onChange={(event) => setCaregiverPhone(event.target.value)}
                    placeholder="+234 809 555 1212"
                    inputMode="tel"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-cg-brand outline-none focus:border-cg-brand"
                  />
                </label>
                <div className="flex gap-2 rounded-2xl bg-cg-quick-action p-3">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-cg-accent" />
                  <p className="text-xs leading-relaxed text-gray-600">
                    The link is single-use, expires in 7 days, and must be accepted with OTP verification for this phone number.
                  </p>
                </div>
                <button
                  onClick={handleCreateInvite}
                  disabled={!caregiverName.trim() || caregiverPhone.replace(/\D/g, "").length < 7}
                  className="w-full rounded-2xl bg-cg-brand py-4 text-sm font-bold text-white disabled:opacity-40"
                >
                  Generate invite link
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-sm font-bold text-emerald-800">Invite link ready</p>
                  <p className="mt-1 break-all text-xs leading-relaxed text-emerald-700">{inviteLink}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigator.clipboard?.writeText(inviteLink)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-100 py-3 text-sm font-bold text-cg-brand"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cg-brand py-3 text-sm font-bold text-white"
                  >
                    <Send size={16} />
                    Share
                  </button>
                </div>
                <button onClick={closeInviteModal} className="w-full rounded-2xl border border-gray-200 py-3 text-sm font-bold text-cg-brand">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
