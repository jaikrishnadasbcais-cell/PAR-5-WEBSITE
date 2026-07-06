import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { AmbientBlobs } from '@/components/sections/home/AmbientBlobs';
import { ServiceCategoryGroup } from '@/components/sections/solutions/ServiceCategoryGroup';
import { SOLUTIONS_WEBSITES_SERVICES } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Websites — Build Your Presence — PAR5',
  description: 'Landing pages, business websites, premium websites, and online stores.',
};

export default function SolutionsWebsitesPage() {
  return (
    <Section background="bg" className="relative overflow-hidden">
      <AmbientBlobs />
      <Container width="narrow" className="relative z-10">
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          Build Your Presence
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Websites
        </h1>
        <p className="mt-4 text-body-lg text-text-secondary">
          A website that actually represents the business — fast, clear, and built to turn
          visitors into enquiries, not just a digital business card.
        </p>

        <div className="mt-12">
          <ServiceCategoryGroup
            category="Build Your Presence"
            services={SOLUTIONS_WEBSITES_SERVICES}
          />
        </div>
      </Container>
    </Section>
  );
}
