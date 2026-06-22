"use client";

import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";
import { useState } from "react";

import type { Parent } from "@/lib/mock-data/children";

type ActiveTab = "Activity Log" | "Payment History";

const activityHistory = [
  { activity: "QR Code check", detail: "This staff checked in via QR code …", date: "24 July, 2025", time: "02:32 PM" },
];

const paymentHistory = [
  { ref: "REF0292638", date: "10 Oct, 2025", amount: "₦40,000", invoice: "#0123456789", status: "Successful" as const },
  { ref: "REF0292638", date: "10 Oct, 2025", amount: "₦40,000", invoice: "#0123456789", status: "Failed" as const },
  { ref: "REF0292638", date: "10 Oct, 2025", amount: "₦40,000", invoice: "#0123456789", status: "Successful" as const },
];

function PaymentStatusBadge({ status }: { status: "Successful" | "Failed" }) {
  if (status === "Successful") {
    return (
      <span className="inline-flex items-center rounded-full border-transparent bg-badge-success-bg px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-success-text">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[#ef4444] bg-[#fff5f5] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#ef4444]">
      {status}
    </span>
  );
}

function getInitials(name: string) {
  const parts = name.split(" ").filter((part) => !/^(Mr|Mrs|Ms|Dr|Miss|&)\.?$/i.test(part));
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}

function ActivityLogTab() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4">
        <h3 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">History</h3>
        <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Filter by: Date</span>
      </div>
      <table className="hidden w-full border-collapse lg:table">
        <thead>
          <tr className="bg-table-header-bg">
            {["Activity", "Date & Time"].map((col) => (
              <th key={col} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {activityHistory.map((row, i) => (
            <tr key={i} className="border-t border-table-border">
              <td className="px-4 py-3">
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{row.activity}</p>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{row.detail}</p>
              </td>
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                {row.date} • {row.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {activityHistory.map((row, i) => (
          <div key={i} className="rounded-xl border border-[#eaecf0] p-3">
            <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{row.activity}</p>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{row.detail}</p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {row.date} • {row.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentHistoryTab() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4">
        <h3 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Payment History</h3>
        <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Sort by: Date • All type</span>
      </div>
      <table className="hidden w-full border-collapse lg:table">
        <thead>
          <tr className="bg-table-header-bg">
            {["Reference ID", "Date", "Amount", "Invoice", "Status", "Action"].map((col) => (
              <th key={col} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {paymentHistory.map((row, i) => (
            <tr key={i} className="border-t border-table-border">
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.ref}</td>
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.date}</td>
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.amount}</td>
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.invoice}</td>
              <td className="px-4 py-3">
                <PaymentStatusBadge status={row.status} />
              </td>
              <td className="px-4 py-3">
                <button className="flex items-center gap-1.5 text-[#3b2513] hover:opacity-70">
                  <Download className="h-4 w-4" />
                  <span className="font-[family-name:var(--font-urbanist)] text-xs">Payslips</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {paymentHistory.map((row, i) => (
          <div key={i} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{row.amount}</span>
              <PaymentStatusBadge status={row.status} />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.date} • {row.invoice}</span>
              <button className="flex items-center gap-1.5 text-[#3b2513] hover:opacity-70">
                <Download className="h-3.5 w-3.5" />
                <span className="font-[family-name:var(--font-urbanist)] text-[10px]">Payslips</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ParentProfileView({ parent }: { parent: Parent }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Activity Log");
  const tabs: ActiveTab[] = ["Activity Log", "Payment History"];
  const parentDisplayId = `CEV-2024-${parent.id.replace(/\D/g, "").padStart(4, "0")}`;

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <Link
          href="/children?tab=parents"
          className="flex items-center gap-2 font-[family-name:var(--font-urbanist)] text-sm text-[#3b2513]"
        >
          <ChevronLeft className="size-4" />
          Back
        </Link>
        <button
          className="rounded-lg px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#faf2e1]"
          style={{ background: "linear-gradient(135deg, rgb(30,45,74) 0%, rgb(45,24,16) 100%)" }}
        >
          ✦ AI Parent Update
        </button>
      </div>

      {/* Profile banner */}
      <div className="rounded-2xl border border-[#e6ebf3] bg-white p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#edd9c0]">
              <span className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#3b2513]">
                {getInitials(parent.name)}
              </span>
            </div>
            <div>
              <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#c47b2c]">
                Parent ID: {parentDisplayId}
              </p>
              <p className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
                {parent.name}
              </p>
              <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#c47b2c]">
                Joined {parent.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-10">
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">Email</p>
              <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{parent.email}</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">Phone No</p>
              <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{parent.phone}</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">App Status</p>
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${parent.appStatus === "Installed" ? "bg-success-text" : "bg-[#f59e0b]"}`}
                />
                <span
                  className={`font-[family-name:var(--font-nunito)] text-sm font-semibold ${
                    parent.appStatus === "Installed" ? "text-success-text" : "text-[#f59e0b]"
                  }`}
                >
                  {parent.appStatus}
                </span>
                {parent.appStatus === "Not Installed" && (
                  <button className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-dark underline">
                    Send App Invite
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
        {/* Enrolled Child panel */}
        <div className="rounded-xl border border-[#e6ebf3] bg-white p-5">
          <p className="mb-4 font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Enrolled Child
          </p>
          <div className="space-y-3">
            {[
              { label: "Child Name", value: parent.childName },
              { label: "Class", value: parent.class },
              { label: "Enrolled Date", value: parent.enrolledDate },
              { label: "Caregiver", value: parent.caregiver },
            ].map(({ label, value }) => (
              <div key={label} className="border-b border-[#f3f4f6] pb-2 last:border-0">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{label}</p>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs + content */}
        <div>
          <div className="mb-4 border-b border-[#eaecf0]">
            <div className="flex items-center gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap pb-3 font-[family-name:var(--font-urbanist)] text-sm transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-[#3b2513] text-[#3b2513] font-semibold"
                      : "text-[#6b7280] hover:text-[#3b2513]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Activity Log" && <ActivityLogTab />}
          {activeTab === "Payment History" && <PaymentHistoryTab />}
        </div>
      </div>
    </div>
  );
}
