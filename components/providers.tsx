"use client";

import { AttendanceProvider } from "@/lib/attendance/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AttendanceProvider>{children}</AttendanceProvider>;
}
