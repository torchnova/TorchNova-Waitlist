"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckIcon } from "@/components/ui/CheckIcon";

type State = "idle" | "loading" | "done" | "error";

export function UnsubscribeCard() {
  const token = useSearchParams().get("token") ?? "";
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleConfirm() {
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (!token) {
    return (
      <div className="card">
        <h2>Invalid link</h2>
        <p className="lede">
          This unsubscribe link is missing its token. Please use the link from
          the bottom of one of our emails.
        </p>
        <Link href="/" className="cta">
          Back to TORCHNOVA
        </Link>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="card">
        <div className="success">
          <div className="check" aria-hidden="true">
            <CheckIcon className="check-icon" />
          </div>
          <h2>You&apos;re unsubscribed</h2>
          <p>
            Your details have been removed from the TORCHNOVA waitlist. You
            won&apos;t receive any more emails from us. No hard feelings —
            you&apos;re always welcome back.
          </p>
        </div>
        <Link href="/" className="cta">
          Back to TORCHNOVA
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Leave the waitlist?</h2>
      <p className="lede">
        This removes your details from the TORCHNOVA waitlist and stops all
        emails. This can&apos;t be undone — you&apos;d need to sign up again.
      </p>
      {state === "error" && message ? (
        <div className="alert alert-error" role="alert">
          {message}
        </div>
      ) : null}
      <button
        className="cta"
        onClick={handleConfirm}
        disabled={state === "loading"}
      >
        {state === "loading" ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Removing…
          </>
        ) : (
          "Yes, remove me"
        )}
      </button>
      <p className="microcopy">
        Changed your mind?{" "}
        <Link href="/" className="legal-link">
          Stay on the list
        </Link>
      </p>
    </div>
  );
}
