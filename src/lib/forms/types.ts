// Shared form types for the Phase 5 conversion pipeline (C5.1).

export const FORM_TYPES = ['tap-in', 'demo-claim', 'build-my-system'] as const;
export type FormType = (typeof FORM_TYPES)[number];

export const SERVICE_INTERESTS = [
  'demo-website',
  'digital-sales-system',
  'websites',
  'admin-systems',
  'sales-conversion',
  'not-sure',
] as const;
export type ServiceInterest = (typeof SERVICE_INTERESTS)[number];

// What actually gets POSTed to the Google Apps Script web app. The sheet adds
// its own timestamp column; buildSelections is the serialized Build My System
// configuration when the lead came through that flow (C5.4).
export type TapInPayload = {
  formType: FormType;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceInterest?: ServiceInterest;
  message?: string;
  sourcePage: string;
  buildSelections?: string;
};

// Discriminated union returned by the GAS adapter — never throws to the UI.
export type SubmitResult = { ok: true } | { ok: false; error: 'validation' | 'network' | 'server' };

export type TapInFieldErrors = Partial<
  Record<'name' | 'email' | 'company' | 'phone' | 'serviceInterest' | 'message', string[]>
>;

// useActionState-compatible state for the tap-in form.
export type TapInFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: 'validation' | 'network' | 'server'; fieldErrors?: TapInFieldErrors };

export const TAP_IN_INITIAL_STATE: TapInFormState = { status: 'idle' };
