"use client";

import { useState } from "react";
import { Phone, ShieldCheck, Plus, X, Check } from "lucide-react";

type PickupPerson = {
  id: string;
  name: string;
  initials: string;
  role: string;
  phone: string;
  color: string;
  verified: boolean;
};

const INITIAL_PICKUPS: PickupPerson[] = [
  { id: "d1", name: "Mr Chidi", initials: "CH", role: "Driver", phone: "+234 805 678 9012", color: "#6366F1", verified: true },
  { id: "n1", name: "Aunty Grace", initials: "AG", role: "Nanny", phone: "+234 803 456 7890", color: "#059669", verified: true },
  { id: "g1", name: "Grandma Rose", initials: "GR", role: "Grandparent", phone: "+234 806 789 0123", color: "#D4A67F", verified: false },
];

function AddPickupModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: PickupPerson) => void }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = name.trim() && role && phone.trim();

  function handleAdd() {
    if (!isValid) return;
    onAdd({
      id: `p-${Date.now()}`,
      name: name.trim(),
      initials: name.trim().split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
      role,
      phone: phone.trim(),
      color: "#6366F1",
      verified: false,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Add Pickup Person</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mrs Adekunle" className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Role</label>
          <div className="flex flex-wrap gap-2">
            {["Driver", "Nanny", "Grandparent", "Uncle/Aunt", "Family Friend"].map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${role === r ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-200 text-gray-500"}`}>{r}</button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 ..." className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none" />
        </div>

        <button onClick={handleAdd} disabled={!isValid} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40">
          Add Person
        </button>
      </div>
    </div>
  );
}

export default function PickupsPage() {
  const [pickups, setPickups] = useState<PickupPerson[]>(INITIAL_PICKUPS);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Authorized Pickups</h1>
      <p className="mb-6 text-sm text-gray-500">People authorized to pick up or drop off your child.</p>

      <div className="mb-4 flex flex-col gap-3">
        {pickups.map((person) => (
          <div key={person.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: person.color }}>
                {person.initials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-gray-800">{person.name}</p>
                  {person.verified && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100">
                      <Check size={10} className="text-emerald-600" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{person.role} · {person.phone}</p>
              </div>
            </div>
            <a href={`tel:${person.phone}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
              <Phone size={15} className="text-blue-500" />
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAdd(true)}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-4 text-sm font-medium text-gray-500 hover:bg-gray-100"
      >
        <Plus size={18} />
        Add Pickup Person
      </button>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck size={16} className="text-cg-brand" />
          <p className="text-sm font-semibold text-gray-800">How verification works</p>
        </div>
        <p className="text-xs text-gray-500">
          Each authorized person is verified by the creche at drop-off/pickup. Only verified checkmark holders have been confirmed.
        </p>
      </div>

      {showAdd && (
        <AddPickupModal onClose={() => setShowAdd(false)} onAdd={(p) => setPickups((prev) => [...prev, p])} />
      )}
    </div>
  );
}
