"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
      <>
        <h1 className="page-title">Invalid link.</h1>
        <p className="page-lede">
          This link is missing its token. Please use the link at the bottom of
          one of our emails.
        </p>
        <Link href="/" className="text-link">
          Back to home
        </Link>
      </>
    );
  }

  if (state === "done") {
    return (
      <>
        <h1 className="page-title">You&rsquo;re unsubscribed.</h1>
        <p className="page-lede">
          Your details have been removed and you won&rsquo;t receive any more
          emails from us.
        </p>
        <Link href="/" className="text-link">
          Back to home
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="page-title">Stop receiving our emails?</h1>
      <p className="page-lede">
        This removes your details from our mailing list and stops all emails.
        It can&rsquo;t be undone.
      </p>
      {state === "error" && message ? (
        <div className="alert" role="alert">
          {message}
        </div>
      ) : null}
      <div className="actions">
        <button className="button" onClick={handleConfirm} disabled={state === "loading"}>
          {state === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Removing…
            </>
          ) : (
            "Yes, remove me"
          )}
        </button>
        <Link href="/" className="text-link">
          Cancel
        </Link>
      </div>
    </>
  );
}
