'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ROUTES } from '@/lib/routes';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/LinkButton';
import { Section } from '@/components/layout/Section';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';
import {
  BlueprintIcon,
  DemoSiteIcon,
  InsightsIcon,
  ProcessIcon,
  ShowcaseIcon,
  SolutionsIcon,
} from './LobbyIcons';
import { cn } from '@/lib/cn';

// Copy shortened for the 2-up mobile width (v3.1 D1): one short phrase,
// never wrapping past 2 lines at ~170px card width. Index labels are the
// sanctioned mono use — tiny data labels (v3.3 E4).
const LOBBY_TILES = [
  {
    index: '01',
    title: 'Solutions',
    description: 'Websites, systems, revenue.',
    href: ROUTES.solutions,
    Icon: SolutionsIcon,
  },
  {
    index: '02',
    title: 'Process',
    description: 'First call to launch.',
    href: ROUTES.process,
    Icon: ProcessIcon,
  },
  {
    index: '03',
    title: 'Showcase',
    description: 'What we build.',
    href: ROUTES.showcase,
    Icon: ShowcaseIcon,
  },
  {
    index: '04',
    title: 'Insights',
    description: 'Growth & systems thinking.',
    href: ROUTES.insights,
    Icon: InsightsIcon,
  },
] as const;

// Checkerboard slots (v3.3 E2): the dark-molten / light treatment belongs to
// the GRID POSITION, not the content — dark top-left and bottom-right, light
// top-right and bottom-left. E2's fallback lever (if the grid reads too heavy
// on device) is a CONTENT swap: reorder LOBBY_TILES above; never move these
// slot styles.
//
// Sheen delays are relative to each card's own C2 stagger start (Solutions is
// the group's 3rd child -> +0.16s, Insights its 6th -> +0.40s), so 0.55/0.46
// land the two passes ~150ms apart in absolute time, Solutions first — light
// moving across the grid, not two synchronized stickers (E5).
const LOBBY_SLOTS: ReadonlyArray<{
  molten?: { surface: string; sheenAngle: number; sheenDelay: number };
}> = [
  { molten: { surface: 'molten-surface-135', sheenAngle: 105, sheenDelay: 0.55 } },
  {},
  {},
  { molten: { surface: 'molten-surface-315', sheenAngle: 255, sheenDelay: 0.46 } },
];

// Soft, warm-neutral float (v3.1 D3) — diffuse, offset downward, quieter than
// the shared Card shadow. Premium consultancy, not SaaS elevation.
const FLOAT_SHADOW =
  'shadow-[0_2px_6px_rgba(50,42,28,0.05),0_14px_30px_-12px_rgba(50,42,28,0.16)]';

// Whisper of a wash so light cards stop reading as flat white rectangles —
// additive to the 1px border, not a replacement (v3.1 D3).
const LIGHT_WASH = 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)';

// Resting-state directional light behind the nameplate area (v3.1 D3) — the
// quiet sibling of the C2 foil sheen. Light falling on the card from the
// top-left, not an emissive glow.
const GOLD_LIGHT_DARK = 'radial-gradient(ellipse 60% 45% at 18% 12%, rgba(201,162,39,0.14), transparent 70%)';
const GOLD_LIGHT_LIGHT = 'radial-gradient(ellipse 60% 45% at 18% 12%, rgba(201,162,39,0.10), transparent 70%)';

// Jelly press (v3.3 E6, upgrading v3.1 D5): soft-spring squash-and-recover on
// tap — scale dips to 0.97 and the spring release overshoots slightly (~1.01)
// before settling, ~250ms end to end. Primarily a mobile moment. Kept under
// reduced-motion as a plain 0.97 scale-down (input feedback is permitted;
// the springy overshoot is the part that's dropped).
function JellyPress({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      whileTap={{ scale: 0.97 }}
      transition={
        reduced
          ? { duration: 0.12, ease: 'easeOut' }
          : { type: 'spring', stiffness: 550, damping: 15, mass: 0.8 }
      }
    >
      {children}
    </motion.div>
  );
}

// Scoped sheen (v3.3 E5) — the DSS foil-sheen idea retinted green for the two
// dark molten cards only, triggered by viewport entry (it inherits the same
// StaggerGroup hidden->show cascade as the C2 stagger, viewport once) rather
// than hover, so it plays exactly once per load. The band's gradient travels
// with its card's molten angle. Light cards get none — sheen on white reads
// as smudge (mockup review). Reduced-motion: no sheen at all; the card simply
// appears via the existing crossfade.
// The band crops inside its own overflow-hidden layer (not the card's) so the
// card itself never clips in-flow content — see the mobile-regression fix on
// the ghost numeral below.
function MoltenSheen({ angle, delay }: { angle: number; delay: number }) {
  const reduced = useReducedMotion() ?? false;
  const variants: Variants = {
    hidden: { x: '-140%' },
    show: {
      x: '140%',
      transition: { duration: 1.5, ease: 'easeInOut', delay },
    },
  };
  if (reduced) return null;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl"
    >
      <motion.span
        variants={variants}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${angle}deg, transparent 42%, color-mix(in srgb, var(--color-moss-100) 13%, transparent) 50%, transparent 58%)`,
        }}
      />
    </span>
  );
}

function ArrowIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Editorial-masthead flourish: thin flanking dashes either side of the offer
// name, non-italic against the italic headline so they read as a quiet rule
// rather than part of the name. Plain inline text (not flex) so the whole
// phrase wraps naturally at narrow widths instead of overflowing the block.
// Non-breaking spaces glue each dash to its adjacent word so neither dash
// ever strands alone on its own line (the mobile-regression report caught
// this: the old code used plain spaces despite this comment claiming
// otherwise).
function FlankedHeadline({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
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
    </h2>
  );
}

// The lobby (v3.3): one composed object. Row 1 is the two gifts, dual-gold
// black/white colors kept verbatim from v3.1 D4, order swapped per E1 (the
// zero-risk demo leads, DSS supports — consistent with the C5.3 conversion
// strategy). Beneath them, the four lobby cards form a diagonal checkerboard
// of deep molten-green and light cards with magazine-style interiors (E2–E4).
// Bright green is signal (arrows, CTAs); the moss surfaces are material.
//
// MOBILE DEVIATION from v3.1 D1's "2×3 at every breakpoint" (on-device
// regression fix, needs owner ratification): below sm the OFFER row stacks
// full-width while the checkerboard stays 2×2. Forced by geometry, not
// taste — a 2-up offer card at 320px leaves 97px of content width and the
// "See What's Included" label alone measures 119px even at 12px Inter, so
// no font size yields the required single-line pill CTA (see the pill
// comments below). The checkerboard's own content fits 2-up and is
// unchanged.
export function LobbyGrid() {
  return (
    <Section background="bg" className="pt-8 md:pt-12 lg:pt-16">
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-2.5 md:gap-4">
          <StaggerItem className="col-span-2 min-w-0 sm:col-span-1">
            <JellyPress className="h-full">
              <div
                className={cn(
                  'flex h-full flex-col rounded-2xl border border-gold/35 bg-surface p-4 md:p-6 lg:p-8',
                  FLOAT_SHADOW
                )}
                style={{ backgroundImage: `${GOLD_LIGHT_LIGHT}, ${LIGHT_WASH}` }}
              >
                <DemoSiteIcon className="h-5 w-5 text-gold-on-light md:h-6 md:w-6" />
                <FlankedHeadline className="mt-3 text-gold-on-light">
                  Get a Free Demo Website
                </FlankedHeadline>
                <p className="mt-2 text-caption text-text-secondary md:text-body">
                  Your business online — no cost, no commitment.
                </p>
                {/* Owner-approved v3.1 follow-up: on the light surface the CTA
                    is the site's outline-button pattern — dark label, green
                    border + arrow — since green letterforms fail contrast on
                    white. Single-line pill (mobile-regression fix): the base
                    button's whitespace-nowrap + h-10 stand; the full-width
                    offer row guarantees the label fits at 320px. */}
                <div className="mt-auto pt-4">
                  <LinkButton
                    href={`${ROUTES.tapIn}?interest=demo-website`}
                    variant="secondary"
                    size="sm"
                    className="w-fit gap-1.5 px-4 md:px-5"
                  >
                    Claim Your Demo
                    <ArrowIcon className="h-4 w-4 shrink-0 text-accent" />
                  </LinkButton>
                </div>
              </div>
            </JellyPress>
          </StaggerItem>

          <StaggerItem className="col-span-2 min-w-0 sm:col-span-1">
            <JellyPress className="h-full">
              {/* The offer blocks keep their hover-triggered gold sheen,
                  unchanged — resting-state sheen is exclusive to the two dark
                  lobby cards' entrance (E5). */}
              <div className="gold-sheen h-full rounded-2xl border-metallic-gold p-[1.5px]">
                <div
                  className="flex h-full flex-col rounded-[14.5px] bg-inverse-bg p-4 md:p-6 lg:p-8"
                  style={{ backgroundImage: GOLD_LIGHT_DARK }}
                >
                  <BlueprintIcon className="h-5 w-5 text-gold/70 md:h-6 md:w-6" />
                  <FlankedHeadline className="gold-sheen-text mt-3 text-gold">
                    The Digital Sales System
                  </FlankedHeadline>
                  <p className="mt-2 text-caption text-inverse-text/80 md:text-body">
                    Your complimentary sales blueprint.
                  </p>
                  {/* Same bordered-pill treatment as the demo block's CTA
                      (shape, padding, weight), recolored for the DSS surface:
                      gold border + arrow, light label. hover:bg-surface would
                      flash white under the light label, so it becomes a quiet
                      gold tint here. Single-line pill — same nowrap contract
                      as the demo pill; this label is the widest (119px at
                      12px Inter), the reason the offer row stacks below sm. */}
                  <div className="mt-auto pt-4">
                    <LinkButton
                      href={ROUTES.whatsIncluded}
                      variant="secondary"
                      size="sm"
                      className="w-fit gap-1.5 border-gold text-inverse-text px-4 hover:bg-gold/10 md:px-5"
                    >
                      See What's Included
                      <ArrowIcon className="h-4 w-4 shrink-0 text-gold" />
                    </LinkButton>
                  </div>
                </div>
              </div>
            </JellyPress>
          </StaggerItem>

          {LOBBY_TILES.map(({ index, title, description, href, Icon }, i) => {
            const molten = LOBBY_SLOTS[i].molten;
            return (
              <StaggerItem key={href} className="min-w-0">
                <JellyPress className="h-full">
                  <Link href={href} className="block h-full">
                    {/* No overflow-hidden on the Card itself (mobile-
                        regression fix: it was clipping the headings). The
                        ghost numeral and sheen each crop inside their own
                        absolutely-positioned overflow-hidden layer instead,
                        so in-flow content can never be cut by the crop. */}
                    <Card
                      className={cn(
                        'relative isolate flex h-full flex-col p-4 md:p-6',
                        FLOAT_SHADOW,
                        molten && cn('border-transparent', molten.surface)
                      )}
                      style={molten ? undefined : { backgroundImage: LIGHT_WASH }}
                    >
                      {molten && (
                        <MoltenSheen
                          angle={molten.sheenAngle}
                          delay={molten.sheenDelay}
                        />
                      )}
                      <span
                        className={cn(
                          'font-[family-name:var(--font-mono)] text-eyebrow font-medium',
                          molten ? 'text-moss-300' : 'text-text-muted'
                        )}
                      >
                        {index}
                      </span>
                      <Icon
                        className={cn(
                          'mt-3 h-5 w-5 md:h-6 md:w-6',
                          molten ? 'text-moss-100' : 'text-text-primary'
                        )}
                      />
                      {/* E4's "one size up" heading holds from md up; at the
                          2-up mobile width it clipped ("Solutions" needs
                          122px at h2's 28px floor vs 97px of card content at
                          320px), so mobile steps back to h3 — headings must
                          never clip. */}
                      <h3
                        className={cn(
                          'mt-3 font-[family-name:var(--font-fraunces)] text-h3 md:text-h2',
                          molten ? 'text-white' : 'text-text-primary'
                        )}
                      >
                        {title}
                      </h3>
                      <p
                        className={cn(
                          'mt-2 text-caption md:text-body',
                          molten ? 'text-moss-100' : 'text-text-secondary'
                        )}
                      >
                        {description}
                      </p>
                      {/* Arrow affordance (E4.5) — bright green is signal on
                          the dark material; deep moss-600 on white, where
                          #8FFF00 fails contrast (established v3.1). */}
                      <div className="mt-auto pt-4">
                        <ArrowIcon
                          className={cn(
                            'h-5 w-5',
                            molten ? 'text-accent' : 'text-moss-600'
                          )}
                        />
                      </div>
                      {/* Ghost numeral (E4.6) — echoes the Process page's
                          numbered step markers; decorative only. Cropped by
                          its own overflow-hidden layer (not the Card's) so
                          the crop can never clip the card's real content. */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden rounded-2xl"
                      >
                        <span
                          className={cn(
                            'absolute -bottom-[0.22em] -right-[0.04em] font-[family-name:var(--font-fraunces)] text-[6rem] font-semibold leading-none md:text-[9rem]',
                            molten ? 'text-moss-100/15' : 'text-text-primary/5'
                          )}
                        >
                          {index}
                        </span>
                      </span>
                    </Card>
                  </Link>
                </JellyPress>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
