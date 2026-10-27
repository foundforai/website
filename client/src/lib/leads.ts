/**
 * Existing public lead form used by /audit, /contact, and the playbook.
 * This is not a new mailer. Formspree receives the submission.
 */
export const LEAD_FORM_ENDPOINT = 'https://formspree.io/f/mpqwvlnz';

export async function submitLead(fields: Record<string, string>): Promise<boolean> {
  const response = await fetch(LEAD_FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _language: 'en',
      ...fields,
    }),
  });
  return response.ok;
}
