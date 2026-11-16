"use client";

import { useEffect, useRef, useState } from "react";
import type { CountryCode } from "libphonenumber-js/min";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { demoRequestSchema } from "@/lib/validation";
import { displayPhone, guessCountry, normalizePhone } from "@/lib/phone";
import { suggestEmail } from "@/lib/email-typo";
import { RoleSelect } from "./RoleSelect";
import type { DemoFormValues, DemoResponse } from "@/types";

type FieldErrors = Partial<Record<keyof DemoFormValues, string>>;

const EMPTY: DemoFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  role: "",
  agreeToPrivacy: false,
};

interface InputProps {
  id: keyof DemoFormValues;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  error?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (v: string) => void;
  onBlur?: () => void;
  children?: React.ReactNode;
}

function Input({ id, label, type = "text", autoComplete, placeholder, value, error, inputMode, onChange, onBlur, children }: InputProps) {
  const errId = error ? `${id}-error` : undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={error ? "invalid" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={errId}
      />
      {error ? (
        <span className="field-error" id={errId}>
          {error}
        </span>
      ) : null}
      {children}
    </div>
  );
}

export function DemoForm() {
  const router = useRouter();
  const [values, setValues] = useState<DemoFormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState<CountryCode>("US");
  const [emailHint, setEmailHint] = useState<string | null>(null);

  useEffect(() => setCountry(guessCountry()), []);

  function update<K extends keyof DemoFormValues>(key: K, value: DemoFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    // Read the phone number in the visitor's country unless they gave a
    // country code, and send it in one standard form.
    const phone = values.phone.trim() ? normalizePhone(values.phone, country) : "";
    const parsed = demoRequestSchema.safeParse({ ...values, phone: phone ?? values.phone });
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof DemoFormValues | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      if (next.phone && values.phone.trim() && !values.phone.trim().startsWith("+")) {
        next.phone = "Enter a valid phone number, or add your country code (e.g. +44)";
      }
      setErrors(next);
      // Move focus to the first invalid field.
      const first = Object.keys(next)[0];
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: honeypotRef.current?.value ?? "" }),
      });
      const data = (await res.json()) as DemoResponse;
      if (!res.ok || !data.ok) {
        if (!data.ok) {
          if (data.fieldErrors) setErrors(data.fieldErrors);
          setFormError(data.message);
        } else {
          setFormError("Something went wrong. Please try again.");
        }
        return;
      }
      router.push(`/demo/thanks?name=${encodeURIComponent(parsed.data.firstName)}`);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="demo-form" onSubmit={handleSubmit} noValidate>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {formError ? (
        <div className="alert" role="alert">
          {formError}
        </div>
      ) : null}

      <div className="field-row">
        <Input id="firstName" label="First name" autoComplete="given-name" value={values.firstName} error={errors.firstName} onChange={(v) => update("firstName", v)} />
        <Input id="lastName" label="Last name" autoComplete="family-name" value={values.lastName} error={errors.lastName} onChange={(v) => update("lastName", v)} />
      </div>

      <div className="field-row">
        <Input id="organization" label="Organization" autoComplete="organization" value={values.organization} error={errors.organization} onChange={(v) => update("organization", v)} />
        <RoleSelect id="role" value={values.role} error={errors.role} onChange={(v) => update("role", v)} />
      </div>

      <div className="field-row">
        <Input
          id="email"
          label="Work email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(v) => {
            update("email", v);
            setEmailHint(null);
          }}
          onBlur={() => setEmailHint(suggestEmail(values.email.trim()))}
        >
          {emailHint && !errors.email ? (
            <button
              type="button"
              className="field-hint"
              onClick={() => {
                update("email", emailHint);
                setEmailHint(null);
              }}
            >
              Did you mean <u>{emailHint}</u>?
            </button>
          ) : null}
        </Input>
        <Input
          id="phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
          onBlur={() => values.phone.trim() && update("phone", displayPhone(values.phone, country))}
        />
      </div>

      <div className="consent">
      <div className="checkbox">
        <input
          id="agreeToPrivacy"
          type="checkbox"
          checked={values.agreeToPrivacy}
          onChange={(e) => update("agreeToPrivacy", e.target.checked)}
          aria-invalid={errors.agreeToPrivacy ? true : undefined}
          aria-describedby={errors.agreeToPrivacy ? "agreeToPrivacy-error" : undefined}
        />
        <label htmlFor="agreeToPrivacy">
          I agree that TorchNova may use these details to contact me about a
          demo, as described in the <Link href="/privacy">Privacy Policy</Link>.
        </label>
      </div>
      {errors.agreeToPrivacy ? (
        <span className="field-error" id="agreeToPrivacy-error">
          {errors.agreeToPrivacy}
        </span>
      ) : null}
      </div>

      <button className="button" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="spinner" aria-hidden="true" /> Sending request…
          </>
        ) : (
"Request a demo"
        )}
      </button>
    </form>
  );
}
