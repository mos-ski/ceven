"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Plus, Shield, Lock, UserX, ChevronRight, X, Check, Mail, Phone,
} from "lucide-react";
import { mockParentUser } from "@/lib/parent/mock-data";

type FamilyMember = {
  id: string;
  name: string;
  initials: string;
  role: "Father" | "Mother" | "Sibling" | "Nanny" | "Admin";
  email: string;
  phone: string;
  isOwner: boolean;
  color: string;
};

const FAMILY_MEMBERS: FamilyMember[] = [
  { id: "p1", name: "James Miller", initials: "JM", role: "Father", email: "james@email.com", phone: "+234 801 234 5678", isOwner: true, color: "#7A4C29" },
  { id: "p2", name: "Sarah Miller", initials: "SM", role: "Mother", email: "sarah@email.com", phone: "+234 802 345 6789", isOwner: false, color: "#D4A67F" },
  { id: "p3", name: "Grace", initials: "GR", role: "Nanny", email: "grace@email.com", phone: "+234 803 456 7890", isOwner: false, color: "#059669" },
];

function InviteSheet({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
        <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up">
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200" />
          <div className="flex flex-col items-center py-8">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <Check size={24} className="text-emerald-500" />
            </div>
            <p className="text-sm font-bold text-gray-800">Invitation Sent!</p>
            <p className="mt-1 text-xs text-gray-400">They&apos;ll receive a link to join your family.</p>
            <button onClick={onClose} className="mt-6 w-48 rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]">Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200" />
        <div className="flex items-center justify-between px-5 pb-3">
          <h2 className="text-base font-bold text-gray-800">Invite Family Member</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>
        <div className="px-5 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">Email or Phone</label>
            <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
              <Mail size={14} className="text-gray-400" />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email or phone number"
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500">Role</label>
            <div className="grid grid-cols-3 gap-2">
              {["Mother", "Nanny", "Sibling"].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`rounded-xl border-2 py-2 text-xs font-medium transition-colors ${
                    role === r ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-100 text-gray-500"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => email.trim() && role && setSent(true)}
            disabled={!email.trim() || !role}
            className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1] disabled:opacity-40"
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
}

function MemberDetailSheet({
  member,
  onClose,
  onResetPassword,
}: {
  member: FamilyMember;
  onClose: () => void;
  onResetPassword: () => void;
}) {
  const [resetSent, setResetSent] = useState(false);

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200" />
        <div className="flex items-center justify-between px-5 pb-3">
          <h2 className="text-base font-bold text-gray-800">Profile Details</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>

        <div className="flex flex-col items-center px-5 pb-4">
          <div
            className="mb-3 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
            style={{ backgroundColor: member.color }}
          >
            {member.initials}
          </div>
          <p className="text-base font-bold text-gray-800">{member.name}</p>
          <span className="mt-1 rounded-full bg-gray-100 px-3 py-0.5 text-[11px] font-medium text-gray-500">{member.role}</span>
        </div>

        <div className="space-y-2 px-5">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
            <Mail size={16} className="text-gray-400" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">Email</p>
              <p className="text-sm text-gray-700">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
            <Phone size={16} className="text-gray-400" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">Phone</p>
              <p className="text-sm text-gray-700">{member.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 px-5">
          {member.isOwner ? (
            <div className="flex items-center gap-3 rounded-xl bg-cg-brand/5 px-4 py-3">
              <Shield size={16} className="text-cg-brand" />
              <span className="text-sm font-medium text-cg-brand">You own this account</span>
            </div>
          ) : (
            <>
              <button
                onClick={() => { setResetSent(true); setTimeout(onClose, 1500); }}
                className="flex w-full items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
              >
                <Lock size={16} className="text-gray-500" />
                <span className="flex-1 text-left text-sm text-gray-700">
                  {resetSent ? "Reset link sent!" : "Reset Password"}
                </span>
                <ChevronRight size={14} className="text-gray-400" />
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
                <UserX size={16} className="text-red-500" />
                <span className="flex-1 text-left text-sm font-medium text-red-500">Remove from Family</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FamilyProfilesPage() {
  const router = useRouter();
  const [members] = useState<FamilyMember[]>(FAMILY_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#F9F5F0]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Family Profiles</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="mb-4 text-xs text-gray-400">Manage who has access to your child&apos;s care. Tap a profile to view details.</p>

        {/* Netflix-style grid */}
        <div className="grid grid-cols-3 gap-4">
          {members.map(member => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className="relative">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                {member.isOwner && (
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cg-brand ring-2 ring-white">
                    <Shield size={10} className="text-white" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-800 truncate max-w-[90px]">{member.name.split(" ")[0]}</p>
                <p className="text-[10px] text-gray-400">{member.role}</p>
              </div>
            </button>
          ))}

          {/* Add member */}
          <button
            onClick={() => setShowInvite(true)}
            className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <Plus size={24} className="text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500">Add</p>
              <p className="text-[10px] text-gray-400">Family</p>
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-800">How profiles work</p>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span><strong className="text-gray-700">Owner</strong> — full access to edit profile, manage members, and billing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span><strong className="text-gray-700">Family members</strong> — can view reports, chat with caregivers, and get notifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span><strong className="text-gray-700">Nanny</strong> — can log attendance, reports, and send updates</span>
            </li>
          </ul>
        </div>
      </div>

      {selectedMember && (
        <MemberDetailSheet
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onResetPassword={() => {}}
        />
      )}

      {showInvite && (
        <InviteSheet onClose={() => setShowInvite(false)} />
      )}
    </div>
  );
}
