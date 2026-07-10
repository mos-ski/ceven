"use client";

import { useState } from "react";

export function ContactFormSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="relative bg-white">
      <CloudWaveTop />

      <div className="px-4 sm:px-8 lg:px-16 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            <p className="font-[family-name:var(--font-mogra-import)] text-[#1A1208] text-4xl mb-5">
              CEven
            </p>
            <p className="text-[#6B5744] text-base leading-relaxed mb-10">
              A childcare management app by Swayosoo.<br />
              Building digital ecosystems for African families.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <PinIcon />
                <span className="text-[#3B2513] text-base">Lagos, Nigeria.</span>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon />
                <a
                  href="mailto:support@ceven.app"
                  className="text-[#3B2513] text-base hover:text-[#9A6033] transition-colors"
                >
                  support@ceven.app
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#EBEBEB] border border-[#C8B49A] rounded-3xl p-8">
            {sent ? (
              <div className="py-12 text-center">
                <p className="text-[#1A1208] text-2xl font-bold mb-3">Message sent!</p>
                <p className="text-[#6B5744] text-base">
                  We'll get back to you as soon as we can.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-[#1A1208] text-2xl font-bold mb-1">
                  Send us a message.
                </h2>
                <p className="text-[#6B5744] text-sm mb-7">
                  We read every message and reply as soon as we can
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#3B2513] text-xs font-semibold mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Ngozi"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full bg-white border border-[#D4C4B0] rounded-xl px-4 py-3 text-sm text-[#1A1208] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#9A6033] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3B2513] text-xs font-semibold mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Adeyemi"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full bg-white border border-[#D4C4B0] rounded-xl px-4 py-3 text-sm text-[#1A1208] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#9A6033] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#3B2513] text-xs font-semibold mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="ngozi@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white border border-[#D4C4B0] rounded-xl px-4 py-3 text-sm text-[#1A1208] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#9A6033] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#3B2513] text-xs font-semibold mb-1.5">
                        I am a...
                      </label>
                      <div className="relative">
                        <select
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className="w-full bg-white border border-[#D4C4B0] rounded-xl px-4 py-3 text-sm text-[#9B9B9B] focus:outline-none focus:border-[#9A6033] transition-colors appearance-none"
                        >
                          <option value="" disabled>Select one</option>
                          <option value="parent">Parent</option>
                          <option value="creche">Crèche Operator</option>
                          <option value="journalist">Journalist</option>
                          <option value="other">Other</option>
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B5744] pointer-events-none text-xs">▾</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#3B2513] text-xs font-semibold mb-1.5">
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us what's on your mind..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full bg-white border border-[#D4C4B0] rounded-xl px-4 py-3 text-sm text-[#1A1208] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#9A6033] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#5B391E] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <CloudWaveBottom />
    </section>
  );
}

function CloudWaveTop() {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg viewBox="0 0 1280 70" preserveAspectRatio="none" className="w-full h-16 block">
        <path
          d="M0,0 L0,35 C60,10 120,60 180,35 C240,10 300,58 360,35 C420,12 480,60 540,37 C600,14 660,62 720,38 C780,14 840,60 900,38 C960,16 1020,62 1080,40 C1120,28 1160,52 1200,38 C1230,28 1260,46 1280,36 L1280,0 Z"
          fill="#F5EFE4"
        />
      </svg>
    </div>
  );
}

function CloudWaveBottom() {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg viewBox="0 0 1280 70" preserveAspectRatio="none" className="w-full h-16 block">
        <path
          d="M0,70 L0,35 C60,60 120,10 180,35 C240,60 300,12 360,35 C420,58 480,10 540,33 C600,56 660,8 720,32 C780,56 840,10 900,32 C960,54 1020,8 1080,30 C1120,42 1160,18 1200,32 C1230,42 1260,24 1280,34 L1280,70 Z"
          fill="#F5EFE4"
        />
      </svg>
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A6033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A6033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
