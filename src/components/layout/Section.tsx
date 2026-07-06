import { cn } from '@/lib/cn';

type SectionBackground = 'bg' | 'surface' | 'inverse';

// Subtle gradient shifts instead of flat single-color blocks — reuses existing
// neutral tokens only (bg/surface/black), never a new hex, so this stays
// "depth and quality of light," not a new color introduced anywhere.
const BACKGROUND_CLASS: Record<SectionBackground, string> = {
  bg: 'bg-gradient-to-b from-bg to-surface text-text-primary',
  surface: 'bg-gradient-to-b from-surface to-bg text-text-primary',
  inverse: 'bg-gradient-to-b from-inverse-bg to-black text-inverse-text',
};

export function Section({
  background = 'bg',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { background?: SectionBackground }) {
  return (
    <section
      className={cn('py-16 md:py-24 lg:py-32', BACKGROUND_CLASS[background], className)}
      {...props}
    >
      {children}
    </section>
  );
}
