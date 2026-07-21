"use client";

import { useState } from "react";
import { Copy, CheckCircle2, Key, X } from "lucide-react";
import { useAttendance } from "@/lib/attendance/store";

type Props = {
  mode: "generate" | "verify";
  childId?: string;
  childName?: string;
  userName?: string;
};

export function OneTimeCode({ mode, childId, childName, userName }: Props) {
  const { state, dispatch } = useAttendance();
  const [showNameForm, setShowNameForm] = useState(false);
  const [authorizedName, setAuthorizedName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [verifyResult, setVerifyResult] = useState<"success" | "error" | null>(null);
  const [verifiedCode, setVerifiedCode] = useState<{ childName: string; authorizedName: string } | null>(null);

  function handleGenerate() {
    if (!childId || !childName || !userName || !authorizedName.trim()) return;
    dispatch({
      type: "GENERATE_ONE_TIME_CODE",
      childId,
      childName,
      authorizedName: authorizedName.trim(),
      issuedBy: userName,
    });
    setShowNameForm(false);
    setShowModal(true);
  }

  function handleVerify() {
    const code = state.oneTimeCodes.find((c) => c.code === verifyCode && !c.used);
    if (code) {
      dispatch({ type: "USE_ONE_TIME_CODE", code: verifyCode, staffName: userName || "Staff" });
      setVerifiedCode({ childName: code.childName, authorizedName: code.authorizedName });
      setVerifyResult("success");
    } else {
      setVerifyResult("error");
    }
  }

  if (mode === "generate") {
    return (
      <>
        <button
          onClick={() => setShowNameForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cg-accent-muted py-3 text-sm font-semibold text-cg-brand"
        >
          <Key size={16} />
          Authorize a pickup
        </button>

        {showNameForm && (
          <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
            <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
              <div className="mb-4 flex items-center justify-between px-5">
                <h3 className="text-base font-semibold text-gray-800">Who&apos;s picking up?</h3>
                <button
                  onClick={() => { setShowNameForm(false); setAuthorizedName(""); }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
              <div className="px-5">
                <p className="mb-3 text-sm text-gray-500">
                  Enter the name of the driver, grandparent, or anyone else you&apos;re authorizing to pick up {childName} today.
                </p>
                <input
                  type="text"
                  value={authorizedName}
                  onChange={(e) => setAuthorizedName(e.target.value)}
                  placeholder="e.g. Aunty Bisi"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
                />
                <button
                  onClick={handleGenerate}
                  disabled={!authorizedName.trim()}
                  className="mt-4 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Generate Code
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && state.oneTimeCodes.length > 0 && (
          <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
            <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
              <div className="mb-4 flex items-center justify-between px-5">
                <h3 className="text-base font-semibold text-gray-800">One-Time Pickup Code</h3>
                <button onClick={() => setShowModal(false)} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
              <div className="px-5">
                <div className="rounded-xl bg-[#F9F5EE] p-4 text-center">
                  <p className="mb-1 text-xs text-gray-400">Share this code with {state.oneTimeCodes[0].authorizedName}</p>
                  <p className="mb-3 text-3xl font-bold tracking-[0.3em] text-cg-brand">
                    {state.oneTimeCodes[0].code}
                  </p>
                  <p className="text-xs text-gray-400">
                    For: {state.oneTimeCodes[0].childName} · Authorized: {state.oneTimeCodes[0].authorizedName} · Expires end of day
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(state.oneTimeCodes[0].code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#3b2513] px-4 py-2.5 text-sm font-medium text-[#faf2e1]"
      >
        <Key size={16} />
        Enter pickup code
      </button>

      {showModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
          <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
            <div className="mb-4 flex items-center justify-between px-5">
              <h3 className="text-base font-semibold text-gray-800">Verify Pickup Code</h3>
              <button onClick={() => { setShowModal(false); setVerifyResult(null); setVerifyCode(""); setVerifiedCode(null); }} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                <X size={14} className="text-gray-500" />
              </button>
            </div>
            <div className="px-5">
              {verifyResult === "success" && verifiedCode ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <CheckCircle2 size={48} className="mb-3 text-green-500" />
                  <p className="text-sm font-semibold text-gray-800">Code verified!</p>
                  <p className="text-xs text-gray-400">
                    {verifiedCode.authorizedName} is picking up {verifiedCode.childName}. Pickup has been logged.
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-3 text-sm text-gray-500">Enter the 8-digit code shown by the parent/guardian</p>
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                    placeholder="0000 0000"
                    maxLength={8}
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.3em] text-gray-800 placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
                  />
                  {verifyResult === "error" && (
                    <p className="mt-2 text-center text-xs text-red-500">
                      Invalid or expired code. Please check and try again.
                    </p>
                  )}
                  <button
                    onClick={handleVerify}
                    disabled={verifyCode.length < 8}
                    className="mt-4 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    Verify Code
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
