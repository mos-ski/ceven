const KEYS = {
  onboarding: "cg_onboarding_seen",
  pin: "cg_pin_configured",
  userName: "cg_user_name",
  userRole: "cg_user_role",
} as const;

export type StorageKey = keyof typeof KEYS;

export function cgGet(key: StorageKey): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEYS[key]);
}

export function cgSet(key: StorageKey, value: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS[key], value);
}

export function cgRemove(key: StorageKey): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS[key]);
}

export function cgClearAll(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
