import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { AmbientBlobs } from '@/components/sections/home/AmbientBlobs';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';
import { ShowcaseTile } from '@/components/sections/showcase/ShowcaseTile';
import { DESIGN_TILES } from '@/lib/designTiles';

export const metadata: Metadata = {
  title: 'Showcase — Design Directions — PAR5',
  description: 'A look at the range of design directions PAR5 brings to different industries.',
};

// Framed as "Design Directions" deliberately, not "case studies" — these are
// style/industry mockups, not confirmed shipped client projects with real
// names or results, so the copy doesn't claim otherwise.
export default function ShowcasePage() {
  return (
    <Section background="bg" className="relative overflow-hidden">
      <AmbientBlobs />
      <Container className="relative z-10">
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          Showcase
        </p>
        <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Design Directions
        </h1>
        <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
          A look at the range of design directions we bring to different industries — from
          business dashboards to hospitality and retail.
        </p>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESIGN_TILES.map((tile) => (
            <StaggerItem key={tile.slug} className="min-w-0">
              <ShowcaseTile tile={tile} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
