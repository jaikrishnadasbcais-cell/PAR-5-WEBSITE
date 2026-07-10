import type { Metadata } from 'next';
import { LinkButton } from '@/components/ui/LinkButton';
import { GiftLanding } from '@/components/sections/gifts/GiftLanding';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'The Digital Sales System — PAR5',
  description:
    'Your complimentary sales blueprint — see what the Digital Sales System covers before booking a consultation.',
};

// TODO(owner): replace placeholder deliverables — v3.4 G2.2. These are
// structural placeholders so the page ships complete; real "what's included"
// copy is required from the owner before public launch. Do not invent final
// deliverables here.
const INCLUDED_ITEMS = [
  'A full audit of your current sales funnel',
  'A mapped-out customer journey from first click to closed deal',
  'The specific systems and automations that plug the biggest leaks',
  'A prioritised, fixed-scope plan you can action right away',
] as const;

if (process.env.NODE_ENV !== 'production') {
  console.warn(
    '[v3.4] /digital-sales-system "What\'s included" uses PLACEHOLDER copy — owner must supply real deliverables before public launch.'
  );
}

// Curated spread of Design Directions (v3.4 G2.3) — the two featured first on
// /showcase plus a finance/consulting lean that fits the sales-blueprint story.
const SHOWCASE_SLUGS = [
  'crm-business-dashboard',
  'invoicing-system',
  'finance',
  'consulting',
] as const;

export default function DigitalSalesSystemPage() {
  return (
    <GiftLanding
      theme="dss"
      title="The Digital Sales System"
      subhead="Your complimentary sales blueprint — the plan for turning your online presence into a system that sells."
      includedItems={INCLUDED_ITEMS}
      showcaseSlugs={SHOWCASE_SLUGS}
      trustLine="Fixed-price proposals · No open-ended hourly billing · No obligation"
      cta={
        <LinkButton
          href={`${ROUTES.tapIn}?interest=digital-sales-system`}
          size="md"
          className="w-full sm:w-auto"
        >
          Book a Consultation
        </LinkButton>
      }
    />
  );
}
