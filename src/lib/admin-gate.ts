const KEY = "cedp_admin_unlocked";
export const ADMIN_PASSWORD = "cedp2026";

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(KEY) === "1";
}

export function unlock(password: string): boolean {
  if (password !== ADMIN_PASSWORD) return false;
  window.sessionStorage.setItem(KEY, "1");
  return true;
}

export function lock() {
  window.sessionStorage.removeItem(KEY);
}