import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | CEven",
  description: "The terms for using CEven as a parent, caregiver, or crèche operator.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      updated="July 10, 2026"
      intro="These terms describe the basic rules for using CEven. They are written for product clarity and should be reviewed by counsel before being treated as final legal terms."
      sections={[
        {
          title: "Using CEven",
          body: [
            "CEven is designed to help families and childcare providers coordinate care, communication, records, payments, and daily operations. Users must provide accurate information and use the platform only for lawful childcare-related purposes.",
            "Accounts should be used only by authorised users. You are responsible for keeping login details secure and for activity that happens under your account.",
          ],
        },
        {
          title: "Childcare records and responsibilities",
          body: [
            "Crèches and caregivers remain responsible for the quality, safety, and accuracy of childcare services and records entered into CEven. The platform supports operations but does not replace professional judgement, supervision, or legal obligations.",
            "Parents and guardians are responsible for reviewing updates, providing correct child information, and notifying their crèche when important health, safety, pickup, or billing details change.",
          ],
        },
        {
          title: "Payments and subscriptions",
          body: [
            "Where fees, subscriptions, wallet features, invoices, or payment tools are available, users agree to provide accurate billing information and comply with the applicable payment terms shown in the product or agreed with their crèche.",
            "Refunds, chargebacks, failed payments, and service access may be handled according to the relevant crèche agreement, CEven product rules, and payment provider requirements.",
          ],
        },
        {
          title: "Acceptable use",
          body: [
            "Users must not misuse the service, attempt unauthorised access, upload harmful content, harass other users, interfere with platform security, or use CEven to process information they are not authorised to handle.",
            "CEven may restrict or suspend access when needed to protect users, children, platform security, or service integrity.",
          ],
        },
        {
          title: "Changes and contact",
          body: [
            "CEven may update these terms as the product evolves. Material updates should be reflected on this page with a new update date.",
            "Questions about these terms can be sent through the Contact Us page.",
          ],
        },
      ]}
    />
  );
}
