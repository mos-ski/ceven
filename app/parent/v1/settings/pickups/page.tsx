"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Plus, Phone, ShieldCheck, ChevronRight, X, Check, Car, UserCheck,
} from "lucide-react";

type PickupPerson = {
  id: string;
  name: string;
  initials: string;
  role: string;
  phone: string;
  color: string;
  verified: boolean;
  securityQuestion: string;
  securityAnswer: string;
};

const INITIAL_PICKUPS: PickupPerson[] = [
  { id: "d1", name: "Mr Chidi", initials: "CH", role: "Driver", phone: "+234 805 678 9012", color: "#6366F1", verified: true, securityQuestion: "What is Liam's birthday?", securityAnswer: "March 15" },
  { id: "n1", name: "Aunty Grace", initials: "AG", role: "Nanny", phone: "+234 803 456 7890", color: "#059669", verified: true, securityQuestion: "What is Liam's favorite toy?", securityAnswer: "Blue truck" },
  { id: "g1", name: "Grandma Rose", initials: "GR", role: "Grandparent", phone: "+234 806 789 0123", color: "#D4A67F", verified: false, securityQuestion: "What is Liam's blood group?", securityAnswer: "O+" },
];

function AddPickupSheet({ onClose, onAdd }: { onClose: () => void; onAdd: (p: PickupPerson) => void }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saved, setSaved] = useState(false);

  const isValid = name.trim() && role && phone.trim() && question.trim() && answer.trim();

  function handleSave() {
    if (!isValid) return;
    onAdd({
      id: `p-${Date.now()}`,
      name,
      initials: name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
      role,
      phone,
      color: "#6366F1",
      verified: false,
      securityQuestion: question,
      securityAnswer: answer,
    });
    setSaved(true);
    setTimeout(onClose, 1200);
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up max-h-[85%] flex flex-col">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200 shrink-0" />
        <div className="flex items-center justify-between px-5 pb-3 shrink-0">
          <h2 className="text-base font-bold text-gray-800">Add Pickup Person</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 space-y-3">
          {saved ? (
            <div className="flex flex-col items-center py-10">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                <Check size={28} className="text-emerald-500" />
              </div>
              <p className="text-sm font-bold text-gray-800">Added Successfully!</p>
              <p className="mt-1 text-xs text-gray-400">They can now pick up your child.</p>
            </div>
          ) : (
            <>
              {/* Avatar placeholder */}
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                  <Plus size={24} className="text-gray-400" />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mrs Adekunle" className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
              </div>

              {/* Role */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">Role</label>
                <div className="flex flex-wrap gap-2">
                  {["Driver", "Nanny", "Grandparent", "Uncle/Aunt", "Family Friend"].map(r => (
                    <button key={r} onClick={() => setRole(r)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${role === r ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-200 text-gray-500"}`}>{r}</button>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">Phone Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 ..." className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
              </div>

              {/* Security */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-amber-600" />
                  <p className="text-xs font-semibold text-amber-700">Security Verification</p>
                </div>
                <p className="mb-2 text-[11px] text-amber-600">
                  Set a question only this person would know. The creche will ask this when they come for pickup.
                </p>
                <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="e.g. What is Liam's birthday?" className="mb-2 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Answer" className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
              </div>

              <button onClick={handleSave} disabled={!isValid} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1] disabled:opacity-40">
                Add Person
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthorizedPickupsPage() {
  const router = useRouter();
  const [pickups, setPickups] = useState<PickupPerson[]>(INITIAL_PICKUPS);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#F9F5F0]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Authorized Pickups</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="mb-4 text-xs text-gray-400">
          People authorized to pick up or drop off your child. They&apos;ll need to verify with a security question.
        </p>

        <div className="space-y-3">
          {pickups.map(person => (
            <div key={person.id} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: person.color }}>
                {person.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-gray-800 truncate">{person.name}</p>
                  {person.verified && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100">
                      <Check size={10} className="text-emerald-600" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400">{person.role} · {person.phone}</p>
              </div>
              <div className="flex items-center gap-1">
                <a href={`tel:${person.phone}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                  <Phone size={14} className="text-blue-500" />
                </a>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50">
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={() => setShowAdd(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-4 text-sm font-medium text-gray-500 active:bg-gray-100"
        >
          <Plus size={18} />
          Add Pickup Person
        </button>

        {/* Info */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} className="text-cg-brand" />
            <p className="text-sm font-semibold text-gray-800">How verification works</p>
          </div>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span>Each person has a <strong className="text-gray-700">security question</strong> only they would know</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span>The creche asks this question when they arrive for pickup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cg-brand" />
              <span>Only <strong className="text-gray-700">verified</strong> checkmark holders have been confirmed by the creche</span>
            </li>
          </ul>
        </div>
      </div>

      {showAdd && (
        <AddPickupSheet
          onClose={() => setShowAdd(false)}
          onAdd={p => setPickups(prev => [...prev, p])}
        />
      )}
    </div>
  );
}
