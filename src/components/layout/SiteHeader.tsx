'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CLIENT_PORTAL_URL, NAV_ROUTES, ROUTES } from '@/lib/routes';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/LinkButton';
import { TapInLabel } from '@/components/ui/TapInLabel';
import { useBuildMySystem } from '@/components/features/build-my-system';
import { CartIcon, PersonIcon } from './TabBarIcons';
import { CartBadge } from './CartBadge';

// Solid dark bar on every page (not conditional on scroll) — the white/green
// logo variant needs a dark background to read against, so the header is
// permanently bg-inverse-bg rather than toggling transparent at the top.
export function SiteHeader() {
  const pathname = usePathname();
  // Read-only: the badge reflects the cart, it never mutates it (v3.5 H1/#4).
  const { selectedServices } = useBuildMySystem();
  const cartActive = pathname.startsWith(ROUTES.buildMySystem);

  return (
    <header className="sticky top-0 z-50 bg-inverse-bg shadow-[0_1px_0_0_rgba(255,255,255,0.08)]">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href={ROUTES.home} className="flex items-center" aria-label="PAR5 home">
            <Image
              src="/images/brand/PAR5-logo-white.svg"
              alt="PAR5"
              width={1634}
              height={791}
              priority
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_ROUTES.map((item) => {
              // Home ('/') must match exactly — a prefix match would light it
              // up on every page (v3.5 H3).
              const isActive =
                item.href === ROUTES.home
                  ? pathname === ROUTES.home
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-body transition-colors hover:text-inverse-text',
                    isActive ? 'text-inverse-text' : 'text-inverse-text/70'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Client portal / CRM login — external, opens in a new tab. Shown
                on mobile too since the header is the only persistent chrome
                there (the bottom tab bar is site nav, not account access). */}
            <a
              href={CLIENT_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Client login"
              className="rounded-full p-2 text-inverse-text/70 transition-colors hover:text-inverse-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <PersonIcon className="h-6 w-6" />
            </a>

            {/* Cart affordance (v3.5 H1) — always routes straight to
                /build-my-system; no dropdown mini-cart. Mobile gets the same
                icon + badge on its "Build" tab instead. */}
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href={ROUTES.buildMySystem}
                aria-current={cartActive ? 'page' : undefined}
                className={cn(
                  'relative rounded-full p-2 transition-colors hover:text-inverse-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  cartActive ? 'text-inverse-text' : 'text-inverse-text/70'
                )}
              >
                <span className="sr-only">Build My System</span>
                <span className="relative inline-flex">
                  <CartIcon className="h-6 w-6" />
                  <CartBadge count={selectedServices.length} className="-right-2 -top-1.5" />
                </span>
              </Link>

              <LinkButton href={ROUTES.tapIn} size="sm" className="group inline-flex">
                <TapInLabel />
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
