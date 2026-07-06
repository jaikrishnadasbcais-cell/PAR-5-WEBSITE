'use client';

import { useBuildMySystem } from './useBuildMySystem';
import { formatServiceRange } from '@/lib/formatServiceRange';
import type { Service } from './types';

function RemoveIcon({ className }: { className?: string }) {
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
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SelectionListItem({
  service,
  size = 'sm',
}: {
  service: Service;
  size?: 'sm' | 'lg';
}) {
  const { removeService } = useBuildMySystem();

  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-lg border border-border bg-surface ${
        size === 'lg' ? 'p-4' : 'p-2.5'
      }`}
    >
      <div className="min-w-0">
        <p
          className={`truncate font-medium text-text-primary ${
            size === 'lg' ? 'text-body' : 'text-caption'
          }`}
        >
          {service.name}
        </p>
        <p className="truncate text-caption text-text-muted">{service.category}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-caption text-text-secondary">{formatServiceRange(service)}</span>
        <button
          type="button"
          onClick={() => removeService(service.id)}
          aria-label={`Remove ${service.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg hover:text-text-primary"
        >
          <RemoveIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
