"use client";

import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";

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
import {
  AI_PREDICTS_NOTES,
  ENQUIRIES,
  ENQUIRY_URGENCY,
  ENROLMENT_RECORDS,
  ENROLMENT_WAITLIST_OVERVIEW,
  LEAVERS,
  ROOMS,
  TRIAL_SESSIONS,
  WAITLIST,
  type Enquiry,
  type EnquiryStage,
  type EnrolmentStatus,
  type LeaverRecord,
  type TrialSession,
  type TrialSessionStatus,
  type WaitlistEntry,
} from "@/lib/mock-data/children";
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

const KANBAN_STAGES: EnquiryStage[] = ["Enquiry Received", "Visit Scheduled", "Trial Booked", "Offer Made"];

const ENROLMENT_STATUS_CLASS: Record<EnrolmentStatus, string> = {
  Overdue: "border-[#d0d5dd] bg-[#f3f4f6] text-[#454B54]",
  Approved: "border-[#009061] bg-[#ecfff8] text-[#009061]",
  Declined: "border-[#ef4444] bg-[#fff5f5] text-[#ef4444]",
  Pending: "border-[#cc8000] bg-[#fff6e6] text-[#cc8000]",
  "Info Requested": "border-[#cc8000] bg-[#fff6e6] text-[#cc8000]",
};

const TRIAL_STATUS_DOT_CLASS: Record<TrialSessionStatus, string> = {
  Upcoming: "bg-[#cc8000]",
  Successful: "bg-[#009061]",
  "Not Suitable": "bg-[#cc8000]",
  "No Show": "bg-[#ef4444]",
  Rescheduled: "bg-[#9ca3af]",
};

const TRIAL_STATUS_TEXT_CLASS: Record<TrialSessionStatus, string> = {
  Upcoming: "text-[#cc8000]",
  Successful: "text-[#009061]",
  "Not Suitable": "text-[#cc8000]",
  "No Show": "text-[#ef4444]",
  Rescheduled: "text-[#6b7280]",
};

function FilterDropdown({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: string[];
  onSelect?: (option: string) => void;
}) {
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
          <DropdownMenuItem key={option} onClick={() => onSelect?.(option)}>
            {option}
          </DropdownMenuItem>
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

// ── Schedule Trial modal (standalone, from Trial Sessions tab) ─────────────

function ScheduleTrialModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <PipelineActionModal
      open={open}
      onOpenChange={onOpenChange}
      title="Schedule Trial"
      submitLabel="Schedule Trial"
      onSubmit={onSubmit}
      fields={
        <>
          <FieldGroup label="Child" required>
            <SelectField options={WAITLIST.map((w) => w.childName)} placeholder="Select a waitlisted child" />
          </FieldGroup>
          <FieldGroup label="Room / Class" required>
            <SelectField options={ROOMS.map((r) => `${r.name} (${r.ageRange})`)} placeholder="Select" />
          </FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <FieldGroup label="Date" required>
              <TextField placeholder="Set date" type="date" />
            </FieldGroup>
            <FieldGroup label="Period">
              <SelectField options={["1 hour", "2 hours", "1 day"]} placeholder="Select" />
            </FieldGroup>
          </div>
          <FieldGroup label="Assigned To">
            <SelectField options={["Ms. Nkechi", "Mr. Seun", "Mrs. Sarah Okonkwo"]} placeholder="Select" />
          </FieldGroup>
          <FieldGroup label="Notes">
            <TextAreaField placeholder="eg parent attending too" />
          </FieldGroup>
        </>
      }
    />
  );
}

// ── Overview stats + AI banner (shared across sub-tabs) ─────────────────────

function OverviewStats() {
  const stats = ENROLMENT_WAITLIST_OVERVIEW;
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <div className="rounded-xl border border-card-border bg-white p-4">
        <p className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">Active Enquiries</p>
        <p className="mt-2 font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-stat-heading">
          {stats.activeEnquiries}
        </p>
        <p className="mt-1 font-[family-name:var(--font-urbanist)] text-xs text-[#009061]">
          ↗ {stats.activeEnquiriesTrend}
        </p>
      </div>
      <div className="rounded-xl border border-card-border bg-white p-4">
        <p className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">Waitlisted</p>
        <p className="mt-2 font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-stat-heading">
          {String(stats.waitlisted).padStart(2, "0")}
        </p>
        <p className="mt-1 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{stats.waitlistedByRoom}</p>
      </div>
      <div className="rounded-xl border border-card-border bg-white p-4">
        <p className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">Total Enrolled</p>
        <p className="mt-2 font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-stat-heading">
          {stats.totalEnrolled}
        </p>
        <p className="mt-1 font-[family-name:var(--font-urbanist)] text-xs text-[#009061]">↗ {stats.totalEnrolledTrend}</p>
      </div>
      <div className="rounded-xl border border-card-border bg-white p-4">
        <p className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">Leavers</p>
        <p className="mt-2 font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-stat-heading">
          {String(stats.leavers).padStart(2, "0")}
        </p>
        <p className="mt-1 font-[family-name:var(--font-urbanist)] text-xs text-[#9ca3af]">Nil</p>
      </div>
    </div>
  );
}

function AiPredictsBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#1e2d4a] bg-gradient-to-r from-[#faf2e1] to-[rgba(196,123,44,0.5)] px-4 py-3">
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1e2d4a] px-2.5 py-1 font-[family-name:var(--font-nunito)] text-xs text-white">
        <Sparkles className="size-3" />
        AI Predicts
      </span>
      <div className="flex flex-1 flex-wrap gap-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
        {AI_PREDICTS_NOTES.map((note) => (
          <span key={note}>{note}</span>
        ))}
      </div>
      <button onClick={onDismiss} className="shrink-0 text-[#2d1810] hover:text-[#3b2513]" aria-label="Dismiss">
        <X className="size-4" />
      </button>
    </div>
  );
}

// ── Sub-tab: Enrolment ───────────────────────────────────────────────────────

function EnrolmentTab() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === ENROLMENT_RECORDS.length ? new Set() : new Set(ENROLMENT_RECORDS.map((r) => r.id))));
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Enrolment List
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Sort by:</span>
            <FilterDropdown label="Most Recent" options={["Most Recent", "Oldest"]} />
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Filter by:</span>
            <FilterDropdown label="All Status" options={["All Status", "Overdue", "Approved", "Declined", "Pending", "Info Requested"]} />
            <FilterDropdown label="All Rooms" options={["All Rooms", ...ROOMS.map((r) => r.name)]} />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
              <Input
                placeholder="Search date, children, parents..."
                className="h-8 w-full sm:w-64 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.size === ENROLMENT_RECORDS.length}
                    onChange={toggleAll}
                    className="size-4 accent-[#3b2513]"
                  />
                </th>
                {["Child", "Parent Name", "Child Name", "Age", "Room", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {ENROLMENT_RECORDS.map((r) => (
                <tr key={r.id} className="border-t border-[#eaecf0]">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(r.id)}
                      onChange={() => toggle(r.id)}
                      className="size-4 accent-[#3b2513]"
                    />
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.dateTime}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.parentName}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.childName}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.age}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.room}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Badge variant="outline" className={ENROLMENT_STATUS_CLASS[r.status]}>
                        {r.status}
                      </Badge>
                      {r.status === "Overdue" && <AlertTriangle className="size-3.5 text-[#cc8000]" />}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {ENROLMENT_RECORDS.map((r) => (
            <div key={r.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{r.childName}</span>
                <Badge variant="outline" className={ENROLMENT_STATUS_CLASS[r.status]}>
                  {r.status}
                </Badge>
              </div>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                {r.parentName} • {r.room} • {r.age}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[#eaecf0] px-4 py-3">
          <button className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]" disabled>
            <ChevronLeft className="size-4" />
            Previous
          </button>
          <button className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280] hover:text-[#2d1810]">
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-2xl lg:left-[280px] lg:right-8">
          <span className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
            {selected.size} children selected
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => setSelected(new Set())}
              className="rounded-lg border border-[#d0d5dd] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
            >
              Decline all {selected.size}
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
            >
              Approve all {selected.size}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-tab: Enquiry Pipeline (Kanban) ───────────────────────────────────────

function EnquiryCard({
  enquiry,
  onClick,
  onDragStart,
  dragging,
}: {
  enquiry: Enquiry;
  onClick: () => void;
  onDragStart: (id: string) => void;
  dragging: boolean;
}) {
  const urgency = ENQUIRY_URGENCY[enquiry.id];
  return (
    <button
      onClick={onClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", enquiry.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart(enquiry.id);
      }}
      className={`flex w-full cursor-grab flex-col gap-1 rounded-xl border border-[#eaecf0] bg-white p-3 text-left shadow-sm hover:border-[#c47b2c] active:cursor-grabbing ${
        dragging ? "opacity-40" : ""
      }`}
    >
      <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{enquiry.childName}</p>
      <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
        Age: {enquiry.age} Class: {enquiry.preferredRoom}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">Enquired: {enquiry.inquiryDate}</span>
        {urgency?.level === "overdue" && (
          <span className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-xs text-[#cc8000]">
            <AlertTriangle className="size-3" />
            {urgency.label}
          </span>
        )}
        {urgency?.level === "high-priority" && (
          <span className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-xs text-[#e2622a]">
            <Flame className="size-3" />
            {urgency.label}
          </span>
        )}
      </div>
    </button>
  );
}

type PipelineModalState =
  | { kind: "preview"; enquiry: Enquiry }
  | { kind: "schedule-visit"; enquiry: Enquiry }
  | { kind: "book-trial"; enquiry: Enquiry }
  | { kind: "make-offer"; enquiry: Enquiry }
  | { kind: "decline"; enquiry: Enquiry }
  | { kind: "request-info"; enquiry: Enquiry }
  | { kind: "success"; heading: string; description: string }
  | null;

function EnquiryPipelineTab() {
  const [modal, setModal] = useState<PipelineModalState>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(ENQUIRIES);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<EnquiryStage | null>(null);
  const close = () => setModal(null);

  function moveEnquiry(id: string, stage: EnquiryStage) {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, stage } : e)));
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Enquiry Pipeline <span className="font-normal text-[#9ca3af]">— Kanban View</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 p-4 pt-0 sm:grid-cols-2 lg:grid-cols-4">
          {KANBAN_STAGES.map((stage) => {
            const items = enquiries.filter((e) => e.stage === stage);
            return (
              <div
                key={stage}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverStage(stage);
                }}
                onDragLeave={() => setDragOverStage((s) => (s === stage ? null : s))}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain");
                  if (id) moveEnquiry(id, stage);
                  setDraggingId(null);
                  setDragOverStage(null);
                }}
                className={`flex flex-col gap-3 rounded-xl p-3 transition-colors ${
                  dragOverStage === stage ? "bg-[#fbe9cf] ring-2 ring-[#c47b2c]" : "bg-[#fdf7ed]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
                    {stage}
                  </h3>
                  <span className="rounded-md bg-[#edd9c0] px-2 py-0.5 font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513]">
                    {items.length}
                  </span>
                </div>
                {items.length === 0 && (
                  <p className="rounded-lg border border-dashed border-[#e0bfa0] py-4 text-center font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
                    Drop here
                  </p>
                )}
                {items.map((enquiry) => (
                  <EnquiryCard
                    key={enquiry.id}
                    enquiry={enquiry}
                    onClick={() => setModal({ kind: "preview", enquiry })}
                    onDragStart={setDraggingId}
                    dragging={draggingId === enquiry.id}
                  />
                ))}
              </div>
            );
          })}
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
          else if (action === "approve") {
            moveEnquiry(enquiry.id, "Enrolled");
            setModal({
              kind: "success",
              heading: "Request Approved",
              description: "You have accepted the request of this child for enrolment into the creche.",
            });
          }
        }}
      />

      <PipelineActionModal
        open={modal?.kind === "schedule-visit"}
        onOpenChange={(open) => !open && close()}
        title="Schedule Visit"
        submitLabel="Schedule Visit"
        onSubmit={() => {
          if (modal?.kind === "schedule-visit") moveEnquiry(modal.enquiry.id, "Visit Scheduled");
          setModal({
            kind: "success",
            heading: "Visit Scheduled",
            description: "You have successfully booked a visit schedule for this enquiry.",
          });
        }}
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
        onSubmit={() => {
          if (modal?.kind === "book-trial") moveEnquiry(modal.enquiry.id, "Trial Booked");
          setModal({
            kind: "success",
            heading: "Trial Booked",
            description: "You have successfully booked a trial schedule for this enquiry.",
          });
        }}
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
        onSubmit={() => {
          if (modal?.kind === "make-offer") moveEnquiry(modal.enquiry.id, "Offer Made");
          setModal({
            kind: "success",
            heading: "Offer Sent",
            description: "Your enrolment offer has been sent to the parent/guardian.",
          });
        }}
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
        onConfirm={() => {
          if (modal?.kind === "decline") moveEnquiry(modal.enquiry.id, "Declined");
          setModal({
            kind: "success",
            heading: "Request Declined",
            description: "This request to enroll a child has been declined. The reason will be forwarded to the parent/guardian.",
          });
        }}
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

      <SuccessModal
        open={modal?.kind === "success"}
        onOpenChange={(open) => !open && close()}
        heading={modal?.kind === "success" ? modal.heading : ""}
        description={modal?.kind === "success" ? modal.description : ""}
      />
    </>
  );
}

// ── Shared row detail modal ──────────────────────────────────────────────────

function RowDetailModal({
  open,
  onOpenChange,
  title,
  badge,
  fields,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  badge?: ReactNode;
  fields: [string, ReactNode][];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex items-center justify-between border-b border-[#e6ebf3] px-6 py-5">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">{title}</h2>
          {badge}
        </div>
        <div className="flex flex-col gap-5 px-6 py-5">
          {fields.map(([label, value]) => (
            <div key={label} className="flex gap-[52px]">
              <p className="w-[140px] shrink-0 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#6b7280]">
                {label}
              </p>
              <div className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#1f2937]">{value}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Sub-tab: Waitlist ────────────────────────────────────────────────────────

const WAITLIST_STATUS_BADGE_CLASS: Record<WaitlistEntry["status"], string> = {
  Waiting: "border-[#cc8000] bg-[#fff6e6] text-[#cc8000]",
  Offered: "border-[#009061] bg-[#ecfff8] text-[#009061]",
  Expired: "border-[#ef4444] bg-[#fff5f5] text-[#ef4444]",
};

function WaitlistRow({ entry, onView }: { entry: WaitlistEntry; onView: (entry: WaitlistEntry) => void }) {
  return (
    <tr onClick={() => onView(entry)} className="cursor-pointer border-t border-[#eaecf0] hover:bg-[#faf9f7]">
      <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" className="size-4 accent-[#3b2513]" />
      </td>
      <td className="px-4 py-3">
        <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{entry.childName}</p>
        <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
          {entry.gender} • Blood: {entry.bloodGroup}
        </p>
      </td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{entry.roomRequested}</td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{entry.dateAdded}</td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-sm text-[#ef4444]">
          <span className="size-1.5 rounded-full bg-[#ef4444]" />
          {entry.waitDays} days
        </span>
      </td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{entry.enrolledSiblings}</td>
      <td className="px-4 py-3">
        <Badge variant="outline" className={WAITLIST_STATUS_BADGE_CLASS[entry.status]}>
          {entry.status}
        </Badge>
      </td>
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onView(entry)} className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="size-4" />
        </button>
      </td>
    </tr>
  );
}

function WaitlistTab() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [viewing, setViewing] = useState<WaitlistEntry | null>(null);

  const filtered = WAITLIST.filter((entry) => {
    if (statusFilter !== "All Status" && entry.status !== statusFilter) return false;
    if (search.trim() && !entry.childName.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Waitlist <span className="font-normal text-[#9ca3af]">— By Room</span>
        </h2>
        <div className="flex items-center gap-2">
          <FilterDropdown label={statusFilter} options={["All Status", "Waiting", "Offered", "Expired"]} onSelect={setStatusFilter} />
          <div className="relative">
            <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search children, parents..."
              className="h-8 w-full sm:w-56 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
            />
          </div>
        </div>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#edd9c0]">
              <th className="w-10 px-4 py-3" />
              {["Child", "Room Requested", "Date Added", "Wait Period", "Enrolled Siblings", "Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                  No waitlist entries match your search or filters.
                </td>
              </tr>
            ) : (
              filtered.map((entry) => <WaitlistRow key={entry.id} entry={entry} onView={setViewing} />)
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {filtered.length === 0 && (
          <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
            No waitlist entries match your search or filters.
          </p>
        )}
        {filtered.map((entry) => (
          <div
            key={entry.id}
            onClick={() => setViewing(entry)}
            className="cursor-pointer rounded-xl border border-[#eaecf0] p-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{entry.childName}</span>
              <Badge variant="outline" className={WAITLIST_STATUS_BADGE_CLASS[entry.status]}>
                {entry.status}
              </Badge>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {entry.roomRequested} • Waiting {entry.waitDays} days
            </p>
          </div>
        ))}
      </div>

      <RowDetailModal
        open={viewing !== null}
        onOpenChange={(open) => !open && setViewing(null)}
        title="Waitlist Entry"
        badge={
          viewing && (
            <Badge variant="outline" className={WAITLIST_STATUS_BADGE_CLASS[viewing.status]}>
              {viewing.status}
            </Badge>
          )
        }
        fields={
          viewing
            ? [
                ["Child", `${viewing.childName} (${viewing.gender} • Blood: ${viewing.bloodGroup})`],
                ["Room Requested", viewing.roomRequested],
                ["Date Added", viewing.dateAdded],
                ["Wait Period", `${viewing.waitDays} days`],
                ["Enrolled Siblings", viewing.enrolledSiblings],
              ]
            : []
        }
      />
    </div>
  );
}

// ── Sub-tab: Trial Sessions ──────────────────────────────────────────────────

function TrialSessionRow({ session, onView }: { session: TrialSession; onView: (session: TrialSession) => void }) {
  return (
    <tr onClick={() => onView(session)} className="cursor-pointer border-t border-[#eaecf0] hover:bg-[#faf9f7]">
      <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" className="size-4 accent-[#3b2513]" />
      </td>
      <td className="px-4 py-3">
        <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{session.childName}</p>
        <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
          {session.gender} • Blood: {session.bloodGroup}
        </p>
      </td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{session.room}</td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{session.trialDate}</td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{session.period}</td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{session.assignedTo}</td>
      <td className="px-4 py-3">
        <span className={cn("flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-sm", TRIAL_STATUS_TEXT_CLASS[session.status])}>
          {session.status === "Not Suitable" ? (
            <AlertTriangle className="size-3.5" />
          ) : (
            <span className={cn("size-1.5 rounded-full", TRIAL_STATUS_DOT_CLASS[session.status])} />
          )}
          {session.status}
        </span>
      </td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{session.notes}</td>
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onView(session)} className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="size-4" />
        </button>
      </td>
    </tr>
  );
}

function TrialSessionsTab() {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("All Rooms");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [viewing, setViewing] = useState<TrialSession | null>(null);

  const filtered = TRIAL_SESSIONS.filter((session) => {
    if (roomFilter !== "All Rooms" && session.room !== roomFilter) return false;
    if (statusFilter !== "All Status" && session.status !== statusFilter) return false;
    if (search.trim() && !session.childName.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Scheduled Trial Sessions
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => setScheduleOpen(true)}
              className="h-9 gap-1.5 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-[#faf2e1]"
            >
              Schedule Trial
            </Button>
            <FilterDropdown label={roomFilter} options={["All Rooms", ...ROOMS.map((r) => r.name)]} onSelect={setRoomFilter} />
            <FilterDropdown
              label={statusFilter}
              options={["All Status", "Upcoming", "Successful", "Not Suitable", "No Show", "Rescheduled"]}
              onSelect={setStatusFilter}
            />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search children, parents..."
                className="h-8 w-full sm:w-56 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
              />
            </div>
          </div>
        </div>
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                <th className="w-10 px-4 py-3" />
                {["Child", "Room", "Trial Date", "Period", "Assigned To", "Status", "Notes", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                    No trial sessions match your search or filters.
                  </td>
                </tr>
              ) : (
                filtered.map((session) => (
                  <TrialSessionRow key={session.id} session={session} onView={setViewing} />
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {filtered.length === 0 && (
            <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
              No trial sessions match your search or filters.
            </p>
          )}
          {filtered.map((session) => (
            <div
              key={session.id}
              onClick={() => setViewing(session)}
              className="cursor-pointer rounded-xl border border-[#eaecf0] p-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{session.childName}</span>
                <span className={cn("flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-xs", TRIAL_STATUS_TEXT_CLASS[session.status])}>
                  <span className={cn("size-1.5 rounded-full", TRIAL_STATUS_DOT_CLASS[session.status])} />
                  {session.status}
                </span>
              </div>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                {session.room} • {session.trialDate} • {session.period}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ScheduleTrialModal
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        onSubmit={() => {
          setScheduleOpen(false);
          setSuccess(true);
        }}
      />

      <SuccessModal
        open={success}
        onOpenChange={setSuccess}
        heading="Trial Scheduled"
        description="The trial session has been added to the schedule."
      />

      <RowDetailModal
        open={viewing !== null}
        onOpenChange={(open) => !open && setViewing(null)}
        title="Trial Session"
        badge={
          viewing && (
            <span className={cn("flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-sm", TRIAL_STATUS_TEXT_CLASS[viewing.status])}>
              <span className={cn("size-1.5 rounded-full", TRIAL_STATUS_DOT_CLASS[viewing.status])} />
              {viewing.status}
            </span>
          )
        }
        fields={
          viewing
            ? [
                ["Child", `${viewing.childName} (${viewing.gender} • Blood: ${viewing.bloodGroup})`],
                ["Room", viewing.room],
                ["Trial Date", viewing.trialDate],
                ["Period", viewing.period],
                ["Assigned To", viewing.assignedTo],
                ["Notes", viewing.notes],
              ]
            : []
        }
      />
    </>
  );
}

// ── Sub-tab: Leavers ──────────────────────────────────────────────────────────

function LeaverRow({ leaver, onView }: { leaver: LeaverRecord; onView: (leaver: LeaverRecord) => void }) {
  return (
    <tr onClick={() => onView(leaver)} className="cursor-pointer border-t border-[#eaecf0] hover:bg-[#faf9f7]">
      <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" className="size-4 accent-[#3b2513]" />
      </td>
      <td className="px-4 py-3">
        <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{leaver.childName}</p>
        <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
          {leaver.gender} • Blood: {leaver.bloodGroup}
        </p>
      </td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
        {leaver.roomIcon} {leaver.room}
      </td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{leaver.reason}</td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{leaver.lastDay}</td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{leaver.noticeGiven}</td>
      <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{leaver.exitSurvey}</td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-sm text-[#009061]">
          <span className="size-1.5 rounded-full bg-[#009061]" />
          {leaver.dataArchived}
        </span>
      </td>
    </tr>
  );
}

function LeaversTab() {
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("All Rooms");
  const [surveyFilter, setSurveyFilter] = useState("All");
  const [viewing, setViewing] = useState<LeaverRecord | null>(null);

  const filtered = LEAVERS.filter((leaver) => {
    if (roomFilter !== "All Rooms" && leaver.room !== roomFilter) return false;
    if (surveyFilter !== "All" && leaver.exitSurvey !== surveyFilter) return false;
    if (search.trim() && !leaver.childName.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Leavers <span className="font-normal text-[#9ca3af]">— This Academic Year</span>
        </h2>
        <div className="flex items-center gap-2">
          <FilterDropdown label={roomFilter} options={["All Rooms", ...ROOMS.map((r) => r.name)]} onSelect={setRoomFilter} />
          <FilterDropdown
            label={surveyFilter === "All" ? "Survey Status" : surveyFilter}
            options={["All", "Completed", "Pending", "Not Sent"]}
            onSelect={setSurveyFilter}
          />
          <div className="relative">
            <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search children, parents..."
              className="h-8 w-full sm:w-56 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
            />
          </div>
        </div>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#edd9c0]">
              <th className="w-10 px-4 py-3" />
              {["Child", "Room", "Reason", "Last Day", "Notice Given", "Exit Survey", "Data Archived"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                  No leavers match your search or filters.
                </td>
              </tr>
            ) : (
              filtered.map((leaver) => <LeaverRow key={leaver.id} leaver={leaver} onView={setViewing} />)
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {filtered.length === 0 && (
          <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
            No leavers match your search or filters.
          </p>
        )}
        {filtered.map((leaver) => (
          <div
            key={leaver.id}
            onClick={() => setViewing(leaver)}
            className="cursor-pointer rounded-xl border border-[#eaecf0] p-3"
          >
            <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{leaver.childName}</span>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {leaver.roomIcon} {leaver.room} • {leaver.reason}
            </p>
          </div>
        ))}
      </div>

      <RowDetailModal
        open={viewing !== null}
        onOpenChange={(open) => !open && setViewing(null)}
        title="Leaver Record"
        fields={
          viewing
            ? [
                ["Child", `${viewing.childName} (${viewing.gender} • Blood: ${viewing.bloodGroup})`],
                ["Room", `${viewing.roomIcon} ${viewing.room}`],
                ["Reason", viewing.reason],
                ["Last Day", viewing.lastDay],
                ["Notice Given", viewing.noticeGiven],
                ["Exit Survey", viewing.exitSurvey],
                ["Data Archived", viewing.dataArchived],
              ]
            : []
        }
      />
    </div>
  );
}

// ── Main tab ─────────────────────────────────────────────────────────────────

type EnrolmentSubTab = "Enrolment" | "Enquiry Pipeline" | "Waitlist" | "Trial Sessions" | "Leavers";
const SUB_TABS: EnrolmentSubTab[] = ["Enrolment", "Enquiry Pipeline", "Waitlist", "Trial Sessions", "Leavers"];

export function EnrolmentWaitlistTab() {
  const [subTab, setSubTab] = useState<EnrolmentSubTab>("Enrolment");
  const [showAiBanner, setShowAiBanner] = useState(true);
  const [newEnquiryOpen, setNewEnquiryOpen] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  return (
    <div className="space-y-4">
      <OverviewStats />

      {showAiBanner && <AiPredictsBanner onDismiss={() => setShowAiBanner(false)} />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex overflow-x-auto border-b border-[#e6ebf3]">
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
                subTab === tab
                  ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                  : "text-[#6b7280] hover:text-[#2d1810]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="h-9 gap-1.5 rounded-lg border-[#d0d5dd] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Quick Actions
            <ChevronDown className="size-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setNewEnquiryOpen(true)}>
              <Plus className="size-3.5" />
              New Enquiry
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {subTab === "Enrolment" && <EnrolmentTab />}
      {subTab === "Enquiry Pipeline" && <EnquiryPipelineTab />}
      {subTab === "Waitlist" && <WaitlistTab />}
      {subTab === "Trial Sessions" && <TrialSessionsTab />}
      {subTab === "Leavers" && <LeaversTab />}

      <NewEnquiryModal
        open={newEnquiryOpen}
        onOpenChange={setNewEnquiryOpen}
        onSubmit={() => {
          setNewEnquiryOpen(false);
          setEnquirySuccess(true);
        }}
      />
      <SuccessModal
        open={enquirySuccess}
        onOpenChange={setEnquirySuccess}
        heading="Enquiry Added"
        description="The new enquiry has been added to the waitlist."
      />
    </div>
  );
}
