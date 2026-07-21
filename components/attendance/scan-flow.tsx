"use client";

import { useState } from "react";
import { Camera, Keyboard, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { useAttendance } from "@/lib/attendance/store";
import { ChildSelector } from "./child-selector";
import { getChildIdsForParent, getAuthorizedPickup } from "@/lib/attendance/mock-scan";
import type { UserRole } from "@/lib/attendance/types";

type Props = {
  userRole: UserRole;
  userId: string;
  userName: string;
};

export function ScanFlow({ userRole, userId, userName }: Props) {
  const { state, dispatch } = useAttendance();
  const [step, setStep] = useState<"idle" | "scanning" | "manual" | "selecting" | "success" | "error">("idle");
  const [manualCode, setManualCode] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleScan() {
    setStep("scanning");
    setTimeout(() => {
      if (userRole === "parent") {
        setStep("selecting");
      } else {
        handleStaffScan();
      }
    }, 1200);
  }

  function handleManualEntry() {
    setStep("manual");
  }

  function submitManualCode() {
    if (manualCode.replace(/\s/g, "") === state.currentNumericCode) {
      if (userRole === "parent") {
        setStep("selecting");
      } else {
        handleStaffScan();
      }
    } else {
      setError("Invalid code. Please check and try again.");
      setStep("error");
    }
  }

  function handleStaffScan() {
    const staffIds = ["staff-1", "staff-2", "staff-3", "staff-4", "staff-5"];
    const staffId = staffIds.includes(userId) ? userId : "staff-1";
    dispatch({
      type: "LOG_STAFF_ATTENDANCE",
      staffId,
      staffName: userName,
      staffRole: "Caregiver",
    });
    const current = state.staffStates[staffId];
    const action = current?.signedIn ? "signed out" : "signed in";
    setSuccessMsg(`Successfully ${action}!`);
    setStep("success");
  }

  function handleChildSelect(childIds: string[]) {
    childIds.forEach((childId) => {
      const child = state.childStates.find((c) => c.childId === childId);
      const isPickup = child?.isCheckedIn ?? false;
      // Authorization only matters for pickup — dropping off your own
      // enrolled child never needs a check.
      const authorizedPickup = isPickup ? getAuthorizedPickup(childId) : true;
      dispatch({
        type: "LOG_CHILD_ATTENDANCE",
        childId,
        actorId: userId,
        actorName: userName,
        authorizedPickup,
      });
    });
    setSuccessMsg(`${childIds.length} child(ren) updated successfully!`);
    setStep("success");
  }

  function reset() {
    setStep("idle");
    setManualCode("");
    setError("");
    setSuccessMsg("");
  }

  if (step === "success") {
    return (
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
        <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
          <div className="flex flex-col items-center px-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 size={36} className="text-green-500" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-gray-800">Success</h2>
            <p className="mb-6 text-sm text-gray-500">{successMsg}</p>
            <button
              onClick={reset}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
        <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
          <div className="flex flex-col items-center px-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle size={36} className="text-red-500" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-gray-800">Error</h2>
            <p className="mb-6 text-sm text-gray-500">{error}</p>
            <button
              onClick={reset}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "selecting" && userRole === "parent") {
    const myChildIds = getChildIdsForParent(userId);
    const myChildren = state.childStates.filter((c) => myChildIds.includes(c.childId));
    return (
      <ChildSelector
        children={myChildren}
        onConfirm={handleChildSelect}
        onClose={reset}
      />
    );
  }

  if (step === "manual") {
    return (
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
        <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
          <div className="mb-4 flex items-center justify-between px-5">
            <h3 className="text-base font-semibold text-gray-800">Enter Code</h3>
            <button onClick={reset} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <X size={14} className="text-gray-500" />
            </button>
          </div>
          <div className="px-5">
            <p className="mb-3 text-sm text-gray-500">Enter the 8-digit code displayed at reception</p>
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
              placeholder="0000 0000"
              maxLength={8}
              className="w-full rounded-xl border border-gray-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.3em] text-gray-800 placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
            />
            <button
              onClick={submitManualCode}
              disabled={manualCode.length < 8}
              className="mt-4 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              Submit Code
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleScan}
        className="flex items-center justify-center gap-3 rounded-2xl bg-cg-brand py-4 text-white active:scale-[0.98] transition-transform"
      >
        <Camera size={22} />
        <span className="text-sm font-semibold">Scan attendance code</span>
      </button>
      <button
        onClick={handleManualEntry}
        className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-cg-accent-muted py-3 text-sm font-semibold text-cg-brand"
      >
        <Keyboard size={16} />
        Enter code instead
      </button>

      {step === "scanning" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cg-brand border-t-transparent" />
            <p className="text-sm font-semibold text-gray-700">Scanning...</p>
          </div>
        </div>
      )}
    </div>
  );
}
