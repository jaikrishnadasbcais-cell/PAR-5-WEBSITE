'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ROUTES, ROUTES } from '@/lib/routes';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/LinkButton';
import { TapInLabel } from '@/components/ui/TapInLabel';

// Solid dark bar on every page (not conditional on scroll) — the white/green
// logo variant needs a dark background to read against, so the header is
// permanently bg-inverse-bg rather than toggling transparent at the top.
export function SiteHeader() {
  const pathname = usePathname();

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
              const isActive = pathname.startsWith(item.href);
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

          <LinkButton href={ROUTES.tapIn} size="sm" className="group hidden md:inline-flex">
            <TapInLabel />
          </LinkButton>
        </div>
      </Container>
    </header>
  );
}
