// WhatsApp deep links with per-context pre-filled messages (C5.1). In the SA
// market this is expected to be the highest-converting contact path.
import { formatRand } from './currency';

export type WhatsAppContext = 'default' | 'demo' | 'build-my-system';

const MESSAGES: Record<WhatsAppContext, string> = {
  default: "Hi PAR5 — I'd like to find out more about working with you.",
  demo: "Hi PAR5 — I'd like to claim my free demo website.",
  'build-my-system': "Hi PAR5 — I've put together a system on your site and want to talk it through.",
};

// Falls back to the number specced in the Phase 5 env checklist so links keep
// working before the env var is configured — confirm with the owner that this
// is the number that should receive leads.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '27760546197';

function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function whatsappLink(context: WhatsAppContext = 'default'): string {
  return waLink(MESSAGES[context]);
}

// ---- Build My System cart message (C5.4 extension, on-device review fix) ----
// The review page's WhatsApp CTA used to send only the generic line above; the
// selections never made it into the conversation. This variant carries the
// actual cart: one line per service with from-prices, a totals line, and the
// site URL last as a fallback reference.

// Structural mirror of the Build My System Service/totals shapes — kept local
// so this lib doesn't import from a component folder.
export type WhatsAppCartItem = {
  name: string;
  implementationCost: { min: number };
  monthlyCost: { min: number };
  pricingPending?: boolean;
};

export type WhatsAppCartTotals = {
  implementationMin: number;
  monthlyMin: number;
};

// Raw-character budget for the whole message. wa.me tolerates long text, but
// very long URLs get truncated by some Android intent handlers and chat apps
// that re-linkify them — ~700 raw chars encodes to well under 2,000 URL
// chars, the widely-safe ceiling.
const MAX_MESSAGE_CHARS = 700;

function priceParts(item: WhatsAppCartItem): string {
  const impl = item.implementationCost.min;
  const monthly = item.monthlyCost.min;
  if (item.pricingPending || (impl === 0 && monthly === 0)) return 'pricing TBC';
  const parts: string[] = [];
  if (impl > 0) parts.push(`${formatRand(impl)}+ build`);
  if (monthly > 0) parts.push(`${formatRand(monthly)}+/mo`);
  return parts.join(', ');
}

export function buildSystemWhatsappLink(
  items: WhatsAppCartItem[],
  totals: WhatsAppCartTotals,
  siteUrl?: string
): string {
  const header =
    "Hi PAR5 — I've put together a system on your site and want to talk it through:";

  const totalParts: string[] = [];
  if (totals.implementationMin > 0)
    totalParts.push(`${formatRand(totals.implementationMin)}+ build`);
  if (totals.monthlyMin > 0) totalParts.push(`${formatRand(totals.monthlyMin)}+/mo`);
  const totalLine = totalParts.length > 0 ? `Total: ${totalParts.join(', ')}` : '';

  // Everything that must always survive truncation: header, totals, link.
  const fixedLines = [header, totalLine, siteUrl ?? ''].filter(Boolean);
  const fixedLength = fixedLines.reduce((n, l) => n + l.length + 1, 0);

  // Greedily include item lines until the budget would overflow, reserving
  // room for the "+ N more" marker whenever anything is left out.
  const itemLines: string[] = [];
  let used = fixedLength;
  let included = 0;
  for (const item of items) {
    const line = `- ${item.name} (${priceParts(item)})`;
    const remaining = items.length - included - 1;
    const reserve = remaining > 0 ? `+ ${remaining} more`.length + 1 : 0;
    if (used + line.length + 1 + reserve > MAX_MESSAGE_CHARS) break;
    itemLines.push(line);
    used += line.length + 1;
    included++;
  }
  if (included < items.length) itemLines.push(`+ ${items.length - included} more`);

  const message = [header, ...itemLines, totalLine, siteUrl ?? '']
    .filter(Boolean)
    .join('\n');
  return waLink(message);
}
