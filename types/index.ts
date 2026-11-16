/** Shape of the demo-request form as the visitor fills it in. */
export interface DemoFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  agreeToPrivacy: boolean;
}

export interface DemoSuccess {
  ok: true;
}

/** Error response — `fieldErrors` maps a field name to its first message. */
export interface DemoError {
  ok: false;
  message: string;
  fieldErrors?: Partial<Record<keyof DemoFormValues, string>>;
}

export type DemoResponse = DemoSuccess | DemoError;
