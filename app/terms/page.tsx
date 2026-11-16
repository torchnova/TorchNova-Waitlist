import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — TorchNova",
  description: "The terms that govern use of the TorchNova website.",
};

// TODO: have this reviewed by counsel and confirm the governing jurisdiction.
// A reasonable starting template, not legal advice.
const COMPANY = SITE.name;
const CONTACT_EMAIL = SITE.contactEmail;
const JURISDICTION = "Canada";
const LAST_UPDATED = "November 16, 2026";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
        use of the {COMPANY} website and related pages (the
        &ldquo;Site&rdquo;), operated by {COMPANY} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;). By using the Site you agree to these Terms and to our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>1. The Site</h2>
      <p>
        The Site provides general information about {COMPANY} and lets you
        request a demo. Access to the {COMPANY} platform itself is by invitation
        and governed by a separate agreement.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 16 years old and able to form a binding contract to
        use the Site. You agree to provide accurate information and not to
        impersonate any person or organization.
      </p>

      <h2>3. Demo requests</h2>
      <p>
        When you request a demo, you provide your name, organization, role,
        email address and phone number. Submitting a request does not guarantee
        a demo or access to the platform. You are responsible for the accuracy
        of the information you submit.
      </p>

      <h2>4. Communications</h2>
      <p>
        By submitting a request, you agree that we may contact you about it by
        email or phone. You may ask us to stop at any time by contacting us at{" "}
        {CONTACT_EMAIL}.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        You agree not to misuse the Site, including by submitting false
        information, submitting requests on behalf of others without consent,
        attempting to disrupt or overload the Site, or accessing it through
        automated means without our permission.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The {COMPANY} name, logo, and the content of the Site are owned by{" "}
        {COMPANY} and may not be used without our prior written permission.
      </p>

      <h2>7. Disclaimers</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as
        available,&rdquo; without warranties of any kind. We do not warrant that
        the Site will be uninterrupted, error-free, or secure.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {COMPANY} will not be liable for
        any indirect, incidental, or consequential damages arising out of your
        use of, or inability to use, the Site.
      </p>

      <h2>9. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be
        reflected by updating the &ldquo;Last updated&rdquo; date above.
        Continued use of the Site after changes take effect constitutes
        acceptance of the revised Terms.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of {JURISDICTION}, without regard
        to its conflict-of-laws rules.
      </p>

      <h2>11. Contact</h2>
      <p>Questions about these Terms? Email us at {CONTACT_EMAIL}.</p>
    </LegalPage>
  );
}
