'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { LinkButton } from '@/components/ui/LinkButton';
import { ROUTES } from '@/lib/routes';
import { useBuildMySystem } from './useBuildMySystem';
import { SelectionListItem } from './SelectionListItem';
import { formatRand } from '@/lib/currency';

export function FloatingPanel() {
  const { selectedServices, totals } = useBuildMySystem();
  const hasItems = selectedServices.length > 0;

  return (
    <AnimatePresence>
      {hasItems && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-20 right-4 z-40 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-surface p-4 shadow-lg md:bottom-6 md:right-6 md:w-full"
        >
          <div className="flex items-center justify-between">
            <p className="text-eyebrow font-medium uppercase tracking-[0.1em] text-text-muted">
              My System
            </p>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-caption font-medium text-text-primary">
              {selectedServices.length}
            </span>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
