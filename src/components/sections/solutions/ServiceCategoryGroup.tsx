import type { Service } from '@/components/features/build-my-system';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';
import { ServiceListItem } from './ServiceListItem';

// Category heading + its service cards enter as one materialize-staggered
// sequence on viewport entry (v3 amendment C3).
export function ServiceCategoryGroup({
  category,
  services,
}: {
  category: string;
  services: Service[];
}) {
  return (
    <StaggerGroup>
      <StaggerItem>
        <p className="font-[family-name:var(--font-mono)] text-eyebrow font-medium uppercase tracking-[0.1em] text-text-muted">
          {category}
        </p>
      </StaggerItem>
      <div className="mt-4 flex flex-col gap-4">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <ServiceListItem service={service} />
          </StaggerItem>
        ))}
      </div>
    </StaggerGroup>
  );
}
