import type { Service } from './types';

// Stub catalog for Phase 3 isolation testing. Real service data — and wiring
// BuildMySystemButton into actual /solutions pages — lands in Phase 4.
export const STUB_SERVICES: Service[] = [
  {
    id: 'business-website',
    name: 'Business Website',
    category: 'Build Your Presence',
    implementationCost: { min: 15000, max: 25000 },
    monthlyCost: { min: 0, max: 0 },
  },
  {
    id: 'crm-system',
    name: 'CRM System',
    category: 'Run Your Business',
    implementationCost: { min: 25000, max: 45000 },
    monthlyCost: { min: 500, max: 1200 },
  },
  {
    id: 'seo-content',
    name: 'SEO & Content',
    category: 'Grow Your Revenue',
    implementationCost: { min: 8000, max: 12000 },
    monthlyCost: { min: 3500, max: 6000 },
  },
];
