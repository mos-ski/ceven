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

const planOptions = ["Monthly – ₦40,000", "Termly – ₦110,000", "Annual – ₦400,000", "Daily – ₦400,000"];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
      {children}
    </label>
  );
}

export default function NewInvoiceModal({ open, onOpenChange }: Props) {
  const [child, setChild] = useState("");
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const selectedChild = CHILDREN.find((c) => c.id === child);

  function handleCreate() {
    // Mock create — no backend wired up yet.
    onOpenChange(false);
    setChild("");
    setPlan("");
    setAmount("");
    setDueDate("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px]" showCloseButton>
        <DialogHeader>
          <DialogTitle>New Invoice</DialogTitle>
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
              <FieldLabel>Plan</FieldLabel>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-black focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              >
                <option value="" disabled>
                  Select Plan
                </option>
                {planOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <FieldLabel>Amount (₦)</FieldLabel>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <FieldLabel>
              Due Date <span className="text-[#6b7280]">(next payment)</span>
            </FieldLabel>
            <div className="relative">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 pr-10 font-[family-name:var(--font-nunito)] text-sm text-black focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
              <Calendar className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
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
            onClick={handleCreate}
            disabled={!child || !plan || !amount || !dueDate}
            className="w-[160px] rounded-lg border border-[#d4a67f] bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
          >
            Create Invoice
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
