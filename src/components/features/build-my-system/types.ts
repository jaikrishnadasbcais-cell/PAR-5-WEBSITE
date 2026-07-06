export type Service = {
  id: string;
  name: string;
  category: string;
  implementationCost: { min: number; max: number };
  monthlyCost: { min: number; max: number };
  // Optional — populated on the real Phase 4 catalog (src/lib/services.ts) for
  // the "Read More" disclosure on each service; the Phase 3 stub catalog predates
  // this field and doesn't need it.
  description?: string;
  // True for services with no confirmed real pricing yet (currently: the four
  // Grow Your Revenue services, plus Online Store and AI Voice Agent) — a
  // genuine content gap, not a guess. implementationCost/monthlyCost are 0 for
  // these so Build My System's totals math stays valid; the UI shows "Pricing
  // coming soon" instead of R0 wherever this is true.
  pricingPending?: boolean;
};

export type BuildMySystemState = {
  selectedServices: Service[];
};

export type BuildMySystemAction =
  | { type: 'ADD_SERVICE'; service: Service }
  | { type: 'REMOVE_SERVICE'; serviceId: string };
