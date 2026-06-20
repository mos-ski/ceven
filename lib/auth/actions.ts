"use server";

import { redirect } from "next/navigation";
import { checkCredentials } from "@/lib/mock-data/admin-user";
import { setSession, clearSession } from "@/lib/auth/session";

export async function login(
  formData: FormData
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(email, password)) {
    return { error: "Invalid email or password." };
  }

  await setSession();
  redirect("/dashboard");
}

export async function requestPasswordReset(
  formData: FormData
): Promise<{ ok: true }> {
  const email = String(formData.get("email") ?? "");
  redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/login");
}
