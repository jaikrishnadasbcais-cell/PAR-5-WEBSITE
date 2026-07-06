import { LinkButton } from '@/components/ui/LinkButton';
import { Container } from '@/components/ui/Container';
import { ROUTES } from '@/lib/routes';
import { MaterializeOnScroll } from '@/components/motion/MaterializeOnScroll';
import { AmbientBlobs } from './AmbientBlobs';
import { HeroBackgroundGrid } from './HeroBackgroundGrid';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <AmbientBlobs />
      <Container className="relative z-10 pb-12 pt-8 md:pb-16 md:pt-16">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
            Technology &amp; Growth Partner
          </p>
        </div>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-fraunces)] text-display font-semibold tracking-display text-text-primary">
          For the ones building something bigger.
        </h1>
        <HeroBackgroundGrid />
        <p className="max-w-xl text-body-lg text-text-primary/80">We exist to help you scale.</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <MaterializeOnScroll className="inline-block">
            <LinkButton href={ROUTES.tapIn} size="md">
              Tap In
            </LinkButton>
          </MaterializeOnScroll>
          <LinkButton href={ROUTES.solutions} variant="secondary" size="md">
            Explore Solutions
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
