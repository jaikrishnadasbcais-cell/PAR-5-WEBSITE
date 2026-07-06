const STEPS = [
  {
    title: 'Discovery Call',
    description:
      'A straightforward conversation about where the business is today, what’s slowing it down, and what "better" actually looks like.',
  },
  {
    title: 'Proposal & Scope',
    description:
      'A clear, fixed-price plan — what gets built, in what order, and when. No open-ended hourly billing.',
  },
  {
    title: 'Build',
    description:
      'Design, development, and testing, with regular check-ins so there are no surprises when it’s time to launch.',
  },
  {
    title: 'Launch',
    description: 'The system goes live, the team gets trained on it, and the handover is documented properly.',
  },
  {
    title: 'Ongoing Support',
    description:
      'Maintenance, updates, and a team that keeps building as the business grows — not a one-time handoff.',
  },
] as const;

export function ProcessTimeline() {
  return (
    <ol className="relative flex flex-col gap-10 pl-10">
      {/* The connecting line — accent green, per docs/architecture.md's
          "process-timeline progress line" being one of the few sanctioned
          full-length accent uses. */}
      <div aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-accent/40" />
      {STEPS.map((step, i) => (
        <li key={step.title} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent bg-bg font-[family-name:var(--font-mono)] text-caption font-medium text-text-primary"
          >
            {i + 1}
          </span>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.08),0_20px_40px_-12px_rgba(10,10,10,0.18)] md:p-6">
            <h3 className="font-[family-name:var(--font-fraunces)] text-h3 font-semibold text-text-primary">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xl text-body text-text-secondary">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
