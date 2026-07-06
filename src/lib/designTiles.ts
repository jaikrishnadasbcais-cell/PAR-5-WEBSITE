export type DesignTile = {
  slug: string;
  label: string;
  src: string;
};

// Shared between the homepage hero background grid and the /showcase "Design
// Directions" section (Phase 4) — one source of truth for the asset list, per
// docs/architecture.md's "store once, reference from both" instruction.
// crm-business-dashboard and invoicing-system are ordered first because
// Phase 4 requires them as the first two tiles shown in the showcase section.
export const DESIGN_TILES: DesignTile[] = [
  { slug: 'crm-business-dashboard', label: 'CRM Business Dashboard', src: '/images/pages/design-tiles/crm-business-dashboard.png' },
  { slug: 'invoicing-system', label: 'Invoicing System', src: '/images/pages/design-tiles/invoicing-system.png' },
  { slug: 'architecture', label: 'Architecture', src: '/images/pages/design-tiles/architecture.png' },
  { slug: 'consulting', label: 'Consulting', src: '/images/pages/design-tiles/consulting.png' },
  { slug: 'engineering', label: 'Engineering', src: '/images/pages/design-tiles/engineering.png' },
  { slug: 'finance', label: 'Finance', src: '/images/pages/design-tiles/finance.png' },
  { slug: 'frail-care', label: 'Frail Care', src: '/images/pages/design-tiles/frail-care.png' },
  { slug: 'hospitality', label: 'Hospitality', src: '/images/pages/design-tiles/hospitality.png' },
  { slug: 'interior-design', label: 'Interior Design', src: '/images/pages/design-tiles/interior-design.png' },
  { slug: 'legal', label: 'Legal', src: '/images/pages/design-tiles/legal.png' },
  { slug: 'logistics', label: 'Logistics', src: '/images/pages/design-tiles/logistics.png' },
  { slug: 'medical', label: 'Medical', src: '/images/pages/design-tiles/medical.png' },
  { slug: 'premium-retail', label: 'Premium Retail', src: '/images/pages/design-tiles/premium-retail.png' },
  { slug: 'produce', label: 'Produce', src: '/images/pages/design-tiles/produce.png' },
  { slug: 'restaurant', label: 'Restaurant', src: '/images/pages/design-tiles/restaurant.png' },
  { slug: 'retail', label: 'Retail', src: '/images/pages/design-tiles/retail.png' },
  { slug: 'tourism', label: 'Tourism', src: '/images/pages/design-tiles/tourism.png' },
];
