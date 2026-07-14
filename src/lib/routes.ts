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

// External client portal / CRM — clients sign in here, it's not part of the
// marketing site's own routing.
export const CLIENT_PORTAL_URL = 'https://real-os.onrender.com/';

// Desktop top navigation — Tap In stays a button, not a nav link.
// Home is explicit (v3.5 H3): the logo alone isn't a safe assumption for every
// visitor. Mobile already has a Home tab. NOTE: consumers must match '/'
// exactly, not by prefix, or Home reads as active on every page.
export const NAV_ROUTES = [
  { label: 'Home', href: ROUTES.home },
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
  { label: 'Build', href: ROUTES.buildMySystem, icon: 'cart' },
  { label: 'Tap In', href: ROUTES.tapIn, icon: 'target' },
] as const;
