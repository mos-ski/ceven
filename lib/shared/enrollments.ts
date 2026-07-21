import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type EnrollmentStatus = "pending" | "active" | "cancelled";

export type EnrollmentStatusEntry = {
  status: EnrollmentStatus;
  timestamp: number;
  note?: string;
};

export type Enrollment = {
  id: string;
  childId: string;
  childName: string;
  childGender: "Male" | "Female";
  childAvatarInitials: string;
  ageAtEnrollmentMonths: number;
  crecheId: string;
  crecheName: string;
  location: string;
  roomId: string;
  roomName: string;
  status: EnrollmentStatus;
  startDate?: string;
  notes?: string;
  submittedAt: number;
  statusHistory: EnrollmentStatusEntry[];
};

const STORAGE_KEY = "enrollments";

const DAY = 86400000;

const MOCK_ENROLLMENTS: Enrollment[] = [
  {
    id: "enr-1",
    childId: "ec-1", childName: "Zain Adewale", childGender: "Male", childAvatarInitials: "ZA",
    ageAtEnrollmentMonths: 6,
    crecheId: "creche-1", crecheName: "St. Greg Creche", location: "Victoria Island, Lagos",
    roomId: "r-1", roomName: "Infant Room",
    status: "pending",
    submittedAt: Date.now() - 2 * DAY,
    statusHistory: [
      { status: "pending", timestamp: Date.now() - 2 * DAY, note: "Enrollment request submitted" },
    ],
  },
  {
    id: "enr-2",
    childId: "ec-3", childName: "Joy Adewale", childGender: "Female", childAvatarInitials: "JA",
    ageAtEnrollmentMonths: 77,
    crecheId: "creche-2", crecheName: "Favor Creche", location: "Lekki, Lagos",
    roomId: "r-6", roomName: "Pre-K Room",
    status: "active",
    submittedAt: Date.now() - 40 * DAY,
    statusHistory: [
      { status: "pending", timestamp: Date.now() - 40 * DAY, note: "Enrollment request submitted" },
      { status: "active", timestamp: Date.now() - 35 * DAY, note: "Accepted by the creche" },
    ],
  },
  {
    id: "enr-3",
    childId: "ec-2", childName: "Philip Adewale", childGender: "Male", childAvatarInitials: "PA",
    ageAtEnrollmentMonths: 27,
    crecheId: "creche-2", crecheName: "Favor Creche", location: "Lekki, Lagos",
    roomId: "r-5", roomName: "Toddler Room",
    status: "active",
    submittedAt: Date.now() - 60 * DAY,
    statusHistory: [
      { status: "pending", timestamp: Date.now() - 60 * DAY, note: "Enrollment request submitted" },
      { status: "active", timestamp: Date.now() - 55 * DAY, note: "Accepted by the creche" },
    ],
  },
];

function init() {
  if (sharedGetList<Enrollment>(STORAGE_KEY).length === 0) sharedSet(STORAGE_KEY, MOCK_ENROLLMENTS);
}

export function getEnrollments(): Enrollment[] {
  init();
  return sharedGetList<Enrollment>(STORAGE_KEY).sort((a, b) => b.submittedAt - a.submittedAt);
}

export type CreateEnrollmentInput = Omit<Enrollment, "id" | "status" | "submittedAt" | "statusHistory">;

export function createEnrollment(input: CreateEnrollmentInput): Enrollment {
  init();
  const all = sharedGetList<Enrollment>(STORAGE_KEY);
  const enrollment: Enrollment = {
    ...input,
    id: `enr-${Date.now()}`,
    status: "pending",
    submittedAt: Date.now(),
    statusHistory: [
      { status: "pending", timestamp: Date.now(), note: "Enrollment request submitted" },
    ],
  };
  sharedSet(STORAGE_KEY, [enrollment, ...all]);
  addNotification({
    type: "application",
    title: "Enrollment Submitted",
    body: `Enrollment request for ${input.childName} at ${input.crecheName} has been submitted.`,
    childName: input.childName,
    data: { enrollmentId: enrollment.id },
  });
  return enrollment;
}

export function withdrawEnrollment(id: string): void {
  init();
  const all = sharedGetList<Enrollment>(STORAGE_KEY);
  const enr = all.find((e) => e.id === id);
  if (!enr || enr.status === "cancelled") return;
  const updated: Enrollment = {
    ...enr,
    status: "cancelled",
    statusHistory: [
      ...enr.statusHistory,
      { status: "cancelled", timestamp: Date.now(), note: "Withdrawn by parent" },
    ],
  };
  sharedSet(STORAGE_KEY, all.map((e) => (e.id === id ? updated : e)));
  addNotification({
    type: "application",
    title: "Enrollment Withdrawn",
    body: `${enr.childName} has been withdrawn from ${enr.crecheName}.`,
    childName: enr.childName,
    data: { enrollmentId: id },
  });
}
