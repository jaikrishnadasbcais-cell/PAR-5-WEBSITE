export const ROUTES = {
  home: '/',
  solutions: '/solutions',
  solutionsWebsites: '/solutions/websites',
  solutionsSalesConversion: '/solutions/sales-conversion',
  solutionsAdminSystems: '/solutions/admin-systems',
  process: '/process',
  showcase: '/showcase',
  insights: '/insights',
  buildMySystem: '/build-my-system',
  tapIn: '/tap-in',
  // Gift landing pages (v3.4 G1) — the offer blocks' click-through. The Demo
  // page ends in the tap-only qualifier (G3); DSS is a straight content →
  // consultation page. These replaced the old dead `whatsIncluded` placeholder.
  giftDigitalSalesSystem: '/digital-sales-system',
  giftDemoWebsite: '/demo-website',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export const PRIMARY_CTA = ROUTES.tapIn;

// Desktop top navigation — Tap In stays a button, not a nav link
export const NAV_ROUTES = [
  { label: 'Solutions', href: ROUTES.solutions },
  { label: 'Process', href: ROUTES.process },
  { label: 'Showcase', href: ROUTES.showcase },
  { label: 'Insights', href: ROUTES.insights },
] as const;

// Mobile bottom tab bar — custom line icons, no emoji
export const TAB_ROUTES = [
  { label: 'Home', href: ROUTES.home, icon: 'home' },
  { label: 'Solutions', href: ROUTES.solutions, icon: 'grid' },
  { label: 'Insights', href: ROUTES.insights, icon: 'book' },
  { label: 'Build', href: ROUTES.buildMySystem, icon: 'package' },
  { label: 'Tap In', href: ROUTES.tapIn, icon: 'target' },
] as const;
