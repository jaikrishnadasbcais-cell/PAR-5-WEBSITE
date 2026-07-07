'use client';

import Link from 'next/link';
import { LinkButton } from '@/components/ui/LinkButton';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { ROUTES } from '@/lib/routes';
import { useBuildMySystem } from './useBuildMySystem';
import { SelectionListItem } from './SelectionListItem';
import { formatRand } from '@/lib/currency';
import { whatsappLink } from '@/lib/whatsapp';

export function BuildMySystemReview() {
  const { selectedServices, totals } = useBuildMySystem();
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
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          Build My System
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Your system, reviewed.
        </h1>
        <p className="mt-3 text-body-lg text-text-secondary">
          Adjust anything below, then take it to a conversation.
        </p>

        <ul className="mt-8 flex flex-col gap-3">
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
          <LinkButton href={`${ROUTES.tapIn}?interest=build`} size="md">
            Book Complimentary Consultation
          </LinkButton>
          <LinkButton
            href={whatsappLink('build-my-system')}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
          >
            Talk it through on WhatsApp
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
