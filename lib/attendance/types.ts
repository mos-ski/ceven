export type UserRole = "parent" | "caregiver" | "admin";

export type AttendanceAction = "check-in" | "check-out" | "sign-in" | "sign-out";

export type AttendanceMethod = "QR" | "Manual" | "One-Time Code";

export type AttendanceRecord = {
  id: string;
  childId: string;
  childName: string;
  room: string;
  action: "check-in" | "check-out";
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  method: AttendanceMethod;
  authorizedPickup: boolean;
  exception?: string;
};

export type StaffAttendanceRecord = {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  action: "sign-in" | "sign-out";
  timestamp: string;
  method: AttendanceMethod;
};

export type FeedRow = {
  id: string;
  initials: string;
  name: string;
  role: string;
  time: string;
  status: "IN" | "OUT";
  method: AttendanceMethod;
  isException?: boolean;
  exceptionNote?: string;
};

export type ChildState = {
  childId: string;
  childName: string;
  room: string;
  avatarInitials: string;
  isCheckedIn: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  lastAction?: AttendanceAction;
};

export type OneTimeCode = {
  code: string;
  childId: string;
  childName: string;
  authorizedName: string;
  issuedBy: string;
  issuedAt: string;
  expiresAt: string;
  used: boolean;
  usedAt?: string;
  usedBy?: string;
};

export type AttendanceState = {
  currentQRCode: string;
  currentNumericCode: string;
  codeGeneratedAt: string;
  childStates: ChildState[];
  staffStates: Record<string, { signedIn: boolean; signedInAt?: string }>;
  feed: FeedRow[];
  attendanceRecords: AttendanceRecord[];
  staffRecords: StaffAttendanceRecord[];
  exceptions: FeedRow[];
  oneTimeCodes: OneTimeCode[];
  checkInCount: number;
  checkOutCount: number;
  exceptionCount: number;
};
