"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { AttendanceState, FeedRow, ChildState, OneTimeCode, AttendanceRecord, StaffAttendanceRecord } from "./types";
import { generateNumericCode, generateQRValue } from "./qr-code";

const STORAGE_KEY = "ceven-attendance-state";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function getCurrentTime(): string {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function getInitialChildStates(): ChildState[] {
  return [
    { childId: "child-1", childName: "King Andrew", room: "Lion", avatarInitials: "KA", isCheckedIn: false },
    { childId: "child-2", childName: "Amara Chukwu", room: "Panda", avatarInitials: "AC", isCheckedIn: false },
    { childId: "child-3", childName: "Tobi Adewale", room: "Owl", avatarInitials: "TA", isCheckedIn: false },
    { childId: "child-4", childName: "Zainab Bello", room: "Bear", avatarInitials: "ZB", isCheckedIn: true, checkInTime: "8:05 AM" },
    { childId: "child-5", childName: "Daniel Okafor", room: "Lion", avatarInitials: "DO", isCheckedIn: false },
  ];
}

function getInitialStaffStates(): Record<string, { signedIn: boolean; signedInAt?: string }> {
  return {
    "staff-1": { signedIn: false },
    "staff-2": { signedIn: false },
    "staff-3": { signedIn: true, signedInAt: "7:45 AM" },
    "staff-4": { signedIn: false },
    "staff-5": { signedIn: false },
  };
}

const today = new Date().toISOString().split("T")[0];
const initialCode = generateNumericCode();

const initialState: AttendanceState = {
  currentQRCode: generateQRValue(initialCode),
  currentNumericCode: initialCode,
  codeGeneratedAt: today,
  childStates: getInitialChildStates(),
  staffStates: getInitialStaffStates(),
  feed: [],
  attendanceRecords: [],
  staffRecords: [],
  exceptions: [],
  oneTimeCodes: [],
  checkInCount: 0,
  checkOutCount: 0,
  exceptionCount: 0,
};

type Action =
  | { type: "REGENERATE_CODE" }
  | { type: "LOG_CHILD_ATTENDANCE"; childId: string; actorId: string; actorName: string; authorizedPickup: boolean }
  | { type: "LOG_STAFF_ATTENDANCE"; staffId: string; staffName: string; staffRole: string }
  | { type: "MANUAL_CHECK_IN"; childId: string; childName: string; room: string }
  | { type: "GENERATE_ONE_TIME_CODE"; childId: string; childName: string; authorizedName: string; issuedBy: string }
  | { type: "USE_ONE_TIME_CODE"; code: string; staffName: string }
  | { type: "HYDRATE"; state: AttendanceState };

function reducer(state: AttendanceState, action: Action): AttendanceState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "REGENERATE_CODE": {
      const newCode = generateNumericCode();
      return {
        ...state,
        currentQRCode: generateQRValue(newCode),
        currentNumericCode: newCode,
        codeGeneratedAt: new Date().toISOString().split("T")[0],
      };
    }

    case "LOG_CHILD_ATTENDANCE": {
      const child = state.childStates.find((c) => c.childId === action.childId);
      if (!child) return state;

      const isCheckIn = !child.isCheckedIn;
      const time = getCurrentTime();
      const newChildStates = state.childStates.map((c) =>
        c.childId === action.childId
          ? {
              ...c,
              isCheckedIn: isCheckIn,
              checkInTime: isCheckIn ? time : c.checkInTime,
              checkOutTime: !isCheckIn ? time : undefined,
              lastAction: (isCheckIn ? "check-in" : "check-out") as "check-in" | "check-out",
            }
          : c
      );

      const isException = !action.authorizedPickup && !isCheckIn;
      const feedRow: FeedRow = {
        id: generateId(),
        initials: child.avatarInitials,
        name: child.childName,
        role: "Child",
        time,
        status: isCheckIn ? "IN" : "OUT",
        method: "QR",
        isException,
        exceptionNote: isException ? `${action.actorName} is not on the authorized pickup list` : undefined,
      };

      const record: AttendanceRecord = {
        id: generateId(),
        childId: action.childId,
        childName: child.childName,
        room: child.room,
        action: isCheckIn ? "check-in" : "check-out",
        timestamp: time,
        actorId: action.actorId,
        actorName: action.actorName,
        actorRole: "parent",
        method: "QR",
        authorizedPickup: action.authorizedPickup,
        exception: isException ? `Unauthorized pickup by ${action.actorName}` : undefined,
      };

      return {
        ...state,
        childStates: newChildStates,
        feed: [feedRow, ...state.feed],
        attendanceRecords: [record, ...state.attendanceRecords],
        checkInCount: isCheckIn ? state.checkInCount + 1 : state.checkInCount,
        checkOutCount: !isCheckIn ? state.checkOutCount + 1 : state.checkOutCount,
        exceptionCount: isException ? state.exceptionCount + 1 : state.exceptionCount,
        exceptions: isException ? [feedRow, ...state.exceptions] : state.exceptions,
      };
    }

    case "LOG_STAFF_ATTENDANCE": {
      const current = state.staffStates[action.staffId];
      const isSignIn = !current?.signedIn;
      const time = getCurrentTime();

      const feedRow: FeedRow = {
        id: generateId(),
        initials: action.staffName.split(" ").map((n) => n[0]).join(""),
        name: action.staffName,
        role: action.staffRole,
        time,
        status: isSignIn ? "IN" : "OUT",
        method: "QR",
      };

      const record: StaffAttendanceRecord = {
        id: generateId(),
        staffId: action.staffId,
        staffName: action.staffName,
        role: action.staffRole,
        action: isSignIn ? "sign-in" : "sign-out",
        timestamp: time,
        method: "QR",
      };

      return {
        ...state,
        staffStates: {
          ...state.staffStates,
          [action.staffId]: { signedIn: isSignIn, signedInAt: isSignIn ? time : undefined },
        },
        feed: [feedRow, ...state.feed],
        staffRecords: [record, ...state.staffRecords],
        checkInCount: isSignIn ? state.checkInCount + 1 : state.checkInCount,
        checkOutCount: !isSignIn ? state.checkOutCount + 1 : state.checkOutCount,
      };
    }

    case "MANUAL_CHECK_IN": {
      const time = getCurrentTime();
      const feedRow: FeedRow = {
        id: generateId(),
        initials: action.childName.split(" ").map((n) => n[0]).join(""),
        name: action.childName,
        role: "Child",
        time,
        status: "IN",
        method: "Manual",
      };

      const newChildStates = state.childStates.map((c) =>
        c.childId === action.childId
          ? { ...c, isCheckedIn: true, checkInTime: time, lastAction: "check-in" as const }
          : c
      );

      return {
        ...state,
        childStates: newChildStates,
        feed: [feedRow, ...state.feed],
        checkInCount: state.checkInCount + 1,
      };
    }

    case "GENERATE_ONE_TIME_CODE": {
      const code: OneTimeCode = {
        code: generateNumericCode(),
        childId: action.childId,
        childName: action.childName,
        authorizedName: action.authorizedName,
        issuedBy: action.issuedBy,
        issuedAt: getCurrentTime(),
        expiresAt: "End of day",
        used: false,
      };
      return {
        ...state,
        oneTimeCodes: [code, ...state.oneTimeCodes],
      };
    }

    case "USE_ONE_TIME_CODE": {
      const otCode = state.oneTimeCodes.find((c) => c.code === action.code && !c.used);
      if (!otCode) return state;

      const time = getCurrentTime();
      const updatedCodes = state.oneTimeCodes.map((c) =>
        c.code === action.code ? { ...c, used: true, usedAt: time, usedBy: action.staffName } : c
      );

      const feedRow: FeedRow = {
        id: generateId(),
        initials: otCode.childName.split(" ").map((n) => n[0]).join(""),
        name: otCode.childName,
        role: `Picked up by ${otCode.authorizedName}`,
        time,
        status: "OUT",
        method: "One-Time Code",
      };

      return {
        ...state,
        oneTimeCodes: updatedCodes,
        feed: [feedRow, ...state.feed],
        checkOutCount: state.checkOutCount + 1,
      };
    }

    default:
      return state;
  }
}

const AttendanceContext = createContext<{
  state: AttendanceState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage after mount (not during the initial render,
  // so the server-rendered and first client render always match — avoids
  // a hydration mismatch) so attendance state survives page reloads.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "HYDRATE", state: JSON.parse(raw) as AttendanceState });
      }
    } catch {
      // corrupt or unavailable storage — keep the in-memory default
    }
  }, []);

  // Persist every change so it survives reloads and other tabs can read it.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable — demo still works in-memory
    }
  }, [state]);

  // Pick up changes made in *other* tabs — the "storage" event only fires
  // in sibling tabs of the same origin, never in the tab that wrote it.
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        dispatch({ type: "HYDRATE", state: JSON.parse(event.newValue) as AttendanceState });
      } catch {
        // ignore malformed writes from another tab
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AttendanceContext.Provider value={{ state, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const ctx = useContext(AttendanceContext);
  if (!ctx) throw new Error("useAttendance must be used within AttendanceProvider");
  return ctx;
}
