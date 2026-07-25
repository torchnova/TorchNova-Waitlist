import Link from "next/link";
import type { Metadata } from "next";
import { Blobs } from "@/components/landing/Blobs";
import { Nav } from "@/components/landing/Nav";
import { BuildBoldly } from "@/components/welcome/BuildBoldly";
import { CheckIcon } from "@/components/ui/CheckIcon";

export const metadata: Metadata = {
  title: "Welcome to TorchNova",
  description: "You're on the list. Build boldly.",
};

interface WelcomePageProps {
  searchParams: Promise<{ firstName?: string }>;
}

export default async function WelcomePage({ searchParams }: WelcomePageProps) {
  const { firstName } = await searchParams;
  const heading = firstName
    ? `Welcome to TORCHNOVA, ${firstName}.`
    : "Welcome to TORCHNOVA.";

  return (
    <div className="page">
      <Blobs />
      <Nav note="You're in" />

      <div className="welcome-wrap">
        <div className="welcome-card">
          <div className="check" aria-hidden="true">
            <CheckIcon className="check-icon" />
          </div>
          <h1>{heading}</h1>
          <blockquote className="welcome-quote">
            <span>You&apos;re in — welcome to the inner circle.</span>
            <BuildBoldly />
            <span>Share every step.</span>
          </blockquote>
          <div className="welcome-actions">
            <Link href="/" className="cta">
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
