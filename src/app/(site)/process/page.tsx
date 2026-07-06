import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { AmbientBlobs } from '@/components/sections/home/AmbientBlobs';
import { LinkButton } from '@/components/ui/LinkButton';
import { ProcessTimeline } from '@/components/sections/process/ProcessTimeline';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Process — PAR5',
  description: 'How a project moves from first call to a system that’s actually running.',
};

export default function ProcessPage() {
  return (
    <Section background="bg" className="relative overflow-hidden">
      <AmbientBlobs />
      <Container width="narrow" className="relative z-10">
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          How It Works
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          From first call to a system that runs itself.
        </h1>
        <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
          No open-ended scopes, no disappearing after launch. Here’s exactly what working with
          PAR5 looks like.
        </p>

        <div className="mt-16">
          <ProcessTimeline />
        </div>

        <div className="mt-16">
          <LinkButton href={ROUTES.tapIn} size="md">
            Tap In
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
