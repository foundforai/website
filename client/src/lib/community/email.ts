import type { PublicEvent } from './types.ts';

export type RegistrationEmail = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

/**
 * Confirmation copy. Delivery stays off unless COMMUNITY_EMAIL_ENABLED=true
 * AND a provider is later configured. This function never opens a network
 * connection.
 */
export function buildRegistrationEmail(input: {
  to: string;
  name: string;
  event: PublicEvent;
  marketingConsent: boolean;
  workshopWithdrawUrl: string;
  marketingWithdrawUrl: string;
}): RegistrationEmail {
  const marketingLine = input.marketingConsent
    ? 'You also opted in to occasional marketing emails. That choice is separate from workshop email.'
    : 'You did not opt in to marketing emails. You will not be added to a marketing list.';
  const text = [
    `Hello ${input.name},`,
    '',
    `We received your registration for ${input.event.title}.`,
    `${input.event.hostLabel}.`,
    `${input.event.dateLabel}, ${input.event.timeLabel}.`,
    input.event.venue ? `Where: ${input.event.venue}` : '',
    input.event.onlineUrl ? `Online: ${input.event.onlineUrl}` : '',
    '',
    'You agreed to receive email about this workshop.',
    marketingLine,
    '',
    `Withdraw workshop email consent: ${input.workshopWithdrawUrl}`,
    `Withdraw marketing consent: ${input.marketingWithdrawUrl}`,
    '',
    'Found For AI and Fripse AI are sister companies. This message is about the workshop you chose.',
  ]
    .filter((line) => line !== '')
    .join('\n');

  const html = `<p>Hello ${escapeHtml(input.name)},</p>
<p>We received your registration for <strong>${escapeHtml(input.event.title)}</strong>.</p>
<p>${escapeHtml(input.event.hostLabel)}.<br>${escapeHtml(input.event.dateLabel)}, ${escapeHtml(input.event.timeLabel)}.</p>
<p>${escapeHtml(marketingLine)}</p>
<p><a href="${escapeAttr(input.workshopWithdrawUrl)}">Withdraw workshop email consent</a><br>
<a href="${escapeAttr(input.marketingWithdrawUrl)}">Withdraw marketing consent</a></p>`;

  return {
    to: input.to,
    subject: `Registration received: ${input.event.title}`,
    text,
    html,
  };
}

export type EmailDeliveryResult = {
  sent: false;
  reason: 'disabled' | 'no_provider_configured';
  message: RegistrationEmail;
};

export async function deliverRegistrationEmail(message: RegistrationEmail): Promise<EmailDeliveryResult> {
  if (process.env.COMMUNITY_EMAIL_ENABLED !== 'true') {
    return { sent: false, reason: 'disabled', message };
  }
  return { sent: false, reason: 'no_provider_configured', message };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, '&#39;');
}
