import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { DemoForm } from "@/components/demo/DemoForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a demo — TorchNova",
  description: "Arrange a private walkthrough of TorchNova with our team.",
};

export default function DemoPage() {
  return (
    <SiteShell>
      <section className="page-top">
        <div className="grid demo-grid">
          <div className="demo-intro c1">
            <h1 className="page-title">Request a demo</h1>
            <p className="page-lede">
              TorchNova is shown privately. Share a few details and our team
              will be in touch to arrange a walkthrough.
            </p>
            <ol className="steps">
              <li>We review your request.</li>
              <li>We reach out within two business days.</li>
              <li>A private walkthrough, shaped around your organization.</li>
            </ol>
            <p className="page-note">
              Prefer email? <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
            </p>
          </div>
          <div className="demo-panel c5">
            <DemoForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
