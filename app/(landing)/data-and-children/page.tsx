import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Data & Children | CEven",
  description: "How CEven approaches child data, consent, access, and safety in childcare workflows.",
};

export default function DataAndChildrenPage() {
  return (
    <LegalPage
      eyebrow="Child data"
      title="Data & Children"
      updated="July 10, 2026"
      intro="Children's information deserves extra care. This page summarises how CEven expects child data to be handled across parents, guardians, caregivers, and crèche teams."
      sections={[
        {
          title: "Purpose limitation",
          body: [
            "Child data in CEven should be used only for childcare operations, safety, communication, attendance, billing, reporting, and parent or guardian engagement.",
            "Crèches should avoid entering unnecessary sensitive details and should keep child profiles current, accurate, and relevant to care.",
          ],
        },
        {
          title: "Authorised access",
          body: [
            "Access to child information should be limited to authorised parents, guardians, caregivers, administrators, and support personnel who need it to perform their role.",
            "Crèche administrators are expected to keep staff access up to date, remove access when roles change, and respond quickly when a parent or guardian reports an access concern.",
          ],
        },
        {
          title: "Photos, updates, and messages",
          body: [
            "Photos, gallery updates, daily reports, incident notes, and messages should be shared with care and only with the intended family or authorised audience.",
            "Users should not export, repost, or share child information outside CEven unless they have the appropriate permission and a clear childcare or legal reason.",
          ],
        },
        {
          title: "Requests from parents and guardians",
          body: [
            "Parents and guardians can ask their crèche or CEven support for help reviewing, correcting, or removing child information, subject to identity checks and applicable retention needs.",
            "When a custody, access, or guardianship dispute exists, CEven may need direction from the crèche, verified account owner, or appropriate legal documentation before changing access.",
          ],
        },
        {
          title: "Safety first",
          body: [
            "CEven is built to support safer childcare communication, but technology does not replace direct supervision, emergency procedures, or professional safeguarding obligations.",
            "Urgent child safety concerns should be handled through the crèche's emergency process or local emergency services before using app support channels.",
          ],
        },
      ]}
    />
  );
}
