'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const STEPS = [
  {
    title: 'Discovery Call',
    description:
      'A straightforward conversation about where the business is today, what’s slowing it down, and what "better" actually looks like.',
  },
  {
    title: 'Proposal & Scope',
    description:
      'A clear, fixed-price plan — what gets built, in what order, and when. No open-ended hourly billing.',
  },
  {
    title: 'Build',
    description:
      'Design, development, and testing, with regular check-ins so there are no surprises when it’s time to launch.',
  },
  {
    title: 'Launch',
    description: 'The system goes live, the team gets trained on it, and the handover is documented properly.',
  },
  {
    title: 'Ongoing Support',
    description:
      'Maintenance, updates, and a team that keeps building as the business grows — not a one-time handoff.',
  },
] as const;

// The Process page's one sequence and its showpiece (v3 amendment C3): the
// accent progress line draws with scroll position — scrubbed via useScroll,
// reversible, never time-triggered — and each step materializes as the line
// reaches it (whileInView with a pulled-in bottom margin approximates "the
// line is here"). A faint static track sits behind the drawn line so the
// route ahead is visible. Reduced-motion: full line, instant steps.
export function ProcessTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.55'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={listRef} className="relative flex flex-col gap-10 pl-10">
      {/* Static track — where the line will go. The accent progress line
          drawing over it is one of the few sanctioned full-length accent uses
          (docs/architecture.md). */}
      <div aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-accent/20" />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-4 left-[15px] top-4 w-px origin-top bg-accent"
        style={{ scaleY: reduced ? 1 : lineScale }}
      />
      {STEPS.map((step, i) => (
        <motion.li
          key={step.title}
          className="relative"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
          whileInView={
            reduced ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          viewport={{ once: true, margin: '0px 0px -28% 0px' }}
          transition={{ duration: reduced ? 0.25 : 0.4, ease: 'easeOut' }}
        >
          <span
            aria-hidden="true"
            className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent bg-bg font-[family-name:var(--font-mono)] text-caption font-medium text-text-primary"
          >
            {i + 1}
          </span>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.08),0_20px_40px_-12px_rgba(10,10,10,0.18)] md:p-6">
            <h3 className="font-[family-name:var(--font-fraunces)] text-h3 font-semibold text-text-primary">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xl text-body text-text-secondary">{step.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
