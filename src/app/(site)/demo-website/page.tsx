import type { Metadata } from 'next';
import { GiftLanding } from '@/components/sections/gifts/GiftLanding';
import { DemoQualifier } from '@/components/features/demo-qualifier';

export const metadata: Metadata = {
  title: 'Get a Free Demo Website — PAR5',
  description:
    'See your business online with a real, working demo homepage — free, no commitment. Answer two quick questions to get started.',
};

// TODO(owner): replace placeholder deliverables — v3.4 G2.2. Structural
// placeholders so the page ships complete; real "what's included" copy is
// required from the owner before public launch. Do not invent final
// deliverables here.
const INCLUDED_ITEMS = [
  'A real, working homepage for your business — built, not mocked up',
  'Your branding, your services, your actual content',
  'Seen live on your phone before you decide anything',
] as const;

if (process.env.NODE_ENV !== 'production') {
  console.warn(
    '[v3.4] /demo-website "What\'s included" uses PLACEHOLDER copy — owner must supply real deliverables before public launch.'
  );
}

// Curated spread of Design Directions (v3.4 G2.3) — the two featured first on
// /showcase plus a hospitality/retail lean that reads as small-business demos.
const SHOWCASE_SLUGS = [
  'crm-business-dashboard',
  'invoicing-system',
  'hospitality',
  'premium-retail',
] as const;

export default function DemoWebsitePage() {
  return (
    <GiftLanding
      theme="demo"
      title="Get a Free Demo Website"
      subhead="Your business online — no cost, no commitment. See a real working homepage before you decide anything."
      includedItems={INCLUDED_ITEMS}
      showcaseSlugs={SHOWCASE_SLUGS}
      trustLine="Free · No commitment · Nothing to install"
      cta={<DemoQualifier />}
    />
  );
}
