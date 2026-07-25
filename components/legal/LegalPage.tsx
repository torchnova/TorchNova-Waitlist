import type { ReactNode } from "react";
import { Blobs } from "@/components/landing/Blobs";
import { Nav } from "@/components/landing/Nav";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

/** Shared reading layout for legal pages (Terms, Privacy). */
export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="page">
      <Blobs />
      <Nav note="Legal" />
      <main className="legal">
        <h1 className="legal-title">{title}</h1>
        <p className="legal-updated">Last updated {lastUpdated}</p>
        <div className="legal-prose">{children}</div>
      </main>
    </div>
  );
}
