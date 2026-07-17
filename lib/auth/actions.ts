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
  redirect("/admin/v1/dashboard");
}

export async function signup(formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "");

  if (!email) {
    return { error: "Please enter a valid email address." };
  }

  redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}

export async function requestPasswordReset(
  formData: FormData
): Promise<{ ok: true }> {
  const email = String(formData.get("email") ?? "");
  redirect(`/reset-password/verify?email=${encodeURIComponent(email)}`);
}

export async function resetPassword(
  _formData: FormData
): Promise<{ error?: string }> {
  redirect("/login");
}

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/login");
}
