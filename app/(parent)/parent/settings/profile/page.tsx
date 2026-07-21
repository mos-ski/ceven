"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Edit3, Shield, ChevronDown, CheckCircle2, X, Plus, Lock, UserX, ChevronRight,
} from "lucide-react";
import { mockParentUser } from "@/lib/parent/mock-data";

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

const RELATIONSHIP_OPTIONS = ["Father", "Mother", "Guardian", "Grandparent", "Other"];
const LANGUAGE_OPTIONS = ["English", "Yoruba", "Igbo", "Hausa", "French"];

function EditProfileSheet({
  member,
  onClose,
  onSave,
}: {
  member: FamilyMember;
  onClose: () => void;
  onSave: (data: Partial<FamilyMember>) => void;
}) {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [phone, setPhone] = useState(member.phone);
  const [relationship, setRelationship] = useState(member.role);
  const [language, setLanguage] = useState("English");
  const [emergencyName, setEmergencyName] = useState("Mrs Bakare");
  const [emergencyPhone, setEmergencyPhone] = useState("+234 804 567 8901");
  const [showSaved, setShowSaved] = useState(false);

  function handleSave() {
    onSave({ name, email, phone, role: relationship });
    setShowSaved(true);
    setTimeout(() => onClose(), 1200);
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up max-h-[85%] flex flex-col">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200 shrink-0" />
        <div className="flex items-center justify-between px-5 pb-3 shrink-0">
          <h2 className="text-base font-bold text-gray-800">Edit Profile</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 space-y-3">
          {showSaved ? (
            <div className="flex flex-col items-center py-10">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 size={28} className="text-emerald-500" />
              </div>
              <p className="text-sm font-bold text-gray-800">Profile Updated!</p>
            </div>
          ) : (
            <>
              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:border-cg-brand focus:outline-none" />
              </div>

              {/* Relationship */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">Relationship</label>
                <div className="flex flex-wrap gap-2">
                  {RELATIONSHIP_OPTIONS.map(r => (
                    <button key={r} onClick={() => setRelationship(r)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${relationship === r ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-200 text-gray-500"}`}>{r}</button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:border-cg-brand focus:outline-none" />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:border-cg-brand focus:outline-none" />
              </div>

              {/* Language */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">Language</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGE_OPTIONS.map(l => (
                    <button key={l} onClick={() => setLanguage(l)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${language === l ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-200 text-gray-500"}`}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                <p className="mb-2 text-xs font-semibold text-gray-500">Emergency Contact</p>
                <input value={emergencyName} onChange={e => setEmergencyName(e.target.value)} placeholder="Name" className="mb-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none" />
                <input value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} placeholder="Phone" className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none" />
              </div>

              <button onClick={handleSave} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]">Save Changes</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MemberDetailSheet({
  member,
  onClose,
  onEdit,
}: {
  member: FamilyMember;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200" />
        <div className="flex items-center justify-between px-5 pb-3">
          <h2 className="text-base font-bold text-gray-800">Profile Details</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>

        <div className="flex flex-col items-center px-5 pb-4">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white" style={{ backgroundColor: member.color }}>
            {member.initials}
          </div>
          <p className="text-base font-bold text-gray-800">{member.name}</p>
          <span className="mt-1 rounded-full bg-gray-100 px-3 py-0.5 text-[11px] font-medium text-gray-500">{member.role}</span>
        </div>

        <div className="space-y-2 px-5">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-[10px] text-gray-400 w-12">Email</span>
            <span className="text-sm text-gray-700">{member.email}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-[10px] text-gray-400 w-12">Phone</span>
            <span className="text-sm text-gray-700">{member.phone}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2 px-5">
          {member.isOwner ? (
            <button onClick={() => { onClose(); setTimeout(onEdit, 200); }} className="flex w-full items-center gap-3 rounded-xl bg-cg-brand/5 px-4 py-3">
              <Edit3 size={16} className="text-cg-brand" />
              <span className="flex-1 text-left text-sm font-medium text-cg-brand">Edit Profile</span>
              <ChevronRight size={14} className="text-cg-brand/40" />
            </button>
          ) : (
            <>
              <button className="flex w-full items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <Lock size={16} className="text-gray-500" />
                <span className="flex-1 text-left text-sm text-gray-700">Reset Password</span>
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

export default function ViewProfilePage() {
  const router = useRouter();
  const [members, setMembers] = useState<FamilyMember[]>(FAMILY);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [editing, setEditing] = useState(false);

  function handleSave(data: Partial<FamilyMember>) {
    setMembers(prev => prev.map(m => m.isOwner ? { ...m, ...data } : m));
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#F9F5F0]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">My Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="mb-4 text-xs text-gray-400">Tap a profile to view or edit details.</p>

        {/* Netflix-style grid */}
        <div className="grid grid-cols-3 gap-4">
          {members.map(member => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md" style={{ backgroundColor: member.color }}>
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

          <button onClick={() => router.push("/parent/settings/profile/family")} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <Plus size={24} className="text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500">Add</p>
              <p className="text-[10px] text-gray-400">Family</p>
            </div>
          </button>
        </div>

        {/* How it works */}
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-800">Profile roles</p>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span><strong className="text-gray-700">Owner</strong> — full access: edit profile, manage family, emergency contacts, billing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span><strong className="text-gray-700">Family</strong> — view reports, chat with caregivers, receive notifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span><strong className="text-gray-700">Nanny</strong> — log attendance, send updates, manage daily reports</span>
            </li>
          </ul>
        </div>
      </div>

      {selectedMember && (
        <MemberDetailSheet
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onEdit={() => { setSelectedMember(null); setTimeout(() => setEditing(true), 200); }}
        />
      )}

      {editing && (
        <EditProfileSheet
          member={members.find(m => m.isOwner)!}
          onClose={() => setEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
