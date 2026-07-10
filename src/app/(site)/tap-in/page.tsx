import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { AmbientBlobs } from '@/components/sections/home/AmbientBlobs';
import { LinkButton } from '@/components/ui/LinkButton';
import { TapInForm } from '@/components/forms/TapInForm';
import { SERVICE_INTERESTS, type FormType, type ServiceInterest } from '@/lib/forms/types';
import { whatsappLink, type WhatsAppContext } from '@/lib/whatsapp';
import { resolveDemoAnswers } from '@/components/features/demo-qualifier';

export const metadata: Metadata = {
  title: 'Tap In — PAR5',
  description:
    'Book a free discovery call, claim your free demo website, or message PAR5 on WhatsApp — no pressure, no obligation.',
};

// ?interest= drives the whole page: pre-selects the form's serviceInterest,
// picks the right hidden formType, and picks the WhatsApp pre-fill. "build"
// is the Build My System flow (C5.4) — a formType, not a serviceInterest.
function resolveInterest(interest: string | undefined): {
  serviceInterest?: ServiceInterest;
  formType: FormType;
  whatsappContext: WhatsAppContext;
} {
  if (interest === 'build') {
    return { formType: 'build-my-system', whatsappContext: 'build-my-system' };
  }
  const serviceInterest = (SERVICE_INTERESTS as readonly string[]).includes(interest ?? '')
    ? (interest as ServiceInterest)
    : undefined;
  return {
    serviceInterest,
    formType: serviceInterest === 'demo-website' ? 'demo-claim' : 'tap-in',
    whatsappContext: serviceInterest === 'demo-website' ? 'demo' : 'default',
  };
}

export default async function TapInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const interest = typeof params.interest === 'string' ? params.interest : undefined;
  const { serviceInterest, formType, whatsappContext } = resolveInterest(interest);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

  // Demo qualifier hand-off (v3.4 G3): when the visitor came through the demo
  // flow, their taps are in the query string — reflect them back and attach
  // them to the lead so only Name/Email remain.
  const demo = resolveDemoAnswers(params);

  return (
    <Section background="bg" className="relative overflow-hidden">
      <AmbientBlobs />
      <Container width="narrow" className="relative z-10">
        <h1 className="font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Tap In
        </h1>
        <p className="mt-3 max-w-xl text-body-lg text-text-secondary">
          {demo
            ? demo.reflection
            : 'Book a free discovery call, claim your demo, or just say hi — no pressure, no obligation.'}
        </p>

        {/* Path 1 — WhatsApp: likely the highest-converting path in the SA
            market; stays above the fold on mobile. */}
        <div className="mt-10">
          <LinkButton
            href={whatsappLink(whatsappContext)}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            className="w-full sm:w-auto"
          >
            Message us on WhatsApp
          </LinkButton>
          <p className="mt-2 text-caption text-text-muted">Fastest way to reach us.</p>
        </div>

        {/* Path 2 — the form */}
        <div className="mt-12">
          <h2 className="font-[family-name:var(--font-fraunces)] text-h3 font-semibold text-text-primary">
            {demo ? 'Just your name and email' : 'Or send it through here'}
          </h2>
          {demo && (
            <p className="mt-2 text-caption text-text-secondary">
              We&apos;ve got the rest from your answers — {demo.readable}.
            </p>
          )}
          <div className="mt-6">
            <TapInForm
              formType={formType}
              serviceInterest={serviceInterest}
              demoAnswers={demo?.readable}
            />
          </div>
        </div>

        {/* Path 3 — book directly. Renders nothing without the env var;
            lazy-loaded below the fold so the embed can't hurt LCP. */}
        {bookingUrl && (
          <div className="mt-12">
            <h2 className="font-[family-name:var(--font-fraunces)] text-h3 font-semibold text-text-primary">
              Or book a call directly
            </h2>
            <p className="mt-2 text-body text-text-secondary">
              Pick a time that suits — the discovery call is free.
            </p>
            <iframe
              src={bookingUrl}
              title="Book a discovery call"
              loading="lazy"
              className="mt-4 h-[640px] w-full rounded-2xl border border-border bg-surface"
            />
          </div>
        )}

        {/* Micro-trust row */}
        <p className="mt-12 border-t border-border pt-6 text-caption text-text-secondary">
          Fixed-price proposals&ensp;·&ensp;No open-ended hourly billing&ensp;·&ensp;Response
          within one business day
        </p>
      </Container>
    </Section>
  );
}
