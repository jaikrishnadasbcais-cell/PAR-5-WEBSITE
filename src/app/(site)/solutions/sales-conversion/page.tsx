import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { AmbientBlobs } from '@/components/sections/home/AmbientBlobs';
import { ServiceCategoryGroup } from '@/components/sections/solutions/ServiceCategoryGroup';
import { SOLUTIONS_SALES_CONVERSION_SERVICES } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Sales & Conversion — Grow Your Revenue — PAR5',
  description: 'SEO, social media, content marketing, and paid ads management.',
};

export default function SolutionsSalesConversionPage() {
  return (
    <Section background="bg" className="relative overflow-hidden">
      <AmbientBlobs />
      <Container width="narrow" className="relative z-10">
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          Grow Your Revenue
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Sales &amp; Conversion
        </h1>
        <p className="mt-4 text-body-lg text-text-secondary">
          Getting found, staying visible, and turning that attention into actual revenue —
          ongoing work, not a one-off project.
        </p>

        <div className="mt-12">
          <ServiceCategoryGroup
            category="Grow Your Revenue"
            services={SOLUTIONS_SALES_CONVERSION_SERVICES}
          />
        </div>
      </Container>
    </Section>
  );
}
