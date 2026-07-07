import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
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
// never wrapping past 2 lines at ~170px card width.
const LOBBY_TILES = [
  {
    title: 'Solutions',
    description: 'Websites, systems, revenue.',
    href: ROUTES.solutions,
    Icon: SolutionsIcon,
  },
  {
    title: 'Process',
    description: 'First call to launch.',
    href: ROUTES.process,
    Icon: ProcessIcon,
  },
  {
    title: 'Showcase',
    description: 'What we build.',
    href: ROUTES.showcase,
    Icon: ShowcaseIcon,
  },
  {
    title: 'Insights',
    description: 'Growth & systems thinking.',
    href: ROUTES.insights,
    Icon: InsightsIcon,
  },
] as const;

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

// Touch feedback (v3.1 D5) — mobile has no hover; a fast press-down reads as
// input acknowledgement before navigation fires. Kept under reduced-motion
// deliberately: it's input feedback, not decorative motion.
const PRESS = 'transition-transform duration-[120ms] ease-out active:scale-[0.97]';

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

// tone="dark": green label on the dark DSS surface (site-wide action color).
// tone="light": #8FFF00 text on white sits near 1.4:1 — illegible — so the
// label goes dark with the green underline sweep + green arrow carrying the
// action color instead. Green still marks the action; it just can't be the
// letterforms on a light surface.
function OfferCTA({
  href,
  label,
  tone,
}: {
  href: string;
  label: string;
  tone: 'dark' | 'light';
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-caption font-medium md:text-body',
        tone === 'dark' ? 'text-accent' : 'text-text-primary'
      )}
    >
      <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
        {label}
      </span>
      <ArrowIcon
        className={cn(
          'h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1',
          tone === 'light' && 'text-accent'
        )}
      />
    </Link>
  );
}

// Editorial-masthead flourish: thin flanking dashes either side of the offer
// name, non-italic against the italic headline so they read as a quiet rule
// rather than part of the name. Plain inline text (not flex) so the whole
// phrase wraps naturally at narrow widths instead of overflowing the block.
// A non-breaking space glues the trailing dash to the last word so it never
// wraps onto an orphan line by itself.
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
        {'— '}
      </span>
      {children}
      <span aria-hidden="true" className="not-italic">
        {' —'}
      </span>
    </h2>
  );
}

// The lobby: a genuine 2×3 grid at every breakpoint (v3.1 D1 — reverses A1's
// mobile stacking for this component only). Row 1 is the two gifts, both
// gold-nameplated but differentiated by surface — DSS dark, Demo light
// (v3.1 D4) — over rows of lighter, equal-weight lobby cards.
export function LobbyGrid() {
  return (
    <Section background="bg" className="pt-8 md:pt-12 lg:pt-16">
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-2.5 md:gap-4">
          <StaggerItem className="min-w-0">
            <div
              className={cn(
                'gold-sheen h-full rounded-2xl border-metallic-gold p-[1.5px]',
                PRESS
              )}
            >
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
                <OfferCTA
                  href={ROUTES.whatsIncluded}
                  label="See What's Included"
                  tone="dark"
                />
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="min-w-0">
            <div
              className={cn(
                'flex h-full flex-col rounded-2xl border border-gold/35 bg-surface p-4 md:p-6 lg:p-8',
                FLOAT_SHADOW,
                PRESS
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
              <OfferCTA
                href={`${ROUTES.tapIn}?interest=demo-website`}
                label="Claim Your Demo"
                tone="light"
              />
            </div>
          </StaggerItem>

          {LOBBY_TILES.map(({ title, description, href, Icon }) => (
            <StaggerItem key={href} className="min-w-0">
              <Link href={href} className={cn('block h-full', PRESS)}>
                <Card
                  className={cn('h-full p-4 md:p-6', FLOAT_SHADOW)}
                  style={{ backgroundImage: LIGHT_WASH }}
                >
                  <Icon className="h-5 w-5 text-text-primary md:h-6 md:w-6" />
                  <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-h3">
                    {title}
                  </h3>
                  <p className="mt-2 text-caption text-text-secondary md:text-body">
                    {description}
                  </p>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
