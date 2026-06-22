"use client";

import { MoreVertical, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/admin/stat-card";
import { PARENTS } from "@/lib/mock-data/children";

export function ParentsTab() {
  const installedCount = PARENTS.filter((p) => p.appStatus === "Installed").length;

  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-stat-heading">
        Parents
      </h1>

      <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
        <StatCard label="Registered" value={String(PARENTS.length).padStart(2, "0")} trendLabel="+12.5%" trendUp />
        <StatCard label="Active In-app" value={String(installedCount).padStart(2, "0")} trendLabel="Random text" />
        <StatCard label="New This Month" value="00" trendLabel="+12.5% vs last month" trendUp />
        <StatCard label="Average App Rating" value="00" trendLabel="Random text" />
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
            Parent Log
          </h2>
          <div className="relative">
            <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-text" />
            <Input
              placeholder="Search children, parents..."
              className="h-8 w-full sm:w-64 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#F5EDD8] pl-8 text-xs"
            />
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-table-header-bg">
                {["Parent", "Emergency Contact", "Child/Children", "Due Payment", "App Status", "Action"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {PARENTS.map((parent) => (
                <tr key={parent.id} className="border-t border-table-border">
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{parent.name}</p>
                    <p className="font-[family-name:var(--font-nunito)] text-[10px] text-otp-text">
                      {parent.email} • {parent.phone}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{parent.name}</p>
                    <p className="font-[family-name:var(--font-nunito)] text-[10px] text-otp-text">
                      {parent.email} • {parent.phone}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                    {parent.childName}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm">
                    {parent.dueAmount ? (
                      <span className="font-semibold text-[#cd3030]">{parent.dueAmount}</span>
                    ) : (
                      <span className="text-[#9ca3af]">--</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {parent.appStatus === "Installed" ? (
                      <Badge variant="outline" className="border-transparent bg-badge-success-bg text-success-text">
                        Installed
                      </Badge>
                    ) : (
                      <button className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-dark underline">
                        Send App Invite
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {PARENTS.map((parent) => (
            <div key={parent.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{parent.name}</span>
                {parent.appStatus === "Installed" ? (
                  <Badge variant="outline" className="border-transparent bg-badge-success-bg text-success-text">
                    Installed
                  </Badge>
                ) : (
                  <button className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-brand-dark underline">
                    Send App Invite
                  </button>
                )}
              </div>
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">
                {parent.childName} • {parent.dueAmount ?? "No due payment"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
