import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { AmbientBlobs } from '@/components/sections/home/AmbientBlobs';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Insights — PAR5',
  description: 'Practical thinking on growth, systems, and running a modern business.',
};

// STUB CONTENT — the real MDX pipeline (src/lib/content/, real articles) is
// Phase 5 scope. These three entries are placeholders so the page isn't empty;
// none of them link anywhere yet (no [slug] route exists).
const STUB_ARTICLES = [
  {
    title: 'Why most business websites don’t generate enquiries',
    excerpt: 'The gap between "having a website" and "having a website that sells."',
  },
  {
    title: 'What to automate first, and what to leave alone',
    excerpt: 'Not everything in the business needs a workflow built for it — yet.',
  },
  {
    title: 'The real cost of a slow follow-up',
    excerpt: 'How much a business loses between a lead coming in and someone replying.',
  },
] as const;

export default function InsightsPage() {
  return (
    <Section background="bg" className="relative overflow-hidden">
      <AmbientBlobs />
      <Container className="relative z-10">
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-text-secondary">
          Insights
        </p>
        <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-fraunces)] text-h1 font-semibold text-text-primary">
          Practical thinking on growth and systems.
        </h1>
        <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
          Full articles are coming soon — here’s a preview of what’s planned.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STUB_ARTICLES.map((article) => (
            <Card key={article.title} className="h-full">
              <h2 className="font-[family-name:var(--font-fraunces)] text-h3">{article.title}</h2>
              <p className="mt-3 text-body text-text-secondary">{article.excerpt}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
