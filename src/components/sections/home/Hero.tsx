'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { LinkButton } from '@/components/ui/LinkButton';
import { Container } from '@/components/ui/Container';
import { TapInLabel } from '@/components/ui/TapInLabel';
import { ROUTES } from '@/lib/routes';
import { HeroBackgroundGrid } from './HeroBackgroundGrid';

// The cinematic hero (v3 amendment C1 + Phase 5 C5.3). One coherent
// left-aligned text block — eyebrow, massive display headline, subhead
// directly under it, CTAs beneath — over a vivid full-bleed 3D tile grid.
// Legibility comes from a localized radial scrim behind the text block only,
// not a full-viewport wash. Motion happens to the environment, never to the
// words: the text block materializes once (0.4s), the grid cascades, drifts,
// tilts toward the cursor, and scrubs with scroll.
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  // C1.6 — scroll-scrubbed depth: 0 at the top of the page, 1 when the hero
  // has fully scrolled past. Reversible by construction.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // C1.5 — spring-damped cursor parallax (±2.5°), desktop pointers only.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 50, damping: 14 });
  const springY = useSpring(pointerY, { stiffness: 50, damping: 14 });
  const rotateY = useTransform(springX, [-1, 1], [-2.5, 2.5]);
  const rotateX = useTransform(springY, [-1, 1], [2.5, -2.5]);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative flex min-h-[88svh] items-center overflow-hidden bg-bg"
    >
      <HeroBackgroundGrid scrollProgress={scrollYProgress} rotateX={rotateX} rotateY={rotateY} />

      <Container className="relative z-10 py-20 md:py-28">
        <div className="relative max-w-3xl">
          {/* Localized scrim (C1.2) — soft radial behind the text block only,
              edge-faded to nothing so the grid stays vivid around it. */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-10 -inset-y-12 -z-10"
            style={{
              background:
                'radial-gradient(ellipse 88% 78% at 42% 50%, rgba(250,250,250,0.97) 0%, rgba(250,250,250,0.85) 48%, rgba(250,250,250,0) 80%)',
            }}
          />

          {/* One materialize for the whole block — text entrance ≤400ms (B2),
              delayed only to sequence after the intro swoosh (C1.4). */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: reduced ? 0.25 : 0.4,
              delay: reduced ? 0 : 0.45,
              ease: 'easeOut',
            }}
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
                Technology &amp; Growth Partner
              </p>
            </div>
            <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-display font-semibold tracking-display text-text-primary">
              For the ones building something bigger.
            </h1>
            <p className="mt-4 max-w-xl text-body-lg text-text-primary/80">
              We exist to help you scale.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href={`${ROUTES.tapIn}?interest=demo-website`} size="md">
                Get Your Free Demo Website
              </LinkButton>
              <LinkButton href={ROUTES.tapIn} variant="secondary" size="md" className="group">
                <TapInLabel />
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
