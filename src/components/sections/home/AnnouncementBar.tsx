import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export function AnnouncementBar() {
  return (
    <Link
      href={ROUTES.giftDemoWebsite}
      className="block border-b border-border bg-surface px-4 py-2.5 text-center text-caption text-text-secondary transition-colors hover:text-text-primary"
    >
      A Welcome Gift comes with every build.
    </Link>
  );
}
