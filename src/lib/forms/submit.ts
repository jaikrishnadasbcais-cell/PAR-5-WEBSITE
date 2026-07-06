import type { SubmitResult, TapInPayload } from './types';

const TIMEOUT_MS = 10_000;

// GAS adapter (C5.1). Server-side only — GOOGLE_APPS_SCRIPT_URL must never
// reach a client bundle, so this module is only imported from Server Actions.
// Content-Type is text/plain because Apps Script web apps read the raw POST
// body from e.postData.contents; a JSON content type gains nothing and some
// GAS deployments mishandle it. fetch follows the 302 to
// script.googleusercontent.com that GAS always answers with.
export async function submitToGoogleSheet(payload: TapInPayload): Promise<SubmitResult> {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!url) {
    console.error('[forms] GOOGLE_APPS_SCRIPT_URL is not set — submission cannot be delivered.');
    return { ok: false, error: 'server' };
  }

  // One retry, network failures only — if GAS answered at all (any status),
  // retrying would risk a duplicate row in the sheet.
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        redirect: 'follow',
      });
      if (res.ok) return { ok: true };
      console.error(`[forms] GAS responded ${res.status}`);
      return { ok: false, error: 'server' };
    } catch (err) {
      if (attempt === 1) {
        console.error('[forms] network failure after retry:', err);
        return { ok: false, error: 'network' };
      }
    } finally {
      clearTimeout(timer);
    }
  }

  return { ok: false, error: 'network' };
}
