'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { submitTapIn } from '@/app/(site)/tap-in/actions';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { useBuildMySystem } from '@/components/features/build-my-system';
import {
  TAP_IN_INITIAL_STATE,
  type FormType,
  type ServiceInterest,
  type TapInFieldErrors,
} from '@/lib/forms/types';
import { whatsappLink } from '@/lib/whatsapp';
import { formatRand } from '@/lib/currency';
import { ROUTES } from '@/lib/routes';

const INTEREST_LABELS: Record<ServiceInterest, string> = {
  'demo-website': 'A free demo website',
  'digital-sales-system': 'The Digital Sales System',
  websites: 'A website',
  'admin-systems': 'Admin systems & automation',
  'sales-conversion': 'Sales & conversion (SEO, ads, content)',
  'not-sure': 'Not sure yet',
};

// Shared input look — 44px+ touch targets (h-11) and ≥16px font (text-body)
// per the iOS no-zoom rule already in the spec.
const INPUT_CLASS =
  'h-11 w-full rounded-lg border border-border bg-surface px-4 text-body text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

function Field({
  label,
  htmlFor,
  optional,
  errors,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-caption font-medium text-text-primary">
        {label}
        {optional && <span className="font-normal text-text-muted"> (optional)</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {errors?.[0] && (
        <p id={`${htmlFor}-error`} aria-live="polite" className="mt-1.5 text-caption font-medium text-error">
          {errors[0]}
        </p>
      )}
    </div>
  );
}

export function TapInForm({
  formType,
  serviceInterest,
}: {
  formType: FormType;
  serviceInterest?: ServiceInterest;
}) {
  const [state, formAction, pending] = useActionState(submitTapIn, TAP_IN_INITIAL_STATE);

  // C5.4 — when the visitor arrived from Build My System, the lead carries
  // the exact system they configured. The provider is mounted in the root
  // layout, so the same client context the floating panel uses is readable
  // right here — no extra state plumbing.
  const { selectedServices, totals } = useBuildMySystem();
  const buildSelections =
    formType === 'build-my-system' && selectedServices.length > 0
      ? `${selectedServices.map((s) => s.name).join('; ')} | est. build ${formatRand(
          totals.implementationMin
        )}+, monthly ${formatRand(totals.monthlyMin)}+/mo`
      : undefined;

  // "Pathname the user came from" — same-origin referrer when there is one,
  // otherwise the page itself. Set in an effect so server/client HTML match.
  const [sourcePage, setSourcePage] = useState('/tap-in');
  useEffect(() => {
    try {
      if (document.referrer) {
        const ref = new URL(document.referrer);
        if (ref.origin === window.location.origin && ref.pathname !== '/tap-in') {
          setSourcePage(ref.pathname);
        }
      }
    } catch {
      // unparseable referrer — keep the default
    }
  }, []);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.08),0_20px_40px_-12px_rgba(10,10,10,0.18)] md:p-8">
        <h3 className="font-[family-name:var(--font-fraunces)] text-h3 font-semibold text-text-primary">
          Got it — you&apos;re in.
        </h3>
        <p className="mt-2 text-body text-text-secondary">
          Your message is through. We&apos;ll come back to you within one business day.
        </p>
        <p className="mt-6 text-body font-medium text-text-primary">Want to skip the wait?</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <LinkButton
            href={whatsappLink('default')}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            Message us on WhatsApp
          </LinkButton>
          <Link href={ROUTES.home} className="text-body text-text-secondary underline underline-offset-4 hover:text-text-primary">
            Back to the homepage
          </Link>
        </div>
      </div>
    );
  }

  const fieldErrors: TapInFieldErrors =
    state.status === 'error' && state.error === 'validation' ? (state.fieldErrors ?? {}) : {};
  const isDeliveryError = state.status === 'error' && state.error !== 'validation';

  return (
    <form action={formAction} className="relative flex flex-col gap-5">
      <input type="hidden" name="formType" value={formType} />
      <input type="hidden" name="sourcePage" value={sourcePage} />
      {buildSelections && <input type="hidden" name="buildSelections" value={buildSelections} />}

      {/* Honeypot — visually and programmatically removed; bots fill it anyway. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Name" htmlFor="name" errors={fieldErrors.name}>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={INPUT_CLASS}
          aria-describedby={fieldErrors.name ? 'name-error' : undefined}
        />
      </Field>

      <Field label="Email" htmlFor="email" errors={fieldErrors.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={INPUT_CLASS}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Company" htmlFor="company" optional errors={fieldErrors.company}>
          <input id="company" name="company" type="text" autoComplete="organization" className={INPUT_CLASS} />
        </Field>
        <Field label="Phone" htmlFor="phone" optional errors={fieldErrors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={INPUT_CLASS} />
        </Field>
      </div>

      <Field label="What are you after?" htmlFor="serviceInterest" optional errors={fieldErrors.serviceInterest}>
        <select
          id="serviceInterest"
          name="serviceInterest"
          defaultValue={serviceInterest ?? ''}
          className={INPUT_CLASS}
        >
          <option value="">Choose one…</option>
          {(Object.keys(INTEREST_LABELS) as ServiceInterest[]).map((value) => (
            <option key={value} value={value}>
              {INTEREST_LABELS[value]}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message" optional errors={fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-body text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="Tell us where the business is today — a sentence or two is plenty."
        />
      </Field>

      {isDeliveryError && (
        <div
          role="alert"
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <p className="text-body font-medium text-text-primary">
            Something went wrong on our side — your message didn&apos;t send.
          </p>
          <p className="mt-1 text-body text-text-secondary">
            Message us directly on WhatsApp instead — same conversation, faster reply.
          </p>
          <LinkButton
            href={whatsappLink('default')}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="mt-4"
          >
            Message us on WhatsApp
          </LinkButton>
        </div>
      )}

      <Button type="submit" size="md" disabled={pending} className="w-full md:w-auto">
        {pending ? 'Sending…' : 'Send it through'}
      </Button>
    </form>
  );
}
