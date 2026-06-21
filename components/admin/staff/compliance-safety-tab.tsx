"use client";

import { useState } from "react";
import { ChevronDown, FileText, Upload, X } from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";
import { COMPLIANCE_ITEMS, type ComplianceStatus } from "@/lib/mock-data/staff";

const STATUS_STYLES: Record<ComplianceStatus, string> = {
  Verified: "bg-[#ecfff8] border border-[#009061] text-[#009061]",
  "Expiring Soon": "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
  Expired: "bg-[#fff5f5] border border-[#ef4444] text-[#ef4444]",
  Missing: "bg-[#f3f4f6] border border-[#9ca3af] text-[#6b7280]",
};

function StatusBadge({ status }: { status: ComplianceStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function UploadDocumentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-[480px] flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 pt-6 pb-4">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
              Upload Compliance Document
            </h2>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Add or update a staff certification / safety document.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Document Type
            </label>
            <select className="rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
              <option>DBS Check Certificate</option>
              <option>First Aid Certificate</option>
              <option>Food Handling Certificate</option>
              <option>Background Check</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="DD MMM YYYY"
              className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="rounded-lg border-2 border-dashed border-[#d0d5dd] p-6 text-center">
            <Upload className="mx-auto mb-2 size-6 text-[#9ca3af]" />
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Drop files here or{" "}
              <span className="cursor-pointer text-[#3b2513] underline">browse</span>
            </p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
              PDF, JPEG. Max 650 KB
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d0d5dd] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
}

export function ComplianceSafetyTab() {
  const [uploadOpen, setUploadOpen] = useState(false);

  const verifiedCount = COMPLIANCE_ITEMS.filter((c) => c.status === "Verified").length;
  const expiringCount = COMPLIANCE_ITEMS.filter((c) => c.status === "Expiring Soon").length;
  const expiredCount = COMPLIANCE_ITEMS.filter((c) => c.status === "Expired").length;
  const missingCount = COMPLIANCE_ITEMS.filter((c) => c.status === "Missing").length;

  return (
    <>
      <div className="space-y-4">
        {/* Stats row */}
        <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          <div className="min-w-[160px] flex-1">
            <StatCard label="Verified Documents" value={String(verifiedCount)} trendLabel="up to date" trendUp />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="Expiring Soon" value={String(expiringCount)} trendLabel="within 90 days" />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="Expired" value={String(expiredCount)} trendLabel="needs renewal" />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="Missing" value={String(missingCount)} trendLabel="not yet submitted" />
          </div>
        </div>

        {/* AI Flags Banner */}
        {(expiredCount > 0 || missingCount > 0) && (
          <div
            className="rounded-xl border border-[#1e2d4a] p-4"
            style={{
              background: "linear-gradient(177.75deg, #faf2e1 0.21%, rgba(196,123,44,0.5) 96.95%)",
            }}
          >
            <span className="inline-block rounded-full bg-[#1e2d4a] px-2 py-0.5 text-xs text-white">
              ✦ Ada AI Flags
            </span>
            <p className="mt-2 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
              {expiredCount} document(s) expired and {missingCount} missing — compliance risk for upcoming inspection.
            </p>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Compliance Checklist
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-[family-name:var(--font-nunito)] text-[#6b7280]">
              Filter by:
            </span>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
              All Status
              <ChevronDown className="size-3" />
            </button>
            <button
              onClick={() => setUploadOpen(true)}
              className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
            >
              Upload Document
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#edd9c0]">
                  {["Staff", "Document", "Issue Date", "Expiry Date", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {COMPLIANCE_ITEMS.map((c) => (
                  <tr key={c.id} className="hover:bg-[#faf9f7]">
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-[#858c98]">{c.role}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="size-3.5 text-[#3b2513]" />
                        <span className="text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                          {c.documentType}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                      {c.issueDate}
                    </td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                      {c.expiryDate ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setUploadOpen(true)}
                        className="font-[family-name:var(--font-urbanist)] text-xs text-[#3b2513] hover:underline"
                      >
                        {c.status === "Missing" ? "Upload" : "Update"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile card list */}
          <div className="flex flex-col gap-2 p-4 lg:hidden">
            {COMPLIANCE_ITEMS.map((c) => (
              <div key={c.id} className="rounded-xl border border-[#eaecf0] p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                      {c.name}
                    </p>
                    <p className="text-[10px] text-[#858c98]">{c.documentType}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                    Expiry: {c.expiryDate ?? "—"}
                  </span>
                  <button
                    onClick={() => setUploadOpen(true)}
                    className="font-[family-name:var(--font-urbanist)] text-xs text-[#3b2513] underline"
                  >
                    {c.status === "Missing" ? "Upload" : "Update"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {uploadOpen && <UploadDocumentModal onClose={() => setUploadOpen(false)} />}
    </>
  );
}
