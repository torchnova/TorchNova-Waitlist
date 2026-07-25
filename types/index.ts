export const ROLES = ["FOUNDER", "INVESTOR"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  FOUNDER: "Founder",
  INVESTOR: "Investor",
};

/** Shape of the registration form as the user fills it in. */
export interface RegisterFormValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: Role | "";
  agreeToTerms: boolean;
}

/** Successful registration response. */
export interface RegisterSuccess {
  ok: true;
  user: {
    id: string;
    username: string;
    firstName: string;
    email: string;
  };
  /** Whether the welcome email was sent (false if email isn't configured). */
  emailSent?: boolean;
}

/** Error response — `fieldErrors` maps a field name to its first message. */
export interface RegisterError {
  ok: false;
  message: string;
  fieldErrors?: Partial<Record<keyof RegisterFormValues, string>>;
}

export type RegisterResponse = RegisterSuccess | RegisterError;
