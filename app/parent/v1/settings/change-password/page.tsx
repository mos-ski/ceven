"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";

function PasswordField({
  label, value, onChange, show, onToggle,
}: {
  label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void;
}) {
  return (
    <div className="mb-4">
      <p className="mb-1.5 text-sm font-medium text-gray-700">{label}</p>
      <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm text-gray-800 focus:outline-none"
          placeholder="••••••••"
        />
        <button onClick={onToggle} type="button">
          {show ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
        </button>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const rules = [
    { label: "At least 8 characters", ok: next.length >= 8 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(next) },
    { label: "One number", ok: /\d/.test(next) },
  ];

  const canSubmit = current.length >= 6 && rules.every((r) => r.ok) && next === confirm;

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white px-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={52} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Password Updated!</h2>
        <p className="text-sm text-gray-500">Your password has been changed successfully.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]"
        >
          Back to Settings
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button
          onClick={() => router.back()}
          className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Change Password</h1>
        <p className="mt-1 text-sm text-white/70">Keep your account safe with a strong password.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
        <PasswordField label="Current Password" value={current} onChange={setCurrent} show={showCurrent} onToggle={() => setShowCurrent(!showCurrent)} />
        <PasswordField label="New Password" value={next} onChange={setNext} show={showNext} onToggle={() => setShowNext(!showNext)} />

        <div className="mb-4 space-y-1.5">
          {rules.map((r) => (
            <div key={r.label} className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full ${r.ok ? "bg-green-500" : "bg-gray-300"}`} />
              <span className={`text-xs ${r.ok ? "text-green-600" : "text-gray-400"}`}>{r.label}</span>
            </div>
          ))}
        </div>

        <PasswordField label="Confirm New Password" value={confirm} onChange={setConfirm} show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />

        {confirm.length > 0 && next !== confirm && (
          <p className="mb-3 text-xs text-red-500">Passwords do not match</p>
        )}

        <button
          onClick={() => canSubmit && setDone(true)}
          className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
            canSubmit ? "bg-cg-brand text-[#FAF2E1]" : "bg-[#E0BFA0] text-white cursor-not-allowed"
          }`}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
