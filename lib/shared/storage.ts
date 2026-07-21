const PREFIX = "ceven_";

export function sharedGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function sharedSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
  dispatchEvent(new CustomEvent(`ceven-${key}-updated`, { detail: value }));
}

export function sharedRemove(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PREFIX + key);
  dispatchEvent(new CustomEvent(`ceven-${key}-updated`, { detail: null }));
}

export function sharedGetList<T>(key: string, fallback: T[] = []): T[] {
  return sharedGet<T[]>(key) ?? fallback;
}
