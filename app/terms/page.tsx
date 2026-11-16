import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — TORCHNOVA",
  description: "The terms that govern use of the TORCHNOVA waitlist.",
};

// TODO (before launch): replace the bracketed placeholders below and have a
// lawyer review this. These are a reasonable starting template, not legal advice.
const COMPANY = "TORCHNOVA";
const CONTACT_EMAIL = "[contact@torchnova.com]";
const ADDRESS = "[CANADA]";
const LAST_UPDATED = "July 25, 2026";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
        use of the TORCHNOVA waitlist and related pages (the &ldquo;Service&rdquo;),
        operated by {COMPANY} (&ldquo;we,&rdquo; &ldquo;us&rdquo;). By joining
        the waitlist you agree to these Terms and
        to our{" "}
        <Link href="/privacy" className="legal-link">
          Privacy Policy
        </Link>
        .
      </p>

      <h2>1. The waitlist</h2>
      <p>
        TORCHNOVA is in pre-launch. Joining the waitlist reserves your interest in
        early access; it does not create an account, guarantee access, or
        entitle you to any product or service. We may change, delay, or cancel
        the planned product at any time.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 16 years old and able to form a binding contract to
        use the Service. You agree to provide accurate information and not to
        impersonate any person or organization.
      </p>

      <h2>3. Your submission</h2>
      <p>
        When you join, you provide a username, your name, and your email
        address. You are responsible for the information you submit and for
        keeping your email address current so we can reach you.
      </p>

      <h2>4. Communications</h2>
      <p>
        Joining the waitlist requires agreeing to receive notifications from us.
        This includes a welcome email confirming your spot, and later your
        invitation and related product updates. You can withdraw this consent and
        stop these emails at any time using the unsubscribe link in any email we
        send you, or by contacting us at {CONTACT_EMAIL} — doing so also removes
        you from the waitlist.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        You agree not to misuse the Service, including by submitting false
        information, signing up others without consent, attempting to disrupt or
        overload the Service, or accessing it through automated means without our
        permission.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The TORCHNOVA name, logo, and the content of these pages are owned by{" "}
        {COMPANY} and may not be used without our prior written permission.
      </p>

      <h2>7. Disclaimers</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as
        available,&rdquo; without warranties of any kind. We do not warrant that
        the Service will be uninterrupted, error-free, or secure.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {COMPANY} will not be liable for
        any indirect, incidental, or consequential damages arising out of your
        use of, or inability to use, the Service.
      </p>

      <h2>9. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be
        reflected by updating the &ldquo;Last updated&rdquo; date above.
        Continued use of the Service after changes take effect constitutes
        acceptance of the revised Terms.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of {ADDRESS}, without regard to
        its conflict-of-laws rules.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms? Email us at {CONTACT_EMAIL}.
      </p>

      <p className="legal-back">
        <Link href="/" className="legal-link">
          ← Back to TORCHNOVA
        </Link>
      </p>
    </LegalPage>
  );
}
