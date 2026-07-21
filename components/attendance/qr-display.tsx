"use client";

import { Download, Printer, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAttendance } from "@/lib/attendance/store";
import { formatCodeDisplay } from "@/lib/attendance/qr-code";

export function QRDisplay() {
  const { state, dispatch } = useAttendance();

  function handleRegenerate() {
    if (window.confirm("Anyone with the current code will no longer be able to use it. Continue?")) {
      dispatch({ type: "REGENERATE_CODE" });
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-[#3b2513] p-6">
      {/* Creche name row */}
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#faf2e1]">
          Udebem Cresh
        </span>
        <span className="rounded-full border border-[#009061] bg-[#ecfff8] px-2 py-0.5 text-xs text-[#009061]">
          Active
        </span>
      </div>

      {/* QR code */}
      <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-xl bg-white p-4">
        <QRCodeSVG
          value={state.currentQRCode}
          size={120}
          bgColor="#ffffff"
          fgColor="#3b2513"
          level="M"
        />
      </div>

      {/* Backup code */}
      <div className="text-center">
        <p className="text-xs text-[#faf2e1]/50">Backup code</p>
        <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold tracking-[0.3em] text-[#faf2e1]">
          {formatCodeDisplay(state.currentNumericCode)}
        </p>
      </div>

      {/* Download / Print */}
      <div className="flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#bab68d] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513]">
          <Download className="h-4 w-4" />
          Download
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#faf2e1]/40 px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]">
          <Printer className="h-4 w-4" />
          Print
        </button>
      </div>

      {/* Regenerate */}
      <button
        onClick={handleRegenerate}
        className="flex items-center justify-center gap-2 rounded-lg border border-[#faf2e1]/20 px-4 py-2 font-[family-name:var(--font-urbanist)] text-xs text-[#faf2e1]/70 hover:border-[#faf2e1]/50 hover:text-[#faf2e1]"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Regenerate now
      </button>

      {/* Help text */}
      <p className="text-center text-sm text-[#faf2e1]/60">
        Scan QR code with your phone or enter login code
      </p>

      {/* Activity bar */}
      <div className="flex justify-around rounded-xl bg-[#5b391e] p-4">
        {[
          { label: "CHECK-INs", value: String(state.checkInCount).padStart(2, "0") },
          { label: "CHECK-OUTs", value: String(state.checkOutCount).padStart(2, "0") },
          { label: "EXCEPTIONS", value: String(state.exceptionCount).padStart(2, "0") },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <span className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#faf2e1]">
              {item.value}
            </span>
            <span className="text-xs text-[#faf2e1]/60">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
