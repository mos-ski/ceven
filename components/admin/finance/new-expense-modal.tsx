"use client";

import { useRef, useState } from "react";
import { Calendar, UploadCloud } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { EXPENSE_CATEGORIES, type ExpenseCategory } from "@/lib/mock-data/finance";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm text-black">{children}</label>
  );
}

export default function NewExpenseModal({ open, onOpenChange }: Props) {
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    // Mock submit — no backend wired up yet.
    onOpenChange(false);
    setDate("");
    setVendor("");
    setCategory("");
    setDescription("");
    setAmount("");
    setReceiptFile(null);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px]" showCloseButton>
        <DialogHeader>
          <DialogTitle>New Expense</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="flex flex-col gap-1">
            <FieldLabel>Date</FieldLabel>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 pr-10 font-[family-name:var(--font-nunito)] text-sm text-black focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
              <Calendar className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <FieldLabel>
              Vendor <span className="text-[#6b7280]">(optional)</span>
            </FieldLabel>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="e.g. Delux Baby Care"
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FieldLabel>Select Category</FieldLabel>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-black focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select Category
              </option>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <FieldLabel>Enter Description</FieldLabel>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Napkin"
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FieldLabel>Amount</FieldLabel>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FieldLabel>Receipt</FieldLabel>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center gap-3 rounded-xl border border-[#ccd2dc] bg-white px-4 py-2.5 hover:border-[#c47b2c]"
            >
              <div className="flex w-full items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-[#f4f5f6] bg-[#e6ebf3]">
                  <UploadCloud className="size-3 text-[#3b2513]" />
                </span>
                <div className="flex flex-1 flex-col items-start gap-1 text-left">
                  <span className="flex gap-1 text-xs">
                    <span className="font-[family-name:var(--font-merriweather)] font-semibold text-[#3b2513]">
                      Click to Upload
                    </span>
                    <span className="font-[family-name:var(--font-urbanist)] text-[#6b7280]">
                      or drag and drop
                    </span>
                  </span>
                  <span className="font-[family-name:var(--font-urbanist)] text-[10px] font-medium text-[#6b7280]">
                    PNG or JPG (max. 5mb)
                  </span>
                </div>
              </div>
              {receiptFile && (
                <span className="w-full truncate rounded-md bg-[#f9fafb] px-2 py-1 text-left font-[family-name:var(--font-nunito)] text-xs text-[#2d1810]">
                  {receiptFile.name}
                </span>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
            />
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
            disabled={!date || !category || !description || !amount}
            className="w-[160px] rounded-lg border border-[#3b2513] bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Update &amp; Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
