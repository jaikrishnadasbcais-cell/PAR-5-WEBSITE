import type { Service } from '@/components/features/build-my-system';

// Real Phase 4 service catalog. Category values match the four outcome-language
// groupings from docs/architecture.md §2; each service belongs to exactly one
// of the three routed solution pages via the three exports below.
//
// Pricing: real minimum/starting figures (confirmed), shown with a "+" — these
// are starting prices, not fixed or ranged quotes, rounded UP from the exact
// confirmed figures (implementation to the nearest R100, monthly to the
// nearest R10). This catalog is the CANONICAL pricing source of truth per the
// v3 amendment (A6) — any other doc that disagrees is stale. Two exceptions
// remain pricingPending (Online Store, AI Voice Agent) alongside the entire
// Grow Your Revenue category (SEO, social, content, paid ads) — no confirmed
// pricing exists yet for those; this is a genuine content gap, not a guess,
// so they show "Book consult for pricing" instead of a number.
export const SOLUTIONS_WEBSITES_SERVICES: Service[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    category: 'Build Your Presence',
    implementationCost: { min: 1500, max: 1500 },
    monthlyCost: { min: 270, max: 270 },
    description:
      'A single, focused page built around one offer or campaign — for validating an idea, running paid traffic to, or supporting a launch.',
  },
  {
    id: 'basic-website',
    name: 'Basic Website',
    category: 'Build Your Presence',
    implementationCost: { min: 4400, max: 4400 },
    monthlyCost: { min: 320, max: 320 },
    description:
      'A clean, multi-page site — home, services, about, contact — built to represent the business properly online.',
  },
  {
    id: 'professional-website',
    name: 'Professional Website',
    category: 'Build Your Presence',
    implementationCost: { min: 7900, max: 7900 },
    monthlyCost: { min: 500, max: 500 },
    description:
      'A more complete site build with deeper content structure and stronger conversion-focused design.',
  },
  {
    id: 'premium-website',
    name: 'Premium Website',
    category: 'Build Your Presence',
    implementationCost: { min: 19600, max: 19600 },
    monthlyCost: { min: 1340, max: 1340 },
    description:
      'A fully custom-designed site for businesses where the website itself needs to carry the brand — bespoke visuals, animation, and content structure.',
  },
  {
    id: 'online-store',
    name: 'Online Store',
    category: 'Build Your Presence',
    implementationCost: { min: 0, max: 0 },
    monthlyCost: { min: 0, max: 0 },
    pricingPending: true,
    description:
      'A full e-commerce build — product catalogue, cart, checkout, and payment integration — for businesses ready to sell online.',
  },
];

export const SOLUTIONS_ADMIN_SYSTEMS_SERVICES: Service[] = [
  {
    id: 'crm-system',
    name: 'CRM System Setup',
    category: 'Run Your Business',
    implementationCost: { min: 29300, max: 29300 },
    monthlyCost: { min: 1570, max: 1570 },
    description:
      'A central system for tracking leads, clients, and deals, so nothing falls through the cracks between first contact and closed sale.',
  },
  {
    id: 'client-portal',
    name: 'Client Portal Setup',
    category: 'Run Your Business',
    implementationCost: { min: 19600, max: 19600 },
    monthlyCost: { min: 830, max: 830 },
    description:
      'A private, branded space where clients can log in to view documents, progress, invoices, or deliverables — without an email back-and-forth.',
  },
  {
    id: 'business-dashboard',
    name: 'Business Dashboard Setup',
    category: 'Run Your Business',
    implementationCost: { min: 19600, max: 19600 },
    monthlyCost: { min: 610, max: 610 },
    description:
      'Live dashboards pulling from the systems already in use, so the numbers that matter are visible at a glance, not buried in spreadsheets.',
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot Setup',
    category: 'Automate Your Operations',
    implementationCost: { min: 6900, max: 6900 },
    monthlyCost: { min: 610, max: 610 },
    description:
      'A trained assistant on the website or WhatsApp that answers common questions and qualifies leads, day or night.',
  },
  {
    id: 'ai-voice-agent',
    name: 'AI Voice Agent',
    category: 'Automate Your Operations',
    implementationCost: { min: 0, max: 0 },
    monthlyCost: { min: 0, max: 0 },
    pricingPending: true,
    description:
      'An AI-driven phone agent that can answer, screen, or route calls automatically — for businesses where the phone never stops ringing.',
  },
  {
    id: 'automation-project',
    name: 'Automation Project Setup',
    category: 'Automate Your Operations',
    implementationCost: { min: 7400, max: 7400 },
    monthlyCost: { min: 1720, max: 1720 },
    description:
      'Connecting the tools already in use so repetitive manual steps — data entry, follow-up emails, status updates — happen automatically.',
  },
  {
    id: 'lead-scraper',
    name: 'Lead Scraper',
    category: 'Automate Your Operations',
    implementationCost: { min: 7400, max: 7400 },
    monthlyCost: { min: 830, max: 830 },
    description:
      'Automated collection and enrichment of prospect data from public sources, delivered ready to load into a CRM or outreach sequence.',
  },
];

export const SOLUTIONS_SALES_CONVERSION_SERVICES: Service[] = [
  {
    id: 'seo',
    name: 'SEO',
    category: 'Grow Your Revenue',
    implementationCost: { min: 0, max: 0 },
    monthlyCost: { min: 0, max: 0 },
    pricingPending: true,
    description:
      'Ongoing technical and content work to improve how the business ranks for the searches its customers are already making.',
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    category: 'Grow Your Revenue',
    implementationCost: { min: 0, max: 0 },
    monthlyCost: { min: 0, max: 0 },
    pricingPending: true,
    description:
      'Planning, creating, and posting content on the platforms that matter for the business, with consistency that’s hard to maintain in-house.',
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    category: 'Grow Your Revenue',
    implementationCost: { min: 0, max: 0 },
    monthlyCost: { min: 0, max: 0 },
    pricingPending: true,
    description:
      'Articles, guides, and case studies that build trust with prospects before they ever pick up the phone.',
  },
  {
    id: 'paid-ads',
    name: 'Paid Ads Management',
    category: 'Grow Your Revenue',
    implementationCost: { min: 0, max: 0 },
    monthlyCost: { min: 0, max: 0 },
    pricingPending: true,
    description:
      'Campaign setup and ongoing management across search and social — built around a clear return on ad spend, not just impressions.',
  },
];

export const ALL_SERVICES: Service[] = [
  ...SOLUTIONS_WEBSITES_SERVICES,
  ...SOLUTIONS_ADMIN_SYSTEMS_SERVICES,
  ...SOLUTIONS_SALES_CONVERSION_SERVICES,
];
