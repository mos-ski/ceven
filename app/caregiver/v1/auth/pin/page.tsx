"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { PinInput } from "@/components/caregiver/pin-input";
import { cgSet } from "@/lib/caregiver/storage";
import { mockUser } from "@/lib/caregiver/mock-data";

const KEYPAD_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "backspace"],
];

const BackspaceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 9L15 15M15 9L9 15M3 12L7 5H21V19H7L3 12Z"
      stroke="#3B2513"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PinPage() {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activeField, setActiveField] = useState<"new" | "confirm">("new");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  function handleKey(key: string) {
    if (activeField === "new") {
      if (key === "backspace") setNewPin((p) => p.slice(0, -1));
      else if (newPin.length < 6 && /^\d$/.test(key)) {
        const next = newPin + key;
        setNewPin(next);
        if (next.length === 6) setActiveField("confirm");
      }
    } else {
      if (key === "backspace") setConfirmPin((p) => p.slice(0, -1));
      else if (confirmPin.length < 6 && /^\d$/.test(key)) setConfirmPin((p) => p + key);
    }
  }

  function handleSetPin() {
    if (newPin.length !== 6 || confirmPin.length !== 6 || newPin !== confirmPin) return;
    cgSet("pin", "true");
    cgSet("userName", mockUser.name);
    cgSet("userRole", mockUser.role);
    setShowSuccess(true);
  }

  const canSubmit = newPin.length === 6 && confirmPin.length === 6 && newPin === confirmPin;

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center bg-black/40 p-6">
      <div className="w-full overflow-y-auto rounded-2xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-cg-brand">Setup Login PIN</h2>
          <button onClick={() => router.back()}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div onClick={() => setActiveField("new")}>
            <PinInput value={newPin} onChange={setNewPin} label="New PIN" />
          </div>
          <div onClick={() => setActiveField("confirm")}>
            <PinInput value={confirmPin} onChange={setConfirmPin} label="Confirm PIN" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {KEYPAD_ROWS.flat().map((k, i) => (
            <button
              key={i}
              onClick={() => k && handleKey(k)}
              disabled={!k}
              className={`flex h-12 items-center justify-center rounded-xl text-base font-medium ${
                k ? "bg-gray-100 text-cg-brand active:bg-gray-200" : "bg-transparent"
              }`}
            >
              {k === "backspace" ? <BackspaceIcon /> : k}
            </button>
          ))}
        </div>

        <button
          onClick={handleSetPin}
          disabled={!canSubmit}
          className="mt-6 w-full rounded-xl bg-cg-accent-muted py-3.5 text-base font-semibold text-cg-brand disabled:opacity-40"
        >
          Set PIN
        </button>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <>
          <div className="absolute inset-0 z-40 bg-black/50" />
          <div className="absolute inset-x-6 top-1/2 z-50 -translate-y-1/2 rounded-3xl bg-white p-6">
            <button
              onClick={() => router.replace("/caregiver/home")}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100"
            >
              <X size={14} className="text-gray-500" />
            </button>
            <div className="flex flex-col items-center gap-3 py-6">
              <p
                className="text-xl font-bold text-cg-brand"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                Success!
              </p>
              <p className="text-sm text-gray-500">Your PIN has been set.</p>
            </div>
            <button
              onClick={() => router.replace("/caregiver/home")}
              className="w-full rounded-xl bg-cg-brand py-3.5 text-base font-semibold text-white"
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}
