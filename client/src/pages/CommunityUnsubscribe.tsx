import { useState } from 'react';
import { useSearch } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';

export default function CommunityUnsubscribe() {
  const search = useSearch();
  const token = new URLSearchParams(search).get('token') || '';
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function withdraw() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/community/consents/withdraw', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = (await response.json()) as { error?: string; type?: string };
      if (!response.ok) {
        setError(data.error || 'This link could not be used.');
        return;
      }
      const label = data.type === 'marketing'
        ? 'Marketing email consent is withdrawn.'
        : data.type === 'workshop_communication'
          ? 'Workshop email consent is withdrawn.'
          : 'Consent is withdrawn.';
      setMessage(label);
    } catch {
      setError('This link could not be used.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout
      title="Withdraw consent | Found For AI"
      description="Withdraw workshop or marketing email consent."
      noindex
      canonical="https://foundforai.com/community/unsubscribe"
    >
      <section className="py-16">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight">Withdraw consent</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            This link updates one consent record. Workshop email and marketing email are stored separately.
          </p>
          {!token ? <p className="mt-6 text-sm">This page needs the token from your registration confirmation.</p> : null}
          {message ? <p className="mt-6" role="status">{message}</p> : null}
          {error ? <p className="mt-6 text-sm text-red-700" role="alert">{error}</p> : null}
          {token && !message ? (
            <Button className="mt-6" disabled={loading} onClick={withdraw}>
              {loading ? 'Saving...' : 'Withdraw this consent'}
            </Button>
          ) : null}
        </div>
      </section>
    </PageLayout>
  );
}
