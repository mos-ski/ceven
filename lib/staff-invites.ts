"use client";

export type InvitedRole =
  | "Admin"
  | "Finance Manager"
  | "Caregiver"
  | "Marketer"
  | "Nurse"
  | "Operations";

export type StaffInvite = {
  code: string;
  name: string;
  email: string;
  phone: string;
  role: InvitedRole;
  tempPassword: string;
  password?: string;
  status: "pending" | "active";
  invitedAt: string;
  acceptedAt?: string;
};

const INVITES_KEY = "ceven_staff_invites";

export function getInvites(): StaffInvite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INVITES_KEY);
    return raw ? (JSON.parse(raw) as StaffInvite[]) : [];
  } catch {
    return [];
  }
}

export function getInviteByCode(code: string): StaffInvite | undefined {
  return getInvites().find((i) => i.code === code);
}

export function getInviteByEmail(email: string): StaffInvite | undefined {
  return getInvites().find((i) => i.email.toLowerCase() === email.toLowerCase());
}

export function addInvite(invite: Omit<StaffInvite, "code" | "tempPassword" | "status" | "invitedAt">): StaffInvite {
  const code = `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const tempPassword = `Temp${Math.floor(1000 + Math.random() * 9000)}!`;
  const newInvite: StaffInvite = {
    ...invite,
    code,
    tempPassword,
    status: "pending",
    invitedAt: new Date().toISOString(),
  };
  const invites = getInvites();
  invites.push(newInvite);
  localStorage.setItem(INVITES_KEY, JSON.stringify(invites));
  return newInvite;
}

export function setInvitePassword(
  code: string,
  password: string
): StaffInvite | undefined {
  const invites = getInvites();
  const index = invites.findIndex((i) => i.code === code);
  if (index === -1) return undefined;
  invites[index] = {
    ...invites[index],
    password,
    status: "active",
    acceptedAt: new Date().toISOString(),
  };
  localStorage.setItem(INVITES_KEY, JSON.stringify(invites));
  return invites[index];
}

export function canLoginWithInvite(email: string, password: string): StaffInvite | undefined {
  const invite = getInviteByEmail(email);
  if (!invite) return undefined;
  const validPassword =
    password === invite.tempPassword ||
    (invite.password ? password === invite.password : false);
  return validPassword ? invite : undefined;
}

export function isFirstTimeLogin(invite: StaffInvite): boolean {
  return invite.status === "pending" && !invite.password;
}

export function needsPasswordChange(invite: StaffInvite, password: string): boolean {
  return invite.status === "pending" && password === invite.tempPassword && !invite.password;
}
