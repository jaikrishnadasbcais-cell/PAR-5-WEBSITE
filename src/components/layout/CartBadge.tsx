import { cn } from '@/lib/cn';

// Item-count badge for the cart affordance (v3.5 H1) — accent numeral, shown
// only when the build has at least one item. The numeral itself is decorative
// (aria-hidden); the count reaches screen readers through the sr-only line,
// which appends to whatever accessible name the surrounding link already has
// ("Build" in the tab bar, "Build My System" in the header).
//
// Positioning is the caller's job: pass the offsets that suit the surface.
export function CartBadge({ count, className }: { count: number; className?: string }) {
  if (count < 1) return null;

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'absolute flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium leading-none text-text-primary',
          className
        )}
      >
        {count}
      </span>
      <span className="sr-only">
        {count} {count === 1 ? 'item' : 'items'} in your build
      </span>
    </>
  );
}
