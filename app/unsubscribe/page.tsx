import { Suspense } from "react";
import type { Metadata } from "next";
import { Blobs } from "@/components/landing/Blobs";
import { Nav } from "@/components/landing/Nav";
import { UnsubscribeCard } from "@/components/unsubscribe/UnsubscribeCard";

export const metadata: Metadata = {
  title: "Unsubscribe — TORCHNOVA",
  description: "Remove yourself from the TORCHNOVA waitlist.",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <div className="page">
      <Blobs />
      <Nav note="Unsubscribe" />
      <div className="welcome-wrap">
        <div style={{ maxWidth: "30rem", width: "100%" }}>
          <Suspense fallback={<div className="card">Loading…</div>}>
            <UnsubscribeCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
