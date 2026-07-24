"use client";

import { useState } from "react";
import { Shield, Plus, X, Check, Mail, Phone, Lock } from "lucide-react";

type FamilyMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  isOwner: boolean;
  color: string;
};

const FAMILY: FamilyMember[] = [
  { id: "p1", name: "James Miller", initials: "JM", role: "Father", email: "james@email.com", phone: "+234 801 234 5678", isOwner: true, color: "#7A4C29" },
  { id: "p2", name: "Sarah Miller", initials: "SM", role: "Mother", email: "sarah@email.com", phone: "+234 802 345 6789", isOwner: false, color: "#D4A67F" },
  { id: "p3", name: "Grace", initials: "GR", role: "Nanny", email: "grace@email.com", phone: "+234 803 456 7890", isOwner: false, color: "#059669" },
];

function InviteModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        {sent ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <Check size={24} className="text-emerald-500" />
            </div>
            <p className="text-sm font-bold text-gray-800">Invitation Sent!</p>
            <button onClick={onClose} className="mt-6 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">Done</button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800">Invite Family Member</h2>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-xs font-semibold text-gray-500">Email or Phone</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email or phone number" className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
            </div>
            <div className="mb-5">
              <label className="mb-1 block text-xs font-semibold text-gray-500">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {["Mother", "Nanny", "Sibling"].map((r) => (
                  <button key={r} onClick={() => setRole(r)} className={`rounded-xl border-2 py-2 text-xs font-medium transition-colors ${role === r ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-100 text-gray-500"}`}>{r}</button>
                ))}
              </div>
            </div>
            <button
              onClick={() => email.trim() && role && setSent(true)}
              disabled={!email.trim() || !role}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              Send Invitation
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SecuritySection() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saved, setSaved] = useState(false);

  const isValid = current.trim() && next.trim().length >= 8 && next === confirm;

  function handleSave() {
    if (!isValid) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setCurrent(""); setNext(""); setConfirm("");
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Lock size={16} className="text-cg-brand" />
        <p className="text-sm font-semibold text-gray-800">Security — Change Password</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Current password" className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
        <input type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder="New password (8+ chars)" className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
      </div>
      <button
        onClick={handleSave}
        disabled={!isValid}
        className="mt-3 rounded-xl bg-cg-brand px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
      >
        {saved ? "Password Updated!" : "Update Password"}
      </button>
    </div>
  );
}

export default function FamilyPage() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Family</h1>
      <p className="mb-6 text-sm text-gray-500">Manage who has access to your child&apos;s care, and your account security.</p>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {FAMILY.map((member) => (
          <div key={member.id} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold text-white" style={{ backgroundColor: member.color }}>
                {member.initials}
              </div>
              {member.isOwner && (
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cg-brand ring-2 ring-white">
                  <Shield size={10} className="text-white" />
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-800">{member.name}</p>
            <p className="text-xs text-gray-400">{member.role}</p>
            <div className="mt-1 flex flex-col items-center gap-0.5 text-[11px] text-gray-400">
              <span className="flex items-center gap-1"><Mail size={10} />{member.email}</span>
              <span className="flex items-center gap-1"><Phone size={10} />{member.phone}</span>
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowInvite(true)}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-4"
        >
          <Plus size={22} className="text-gray-400" />
          <p className="text-xs font-semibold text-gray-500">Invite Family</p>
        </button>
      </div>

      <SecuritySection />

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </div>
  );
}
