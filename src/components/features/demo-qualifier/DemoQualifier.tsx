'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/cn';
import { DEMO_QUESTIONS } from './constants';

// Inline demo qualifier (v3.4 G3): the demo page's primary CTA opens a short,
// tap-only sequence instead of dropping the visitor on a cold form. Each step
// is a real radio-group (accessible, keyboard-navigable, large tap targets);
// there's a back button, a visible progress indicator, and a skip escape at
// every step — nothing is forced. On completion (or skip) it hands off to
// /tap-in?interest=demo-website carrying the answers in the query string, so
// only Name/Email remain to fill.
//
// State is a plain useState step machine — no new state architecture, and
// deliberately not the Build My System reducer/context (those selections
// persist app-wide; these answers are transient to this one hand-off).

const STEP_IDLE = -1;

export function DemoQualifier() {
  const router = useRouter();
  const [step, setStep] = useState(STEP_IDLE);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = DEMO_QUESTIONS.length;

  function goToForm(collected: Record<string, string>) {
    const params = new URLSearchParams({ interest: 'demo-website' });
    for (const question of DEMO_QUESTIONS) {
      const value = collected[question.id];
      if (value) params.set(question.id, value);
    }
    router.push(`${ROUTES.tapIn}?${params.toString()}`);
  }

  if (step === STEP_IDLE) {
    return (
      <div>
        <Button type="button" size="md" className="w-full sm:w-auto" onClick={() => setStep(0)}>
          Get My Free Demo
        </Button>
        <p className="mt-3 text-caption text-text-muted">
          Takes about 15 seconds — a couple of taps, no form yet.
        </p>
      </div>
    );
  }

  const question = DEMO_QUESTIONS[step];
  const selected = answers[question.id];
  const isLast = step === total - 1;

  function select(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function onContinue() {
    if (!selected) return;
    if (isLast) {
      goToForm(answers);
    } else {
      setStep(step + 1);
    }
  }

  function onBack() {
    setStep(step - 1); // step 0 → STEP_IDLE
  }

  return (
    <div className="max-w-xl rounded-2xl border border-border bg-surface p-5 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.08),0_20px_40px_-12px_rgba(10,10,10,0.18)] md:p-6">
      <div className="flex items-center justify-between">
        <p className="text-eyebrow font-medium uppercase tracking-[0.1em] text-text-muted">
          Step {step + 1} of {total}
        </p>
        <button
          type="button"
          onClick={() => goToForm(answers)}
          className="text-caption text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary"
        >
          Skip to the form
        </button>
      </div>

      {/* Real radio-group: fieldset + legend, arrow-key navigable. */}
      <fieldset className="mt-4">
        <legend className="font-[family-name:var(--font-fraunces)] text-h3 font-semibold text-text-primary">
          {question.prompt}
        </legend>
        <div className="mt-4 flex flex-col gap-2.5">
          {question.options.map((option) => {
            const checked = selected === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-body transition-colors',
                  checked
                    ? 'border-accent bg-accent/5 text-text-primary'
                    : 'border-border bg-surface text-text-primary hover:border-text-muted'
                )}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={checked}
                  onChange={() => select(option.value)}
                  className="h-4 w-4 shrink-0 accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-body text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary"
        >
          Back
        </button>
        <Button type="button" size="md" disabled={!selected} onClick={onContinue}>
          {isLast ? 'See my demo →' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
