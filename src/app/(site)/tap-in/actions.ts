'use server';

import { z } from 'zod';
import { tapInSchema } from '@/lib/forms/schemas';
import { submitToGoogleSheet } from '@/lib/forms/submit';
import type { TapInFormState } from '@/lib/forms/types';

// useActionState-compatible Server Action for every tap-in-family form
// (tap-in / demo-claim / build-my-system — discriminated by the hidden
// formType field). Treats the request as untrusted: honeypot first, then Zod.
export async function submitTapIn(
  _prev: TapInFormState,
  formData: FormData
): Promise<TapInFormState> {
  // Honeypot — humans never see the "website" field; bots fill everything.
  // Pretend success and deliver nothing, so the bot learns nothing.
  if (String(formData.get('website') ?? '') !== '') {
    return { status: 'success' };
  }

  // Strip empty strings (unfilled optional inputs) and React's internal
  // $ACTION_* entries so optional schema fields see undefined, not ''.
  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string' && value !== '' && !key.startsWith('$ACTION')) {
      raw[key] = value;
    }
  }

  const parsed = tapInSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      error: 'validation',
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const result = await submitToGoogleSheet(parsed.data);
  if (!result.ok) {
    return { status: 'error', error: result.error };
  }
  return { status: 'success' };
}
