import { BuildMySystemButton, type Service } from '@/components/features/build-my-system';
import { formatServiceRange } from '@/lib/formatServiceRange';

// Native <details>/<summary> for "Read More" — zero-JS, semantic, accessible,
// and matches the brief's "expandable, never a dense spreadsheet" instruction
// for how pricing/service info should be presented.
export function ServiceListItem({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.08),0_20px_40px_-12px_rgba(10,10,10,0.18)] md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-fraunces)] text-h3 font-semibold text-text-primary">
            {service.name}
          </h3>
          <p className="mt-1 font-[family-name:var(--font-mono)] text-caption text-text-muted">
            {formatServiceRange(service)}
          </p>
        </div>
        <BuildMySystemButton service={service} className="shrink-0" />
      </div>

      {service.description && (
        <details className="group mt-4">
          <summary className="cursor-pointer list-none text-caption font-medium text-text-secondary marker:content-none hover:text-text-primary">
            <span className="inline-flex items-center gap-1">
              Read more
              <span className="transition-transform duration-200 group-open:rotate-180">
                ↓
              </span>
            </span>
          </summary>
          <p className="mt-3 text-body text-text-secondary">{service.description}</p>
        </details>
      )}
    </div>
  );
}
