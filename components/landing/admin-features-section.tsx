"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function AdminFeaturesSection() {
  return (
    <section className="bg-[#faf2e1] py-16 min-h-screen px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              <span className="text-[#c17c45]">For Admins,</span>{" "}
              <span className="text-[#1a1209]">
                full oversight without having to dig for it yourself.
              </span>
            </h2>
            <p className="font-[family-name:var(--font-urbanist-import)] text-[#5a6170] text-[16px] sm:text-[17px] leading-[1.6] max-w-2xl mx-auto">
              Every room, every child, every naira — one place, not four notebooks and a group chat.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: large payments card + pipeline card */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-5">
          <StaggerItem className="h-full">
            <Card1 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card2 />
          </StaggerItem>
        </Stagger>

        {/* Row 2: three equal cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StaggerItem className="h-full">
            <Card3 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card4 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card5 />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-[#fbfaf9] rounded-2xl border border-[#E8DFD0] overflow-hidden w-full ${className}`}>
      {children}
    </div>
  );
}

/* ─── Card 1: Payments + Pie chart (2fr wide) ───
   Figma: text top-left (max ~48%), payments list left-center (~5% left, ~37% top),
   pie chart white card right-center (~51% left, ~22% top) */
function Card1() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      {/* Text — top-left, capped so it doesn't overlap pie chart */}
      <div className="absolute top-0 left-0 z-10 pt-7 px-7 max-w-[48%]">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Every payment, invoice, and Naira in one place
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Collections, outstanding fees, invoices — the whole financial picture, not scattered across a notebook and a bank app.
        </p>
      </div>

      {/* Payments summary widget — lower-left */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '5%', top: '37%', width: '37%', bottom: '17%' }}>
        <Image
          src="/landing/admin-features/payments-summary.png"
          alt="Payments summary"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 37vw, 18vw"
        />
      </div>

      {/* Pie chart white card — right side */}
      <div
        className="absolute bg-white rounded-xl overflow-hidden p-3 flex flex-col gap-2"
        style={{ left: '51%', top: '22%', width: '43%', bottom: '16%' }}
      >
        <p className="font-[family-name:var(--font-merriweather-import)] text-black text-[11px] font-semibold shrink-0">
          Payment Status Breakdown
        </p>
        <div className="relative flex-1 min-h-0">
          <Image
            src="/landing/admin-features/payments-pie-chart.png"
            alt="Payment status breakdown pie chart"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 43vw, 21vw"
          />
        </div>
      </div>
    </CardShell>
  );
}

/* ─── Card 2: Enquiry pipeline (narrow 1fr) ───
   Figma: text top, pipeline image below (8% left, 39% top, 84% wide) */
function Card2() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Manage every application, in one pipeline
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Every family trying to enroll, tracked from first enquiry to decision — not lost in a WhatsApp chat.
        </p>
      </div>

      {/* Pipeline kanban — below text, left-padded */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '8%', top: '39%', right: '8%', bottom: '0' }}>
        <Image
          src="/landing/admin-features/enquiry-pipeline.png"
          alt="Enquiry pipeline Kanban view"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 22vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 3: Reporting (1 of 3 equal) ───
   Figma: text top, reports image (13% left, 36% top, 79% wide) */
function Card3() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Reporting that thinks with you
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Reports that build themselves from the day&apos;s activity — real intelligence on your creche, not just numbers in a spreadsheet.
        </p>
      </div>

      {/* Reports list image */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '13%', top: '36%', width: '79%', bottom: '0' }}>
        <Image
          src="/landing/admin-features/reporting-app.png"
          alt="Intelligent daily reports"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 79vw, 20vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 4: AI flags what needs you (1 of 3 equal) ───
   Figma: text top, AI chat image bottom-right (72% wide, 69% tall, right 14%) */
function Card4() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          AI that flags what needs you
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Unpaid fees, a caregiver falling behind, something that slipped through — surfaced before it becomes a bigger problem.
        </p>
      </div>

      {/* Ada AI chat — bottom-right aligned */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ right: '14%', bottom: 0, width: '72%', height: '69%' }}>
        <Image
          src="/landing/admin-features/ai-ada-app.png"
          alt="Ada AI assistant flagging issues"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 72vw, 20vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 5: Live activities (1 of 3 equal) ───
   Figma: text top, live feed image (10% left, 44% top, 80% wide) */
function Card5() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          See everything happening, live
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Every parent, every caregiver, every room — one view of the whole creche, so you can step in the moment you&apos;re needed.
        </p>
      </div>

      {/* Live activities feed */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '10%', top: '44%', width: '80%', bottom: '0' }}>
        <Image
          src="/landing/admin-features/live-activities.png"
          alt="Live activities feed"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 80vw, 20vw"
        />
      </div>
    </CardShell>
  );
}
