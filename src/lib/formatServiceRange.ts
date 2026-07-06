import type { Service } from '@/components/features/build-my-system';
import { formatRand } from './currency';

// All real Phase 4 prices are minimum/starting figures, not ranges — hence the
// "+" on every amount ("starting from"), not a min–max span like the earlier
// placeholder data used.
export function formatServiceRange(service: Service): string {
  if (service.pricingPending) {
    return 'Book consult for pricing';
  }

  const { implementationCost, monthlyCost } = service;
  const implementation = `${formatRand(implementationCost.min)}+`;

  if (monthlyCost.min === 0) {
    return `${implementation} build`;
  }

  return `${implementation} build, ${formatRand(monthlyCost.min)}+/mo`;
}
