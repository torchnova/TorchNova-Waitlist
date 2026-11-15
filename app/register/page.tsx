import { Suspense } from "react";
import type { Metadata } from "next";
import { Blobs } from "@/components/landing/Blobs";
import { Nav } from "@/components/landing/Nav";
import { RegisterForm } from "@/components/register/RegisterForm";

export const metadata: Metadata = {
  title: "TORCHNOVA — Create your account",
  description: "Reserve your spot on the TORCHNOVA waitlist.",
};

export default function RegisterPage() {
  return (
    <div className="page">
      <Blobs />
      <Nav note="Create your account" />

      <main className="hero" style={{ alignItems: "start" }}>
        {/* LEFT: pitch */}
        <section>
          <div className="kicker">
            <span>Built for founders</span>
            <span className="kicker-rule" aria-hidden="true" />
            <span>Launching soon</span>
          </div>
          <h1 className="headline">Claim your spot.</h1>
          <p className="subhead">
            Create your TORCHNOVA account and lock in early access. We&apos;ll
            send your invite the moment the doors open.
          </p>
        </section>

        {/* RIGHT: registration card */}
        <aside>
          <div className="card">
            <h2>Get early access</h2>
            <p className="lede">A minute now saves your seat at launch.</p>
            <Suspense fallback={<p className="lede">Loading…</p>}>
              <RegisterForm />
            </Suspense>
          </div>
        </aside>
      </main>
    </div>
  );
}
