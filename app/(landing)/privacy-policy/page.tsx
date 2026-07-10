import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | CEven",
  description: "How CEven handles privacy for parents, crèches, caregivers, and children.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      updated="July 10, 2026"
      intro="This policy explains the personal information CEven may collect, why it is used, and the choices families and childcare providers have when using the platform."
      sections={[
        {
          title: "Information we collect",
          body: [
            "CEven may collect account details, contact information, child profile information, attendance records, activity updates, billing information, messages, support requests, and device or usage data needed to operate the service.",
            "Child information is collected to help authorised parents, guardians, caregivers, and crèche administrators coordinate care. We ask crèches and families to provide only information that is accurate and necessary for childcare operations.",
          ],
        },
        {
          title: "How information is used",
          body: [
            "We use information to provide app access, manage childcare records, send relevant updates, support billing and reporting, improve product reliability, prevent abuse, and respond to user requests.",
            "We do not sell child or family information. Where third-party service providers are used, they are expected to process information only for the services they provide to CEven.",
          ],
        },
        {
          title: "Access and choices",
          body: [
            "Parents, guardians, and crèche administrators can request access, correction, or deletion of personal information where applicable. Some records may need to be retained for legitimate operational, safety, compliance, or dispute-resolution reasons.",
            "Users can manage communication preferences in the app where controls are available, or contact CEven for help with privacy requests.",
          ],
        },
        {
          title: "Security and retention",
          body: [
            "CEven uses reasonable safeguards to protect information from unauthorised access, loss, misuse, or alteration. No online service can guarantee absolute security, so users should keep sign-in details private and report suspicious activity promptly.",
            "Information is kept for as long as needed to provide the service, meet legal or operational requirements, and support childcare continuity.",
          ],
        },
        {
          title: "Contact",
          body: [
            "Questions about privacy can be sent through the Contact Us page. Formal legal or data-protection requests should include enough detail for the team to identify the account and respond appropriately.",
          ],
        },
      ]}
    />
  );
}
