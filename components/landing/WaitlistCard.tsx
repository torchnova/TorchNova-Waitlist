"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { emailSchema } from "@/lib/validation";

/**
 * The liquid-glass signup card. Visually identical to the source, but the CTA
 * now routes to the full registration page, prefilling whatever the visitor
 * already typed here. A valid email is required before we hand off.
 */
export function WaitlistCard() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setEmailError(parsed.error.issues[0]?.message ?? "Enter a valid email address");
      return;
    }

    const params = new URLSearchParams();
    if (firstName.trim()) params.set("firstName", firstName.trim());
    params.set("email", parsed.data);
    router.push(`/register?${params.toString()}`);
  }

  return (
    <div className="card">
      <h2>Get early access</h2>
      <p className="lede">Claim your spot before the doors open.</p>

      <div className="proof">
        <span className="avatars">
          <i />
          <i />
          <i />
        </span>
        <span>
          <b>100+</b> founders waiting
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Sam"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={emailError ? "invalid" : undefined}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "email-error" : undefined}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Clear the error as the visitor corrects it.
              if (emailError) setEmailError(null);
            }}
          />
          {emailError ? (
            <span className="field-error" id="email-error" role="alert">
              {emailError}
            </span>
          ) : null}
        </div>
        <button className="cta" type="submit">
          Join the waitlist
          <span className="cta-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <p className="microcopy">
          No noise. Just your invite the day we open.
        </p>
      </form>
    </div>
  );
}
