'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LinkButton } from '@/components/ui/LinkButton';
import { ROUTES } from '@/lib/routes';
import { useBuildMySystem } from './useBuildMySystem';
import { SelectionListItem } from './SelectionListItem';
import { formatRand } from '@/lib/currency';

// Toast-that-settles behavior (on-device review fix): the always-expanded
// panel was covering page content (it blocked the review page's heading), so
// it now peeks fully open on any cart change, then retracts after PEEK_MS to
// a compact count+total pill in the same corner. Tapping the pill re-expands
// and PINS it open ('open') — a deliberate user action shouldn't be undone by
// the timer; the chevron in the header retracts it again. Reduced-motion
// skips the peek entirely and lands straight in the compact state (the pill
// tap still expands — that's input response, not decoration).
const PEEK_MS = 2500;

type PanelState = 'peek' | 'compact' | 'open';

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function FloatingPanel() {
  const { selectedServices, totals } = useBuildMySystem();
  const reduced = useReducedMotion() ?? false;
  const count = selectedServices.length;
  const hasItems = count > 0;

  const [panel, setPanel] = useState<PanelState>('compact');
  const [seenCount, setSeenCount] = useState(count);

  // "Adjust state while rendering" (the react.dev-sanctioned alternative to
  // setState-in-effect): any cart-size change triggers the peek unless the
  // user has pinned the panel open. An emptied cart also resets the pin so
  // the next add starts from the toast behavior again.
  if (count !== seenCount) {
    setSeenCount(count);
    if (count === 0) {
      setPanel('compact');
    } else if (panel !== 'open') {
      setPanel(reduced ? 'compact' : 'peek');
    }
  }

  // The retract timer. `count` is a dependency on purpose: another add while
  // peeking restarts the window instead of cutting the new peek short.
  useEffect(() => {
    if (panel !== 'peek') return;
    const t = setTimeout(() => setPanel('compact'), PEEK_MS);
    return () => clearTimeout(t);
  }, [panel, count]);

  const expandedView = panel !== 'compact';

  // The pill's "running total" — implementation-from figure when there is
  // one; monthly if the cart is monthly-only; bare label when everything in
  // the cart is pricing-pending (all costs 0).
  const pillTotal =
    totals.implementationMin > 0
      ? `${formatRand(totals.implementationMin)}+`
      : totals.monthlyMin > 0
        ? `${formatRand(totals.monthlyMin)}+/mo`
        : 'My System';

  return (
    <AnimatePresence>
      {hasItems && (
        <motion.div
          layout={!reduced}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={
            reduced
              ? { duration: 0.15 }
              : {
                  duration: 0.2,
                  ease: 'easeOut',
                  layout: { type: 'spring', stiffness: 400, damping: 34 },
                }
          }
          style={{ borderRadius: expandedView ? 16 : 24 }}
          className="fixed bottom-20 right-4 z-40 overflow-hidden border border-border bg-surface shadow-lg md:bottom-6 md:right-6"
        >
          {expandedView ? (
            <div className="w-[calc(100vw-2rem)] max-w-sm p-4">
              <div className="flex items-center justify-between">
                <p className="text-eyebrow font-medium uppercase tracking-[0.1em] text-text-muted">
                  My System
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-caption font-medium text-text-primary">
                    {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPanel('compact')}
                    aria-expanded={true}
                    aria-label="Minimize My System summary"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg hover:text-text-primary"
                  >
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <ul className="mt-3 flex max-h-40 flex-col gap-2 overflow-y-auto">
                {selectedServices.map((service) => (
                  <SelectionListItem key={service.id} service={service} />
                ))}
              </ul>

              <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3 text-caption text-text-secondary">
                <div className="flex justify-between">
                  <span>Implementation</span>
                  <span className="text-text-primary">
                    {formatRand(totals.implementationMin)} – {formatRand(totals.implementationMax)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly</span>
                  <span className="text-text-primary">
                    {totals.monthlyMax === 0
                      ? 'No monthly fee'
                      : `${formatRand(totals.monthlyMin)} – ${formatRand(totals.monthlyMax)}`}
                  </span>
                </div>
              </div>

              <LinkButton href={ROUTES.buildMySystem} size="md" className="mt-4 w-full">
                Continue
              </LinkButton>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPanel('open')}
              aria-expanded={false}
              aria-label={`Expand My System — ${count} ${count === 1 ? 'service' : 'services'}, ${pillTotal}`}
              className="flex items-center gap-2 py-2.5 pl-3 pr-4"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-caption font-medium text-text-primary">
                {count}
              </span>
              <span className="whitespace-nowrap text-caption font-medium text-text-primary">
                {pillTotal}
              </span>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
