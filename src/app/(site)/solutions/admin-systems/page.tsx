import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { AmbientBlobs } from '@/components/sections/home/AmbientBlobs';
import { ServiceCategoryGroup } from '@/components/sections/solutions/ServiceCategoryGroup';
import { SOLUTIONS_ADMIN_SYSTEMS_SERVICES } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Admin Systems — Run Your Business & Automate Your Operations — PAR5',
  description: 'CRM, client portals, dashboards, AI chat and voice, workflow automation.',
};

export default function SolutionsAdminSystemsPage() {
  const runYourBusiness = SOLUTIONS_ADMIN_SYSTEMS_SERVICES.filter(
    (s) => s.category === 'Run Your Business'
  );
  const automateYourOperations = SOLUTIONS_ADMIN_SYSTEMS_SERVICES.filter(
    (s) => s.category === 'Automate Your Operations'
  );

  return (
    <Section background="bg" className="relative overflow-hidden">
      <AmbientBlobs />
      <Container width="narrow" className="relative z-10">
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          Run Your Business &amp; Automate Your Operations
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Admin Systems
        </h1>
        <p className="mt-4 text-body-lg text-text-secondary">
          The systems that run underneath the business — so the team spends less time on admin
          and more time on the work that actually grows it.
        </p>

        <div className="mt-12 flex flex-col gap-12">
          <ServiceCategoryGroup category="Run Your Business" services={runYourBusiness} />
          <ServiceCategoryGroup
            category="Automate Your Operations"
            services={automateYourOperations}
          />
        </div>
      </Container>
    </Section>
  );
}
