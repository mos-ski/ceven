export type EnrollmentChild = {
  id: string;
  name: string;
  nickname?: string;
  gender: "Male" | "Female";
  birthDate: string; // ISO yyyy-mm-dd
  avatarInitials: string;
};

function isoMonthsAgo(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString().split("T")[0];
}

const CHILDREN: EnrollmentChild[] = [
  { id: "ec-1", name: "Zain Adewale", gender: "Male", birthDate: isoMonthsAgo(6), avatarInitials: "ZA" },
  { id: "ec-2", name: "Philip Adewale", nickname: "Bobo", gender: "Male", birthDate: isoMonthsAgo(27), avatarInitials: "PA" },
  { id: "ec-3", name: "Joy Adewale", nickname: "Jay", gender: "Female", birthDate: isoMonthsAgo(77), avatarInitials: "JA" },
];

export function getEnrollmentChildren(): EnrollmentChild[] {
  return CHILDREN;
}

export function getAgeInMonths(birthDate: string): number {
  const birth = new Date(birthDate);
  const now = new Date();
  return Math.max(
    0,
    (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  );
}

export function formatAge(months: number): string {
  if (months < 12) return `${months} Month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} Year${years === 1 ? "" : "s"}`;
  return `${years}y ${rem}m`;
}

// Parses room age ranges like "6-12 months", "1-2 years", "3-5 years",
// "0 months - 1 year 2 months" is NOT handled — fail open with null.
export function parseAgeRange(range: string): { minMonths: number; maxMonths: number } | null {
  const m = range.trim().toLowerCase().match(/^(\d+)\s*-\s*(\d+)\s*(months?|years?)$/);
  if (!m) return null;
  const lo = parseInt(m[1], 10);
  const hi = parseInt(m[2], 10);
  const factor = m[3].startsWith("year") ? 12 : 1;
  return { minMonths: lo * factor, maxMonths: hi * factor };
}
