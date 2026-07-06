'use client';

import { cn } from '@/lib/cn';
import { useBuildMySystem } from './useBuildMySystem';
import type { Service } from './types';

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function BuildMySystemButton({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const { isSelected, addService, removeService } = useBuildMySystem();
  const added = isSelected(service.id);

  return (
    <button
      type="button"
      onClick={() => (added ? removeService(service.id) : addService(service))}
      aria-pressed={added}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-caption font-medium transition-colors',
        added
          ? 'border-accent bg-accent text-text-primary'
          : 'border-border text-text-primary hover:bg-surface',
        className
      )}
    >
      {added ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
      {added ? 'Added' : 'Add to Build'}
    </button>
  );
}
