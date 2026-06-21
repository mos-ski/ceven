"use client";

import { useState } from "react";
import { Plus, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FieldGroup, SelectField } from "@/components/admin/children/form-fields";
import { SuccessModal } from "@/components/admin/children/success-modal";
import { CAREGIVERS } from "@/lib/mock-data/children";
import { ROOMS } from "@/lib/mock-data/children";

function AddCaregiverModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[540px]" showCloseButton={false}>
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Add Caregiver
          </h2>
          <button onClick={() => onOpenChange(false)} className="text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-6" />
          </button>
        </div>
        <div className="space-y-4 px-6 py-5">
          <FieldGroup label="Select Caregiver" required>
            <SelectField options={["Mrs. Sarah Okonkwo", "Mr. Tunde Bakare", "Mrs. Ngozi Eze", "Mrs. Aisha Bello"]} placeholder="Select caregiver" />
          </FieldGroup>
          <FieldGroup label="Assign Room" required>
            <SelectField options={ROOMS.map((r) => r.name)} placeholder="Select room" />
          </FieldGroup>
          <FieldGroup label="Backup Room">
            <SelectField options={ROOMS.map((r) => r.name)} placeholder="Select room" />
          </FieldGroup>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="h-11 rounded-lg border border-[#d0d5dd] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="h-11 rounded-lg bg-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]"
          >
            Add Caregiver
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CaregiversTab() {
  const [addOpen, setAddOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
            Caregivers
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-text" />
              <Input
                placeholder="Search caregivers…"
                className="h-8 w-full sm:w-58 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#F5EDD8] pl-8 text-xs"
              />
            </div>
            <Button
              onClick={() => setAddOpen(true)}
              className="h-9 gap-1.5 rounded-lg bg-brand-dark px-4 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-sidebar-active-text"
            >
              <Plus className="size-3.5" />
              Add Caregiver
            </Button>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-table-header-bg">
                {["Caregiver", "Room", "Children Assigned", "Status", "Action"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {CAREGIVERS.map((cg) => (
                <tr key={cg.id} className="border-t border-table-border">
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{cg.name}</p>
                    <p className="font-[family-name:var(--font-nunito)] text-[10px] text-otp-text">{cg.email}</p>
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{cg.room}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{cg.childrenAssigned}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        cg.status === "Active"
                          ? "border-transparent bg-badge-success-bg text-success-text"
                          : "border-transparent bg-badge-warning-bg text-badge-warning-text"
                      }
                    >
                      {cg.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="rounded-lg border border-brand-dark px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs font-semibold text-brand-dark hover:bg-[#faf6ef]">
                      Reassign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {CAREGIVERS.map((cg) => (
            <div key={cg.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{cg.name}</span>
                <Badge
                  variant="outline"
                  className={
                    cg.status === "Active"
                      ? "border-transparent bg-badge-success-bg text-success-text"
                      : "border-transparent bg-badge-warning-bg text-badge-warning-text"
                  }
                >
                  {cg.status}
                </Badge>
              </div>
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">
                {cg.room} • {cg.childrenAssigned} children
              </span>
            </div>
          ))}
        </div>
      </div>

      <AddCaregiverModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onSubmit={() => {
          setAddOpen(false);
          setSuccessOpen(true);
        }}
      />

      <SuccessModal
        open={successOpen}
        onOpenChange={setSuccessOpen}
        heading="Caregiver Added"
        description="The caregiver has been successfully assigned to the selected room."
      />
    </div>
  );
}
