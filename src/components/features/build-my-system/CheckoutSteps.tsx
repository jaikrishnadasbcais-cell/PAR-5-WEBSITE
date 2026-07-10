import { cn } from '@/lib/cn';

// Checkout step indicator (v3.5 H2) — makes /build-my-system read as a flow
// with a next step, not a passive summary list. Deliberately not new design
// vocabulary: the numbered circles reuse the Process page's step markers
// (mono numeral, accent ring on the live step).
//
// Presentation only — `current` is a constant at each call site, not state.
const STEPS = ['Cart', 'Your Details', 'Confirmed'] as const;

export function CheckoutSteps({ current = 0 }: { current?: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {STEPS.map((label, i) => {
        const isCurrent = i === current;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className="flex items-center gap-2"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-bg font-[family-name:var(--font-mono)] text-caption font-medium',
                  isCurrent
                    ? 'border-accent text-text-primary'
                    : 'border-border text-text-muted'
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap text-caption',
                  isCurrent ? 'font-medium text-text-primary' : 'text-text-muted'
                )}
              >
                {label}
              </span>
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="px-1 text-text-muted">
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
