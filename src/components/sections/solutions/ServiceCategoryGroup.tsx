import type { Service } from '@/components/features/build-my-system';
import { ServiceListItem } from './ServiceListItem';

export function ServiceCategoryGroup({
  category,
  services,
}: {
  category: string;
  services: Service[];
}) {
  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-eyebrow font-medium uppercase tracking-[0.1em] text-text-muted">
        {category}
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {services.map((service) => (
          <ServiceListItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
