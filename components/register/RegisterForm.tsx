"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field } from "@/components/ui/Field";
import { registerSchema } from "@/lib/validation";
import { ROLES, ROLE_LABELS } from "@/types";
import type { RegisterFormValues, RegisterResponse } from "@/types";

type FieldErrors = Partial<Record<keyof RegisterFormValues, string>>;

const EMPTY: RegisterFormValues = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  agreeToTerms: false,
};

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Prefill first name / email from the landing-page card, if provided.
  const [values, setValues] = useState<RegisterFormValues>({
    ...EMPTY,
    firstName: searchParams.get("firstName") ?? "",
    email: searchParams.get("email") ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // Honeypot: bots that auto-fill fields will populate this; humans never see it.
  const honeypotRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof RegisterFormValues>(
    key: K,
    value: RegisterFormValues[K],
  ) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear a field's error as the user corrects it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    // Client-side validation with the shared schema for instant feedback.
    const parsed = registerSchema.safeParse({
      ...values,
      role: values.role || undefined,
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof RegisterFormValues | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          // honeypot value — should always be empty for real users
          website: honeypotRef.current?.value ?? "",
        }),
      });
      const data = (await res.json()) as RegisterResponse;

      if (!res.ok || !data.ok) {
        if (!data.ok) {
          if (data.fieldErrors) setErrors(data.fieldErrors);
          setFormError(data.message);
        } else {
          setFormError("Something went wrong. Please try again.");
        }
        return;
      }

      // Success — head to the welcome page.
      router.push(`/welcome?firstName=${encodeURIComponent(data.user.firstName)}`);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot field — hidden from users, a trap for bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          ref={honeypotRef}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {formError ? (
        <div className="alert alert-error" role="alert">
          {formError}
        </div>
      ) : null}

      <Field
        id="username"
        label="Username"
        type="text"
        placeholder="yourhandle"
        autoComplete="username"
        value={values.username}
        onChange={(e) => update("username", e.target.value)}
        error={errors.username}
      />

      <div className="field-row">
        <Field
          id="firstName"
          label="First name"
          type="text"
          placeholder="Sam"
          autoComplete="given-name"
          value={values.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          error={errors.firstName}
        />
        <Field
          id="lastName"
          label="Last name"
          type="text"
          placeholder="Carter"
          autoComplete="family-name"
          value={values.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          error={errors.lastName}
        />
      </div>

      <Field
        id="email"
        label="Email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />

      <div className="field">
        <label htmlFor="role">Role (optional)</label>
        <select
          id="role"
          value={values.role}
          onChange={(e) =>
            update("role", e.target.value as RegisterFormValues["role"])
          }
        >
          <option value="">Select a role…</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
      </div>

      <div className="checkbox">
        <input
          id="agreeToTerms"
          type="checkbox"
          checked={values.agreeToTerms}
          onChange={(e) => update("agreeToTerms", e.target.checked)}
          aria-invalid={errors.agreeToTerms ? true : undefined}
          aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
        />
        <label htmlFor="agreeToTerms">
          I agree to the <a href="/terms">Terms and Conditions</a> and{" "}
          <a href="/privacy">Privacy Policy</a>, and agree to receiving
          notifications.
        </label>
      </div>
      {errors.agreeToTerms ? (
        <span className="field-error" id="terms-error" role="alert">
          {errors.agreeToTerms}
        </span>
      ) : null}

      <button className="cta" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Creating your account…
          </>
        ) : (
          "Claim your early access"
        )}
      </button>
      <p className="microcopy">
        No noise. Just your invite the day we open.
      </p>
    </form>
  );
}
