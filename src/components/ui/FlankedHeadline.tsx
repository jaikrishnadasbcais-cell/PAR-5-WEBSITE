import { cn } from '@/lib/cn';

// Editorial-masthead flourish: thin flanking dashes either side of a name,
// non-italic against the italic headline so they read as a quiet rule rather
// than part of the name. Plain inline text (not flex) so the whole phrase
// wraps naturally at narrow widths instead of overflowing its container.
// The dashes are em-dash + non-breaking space (— +  ) so each dash
// stays glued to its adjacent word and never strands alone on its own line
// (a mobile-regression fix from v3.3).
//
// Shared by the lobby offer blocks (v3.1 D4, as <h2>) and the v3.4 gift
// landing pages (as a larger <h1>) so the click-through from block to page
// reads as one continuous surface. Size is intentionally NOT baked in beyond
// the default so callers can scale it; the base text-h3/md:text-h2 keeps the
// lobby usage unchanged, and gift pages override via className (tailwind-merge
// is taught the custom text-* scale in lib/cn, so a later text-h1 wins).
export function FlankedHeadline({
  as: Tag = 'h2',
  className,
  children,
}: {
  as?: 'h1' | 'h2';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        'font-[family-name:var(--font-fraunces)] text-h3 font-semibold italic md:text-h2',
        className
      )}
    >
      <span aria-hidden="true" className="not-italic">
        {'— '}
      </span>
      {children}
      <span aria-hidden="true" className="not-italic">
        {' —'}
      </span>
    </Tag>
  );
}
