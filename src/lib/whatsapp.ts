// WhatsApp deep links with per-context pre-filled messages (C5.1). In the SA
// market this is expected to be the highest-converting contact path.
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

export function whatsappLink(context: WhatsAppContext = 'default'): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGES[context])}`;
}
