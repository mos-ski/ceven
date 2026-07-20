"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function AdminFeaturesSection() {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
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
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#5a6170] text-[16px] sm:text-[17px] leading-[1.6] max-w-2xl mx-auto">
              Every room, every child, every naira — one place, not four notebooks and a group chat.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: large payments card + pipeline card */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-5">
          <StaggerItem>
            <AdminFeatureCard
              title="Every payment, invoice, and Naira in one place"
              description="Collections, outstanding fees, invoices — the whole financial picture, not scattered across a notebook and a bank app."
            >
              <PaymentsMockup />
            </AdminFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <AdminFeatureCard
              title="Manage every application, in one pipeline"
              description="Every family trying to enroll, tracked from first enquiry to decision — not lost in a WhatsApp chat."
            >
              <PipelineMockup />
            </AdminFeatureCard>
          </StaggerItem>
        </Stagger>

        {/* Row 2: three equal cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StaggerItem>
            <AdminFeatureCard
              title="See everything happening, live"
              description="Every parent, every caregiver, every room — one view of the whole crèche, so you can step in the moment you're needed."
            >
              <LiveActivitiesMockup />
            </AdminFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <AdminFeatureCard
              title="AI that flags what needs you"
              description="Unpaid fees, a caregiver falling behind, something that slipped through — surfaced before it becomes a bigger problem."
            >
              <AiAdaMockup />
            </AdminFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <AdminFeatureCard
              title="Reporting that thinks with you"
              description="Reports that build themselves from the day's activity — real intelligence on your crèche, not just numbers in a spreadsheet."
            >
              <ReportingMockup />
            </AdminFeatureCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function AdminFeatureCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#fbfaf9] rounded-2xl overflow-hidden flex flex-col h-full border border-[#E8DFD0]">
      <div className="p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1c1917] text-[15px] sm:text-[16px] leading-snug mb-2">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55]">
          {description}
        </p>
      </div>
      <div className="relative flex-1 min-h-[240px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

/* ─── Payments summary (left) + pie chart (right) ─── */
function PaymentsMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-4 px-5 pb-0">
      {/* Payments list */}
      <div className="relative w-[44%] h-[88%] rounded-t-xl overflow-hidden shadow-lg flex-shrink-0">
        <Image
          src="/landing/admin-features/payments-summary.png"
          alt="Payments summary list"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 40vw, 20vw"
        />
      </div>
      {/* Pie chart card */}
      <div className="relative w-[46%] h-[82%] rounded-t-xl overflow-hidden shadow-lg flex-shrink-0 bg-white">
        <Image
          src="/landing/admin-features/payments-pie-chart.png"
          alt="Payment status breakdown pie chart"
          fill
          className="object-contain object-center"
          sizes="(max-width: 1024px) 40vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Enquiry / Kanban pipeline ─── */
function PipelineMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[88%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/admin-features/enquiry-pipeline.png"
          alt="Enquiry pipeline Kanban view"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 22vw"
        />
      </div>
    </div>
  );
}

/* ─── Live activities feed ─── */
function LiveActivitiesMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/admin-features/live-activities.png"
          alt="Live activities feed"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── AI Ada chat interface ─── */
function AiAdaMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/admin-features/ai-ada-app.png"
          alt="Ada AI assistant flagging issues"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Intelligent reporting view ─── */
function ReportingMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/admin-features/reporting-app.png"
          alt="Intelligent daily reports"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}
