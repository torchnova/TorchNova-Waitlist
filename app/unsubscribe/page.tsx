import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { UnsubscribeCard } from "@/components/unsubscribe/UnsubscribeCard";

export const metadata: Metadata = {
  title: "Unsubscribe — TorchNova",
  description: "Stop receiving emails from TorchNova.",
  robots: { index: false, follow: false },
};

// Kept for links in emails sent to the earlier mailing list.
export default function UnsubscribePage() {
  return (
    <SiteShell>
      <section className="page-top message">
        <div className="grid">
          <div className="c1 message-body">
            <Suspense fallback={<p className="page-lede">Loading…</p>}>
              <UnsubscribeCard />
            </Suspense>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
