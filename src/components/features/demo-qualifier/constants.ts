// Demo qualifier questions (v3.4 G3) — tap-only, single-select, crucial info
// only. Two questions; a third (industry) was left out deliberately to keep
// the flow feeling like ~15 seconds, per G3's "two may be enough."
//
// This is the single source of truth for BOTH the qualifier UI and the
// /tap-in resolver that turns the answers back into a readable lead note, so
// the option values in the URL always map to the same labels. Each option
// `value` is what travels in the query string (keyed by question `id`).

export type DemoOption = { value: string; label: string };

export type DemoQuestion = {
  id: string;
  // Prompt shown in the qualifier step.
  prompt: string;
  // Compact label used when reflecting the answer back into the lead note.
  shortLabel: string;
  options: DemoOption[];
};

export const DEMO_QUESTIONS: readonly DemoQuestion[] = [
  {
    id: 'situation',
    prompt: 'Where are you starting from?',
    shortLabel: 'Current situation',
    options: [
      { value: 'none', label: 'No website yet' },
      { value: 'outdated', label: "Have one, it's outdated" },
      { value: 'enquiries', label: 'Have one, want more enquiries' },
    ],
  },
  {
    id: 'goal',
    prompt: "What's the main goal?",
    shortLabel: 'Main goal',
    options: [
      { value: 'professional', label: 'Look more professional' },
      { value: 'enquiries', label: 'Get more enquiries' },
      { value: 'sell', label: 'Sell online' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
] as const;

// Reflection sentence shown above the tap-in form, keyed on the first answer
// (situation) only — a deliberately simple one-dimensional map per G3 ("skip
// personalization if it adds real complexity"). Falls back to a neutral line
// when situation wasn't answered (skip-partway).
const REFLECTION_BY_SITUATION: Record<string, string> = {
  none: "Great — let's get your business online with a site that actually brings in enquiries.",
  outdated: "Great — let's turn that outdated site into one that brings in enquiries.",
  enquiries: "Great — let's get your site pulling in more enquiries.",
};
const DEFAULT_REFLECTION = "Great — let's get your free demo underway.";

type QueryValue = string | string[] | undefined;

// Server-side resolver used by the /tap-in page: turns the qualifier's query
// params back into a human-readable lead note (for the hidden demoAnswers
// field the owner reads in the sheet) plus a reflection line for the form
// header. Returns null when no answers are present so the page renders its
// default copy. Tolerant of partial answers (skip-partway).
export function resolveDemoAnswers(
  params: Record<string, QueryValue>
): { readable: string; reflection: string } | null {
  const picks = DEMO_QUESTIONS.map((question) => {
    const raw = params[question.id];
    const value = typeof raw === 'string' ? raw : undefined;
    const option = question.options.find((o) => o.value === value);
    return option ? { question, option } : null;
  }).filter((p): p is { question: DemoQuestion; option: DemoOption } => p !== null);

  if (picks.length === 0) return null;

  const readable = picks.map((p) => `${p.question.shortLabel}: ${p.option.label}`).join(' · ');
  const situation = typeof params.situation === 'string' ? params.situation : '';
  const reflection = REFLECTION_BY_SITUATION[situation] ?? DEFAULT_REFLECTION;

  return { readable, reflection };
}
