"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Lock, Mail, Phone, CreditCard, ExternalLink, ChevronRight, Eye, EyeOff, Check,
} from "lucide-react";
import { mockParentUser } from "@/lib/parent/mock-data";

export default function ManageAccountPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState("james.miller@email.com");
  const [emailSaved, setEmailSaved] = useState(false);

  const [editingPhone, setEditingPhone] = useState(false);
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [phoneSaved, setPhoneSaved] = useState(false);

  function handlePasswordSave() {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    setPasswordSaved(true);
    setTimeout(() => {
      setPasswordSaved(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 2000);
  }

  function handleEmailSave() {
    setEditingEmail(false);
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 2000);
  }

  function handlePhoneSave() {
    setEditingPhone(false);
    setPhoneSaved(true);
    setTimeout(() => setPhoneSaved(false), 2000);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#F9F5F0]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Manage Account</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Membership banner */}
        <a
          href="https://ceven.app/me"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl bg-gradient-to-r from-[#7A4C29] to-[#A67548] p-4 shadow-sm active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <CreditCard size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Manage Membership</p>
                <p className="text-[11px] text-white/70">Plans, payments & billing</p>
              </div>
            </div>
            <ExternalLink size={16} className="text-white/60" />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white/90">Change Plan</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white/90">Payment Method</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white/90">Cancel</span>
          </div>
        </a>

        {/* Email */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-400" />
              <p className="text-sm font-semibold text-gray-700">Email Address</p>
            </div>
            {emailSaved && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500">
                <Check size={12} /> Saved
              </span>
            )}
          </div>
          {editingEmail ? (
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:border-cg-brand focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEmailSave}
                  className="flex-1 rounded-xl bg-cg-brand py-2 text-sm font-semibold text-[#FAF2E1]"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingEmail(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setEditingEmail(true)}
              className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5"
            >
              <span className="text-sm text-gray-600">{email}</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Phone */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              <p className="text-sm font-semibold text-gray-700">Phone Number</p>
            </div>
            {phoneSaved && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500">
                <Check size={12} /> Saved
              </span>
            )}
          </div>
          {editingPhone ? (
            <div className="space-y-2">
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:border-cg-brand focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handlePhoneSave}
                  className="flex-1 rounded-xl bg-cg-brand py-2 text-sm font-semibold text-[#FAF2E1]"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPhone(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setEditingPhone(true)}
              className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5"
            >
              <span className="text-sm text-gray-600">{phone}</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Change Password */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={16} className="text-gray-400" />
            <p className="text-sm font-semibold text-gray-700">Change Password</p>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 pr-10 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={14} className="text-gray-400" /> : <Eye size={14} className="text-gray-400" />}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
            />
            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <p className="text-[11px] text-red-500">Passwords do not match</p>
            )}
            <button
              onClick={handlePasswordSave}
              disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
              className="w-full rounded-xl bg-cg-brand py-2.5 text-sm font-semibold text-[#FAF2E1] disabled:opacity-40"
            >
              {passwordSaved ? "Password Updated!" : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
