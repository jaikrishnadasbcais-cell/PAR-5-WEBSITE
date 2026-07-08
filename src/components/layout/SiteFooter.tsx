'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ROUTES } from '@/lib/routes';
import { Container } from '@/components/ui/Container';
import { FooterSpecks } from './FooterSpecks';

const FOOTER_COLUMNS = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Websites', href: ROUTES.solutionsWebsites },
      { label: 'Sales & Conversion', href: ROUTES.solutionsSalesConversion },
      { label: 'Admin Systems', href: ROUTES.solutionsAdminSystems },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Process', href: ROUTES.process },
      { label: 'Showcase', href: ROUTES.showcase },
      { label: 'Insights', href: ROUTES.insights },
    ],
  },
  {
    heading: 'Get Started',
    links: [
      { label: 'Build My System', href: ROUTES.buildMySystem },
      { label: 'Tap In', href: ROUTES.tapIn },
    ],
  },
] as const;

// The canonical logo's #swoosh path (PAR5-logo.svg), extracted as a
// standalone decorative gesture (v3.2 F3). viewBox cropped to the path's
// bounds plus stroke headroom.
const SWOOSH_D =
  'M470 1303 C 620 1325 780 1335 950 1339 C 1120 1343 1280 1342 1420 1335 C 1560 1327 1660 1318 1735 1307';

// The site's confident close (v3.2): dark full-bleed surface bookending the
// dark header, quietly alive — specks drifting behind a scroll-drawn swoosh
// behind a giant wordmark cropped by the page's bottom edge. Bold through
// scale and atmosphere, never decoration.
export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  // F3 — the swoosh draws as the footer enters the viewport and reverses on
  // the way back out. Scrubbed, never time-triggered.
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/10 bg-inverse-bg"
    >
      <FooterSpecks />

      {/* F3 — swoosh across the upper third, behind the link columns.
          non-scaling-stroke keeps it ~1.75px at every viewport width. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-8 z-[1] opacity-40">
        <svg viewBox="440 1280 1315 80" fill="none" className="h-auto w-full">
          <motion.path
            d={SWOOSH_D}
            stroke="var(--color-accent)"
            strokeWidth={1.75}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduced ? 1 : draw }}
          />
        </svg>
      </div>

      <Container className="relative z-10 pb-4 pt-14 md:pt-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-16">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="font-[family-name:var(--font-mono)] text-eyebrow font-medium uppercase tracking-wide text-inverse-text/55">
                {column.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-inverse-text/90 transition-colors hover:text-inverse-text focus-visible:text-inverse-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-caption text-inverse-text/50">
          &copy; {new Date().getFullYear()} PAR5. All rights reserved.
        </p>
      </Container>

      {/* F2 — the giant cropped wordmark: real text, tonal near-black on
          black so it reads as an embossed presence, the "5" as the one
          accent moment. The negative bottom margin pushes the lower ~40% of
          the letterforms past the footer's overflow-hidden edge — the page
          ends mid-letter, deliberately. Replaces the small footer logo
          lockup entirely (F5). */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-[2] mt-6 select-none text-center font-[family-name:var(--font-fraunces)] font-semibold leading-none tracking-display text-[#1E1E1E] md:mt-2"
        style={{ fontSize: 'clamp(5rem, 36vw, 34rem)', marginBottom: '-0.52em' }}
      >
        PAR<span className="text-accent">5</span>
      </div>
    </footer>
  );
}
