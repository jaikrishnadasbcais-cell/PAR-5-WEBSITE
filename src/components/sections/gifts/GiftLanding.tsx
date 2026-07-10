import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { FlankedHeadline } from '@/components/ui/FlankedHeadline';
import { ShowcaseTile } from '@/components/sections/showcase/ShowcaseTile';
import { getDesignTiles } from '@/lib/designTiles';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/cn';

export type GiftTheme = 'dss' | 'demo';

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
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

// Shared gift landing template (v3.4 G2), themed per gift so the click-through
// from each lobby offer block reads as one continuous surface: DSS is the dark
// black/gold treatment of its block; Demo is the light/gold one. Presentational
// and server-rendered — the Demo page passes its client qualifier in as `cta`.
export function GiftLanding({
  theme,
  title,
  subhead,
  includedItems,
  showcaseSlugs,
  cta,
  trustLine,
}: {
  theme: GiftTheme;
  title: string;
  subhead: string;
  includedItems: readonly string[];
  showcaseSlugs: readonly string[];
  cta: React.ReactNode;
  trustLine: string;
}) {
  const dark = theme === 'dss';
  const tiles = getDesignTiles(showcaseSlugs);

  return (
    <Section background={dark ? 'inverse' : 'bg'} className="relative overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <FlankedHeadline
            as="h1"
            className={cn('text-h2 md:text-h1', dark ? 'text-gold' : 'text-gold-on-light')}
          >
            {title}
          </FlankedHeadline>
          <p
            className={cn(
              'mt-4 text-body-lg',
              dark ? 'text-inverse-text/80' : 'text-text-secondary'
            )}
          >
            {subhead}
          </p>
        </div>

        {/* What's included */}
        <div className="mt-12 max-w-2xl">
          <h2
            className={cn(
              'text-eyebrow font-medium uppercase tracking-[0.18em]',
              dark ? 'text-inverse-text/60' : 'text-text-secondary'
            )}
          >
            What&apos;s included
          </h2>
          <ul className="mt-5 flex flex-col gap-4">
            {includedItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon
                  className={cn('mt-0.5 h-5 w-5 shrink-0', dark ? 'text-gold' : 'text-gold-on-light')}
                />
                <span className={cn('text-body', dark ? 'text-inverse-text/90' : 'text-text-primary')}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Relevant Showcase examples */}
        <div className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2
              className={cn(
                'font-[family-name:var(--font-fraunces)] text-h3 font-semibold',
                dark ? 'text-inverse-text' : 'text-text-primary'
              )}
            >
              A taste of what we build
            </h2>
            <Link
              href={ROUTES.showcase}
              className={cn(
                'group inline-flex items-center gap-1 text-caption font-medium transition-colors',
                dark
                  ? 'text-inverse-text/70 hover:text-inverse-text'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              See all
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {tiles.map((tile) => (
              <ShowcaseTile
                key={tile.slug}
                tile={tile}
                sizes="(min-width: 640px) 25vw, 50vw"
              />
            ))}
          </div>
        </div>

        {/* CTA — a plain LinkButton for DSS, the inline qualifier for Demo */}
        <div className="mt-16">{cta}</div>

        {/* Micro-trust row */}
        <p
          className={cn(
            'mt-12 border-t pt-6 text-caption',
            dark ? 'border-inverse-text/15 text-inverse-text/70' : 'border-border text-text-secondary'
          )}
        >
          {trustLine}
        </p>
      </Container>
    </Section>
  );
}
