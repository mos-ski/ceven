"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type StatCardData = {
  label: string;
  value: string;
  sub: string;
  subColor?: string;
  showTrend?: boolean;
  showAlert?: boolean;
};

export type DashboardStats = {
  row1: StatCardData[];
  row2: StatCardData[];
};

// ── Mock data generator (simulates API fetch) ────────────────────────────────

function generateStats(): DashboardStats {
  // In production, this would fetch from an API
  // For now, return typed mock data with slight randomisation to simulate live updates
  const enrolled = 42 + Math.floor(Math.random() * 3);
  const present = 32 + Math.floor(Math.random() * 5);
  const absent = enrolled - present;
  const staffOnDuty = 8 + Math.floor(Math.random() * 2);
  const totalStaff = 12;
  const outstanding = 1200000 + Math.floor(Math.random() * 100000);
  const openIncidents = Math.floor(Math.random() * 3);
  const reportsSubmitted = 37 + Math.floor(Math.random() * 5);
  const totalReports = 47;
  const tasksOverdue = 2 + Math.floor(Math.random() * 3);
  const totalPending = 8 + Math.floor(Math.random() * 5);

  return {
    row1: [
      {
        label: "Total Enrolled",
        value: enrolled.toString(),
        sub: "+12.5%",
        subColor: "#006745",
        showTrend: true,
      },
      {
        label: "Present Today",
        value: present.toString(),
        sub: "QR Code Checkin",
        subColor: "#6b7280",
      },
      {
        label: "Absent",
        value: absent.toString(),
        sub: "No Contact Today",
        subColor: "#6b7280",
      },
      {
        label: "Staff on Duty",
        value: `${staffOnDuty}/${totalStaff}`,
        sub: `${totalStaff - staffOnDuty} Absent`,
        subColor: "#6b7280",
      },
    ],
    row2: [
      {
        label: "Outstanding Fees",
        value: `₦${outstanding.toLocaleString()}`,
        sub: "No Unpaid Invoice",
        subColor: "#cd3030",
      },
      {
        label: "Open Incidents",
        value: openIncidents.toString(),
        sub: "Urgent Review",
        subColor: "#f59e0b",
        showAlert: openIncidents > 0,
      },
      {
        label: "Reports",
        value: reportsSubmitted.toString(),
        sub: `${reportsSubmitted}/${totalReports} Submitted`,
        subColor: "#6b7280",
      },
      {
        label: "Tasks Overdue",
        value: tasksOverdue.toString(),
        sub: `${totalPending} Total Pending`,
        subColor: "#6b7280",
      },
    ],
  };
}

// ── Auto-refresh hook ────────────────────────────────────────────────────────

export function useDashboardStats(refreshIntervalMs = 30000) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStats = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newStats = generateStats();
    setStats(newStats);
    setLastUpdated(new Date());
    setIsRefreshing(false);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Auto-refresh interval
  useEffect(() => {
    const interval = setInterval(fetchStats, refreshIntervalMs);
    return () => clearInterval(interval);
  }, [fetchStats, refreshIntervalMs]);

  return { stats, lastUpdated, isRefreshing, refetch: fetchStats };
}

// ── Relative time formatter ──────────────────────────────────────────────────

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

// ── Last updated formatter ───────────────────────────────────────────────────

export function formatLastUpdated(date: Date): string {
  return date.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
