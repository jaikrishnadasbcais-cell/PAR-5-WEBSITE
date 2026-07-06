import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = {
  title: 'Tap In — PAR5',
  description: 'Start a conversation with PAR5.',
};

// TEMPORARY PLACEHOLDER — the real Tap In page (form, WhatsApp button, booking
// embed) is Phase 5 scope. This stub exists only so CTAs stop 404ing while
// earlier phases are being built/demoed. Replace wholesale in Phase 5.
export default function TapInPage() {
  return (
    <Section background="bg">
      <Container width="narrow" className="text-center">
        <h1 className="font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Tap In
        </h1>
        <p className="mt-4 text-body-lg text-text-secondary">
          The full booking experience is coming soon.
        </p>
      </Container>
    </Section>
  );
}
