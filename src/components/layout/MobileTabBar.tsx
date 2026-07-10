'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES, TAB_ROUTES } from '@/lib/routes';
import { cn } from '@/lib/cn';
import { useBuildMySystem } from '@/components/features/build-my-system';
import { BookIcon, CartIcon, GridIcon, HomeIcon, TargetIcon } from './TabBarIcons';
import { CartBadge } from './CartBadge';

const ICONS = {
  home: HomeIcon,
  grid: GridIcon,
  book: BookIcon,
  cart: CartIcon,
  target: TargetIcon,
} as const;

export function MobileTabBar() {
  const pathname = usePathname();
  // Read-only: the badge reflects the cart, it never mutates it (v3.5 H1/#4).
  const { selectedServices } = useBuildMySystem();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Primary"
    >
      <ul className="flex h-16 items-stretch justify-between px-2">
        {TAB_ROUTES.map((tab) => {
          const Icon = ICONS[tab.icon as keyof typeof ICONS];
          const isActive =
            tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          // Tap In is the primary conversion action — always accent-colored,
          // not just when active (v3 amendment A4).
          const isPrimaryAction = tab.href === ROUTES.tapIn;
          const isCart = tab.href === ROUTES.buildMySystem;

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={cn(
                  'flex h-full min-w-[44px] flex-col items-center justify-center gap-1 whitespace-nowrap text-[11px] leading-none',
                  isActive || isPrimaryAction ? 'text-accent' : 'text-text-muted',
                  isPrimaryAction && 'font-medium'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative inline-flex">
                  <Icon className="h-6 w-6" />
                  {isCart && (
                    <CartBadge count={selectedServices.length} className="-right-2 -top-1.5" />
                  )}
                </span>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
