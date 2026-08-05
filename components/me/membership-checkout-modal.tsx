"use client";

import { useState } from "react";
import { CreditCard, CheckCircle2, Mail, X, Download, AlertCircle, Sparkles } from "lucide-react";
import { VAT_RATE, formatNaira, BILLING_CYCLES, type Plan, type BillingCycle } from "@/lib/me/mock-data";

type Step = "payment" | "success";

function chargeDate(): string {
 const d = new Date();
 d.setDate(d.getDate() + 7);
 return d.toLocaleDateString("en-NG", { month: "long", day: "numeric", year: "numeric" });
}

function nowStamp(): string {
 return new Date().toLocaleString("en-NG", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export function MembershipCheckoutModal({
 plan,
 cycle,
 onClose,
 onSuccess,
}: {
 plan: Plan;
 cycle: BillingCycle;
 onClose: () => void;
 onSuccess: () => void;
}) {
 const [step, setStep] = useState<Step>("payment");
 const [cardNumber, setCardNumber] = useState("");
 const [expiry, setExpiry] = useState("");
 const [cvv, setCvv] = useState("");
 const [cardholder, setCardholder] = useState("");
 const [saveCard, setSaveCard] = useState(false);

 const cycleLabel = BILLING_CYCLES.find((c) => c.id === cycle)?.label ?? cycle;
 const base = plan.pricing?.[cycle] ?? 0;
 const vat = Math.round(base * VAT_RATE * 100) / 100;
 const total = base + vat;

 const isValid = cardNumber.trim() && expiry.trim() && cvv.trim() && cardholder.trim();

 const [transactionId] = useState(() => `TXN-${Date.now()}`);
 const [paidAt] = useState(() => nowStamp());

 function handlePay() {
 if (!isValid) return;
 setStep("success");
 }

 function handleCloseSuccess() {
 onSuccess();
 onClose();
 }

 return (
 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
  <div className="max-h-[90vh] w-full max-w-[420px] overflow-y-auto rounded-2xl bg-[#fbfbfb] p-6 ">
  {step === "payment" ? (
   <>
   <div className="mb-1 flex items-center justify-between">
    <div />
    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
    <X size={16} className="text-gray-600" />
    </button>
   </div>

   <div className="mb-6 flex flex-col items-center gap-1 text-center">
    <h2 className="font-[family-name:var(--font-merriweather-import)] text-xl font-bold text-gray-800">Complete Payment</h2>
    <p className="text-sm text-cg-brand">{plan.name} {cycleLabel}</p>
   </div>

   <div className="mb-4 rounded-2xl border border-black/10 bg-[#faf2e1] p-4">
    <p className="mb-2 text-sm font-medium text-gray-800">Payment Summary</p>
    <div className="flex items-center justify-between py-1 text-sm">
    <span className="text-gray-500">Base Price</span>
    <span className="font-medium text-gray-800">{formatNaira(base)}</span>
    </div>
    <div className="flex items-center justify-between py-1 text-sm">
    <span className="text-gray-500">VAT (7.5%)</span>
    <span className="font-medium text-gray-800">{formatNaira(vat)}</span>
    </div>
    <div className="mt-1 flex items-center justify-between border-t border-cg-brand pt-2 text-base font-medium text-gray-800">
    <span>Total Amount</span>
    <span>{formatNaira(total)}</span>
    </div>
   </div>

   <div className="mb-4 flex gap-2 rounded-xl bg-[#faf2e1] p-3">
    <AlertCircle size={18} className="mt-0.5 shrink-0 text-cg-brand" />
    <p className="text-sm text-cg-brand">
    You&apos;ll get 7 days free trial. Your card will be charged {formatNaira(total)} on {chargeDate()}
    </p>
   </div>

   <div className="rounded-2xl border border-black/10 bg-white p-4">
    <div className="mb-4 flex items-center gap-2">
    <CreditCard size={18} className="text-gray-800" />
    <p className="text-base font-medium text-gray-800">Card Details</p>
    </div>

    <div className="flex flex-col gap-4">
    <div>
     <label className="mb-1 block text-sm font-medium text-gray-800">Card Number</label>
     <input
     value={cardNumber}
     onChange={(e) => setCardNumber(e.target.value)}
     placeholder="1234 5678 9012 3456"
     className="w-full rounded-lg border border-[#ccd2dc] px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
     />
    </div>
    <div className="flex gap-4">
     <div className="flex-1">
     <label className="mb-1 block text-sm font-medium text-gray-800">Expiry Date</label>
     <input
      value={expiry}
      onChange={(e) => setExpiry(e.target.value)}
      placeholder="MM/YY"
      className="w-full rounded-lg border border-[#ccd2dc] px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
     />
     </div>
     <div className="flex-1">
     <label className="mb-1 block text-sm font-medium text-gray-800">CVV</label>
     <input
      value={cvv}
      onChange={(e) => setCvv(e.target.value)}
      placeholder="123"
      className="w-full rounded-lg border border-[#ccd2dc] px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
     />
     </div>
    </div>
    <div>
     <label className="mb-1 block text-sm font-medium text-gray-800">Cardholder Name</label>
     <input
     value={cardholder}
     onChange={(e) => setCardholder(e.target.value)}
     placeholder="John Doe"
     className="w-full rounded-lg border border-[#ccd2dc] px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
     />
    </div>

    <label className="flex items-center gap-2 text-xs text-gray-500">
     <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
     Save card for future payments
    </label>

    <button
     onClick={handlePay}
     disabled={!isValid}
     className="w-full rounded-lg bg-cg-brand py-3 text-sm font-medium text-[#faf2e1] disabled:opacity-40"
    >
     Pay {formatNaira(total)}
    </button>
    </div>
   </div>
   </>
  ) : (
   <>
   <div className="mb-1 flex items-center justify-end">
    <button onClick={handleCloseSuccess} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
    <X size={16} className="text-gray-600" />
    </button>
   </div>

   <div className="mb-4 flex flex-col items-center gap-4">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
    <CheckCircle2 size={44} className="text-green-500" />
    </div>
    <div className="flex flex-col items-center text-center">
    <h2 className="font-[family-name:var(--font-merriweather-import)] text-xl font-bold text-gray-800">Payment Successful</h2>
    <p className="text-sm text-gray-500">Your subscription has been activated</p>
    </div>
   </div>

   <div className="mb-4 flex gap-2 rounded-2xl border border-[#caffed] bg-[#f0fdf4] p-3">
    <Mail size={18} className="mt-0.5 shrink-0 text-[#006745]" />
    <div>
    <p className="text-sm font-medium text-[#006745]">Receipt Sent to Email</p>
    <p className="text-xs text-[#006745]">A copy of your receipt has been sent to your registered email address</p>
    </div>
   </div>

   <div className="mb-4 rounded-2xl border border-black/10 bg-white p-4">
    <p className="mb-3 font-[family-name:var(--font-merriweather-import)] text-sm font-semibold text-gray-800">Transaction Details</p>
    <div className="flex flex-col gap-2 text-sm">
    <div className="flex items-center justify-between"><span className="text-gray-500">Transaction ID</span><span className="text-gray-800">{transactionId}</span></div>
    <div className="flex items-center justify-between"><span className="text-gray-500">Date &amp; Time</span><span className="text-gray-800">{paidAt}</span></div>
    <div className="flex items-center justify-between"><span className="text-gray-500">Plan Type</span><span className="text-gray-800">{cycleLabel}</span></div>
    <div className="mt-1 flex flex-col gap-2 border-t border-gray-200 pt-2">
     <div className="flex items-center justify-between"><span className="text-gray-500">Base Price</span><span className="text-gray-800">{formatNaira(base)}</span></div>
     <div className="flex items-center justify-between"><span className="text-gray-500">VAT (7.5%)</span><span className="text-gray-800">{formatNaira(vat)}</span></div>
     <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-base font-medium">
     <span className="text-gray-500">Total Paid</span><span className="text-gray-800">{formatNaira(total)}</span>
     </div>
    </div>
    </div>
   </div>

   <div className="mb-4 overflow-hidden rounded-2xl border border-gray-100 ">
    <div className="flex items-center gap-2 bg-[#faf2e1] px-4 py-3">
    <div className="flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-[#e0bfa0] bg-[#edd9c0]">
     <Sparkles size={10} className="text-cg-brand" />
    </div>
    <p className="text-sm font-medium text-cg-brand">Premium Features Unlocked</p>
    </div>
    <ul className="flex flex-col gap-2 p-4">
    {plan.features.map((feat) => (
     <li key={feat} className="flex items-center gap-2 text-xs text-gray-500">
     <CheckCircle2 size={14} className="shrink-0 text-green-500" />
     {feat}
     </li>
    ))}
    </ul>
   </div>

   <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-cg-brand py-2.5 text-sm text-cg-brand">
    <Download size={16} />
    Download Receipt
   </button>
   </>
  )}
  </div>
 </div>
 );
}
