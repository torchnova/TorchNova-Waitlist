import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "Request received — TorchNova",
  description: "Thank you. Our team will be in touch shortly.",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ name?: string }>;
}

export default async function DemoThanksPage({ searchParams }: Props) {
  const { name } = await searchParams;
  const first = name?.trim().slice(0, 60);

  return (
    <SiteShell>
      <section className="page-top message">
        <div className="grid">
          <div className="c1 message-body">
            <h1 className="page-title">Thank you{first ? `, ${first}` : ""}.</h1>
            <p className="page-lede">
              Your request is with our team. We&rsquo;ll be in touch within two
              business days to arrange your walkthrough.
            </p>
            <Link href="/" className="text-link">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
