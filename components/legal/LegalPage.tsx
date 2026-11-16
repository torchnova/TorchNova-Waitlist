import type { ReactNode } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

/** Shared reading layout for legal pages (Terms, Privacy). */
export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <SiteShell>
      <section className="page-top">
        <div className="grid legal-grid">
          <div className="c1 legal-head">
            <h1 className="page-title">{title}</h1>
            <p className="page-note">Last updated {lastUpdated}</p>
          </div>
          <div className="c4 legal-prose">
            {children}
            <p className="legal-back">
              <Link href="/" className="text-link">
                Back to TorchNova
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
