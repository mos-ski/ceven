"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CHILDREN } from "@/lib/mock-data/children";

type RecordStatus = "Looks Good" | "Needs Review" | "Flagged";

const statusOptions: RecordStatus[] = ["Looks Good", "Needs Review", "Flagged"];

const STATUS_DOT_CLASS: Record<RecordStatus, string> = {
  "Looks Good": "bg-[#45b39d]",
  "Needs Review": "bg-[#f59e0b]",
  Flagged: "bg-[#ef4444]",
};

const STATUS_TEXT_CLASS: Record<RecordStatus, string> = {
  "Looks Good": "text-[#45b39d]",
  "Needs Review": "text-[#f59e0b]",
  Flagged: "text-[#ef4444]",
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When editing an existing payment record, pass its initial values; the footer
   * button switches from "Record Payment" to "Update Record". */
  mode?: "create" | "update";
  initialChildId?: string;
  initialAmount?: string;
  initialNextPayment?: string;
  initialStatus?: RecordStatus;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
      {children}
    </label>
  );
}

export default function RecordPaymentModal({
  open,
  onOpenChange,
  mode = "create",
  initialChildId = "",
  initialAmount = "",
  initialNextPayment = "",
  initialStatus = "Looks Good",
}: Props) {
  const [child, setChild] = useState(initialChildId);
  const [amount, setAmount] = useState(initialAmount);
  const [nextPayment, setNextPayment] = useState(initialNextPayment);
  const [status, setStatus] = useState<RecordStatus>(initialStatus);

  const selectedChild = CHILDREN.find((c) => c.id === child);

  function handleSubmit() {
    // Mock submit — no backend wired up yet.
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px]" showCloseButton>
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="flex flex-col gap-1">
            <FieldLabel>Child</FieldLabel>
            <select
              value={child}
              onChange={(e) => setChild(e.target.value)}
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select child
              </option>
              {CHILDREN.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <FieldLabel>Parent Name</FieldLabel>
            <input
              type="text"
              readOnly
              value={selectedChild?.parentName ?? ""}
              placeholder="Select child"
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-[#f9fafb] px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] placeholder:text-[#6b7280] focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <FieldLabel>Amount</FieldLabel>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <FieldLabel>Next Payment</FieldLabel>
              <div className="relative">
                <input
                  type="date"
                  value={nextPayment}
                  onChange={(e) => setNextPayment(e.target.value)}
                  className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 pr-10 font-[family-name:var(--font-nunito)] text-sm text-black focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
                <Calendar className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <FieldLabel>Status</FieldLabel>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as RecordStatus)}
                className="h-[52px] w-full appearance-none rounded-xl border border-[#9ca3af] bg-white pl-4 pr-10 font-[family-name:var(--font-urbanist)] text-sm focus:outline-none"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span
                className={`pointer-events-none absolute left-4 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-md bg-[#eaf7f3] px-2 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium ${STATUS_TEXT_CLASS[status]}`}
              >
                <span className={`size-1.5 rounded-full ${STATUS_DOT_CLASS[status]}`} />
                {status}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg border border-[#3b2513] bg-white px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!child || !amount || !nextPayment}
            className="w-[160px] rounded-lg border border-[#d4a67f] bg-[#e0bfa0] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-[#d4a67f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mode === "update" ? "Update Record" : "Record Payment"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
