"use client";

import type { Child } from "@/lib/caregiver/mock-data";
import type { ChildInfo } from "@/lib/parent/mock-data";

export type InviteStatus = "pending" | "accepted" | "revoked";

export type IndependentCaregiverInvite = {
  code: string;
  caregiverName: string;
  caregiverPhone: string;
  childId: string;
  childName: string;
  childAge: string;
  childRoom: string;
  parentName: string;
  parentInitials: string;
  createdAt: string;
  expiresAt: string;
  status: InviteStatus;
  acceptedAt?: string;
  acceptedAccountId?: string;
  acceptedAccountType?: "existing" | "new";
};

const STORAGE_KEY = "ceven-independent-caregiver-invites";
const OTP_CODE = "A7K2Q9";

const EXISTING_CAREGIVER_ACCOUNTS = [
  { id: "caregiver-ms-anu", name: "Ms Anu", phone: "+2348012345678" },
  { id: "caregiver-ada", name: "Ada Nwosu", phone: "+2348095551212" },
];

const SEEDED_INVITES: IndependentCaregiverInvite[] = [
  {
    code: "expired-demo",
    caregiverName: "Ada Nwosu",
    caregiverPhone: "+2348095551212",
    childId: "child-1",
    childName: "Liam Smith",
    childAge: "3 Years",
    childRoom: "Toddler Room",
    parentName: "James Miller",
    parentInitials: "JM",
    createdAt: "2026-06-20T09:00:00.000Z",
    expiresAt: "2026-06-27T09:00:00.000Z",
    status: "pending",
  },
  {
    code: "used-demo",
    caregiverName: "Ms Anu",
    caregiverPhone: "+2348012345678",
    childId: "child-1",
    childName: "Liam Smith",
    childAge: "3 Years",
    childRoom: "Toddler Room",
    parentName: "James Miller",
    parentInitials: "JM",
    createdAt: "2026-07-01T09:00:00.000Z",
    expiresAt: "2026-07-08T09:00:00.000Z",
    status: "accepted",
    acceptedAt: "2026-07-01T10:15:00.000Z",
    acceptedAccountId: "caregiver-ms-anu",
    acceptedAccountType: "existing",
  },
];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function readStoredInvites(): IndependentCaregiverInvite[] {
  if (!canUseStorage()) return SEEDED_INVITES;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEEDED_INVITES));
    return SEEDED_INVITES;
  }

  try {
    const parsed = JSON.parse(raw) as IndependentCaregiverInvite[];
    const codes = new Set(parsed.map((invite) => invite.code));
    const merged = [...parsed, ...SEEDED_INVITES.filter((invite) => !codes.has(invite.code))];
    if (merged.length !== parsed.length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEEDED_INVITES));
    return SEEDED_INVITES;
  }
}

function writeInvites(invites: IndependentCaregiverInvite[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(invites));
  window.dispatchEvent(new Event("ceven-independent-invites-updated"));
}

function createCode() {
  return `cg-${Math.random().toString(36).slice(2, 7)}-${Date.now().toString(36).slice(-4)}`;
}

export function getInviteOtpCode() {
  return OTP_CODE;
}

export function isExistingCaregiverPhone(phone: string) {
  const normalized = normalizePhone(phone);
  return EXISTING_CAREGIVER_ACCOUNTS.some((account) => normalizePhone(account.phone) === normalized);
}

export function getIndependentCaregiverInvites() {
  return readStoredInvites();
}

export function findIndependentCaregiverInvite(code: string) {
  return readStoredInvites().find((invite) => invite.code === code) ?? null;
}

export function createIndependentCaregiverInvite(input: {
  caregiverName: string;
  caregiverPhone: string;
  child: ChildInfo;
  parentName: string;
  parentInitials: string;
}) {
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(now.getDate() + 7);

  const invite: IndependentCaregiverInvite = {
    code: createCode(),
    caregiverName: input.caregiverName.trim(),
    caregiverPhone: input.caregiverPhone.trim(),
    childId: input.child.id,
    childName: input.child.name,
    childAge: input.child.age,
    childRoom: input.child.room,
    parentName: input.parentName,
    parentInitials: input.parentInitials,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    status: "pending",
  };

  writeInvites([invite, ...readStoredInvites()]);
  return invite;
}

export function revokeIndependentCaregiverInvite(code: string) {
  writeInvites(
    readStoredInvites().map((invite) =>
      invite.code === code && invite.status === "pending"
        ? { ...invite, status: "revoked" }
        : invite
    )
  );
}

export function removeIndependentCaregiverRelationship(code: string) {
  writeInvites(readStoredInvites().filter((invite) => invite.code !== code));
}

export function acceptIndependentCaregiverInvite(
  code: string,
  accountType: "existing" | "new"
) {
  const invites = readStoredInvites();
  const invite = invites.find((item) => item.code === code);

  if (!invite || invite.status !== "pending" || new Date(invite.expiresAt).getTime() <= Date.now()) {
    return null;
  }

  const matchedAccount = EXISTING_CAREGIVER_ACCOUNTS.find(
    (account) => normalizePhone(account.phone) === normalizePhone(invite.caregiverPhone)
  );
  const resolvedAccountType = matchedAccount ? "existing" : accountType;
  const accepted: IndependentCaregiverInvite = {
    ...invite,
    status: "accepted",
    acceptedAt: new Date().toISOString(),
    acceptedAccountId: matchedAccount?.id ?? `caregiver-${normalizePhone(invite.caregiverPhone)}`,
    acceptedAccountType: resolvedAccountType,
  };

  writeInvites(invites.map((item) => (item.code === code ? accepted : item)));
  return accepted;
}

export function getAcceptedIndependentCaregiverRelationships(childId: string) {
  return readStoredInvites().filter(
    (invite) => invite.childId === childId && invite.status === "accepted"
  );
}

export function getPendingIndependentCaregiverInvites(childId: string) {
  return readStoredInvites().filter(
    (invite) =>
      invite.childId === childId &&
      invite.status === "pending" &&
      new Date(invite.expiresAt).getTime() > Date.now()
  );
}

export function getAcceptedCaregiverChildren(): Child[] {
  return readStoredInvites()
    .filter((invite) => invite.status === "accepted")
    .map((invite) => ({
      id: `family-${invite.code}`,
      name: invite.childName,
      age: invite.childAge,
      room: invite.childRoom.replace(" Room", ""),
      alerts: [{ type: "info", label: "Family Invite", detail: "Parent-invited care relationship" }],
      parentContact: {
        id: `family-contact-${invite.code}`,
        name: invite.parentName,
        avatarInitials: invite.parentInitials || initials(invite.parentName),
      },
    }));
}

export function formatInviteExpiry(isoDate: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate));
}
