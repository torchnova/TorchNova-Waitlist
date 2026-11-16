import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — TorchNova",
  description: "How TorchNova collects, uses, and protects your data.",
};

// TODO: have this reviewed by counsel. A reasonable starting template, not legal advice.
const COMPANY = SITE.name;
const CONTACT_EMAIL = SITE.contactEmail;
const LAST_UPDATED = "November 16, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy explains how {COMPANY} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;) collects, uses, and protects your personal data when
        you visit this website or request a demo of {COMPANY}.
      </p>

      <h2>1. Data we collect</h2>
      <p>When you request a demo, we collect:</p>
      <ul>
        <li>Your first and last name</li>
        <li>Your organization and role</li>
        <li>Your email address and phone number</li>
        <li>The date and time of your request</li>
      </ul>
      <p>
        We do not collect passwords or payment information through this
        website.
      </p>

      <h2>2. How we use your data</h2>
      <ul>
        <li>To respond to your request and arrange a demo.</li>
        <li>To send you a confirmation and follow-up about your request.</li>
        <li>To prevent spam, abuse, and duplicate requests.</li>
      </ul>
      <p>
        Our legal basis for processing is your consent (given when you submit
        the form) and our legitimate interest in responding to business
        enquiries. We do not add you to marketing lists without asking.
      </p>

      <h2>3. Service providers</h2>
      <p>
        We share data only with the infrastructure providers that help us run
        this website: cloud hosting, database and email-delivery services
        located in the United States.
      </p>
      <p>
        These providers process data on our behalf under their own security and
        privacy commitments. We do not sell your personal data.
      </p>

      <h2>4. Data retention</h2>
      <p>
        We keep demo-request data for as long as needed to respond to you and
        maintain our business relationship, or until you ask us to delete it.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on where you live (for example, under GDPR or CCPA), you may
        have the right to access, correct, delete, or export your personal data,
        and to withdraw consent. To exercise these rights, email us at{" "}
        {CONTACT_EMAIL}.
      </p>

      <h2>6. Data security &amp; location</h2>
      <p>
        We use reputable providers with encryption in transit. Your data is
        currently stored in the United States. No method of transmission or
        storage is completely secure, but we take reasonable measures to protect
        your information.
      </p>

      <h2>7. Children</h2>
      <p>
        This website is not directed to children under 16, and we do not
        knowingly collect their data.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time; the &ldquo;Last
        updated&rdquo; date above reflects the latest version.
      </p>

      <h2>9. Contact</h2>
      <p>
        For any privacy questions or requests, contact {COMPANY} at{" "}
        {CONTACT_EMAIL}.
      </p>
    </LegalPage>
  );
}
