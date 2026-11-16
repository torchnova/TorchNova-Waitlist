import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — TORCHNOVA",
  description: "How TORCHNOVA collects, uses, and protects your data.",
};

// TODO (before launch): replace the bracketed placeholders below and have a
// lawyer review this. These are a reasonable starting template, not legal advice.
const COMPANY = "TORCHNOVA";
const CONTACT_EMAIL = "contact@torchnova.com";
const LAST_UPDATED = "July 22, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy explains how {COMPANY} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;) collects, uses, and protects your personal data when
        you join the TORCHNOVA waitlist.
      </p>

      <h2>1. Data we collect</h2>
      <p>When you join the waitlist, we collect:</p>
      <ul>
        <li>Your username</li>
        <li>Your first and last name</li>
        <li>Your email address</li>
        <li>The date and time you joined</li>
      </ul>
      <p>
        We do not collect passwords, and we do not knowingly collect payment
        information through the waitlist.
      </p>

      <h2>2. How we use your data</h2>
      <ul>
        <li>To manage the waitlist and reserve your spot for early access.</li>
        <li>
          To send you a confirmation email and, later, your invitation and
          related product updates.
        </li>
        <li>To prevent spam, abuse, and duplicate signups.</li>
      </ul>
      <p>
        Our legal basis for processing is your consent (given when you check the
        agreement box) and our legitimate interest in operating the waitlist.
      </p>

      <h2>3. Service providers</h2>
      <p>
        We share data only with the providers that help us run the waitlist:
      </p>
      <ul>
        <li>
          <strong>Neon</strong> — hosts our database where your signup is stored.
        </li>
        <li>
          <strong>Resend</strong> — sends our transactional and invitation
          emails.
        </li>
        <li>
          <strong>Vercel</strong> — hosts and serves the website.
        </li>
      </ul>
      <p>
        These providers process data on our behalf under their own security and
        privacy commitments. We do not sell your personal data.
      </p>

      <h2>4. Data retention</h2>
      <p>
        We keep your waitlist data until the earlier of: (a) you ask us to remove
        it, (b) you unsubscribe, or (c) the waitlist is no longer needed. You can
        remove yourself at any time using the unsubscribe link in any of our
        emails.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on where you live (for example, under GDPR or CCPA), you may
        have the right to access, correct, delete, or export your personal data,
        and to withdraw consent. To exercise these rights, use the unsubscribe
        link or email us at {CONTACT_EMAIL}. Unsubscribing removes your record
        from our waitlist.
      </p>

      <h2>6. Data security & location</h2>
      <p>
        We use reputable providers with encryption in transit. Your data is
        currently stored in the United States. No method of transmission or
        storage is completely secure, but we take reasonable measures to protect
        your information.
      </p>

      <h2>7. Children</h2>
      <p>
        The Service is not directed to children under 16, and we do not knowingly
        collect their data.
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

      <p className="legal-back">
        <Link href="/" className="legal-link">
          ← Back to TORCHNOVA
        </Link>
      </p>
    </LegalPage>
  );
}
