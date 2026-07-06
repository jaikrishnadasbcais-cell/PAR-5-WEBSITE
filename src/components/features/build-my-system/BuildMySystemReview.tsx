'use client';

import { LinkButton } from '@/components/ui/LinkButton';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { ROUTES } from '@/lib/routes';
import { useBuildMySystem } from './useBuildMySystem';
import { SelectionListItem } from './SelectionListItem';
import { formatRand } from '@/lib/currency';

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

        <div className="mt-8 flex justify-center">
          {/* Deliberately different label from the site-wide "Tap In" CTA — someone who's
              just built a system and reached this page has already committed to something
              concrete, so the closing action reflects that rather than repeating the
              generic entry-point invitation. Same destination. */}
          <LinkButton href={ROUTES.tapIn} size="md">
            Book Complimentary Consultation
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
