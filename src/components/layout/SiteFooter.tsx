import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { Container } from '@/components/ui/Container';

const FOOTER_COLUMNS = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Websites', href: ROUTES.solutionsWebsites },
      { label: 'Sales & Conversion', href: ROUTES.solutionsSalesConversion },
      { label: 'Admin Systems', href: ROUTES.solutionsAdminSystems },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Process', href: ROUTES.process },
      { label: 'Showcase', href: ROUTES.showcase },
      { label: 'Insights', href: ROUTES.insights },
    ],
  },
  {
    heading: 'Get Started',
    links: [
      { label: 'Build My System', href: ROUTES.buildMySystem },
      { label: 'Tap In', href: ROUTES.tapIn },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface pb-20 pt-12 md:pb-12">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <Image
            src="/images/brand/PAR5-logo.svg"
            alt="PAR5"
            width={1634}
            height={791}
            className="h-10 w-auto md:h-12"
          />

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-16">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="text-eyebrow font-medium uppercase tracking-wide text-text-muted">
                  {column.heading}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body text-text-secondary hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 text-caption text-text-muted">
          &copy; {new Date().getFullYear()} PAR5. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
