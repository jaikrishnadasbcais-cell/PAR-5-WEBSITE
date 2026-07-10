'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { ROUTES } from '@/lib/routes';
import { useBuildMySystem } from './useBuildMySystem';
import { SelectionListItem } from './SelectionListItem';
import { CheckoutSteps } from './CheckoutSteps';
import { formatRand } from '@/lib/currency';
import { buildSystemWhatsappLink } from '@/lib/whatsapp';

// Hydration-safe read of the deployed origin for the WhatsApp message's
// fallback reference link — no hardcoded domain to go stale, no
// setState-in-effect. Server snapshot is '' (the link simply omits the
// reference line in the SSR-rendered href); the client snapshot fills it in
// right after hydration.
const noopSubscribe = () => () => {};
function useSiteOrigin(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => window.location.origin,
    () => ''
  );
}

export function BuildMySystemReview() {
  const { selectedServices, totals } = useBuildMySystem();
  const origin = useSiteOrigin();
  const hasItems = selectedServices.length > 0;

  if (!hasItems) {
    return (
      <Section background="bg">
        <Container width="narrow" className="text-center">
          <h1 className="font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
            Your system is empty
          </h1>
          <p className="mt-4 text-body-lg text-text-secondary">
            Browse Solutions and add services to start building your system.
          </p>
          <div className="mt-8 flex justify-center">
            <LinkButton href={ROUTES.solutions} size="md">
              Browse Solutions
            </LinkButton>
          </div>
          {/* Don't strand people who skipped the configurator (C5.4.3). */}
          <p className="mt-4 text-body text-text-secondary">
            or just{' '}
            <Link
              href={ROUTES.tapIn}
              className="underline underline-offset-4 hover:text-text-primary"
            >
              Tap In
            </Link>{' '}
            and tell us what you need
          </p>
        </Container>
      </Section>
    );
  }

  return (
    <Section background="bg">
      <Container width="narrow">
        {/* Checkout framing (v3.5 H2): the page's job is stated up front —
            eyebrow, step indicator, labeled item list — so it reads as the
            step you complete to proceed, not a passive review list. */}
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          Checkout
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Your system, reviewed.
        </h1>
        <p className="mt-3 text-body-lg text-text-secondary">
          Adjust anything below, then take it to a conversation.
        </p>

        <div className="mt-8">
          <CheckoutSteps current={0} />
        </div>

        <h2 className="mt-10 text-eyebrow font-medium uppercase tracking-[0.1em] text-text-muted">
          Items in your build
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          {selectedServices.map((service) => (
            <SelectionListItem key={service.id} service={service} size="lg" />
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6 text-body text-text-secondary">
          <div className="flex justify-between">
            <span>Estimated implementation</span>
            <span className="font-medium text-text-primary">
              {formatRand(totals.implementationMin)} – {formatRand(totals.implementationMax)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estimated monthly</span>
            <span className="font-medium text-text-primary">
              {totals.monthlyMax === 0
                ? 'No monthly fee'
                : `${formatRand(totals.monthlyMin)} – ${formatRand(totals.monthlyMax)}`}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Deliberately different label from the site-wide "Tap In" CTA — someone who's
              just built a system and reached this page has already committed to something
              concrete, so the closing action reflects that. ?interest=build makes the
              tap-in form attach the configured selections to the lead (C5.4). */}
          {/* Pre-existing 320px overflow, fixed here: at px-8 + whitespace-
              nowrap this label measured 323px, 3px past the narrowest
              supported viewport. Wraps and goes full-width below sm; the
              min-h-11 keeps the 44px touch target. Desktop is unchanged. */}
          <LinkButton
            href={`${ROUTES.tapIn}?interest=build`}
            size="md"
            className="h-auto min-h-11 w-full whitespace-normal px-6 py-3 text-center sm:h-11 sm:w-auto sm:whitespace-nowrap sm:px-8 sm:py-0"
          >
            Book Complimentary Consultation
          </LinkButton>
          {/* The pre-fill carries the actual cart — service names, from-
              prices, totals — so the conversation starts with the system the
              person just built, not a generic line (on-device review fix). */}
          <LinkButton
            href={buildSystemWhatsappLink(selectedServices, totals, origin || undefined)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
          >
            Talk it through on WhatsApp
          </LinkButton>
        </div>
        {/* Names the next step so the jump to /tap-in doesn't feel abrupt
            (v3.5 H2) — matches step 2 of the indicator above. */}
        <p className="mt-3 text-center text-caption text-text-muted">
          Next: tell us how to reach you
        </p>
      </Container>
    </Section>
  );
}
