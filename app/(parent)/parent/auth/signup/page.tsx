"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ChevronDown, CheckCircle2, Circle } from "lucide-react";

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 size={14} className="shrink-0 text-cg-brand" />
      ) : (
        <Circle size={14} className="shrink-0 text-gray-400" />
      )}
      <span className={`text-xs ${met ? "text-gray-500" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}

export default function ParentSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tosAccepted, setTosAccepted] = useState(false);

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    symbolOrNumber: /[0-9!@#$%^&*]/.test(password),
  };

  const confirmRules = {
    length: confirmPassword.length >= 8,
    uppercase: /[A-Z]/.test(confirmPassword),
    symbolOrNumber: /[0-9!@#$%^&*]/.test(confirmPassword),
  };

  const isActive =
    email.trim().length > 0 &&
    rules.length &&
    rules.uppercase &&
    rules.symbolOrNumber &&
    confirmPassword === password &&
    tosAccepted;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#FAFAFA]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-[352px] w-[352px] rounded-full bg-[#C78C5F] opacity-20" />
      <div className="pointer-events-none absolute -top-12 -right-12 h-[269px] w-[269px] rounded-full bg-[#C78C5F] opacity-25" />
      <div className="pointer-events-none absolute top-0 right-0 h-[192px] w-[192px] rounded-full bg-[#C78C5F] opacity-30" />

      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-14 pb-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F6]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#31363E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Header */}
        <h1 className="mb-1 text-[22px] font-bold text-gray-800">Welcome to CEven 👋</h1>
        <p className="mb-7 text-sm text-gray-500">
          We support your child&apos;s care with our easy-to-use and complete platform.
        </p>

        {/* Tab switcher */}
        <div className="mb-6 rounded-xl bg-[#F4F5F6] p-1">
          <div className="grid grid-cols-2">
            <button className="rounded-lg bg-white py-2 text-sm font-semibold text-cg-brand shadow-sm">
              Parents
            </button>
            <Link
              href="/caregiver/auth"
              className="flex items-center justify-center rounded-lg py-2 text-sm font-medium text-gray-400"
            >
              Caregivers
            </Link>
          </div>
        </div>

        {/* Email / Phone */}
        <div className="mb-4">
          <p className="mb-1.5 text-sm font-medium text-gray-800">Email / Phone Number</p>
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 shadow-sm">
            <div className="flex shrink-0 items-center gap-1">
              <span className="text-base leading-none">🇳🇬</span>
              <ChevronDown size={12} className="text-gray-500" />
            </div>
            <div className="mx-1 h-4 w-px bg-gray-200" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email / phone number"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">This is a hint text to help user</p>
        </div>

        {/* Password */}
        <div className="mb-4">
          <p className="mb-1.5 text-sm font-medium text-gray-800">Password</p>
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 shadow-sm">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="shrink-0 text-gray-400">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="mt-2 space-y-1.5">
            <PasswordRule met={rules.length} label="Must be at least 8 characters" />
            <PasswordRule met={rules.uppercase} label="Include capital letters." />
            <PasswordRule met={rules.symbolOrNumber} label="Must have at least a symbol or number" />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <p className="mb-1.5 text-sm font-medium text-gray-800">Confirm Password</p>
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 shadow-sm">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
            <button onClick={() => setShowConfirm(!showConfirm)} className="shrink-0 text-gray-400">
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="mt-2 space-y-1.5">
            <PasswordRule met={confirmRules.length} label="Must be at least 8 characters" />
            <PasswordRule met={confirmRules.uppercase} label="Include capital letters." />
            <PasswordRule met={confirmRules.symbolOrNumber} label="Must have at least a symbol or number" />
          </div>
        </div>

        {/* ToS checkbox */}
        <label className="mb-5 flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={tosAccepted}
            onChange={(e) => setTosAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-cg-brand"
          />
          <span className="text-xs text-gray-500">
            By signing up you acknowledge and agree to CEven{" "}
            <Link href="/parent/auth/tos" className="font-semibold text-cg-brand underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <span className="font-semibold text-cg-brand underline cursor-pointer">Privacy Policy</span>
          </span>
        </label>

        {/* Continue button */}
        <button
          onClick={() => isActive && router.push("/parent/auth/verify")}
          className={`mb-6 w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
            isActive
              ? "bg-cg-brand text-[#FAF2E1]"
              : "bg-[#E0BFA0] text-[#FAF2E1] cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        {/* OR divider */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="rounded-full bg-[#E4E9ED] px-3 py-1 text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social buttons */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-xl bg-[#F7F7F7] py-3 text-sm font-medium text-gray-700">
            <GoogleIcon />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-[#F7F7F7] py-3 text-sm font-medium text-gray-700">
            <AppleIcon />
            Apple
          </button>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/parent/auth" className="font-semibold text-cg-brand">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d="M14.94 11.525c-.02-2.17 1.775-3.215 1.855-3.265-1.01-1.48-2.585-1.685-3.145-1.705-1.335-.135-2.605.785-3.28.785-.675 0-1.715-.77-2.825-.75-1.45.02-2.78.845-3.525 2.14-1.5 2.61-.385 6.48 1.08 8.6.715 1.035 1.565 2.195 2.685 2.155 1.08-.045 1.49-.695 2.795-.695 1.305 0 1.675.695 2.815.675 1.16-.02 1.895-1.055 2.605-2.095.815-1.195 1.15-2.355 1.17-2.415-.025-.015-2.245-.86-2.23-3.43zM12.77 4.72C13.37 3.97 13.77 2.94 13.66 1.9c-.88.04-1.96.59-2.585 1.33-.57.655-1.065 1.71-.875 2.715.975.075 1.975-.495 2.57-1.225z" fill="#2D2E2E"/>
    </svg>
  );
}
