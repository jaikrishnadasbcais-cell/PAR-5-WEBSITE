import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { AmbientBlobs } from '@/components/sections/home/AmbientBlobs';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Solutions — PAR5',
  description: 'Choose your goal — websites, systems, and revenue tools organized by outcome.',
};

// Four outcome-language categories (the mental model a business owner already
// thinks in — docs/architecture.md §2), mapped onto the three routed pages.
// Run Your Business and Automate Your Operations share /solutions/admin-systems.
const GOAL_TILES = [
  {
    title: 'Build Your Presence',
    description: 'Websites, landing pages, and online stores.',
    href: ROUTES.solutionsWebsites,
  },
  {
    title: 'Run Your Business',
    description: 'CRM, client portals, and reporting dashboards.',
    href: ROUTES.solutionsAdminSystems,
  },
  {
    title: 'Automate Your Operations',
    description: 'AI chat and voice, workflow automation, lead data.',
    href: ROUTES.solutionsAdminSystems,
  },
  {
    title: 'Grow Your Revenue',
    description: 'SEO, content, social, and paid advertising.',
    href: ROUTES.solutionsSalesConversion,
  },
] as const;

export default function SolutionsPage() {
  return (
    <Section background="bg" className="relative overflow-hidden">
      <AmbientBlobs />
      <Container className="relative z-10">
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          Solutions
        </p>
        <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Choose your goal.
        </h1>
        <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
          Every service we offer sits under one of these four outcomes — pick the one that
          matches where the business needs help most.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GOAL_TILES.map((tile) => (
            <Link key={tile.title} href={tile.href} className="block">
              <Card className="h-full">
                <h2 className="font-[family-name:var(--font-fraunces)] text-h3">{tile.title}</h2>
                <p className="mt-3 text-body text-text-secondary">{tile.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
