"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SuccessModal from "@/components/dashboard/success-modal";

const BMI_CATEGORIES = ["Underweight", "Healthy", "Overweight"];

export function LogGrowthModal({
  previousWeight,
  previousHeight,
  onClose,
}: {
  previousWeight: string;
  previousHeight: string;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessModal
        title="Growth Record Logged"
        description="The child's weight and height have been updated on their health profile."
        onClose={onClose}
      />
    );
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Growth</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="growth-prev-weight">Previous Weight (kg)</Label>
              <Input id="growth-prev-weight" defaultValue={previousWeight} disabled className="h-9" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="growth-new-weight">New Weight (kg)</Label>
              <Input id="growth-new-weight" type="number" min={0} step={0.1} placeholder="0" className="h-9" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="growth-height">Height (cm)</Label>
              <Input id="growth-height" type="number" min={0} defaultValue={previousHeight} className="h-9" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="growth-bmi">BMI</Label>
              <select
                id="growth-bmi"
                defaultValue="Healthy"
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                {BMI_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="growth-note">Add Note</Label>
            <textarea
              id="growth-note"
              rows={3}
              placeholder="Any additional note"
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-9 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => setSubmitted(true)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Save Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
