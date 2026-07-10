import { z } from 'zod';
import { FORM_TYPES, SERVICE_INTERESTS } from './types';

// Only name + email are required (architecture.md §7 / Phase 5 C5.1) — every
// added required field costs leads. Optional fields validate only when
// present; the action strips empty strings before parsing, so '' never
// reaches these rules. Phone is deliberately loose: SA numbers arrive in many
// formats, and rejecting a lead over formatting is a worse outcome than an
// oddly-formatted cell in the sheet.
export const tapInSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please tell us your name — at least 2 characters.')
    .max(100, 'That name is a little long — 100 characters max.'),
  email: z.email('That email doesn’t look right — mind checking it?'),
  company: z.string().trim().max(100, '100 characters max.').optional(),
  phone: z.string().trim().max(20, '20 characters max.').optional(),
  serviceInterest: z.enum(SERVICE_INTERESTS).optional(),
  message: z.string().trim().max(1000, '1,000 characters max — save the rest for the call.').optional(),
  formType: z.enum(FORM_TYPES),
  sourcePage: z.string().max(200).catch('/tap-in'),
  buildSelections: z.string().max(2000).optional(),
  demoAnswers: z.string().max(500).optional(),
});

export type TapInInput = z.infer<typeof tapInSchema>;
