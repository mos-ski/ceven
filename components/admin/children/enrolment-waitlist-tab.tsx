"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, Mail, Phone, Plus, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  FieldGroup,
  ModalCheckbox,
  SectionHeading,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/admin/children/form-fields";
import { SuccessModal } from "@/components/admin/children/success-modal";
import { ENQUIRIES, ENQUIRY_STATS, type Enquiry, type EnquiryStage } from "@/lib/mock-data/children";
import { ROOMS } from "@/lib/mock-data/children";
import { cn } from "@/lib/utils";

const STAGE_BADGE_CLASS: Record<EnquiryStage, string> = {
  "Enquiry Received": "border-transparent bg-gray-100 text-gray-600",
  "Visit Scheduled": "border-transparent bg-[#e0f2fe] text-[#0369a1]",
  "Trial Booked": "border-transparent bg-[#fef3c7] text-[#b45309]",
  "Offer Made": "border-transparent bg-[#ede9fe] text-[#6d28d9]",
  Enrolled: "border-transparent bg-badge-success-bg text-success-text",
  Declined: "border-transparent bg-[#fee2e2] text-[#b91c1c]",
};

const STAGES: Array<"All Stages" | EnquiryStage> = [
  "All Stages",
  "Enquiry Received",
  "Visit Scheduled",
  "Trial Booked",
  "Offer Made",
  "Enrolled",
  "Declined",
];

function FilterDropdown({ label, options }: { label: string; options: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-8 gap-2 rounded-lg border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#454B54]"
          />
        }
      >
        {label}
        <ChevronDown className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ── Enquiry Preview modal ───────────────────────────────────────────────────

function EnquiryPreviewModal({
  enquiry,
  onOpenChange,
  onAction,
}: {
  enquiry: Enquiry | null;
  onOpenChange: (open: boolean) => void;
  onAction: (action: "schedule-visit" | "book-trial" | "make-offer" | "approve" | "decline" | "request-info") => void;
}) {
  if (!enquiry) return null;
  return (
    <Dialog open={!!enquiry} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[540px]" showCloseButton={false}>
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Inquiry Preview
          </h2>
          <button onClick={() => onOpenChange(false)} className="text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-6" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
              {enquiry.childName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                {enquiry.childName}
              </p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
                {enquiry.gender} • {enquiry.age} • {enquiry.inquiryDate}
              </p>
            </div>
            <Badge variant="outline" className={cn("ml-auto", STAGE_BADGE_CLASS[enquiry.stage])}>
              {enquiry.stage}
            </Badge>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Contact Person</p>
              <div className="mt-1 flex items-center gap-2">
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  {enquiry.parentName}
                </p>
                <button className="flex items-center gap-1 text-[#3b2513]">
                  <Phone className="size-3.5" />
                </button>
                <button className="flex items-center gap-1 text-[#3b2513]">
                  <Mail className="size-3.5" />
                </button>
              </div>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{enquiry.parentPhone}</p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{enquiry.parentEmail}</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Inquiry Date</p>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{enquiry.inquiryDate}</p>
            </div>
            <div className="col-span-2 space-y-2">
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Pipeline Progress</p>
              {(["Visit Scheduled", "Trial Booked", "Offer Made"] as EnquiryStage[]).map((step) => (
                <div key={step} className="flex items-center gap-2 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      enquiry.stage === step ||
                        STAGES.indexOf(enquiry.stage) > STAGES.indexOf(step)
                        ? "bg-[#009061]"
                        : "bg-[#e6ebf3]"
                    )}
                  />
                  {step}
                  {step === "Visit Scheduled" && enquiry.visitDate && (
                    <span className="text-xs text-[#9ca3af]">— {enquiry.visitDate} {enquiry.visitTime}</span>
                  )}
                  {step === "Trial Booked" && enquiry.trialDate && (
                    <span className="text-xs text-[#9ca3af]">— {enquiry.trialDate} {enquiry.trialTime}</span>
                  )}
                  {step === "Offer Made" && enquiry.offerPlan && (
                    <span className="text-xs text-[#9ca3af]">— {enquiry.offerPlan}</span>
                  )}
                </div>
              ))}
            </div>
            {enquiry.notes && (
              <div className="col-span-2">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Notes</p>
                <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{enquiry.notes}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            onClick={() => onAction("request-info")}
            className="h-11 rounded-lg border border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Request Info
          </button>
          {enquiry.stage === "Enquiry Received" && (
            <button
              onClick={() => onAction("schedule-visit")}
              className="h-11 rounded-lg bg-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]"
            >
              Schedule Visit
            </button>
          )}
          {enquiry.stage === "Visit Scheduled" && (
            <button
              onClick={() => onAction("book-trial")}
              className="h-11 rounded-lg bg-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]"
            >
              Book Trial
            </button>
          )}
          {enquiry.stage === "Trial Booked" && (
            <button
              onClick={() => onAction("make-offer")}
              className="h-11 rounded-lg bg-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]"
            >
              Make Offer
            </button>
          )}
          {enquiry.stage === "Offer Made" && (
            <>
              <button
                onClick={() => onAction("decline")}
                className="h-11 rounded-lg border border-[#ef4444] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#ef4444] hover:bg-[#fff5f5]"
              >
                Decline
              </button>
              <button
                onClick={() => onAction("approve")}
                className="h-11 rounded-lg bg-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]"
              >
                Approve Enrolment
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Schedule Visit / Book Trial / Make Offer modals (shared shape) ─────────

function PipelineActionModal({
  open,
  onOpenChange,
  title,
  fields,
  submitLabel,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: ReactNode;
  submitLabel: string;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[540px]" showCloseButton={false}>
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">{title}</h2>
          <button onClick={() => onOpenChange(false)} className="text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-6" />
          </button>
        </div>
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">{fields}</div>
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
            {submitLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Decline reason modal ────────────────────────────────────────────────────

function DeclineReasonModal({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[492px]" showCloseButton={false}>
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Decline request
          </h2>
          <button onClick={() => onOpenChange(false)} className="text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-6" />
          </button>
        </div>
        <div className="px-6 pt-4">
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Select a reason for declining this enrolment request. This will be shared with the parent/guardian.
          </p>
        </div>
        <div className="space-y-4 px-6 py-5">
          <ModalCheckbox label="No vacancy" />
          <ModalCheckbox label="Age group not available" />
          <ModalCheckbox label="Incomplete documentation" />
          <ModalCheckbox label="Other" />
          <div>
            <p className="mb-2 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Additional notes
            </p>
            <TextAreaField placeholder="Type here..." rows={4} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="h-11 rounded-lg border border-[#d0d5dd] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-11 rounded-lg bg-[#ef4444] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-white hover:bg-[#dc2626]"
          >
            Decline Request
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Request additional info modal ───────────────────────────────────────────

function RequestInfoModal({
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
      <DialogContent className="max-w-[492px]" showCloseButton={false}>
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Request Additional Information
          </h2>
          <button onClick={() => onOpenChange(false)} className="text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-6" />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="mb-2 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
            What information do you need from the parent/guardian?
          </p>
          <TextAreaField placeholder="e.g. Please share the child's immunization records..." rows={6} />
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="h-11 flex-1 rounded-lg border border-[#d0d5dd] font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="h-11 flex-1 rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]"
          >
            Send Request
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── New Enquiry modal ────────────────────────────────────────────────────────

function NewEnquiryModal({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px]" showCloseButton={false}>
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">New Enquiry</h2>
          <button onClick={() => onOpenChange(false)} className="text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-6" />
          </button>
        </div>
        <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
          <SectionHeading>Child Information</SectionHeading>
          <FieldGroup label="Child's Name" required>
            <TextField placeholder="e.g. Tiara Bankole" />
          </FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <FieldGroup label="Date of Birth / Age">
              <TextField placeholder="Enter text here" />
            </FieldGroup>
            <FieldGroup label="Gender">
              <SelectField options={["Male", "Female"]} placeholder="Select" />
            </FieldGroup>
          </div>
          <FieldGroup label="Allergies / Medical Notes">
            <TextAreaField placeholder="eg allergic to peanut butter" />
          </FieldGroup>
          <FieldGroup label="Preferred Room / Class">
            <SelectField options={ROOMS.map((r) => `${r.name} (${r.ageRange})`)} placeholder="Select" />
          </FieldGroup>
          <div className="h-px bg-[#f3f4f6]" />
          <SectionHeading>Parent / Guardian Information</SectionHeading>
          <FieldGroup label="Full Name" required>
            <TextField placeholder="Enter text" />
          </FieldGroup>
          <FieldGroup label="Email Address" required>
            <TextField type="email" placeholder="Enter email" />
          </FieldGroup>
          <ModalCheckbox label="Send confirmation email to parent" defaultChecked />
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
            Add Enquiry
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Main tab ─────────────────────────────────────────────────────────────────

type ModalState =
  | { kind: "preview"; enquiry: Enquiry }
  | { kind: "schedule-visit"; enquiry: Enquiry }
  | { kind: "book-trial"; enquiry: Enquiry }
  | { kind: "make-offer"; enquiry: Enquiry }
  | { kind: "decline"; enquiry: Enquiry }
  | { kind: "request-info"; enquiry: Enquiry }
  | { kind: "new-enquiry" }
  | { kind: "success"; heading: string; description: string }
  | null;

export function EnrolmentWaitlistTab() {
  const [modal, setModal] = useState<ModalState>(null);

  const close = () => setModal(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="min-w-0 flex-1 rounded-xl border border-card-border bg-white p-4">
          <p className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">New Enquiries</p>
          <p className="mt-2 font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-stat-heading">
            {String(ENQUIRY_STATS.newEnquiries).padStart(2, "0")}
          </p>
        </div>
        <div className="min-w-0 flex-1 rounded-xl border border-card-border bg-white p-4">
          <p className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">Visits Scheduled</p>
          <p className="mt-2 font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-stat-heading">
            {String(ENQUIRY_STATS.visitsScheduled).padStart(2, "0")}
          </p>
        </div>
        <div className="min-w-0 flex-1 rounded-xl border border-card-border bg-white p-4">
          <p className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">Trials Booked</p>
          <p className="mt-2 font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-stat-heading">
            {String(ENQUIRY_STATS.trialsBooked).padStart(2, "0")}
          </p>
        </div>
        <div className="min-w-0 flex-1 rounded-xl border border-card-border bg-white p-4">
          <p className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">Conversion Rate</p>
          <p className="mt-2 font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-stat-heading">
            {ENQUIRY_STATS.conversionRate}%
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
            Enrolment &amp; Waitlist
          </h2>
          <div className="flex items-center gap-3">
            <FilterDropdown label="All Stages" options={STAGES} />
            <div className="h-6 w-px bg-input-border" />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-text" />
              <Input
                placeholder="Search enquiries…"
                className="h-8 w-full sm:w-58 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#F5EDD8] pl-8 text-xs"
              />
            </div>
            <Button
              onClick={() => setModal({ kind: "new-enquiry" })}
              className="h-9 gap-1.5 rounded-lg bg-brand-dark px-4 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-sidebar-active-text"
            >
              <Plus className="size-3.5" />
              New Enquiry
            </Button>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-table-header-bg">
                {["Child", "Parent", "Inquiry Date", "Stage", "Action"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {ENQUIRIES.map((enquiry) => (
                <tr key={enquiry.id} className="border-t border-table-border">
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{enquiry.childName}</p>
                    <p className="font-[family-name:var(--font-nunito)] text-[10px] text-otp-text">
                      {enquiry.gender} • {enquiry.age}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#454B54]">{enquiry.parentName}</p>
                    <p className="font-[family-name:var(--font-nunito)] text-[10px] text-otp-text">{enquiry.parentEmail}</p>
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{enquiry.inquiryDate}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={STAGE_BADGE_CLASS[enquiry.stage]}>
                      {enquiry.stage}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setModal({ kind: "preview", enquiry })}
                      className="rounded-lg border border-brand-dark px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs font-semibold text-brand-dark hover:bg-[#faf6ef]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {ENQUIRIES.map((enquiry) => (
            <button
              key={enquiry.id}
              onClick={() => setModal({ kind: "preview", enquiry })}
              className="flex items-center justify-between rounded-xl border border-[#eaecf0] p-3 text-left transition-colors hover:bg-[#faf9f7]"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{enquiry.childName}</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">
                  {enquiry.parentName} • {enquiry.inquiryDate}
                </span>
              </div>
              <Badge variant="outline" className={STAGE_BADGE_CLASS[enquiry.stage]}>
                {enquiry.stage}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <EnquiryPreviewModal
        enquiry={modal?.kind === "preview" ? modal.enquiry : null}
        onOpenChange={(open) => !open && close()}
        onAction={(action) => {
          if (!modal || modal.kind !== "preview") return;
          const { enquiry } = modal;
          if (action === "schedule-visit") setModal({ kind: "schedule-visit", enquiry });
          else if (action === "book-trial") setModal({ kind: "book-trial", enquiry });
          else if (action === "make-offer") setModal({ kind: "make-offer", enquiry });
          else if (action === "decline") setModal({ kind: "decline", enquiry });
          else if (action === "request-info") setModal({ kind: "request-info", enquiry });
          else if (action === "approve")
            setModal({
              kind: "success",
              heading: "Request Approved",
              description: "You have accepted the request of this child for enrolment into the creche.",
            });
        }}
      />

      <PipelineActionModal
        open={modal?.kind === "schedule-visit"}
        onOpenChange={(open) => !open && close()}
        title="Schedule Visit"
        submitLabel="Schedule Visit"
        onSubmit={() =>
          setModal({
            kind: "success",
            heading: "Visit Scheduled",
            description: "You have successfully booked a visit schedule for this enquiry.",
          })
        }
        fields={
          <>
            <FieldGroup label="Date" required>
              <TextField placeholder="Set date" type="date" />
            </FieldGroup>
            <FieldGroup label="Time" required>
              <TextField placeholder="Set time" type="time" />
            </FieldGroup>
            <FieldGroup label="Assigned Staff">
              <SelectField options={["Mrs. Sarah Okonkwo", "Mr. Tunde Bakare", "Mrs. Ngozi Eze"]} placeholder="Select" />
            </FieldGroup>
            <FieldGroup label="Additional Notes">
              <TextAreaField placeholder="eg allergic to peanut butter" />
            </FieldGroup>
          </>
        }
      />

      <PipelineActionModal
        open={modal?.kind === "book-trial"}
        onOpenChange={(open) => !open && close()}
        title="Schedule Trial"
        submitLabel="Book Trial"
        onSubmit={() =>
          setModal({
            kind: "success",
            heading: "Trial Booked",
            description: "You have successfully booked a trial schedule for this enquiry.",
          })
        }
        fields={
          <>
            <FieldGroup label="Date" required>
              <TextField placeholder="Set date" type="date" />
            </FieldGroup>
            <FieldGroup label="Time" required>
              <TextField placeholder="Set time" type="time" />
            </FieldGroup>
            <FieldGroup label="Room / Class">
              <SelectField options={ROOMS.map((r) => `${r.name} (${r.ageRange})`)} placeholder="Select" />
            </FieldGroup>
            <FieldGroup label="Duration">
              <SelectField options={["Half Day", "Full Day", "1 Week"]} placeholder="Select" />
            </FieldGroup>
            <div className="h-px bg-[#f3f4f6]" />
            <FieldGroup label="Assigned Staff">
              <SelectField options={["Mrs. Sarah Okonkwo", "Mr. Tunde Bakare", "Mrs. Ngozi Eze"]} placeholder="Select" />
            </FieldGroup>
            <FieldGroup label="Additional Notes">
              <TextAreaField placeholder="eg allergic to peanut butter" />
            </FieldGroup>
          </>
        }
      />

      <PipelineActionModal
        open={modal?.kind === "make-offer"}
        onOpenChange={(open) => !open && close()}
        title="Make an Offer"
        submitLabel="Send Offer"
        onSubmit={() =>
          setModal({
            kind: "success",
            heading: "Offer Sent",
            description: "Your enrolment offer has been sent to the parent/guardian.",
          })
        }
        fields={
          <>
            <FieldGroup label="Room / Class" required>
              <SelectField options={ROOMS.map((r) => `${r.name} (${r.ageRange})`)} placeholder="Select" />
            </FieldGroup>
            <FieldGroup label="Start Date" required>
              <TextField placeholder="Set date" type="date" />
            </FieldGroup>
            <FieldGroup label="Subscription Plan" required>
              <SelectField options={["Monthly – ₦40,000", "Termly – ₦110,000", "Annual – ₦400,000"]} placeholder="Select pricing" />
            </FieldGroup>
            <FieldGroup label="Offer Note">
              <TextField placeholder="eg full payment for the month of March" />
            </FieldGroup>
            <FieldGroup label="Additional Notes">
              <TextAreaField placeholder="eg allergic to peanut butter" />
            </FieldGroup>
          </>
        }
      />

      <DeclineReasonModal
        open={modal?.kind === "decline"}
        onOpenChange={(open) => !open && close()}
        onConfirm={() =>
          setModal({
            kind: "success",
            heading: "Request Declined",
            description: "This request to enroll a child has been declined. The reason will be forwarded to the parent/guardian.",
          })
        }
      />

      <RequestInfoModal
        open={modal?.kind === "request-info"}
        onOpenChange={(open) => !open && close()}
        onSubmit={() =>
          setModal({
            kind: "success",
            heading: "Request Sent",
            description: "Your request for more information has been sent.",
          })
        }
      />

      <NewEnquiryModal
        open={modal?.kind === "new-enquiry"}
        onOpenChange={(open) => !open && close()}
        onSubmit={() =>
          setModal({
            kind: "success",
            heading: "Enquiry Added",
            description: "The new enquiry has been added to the waitlist.",
          })
        }
      />

      <SuccessModal
        open={modal?.kind === "success"}
        onOpenChange={(open) => !open && close()}
        heading={modal?.kind === "success" ? modal.heading : ""}
        description={modal?.kind === "success" ? modal.description : ""}
      />
    </div>
  );
}
