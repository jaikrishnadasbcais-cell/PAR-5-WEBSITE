import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';
import { cn } from '@/lib/cn';

const LOBBY_TILES = [
  {
    title: 'Solutions',
    description: 'Websites, systems, and revenue tools.',
    href: ROUTES.solutions,
  },
  {
    title: 'Process',
    description: 'From first call to a running system.',
    href: ROUTES.process,
  },
  {
    title: 'Showcase',
    description: 'The range of what we build.',
    href: ROUTES.showcase,
  },
  {
    title: 'Insights',
    description: 'Practical thinking on growth and systems.',
    href: ROUTES.insights,
  },
] as const;

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

function OfferCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-body font-medium text-accent"
    >
      <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
        {label}
      </span>
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
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
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        'font-[family-name:var(--font-fraunces)] text-h3 font-semibold italic md:text-h2',
        className
      )}
      style={style}
    >
      <span aria-hidden="true" className="not-italic">
        {'— '}
      </span>
      {children}
      <span aria-hidden="true" className="not-italic">
        {' —'}
      </span>
    </h2>
  );
}

// One shared grid for all six blocks (v3 amendment A1): single column on
// mobile — offer blocks stack full-width — then two columns from md: up, with
// offers side by side in row 1 and lobby tiles two-per-row below. min-w-0 on
// every cell so content can never force a track wider than the viewport.
export function LobbyGrid() {
  return (
    <Section background="bg" className="pt-8 md:pt-12 lg:pt-16">
      <Container>
        <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StaggerItem className="min-w-0">
            <div className="gold-sheen h-full rounded-2xl border-metallic-gold p-[1.5px]">
              <div className="flex h-full flex-col rounded-[14.5px] bg-inverse-bg p-6 lg:p-8">
                <FlankedHeadline className="gold-sheen-text text-gold">
                  The Digital Sales System
                </FlankedHeadline>
                <p className="mt-2 text-body text-inverse-text/80">
                  Your complimentary blueprint for digital marketing success.
                </p>
                <OfferCTA href={ROUTES.whatsIncluded} label="See What's Included" />
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="min-w-0">
            <div className="flex h-full flex-col rounded-2xl border border-white/20 bg-inverse-bg p-6 lg:p-8">
              <FlankedHeadline className="text-inverse-text">Get a Free Demo Website</FlankedHeadline>
              <p className="mt-2 text-body text-inverse-text/80">
                See what your business could look like online — no cost, no commitment.
              </p>
              <OfferCTA href={`${ROUTES.tapIn}?interest=demo-website`} label="Claim Your Demo" />
            </div>
          </StaggerItem>

          {LOBBY_TILES.map((tile) => (
            <StaggerItem key={tile.href} className="min-w-0">
              <Link href={tile.href} className="block h-full">
                <Card className="h-full">
                  <h3 className="font-[family-name:var(--font-fraunces)] text-h3">{tile.title}</h3>
                  <p className="mt-3 text-body text-text-secondary">{tile.description}</p>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
