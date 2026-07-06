import { LinkButton } from '@/components/ui/LinkButton';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { ROUTES } from '@/lib/routes';

export function CTABand() {
  return (
    <Section background="inverse">
      <Container width="narrow" className="text-center">
        <h2 className="font-[family-name:var(--font-fraunces)] text-h2">Ready to hand it over?</h2>
        <p className="mt-4 text-body-lg text-inverse-text/70">
          Tell us where the business is today — we&apos;ll show you what PAR5 running it looks
          like.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton href={ROUTES.tapIn} size="md">
            Tap In
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
