import { FormEvent, useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Snapshot = {
  metrics: Record<string, number>;
  events: Array<{ id: string; title: string; timing: string; hostLabel: string; dateLabel: string }>;
  contacts: Array<{ id: string; name: string; email: string; businessName: string | null; sourceBrand: string }>;
  registrations: Array<{ id: string; contactId: string; eventId: string; sourceBrand: string }>;
  attendance: Array<{ registrationId: string; status: string }>;
  opportunities: Array<{ id: string; title: string; originatingBrand: string; status: string; kind: string }>;
  hostingRequests: Array<{ id: string; name: string; email: string; sourceBrand: string; message: string }>;
  assessmentRequests: Array<{ id: string; name: string; email: string; originatingBrand: string }>;
  impactSummary: string;
};

const METRICS: Array<[keyof Snapshot['metrics'], string, string]> = [
  ['upcomingWorkshops', 'Upcoming workshops', 'Workshops whose end time is still in the future.'],
  ['registrations', 'Registrations', 'Saved workshop registrations.'],
  ['attendance', 'Attendance', 'Registrations marked attended.'],
  ['businessesAssisted', 'Businesses assisted', 'Unique business names on attended registrations.'],
  ['partnerConversations', 'Partner conversations', 'Partner records with status conversation.'],
  ['feedback', 'Feedback notes', 'Notes recorded in the dashboard.'],
  ['outcomes', 'Outcome notes', 'Notes recorded in the dashboard.'],
  ['assessmentInquiries', 'Assessment inquiries', 'Logged assessment requests. Not inferred from workshop signups.'],
  ['foundforaiInquiries', 'FoundForAI inquiries', 'Commercial inquiry records originating with FoundForAI.'],
  ['fripseInquiries', 'Fripse inquiries', 'Commercial inquiry records originating with Fripse AI.'],
  ['qualifiedOpportunities', 'Qualified opportunities', 'Commercial records marked qualified.'],
  ['proposals', 'Proposals', 'Commercial records marked proposal.'],
  ['projectsWon', 'Projects won', 'Commercial records marked won.'],
];

export default function AdminCommunity() {
  const [key, setKey] = useState('');
  const [draftKey, setDraftKey] = useState('');
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function load(adminKey: string) {
    setError('');
    const response = await fetch('/api/community/admin/snapshot', { headers: { 'x-admin-key': adminKey } });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'Could not load the dashboard.');
      setSnapshot(null);
      return;
    }
    setSnapshot(data);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('community-admin-key') || '';
    if (!saved) return;
    setKey(saved);
    void load(saved);
  }, []);

  async function unlock(event: FormEvent) {
    event.preventDefault();
    sessionStorage.setItem('community-admin-key', draftKey);
    setKey(draftKey);
    await load(draftKey);
  }

  async function post(path: string, body: unknown) {
    setNotice('');
    setError('');
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'Save failed.');
      return;
    }
    setNotice('Saved.');
    await load(key);
  }

  return (
    <PageLayout
      title="Community dashboard | Found For AI"
      description="Private community and commercial dashboard."
      noindex
      canonical="https://foundforai.com/admin/community"
    >
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Community dashboard</h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Counts come from records in the community store. Workshop participation is separate from commercial opportunities.
          </p>
          {!key || !snapshot ? (
            <form onSubmit={unlock} className="mt-8 max-w-md space-y-3">
              <Label htmlFor="admin-key">Admin key</Label>
              <Input id="admin-key" type="password" value={draftKey} onChange={(event) => setDraftKey(event.target.value)} autoComplete="current-password" />
              {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
              <Button type="submit">Open dashboard</Button>
            </form>
          ) : (
            <div className="mt-8 space-y-12">
              {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
              {notice ? <p className="text-sm" role="status">{notice}</p> : null}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {METRICS.map(([id, label, help]) => (
                  <article key={id} className="rounded-lg border p-4">
                    <div className="text-3xl font-bold">{snapshot.metrics[id] ?? 0}</div>
                    <h2 className="mt-1 font-semibold">{label}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{help}</p>
                  </article>
                ))}
              </div>

              <section>
                <h2 className="text-2xl font-bold">Events</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {snapshot.events.map((event) => (
                    <li key={event.id} className="rounded-md border p-3">
                      <span className="font-semibold">{event.title}</span>
                      <span className="text-muted-foreground"> · {event.timing} · {event.hostLabel} · {event.dateLabel}</span>
                    </li>
                  ))}
                </ul>
                <EventForm onSave={(body) => post('/api/community/admin/events', body)} />
              </section>

              <section>
                <h2 className="text-2xl font-bold">Registrations and attendance</h2>
                <ul className="mt-4 space-y-3">
                  {snapshot.registrations.map((registration) => {
                    const contact = snapshot.contacts.find((item) => item.id === registration.contactId);
                    const attendance = snapshot.attendance.find((item) => item.registrationId === registration.id);
                    return (
                      <li key={registration.id} className="rounded-md border p-3 text-sm">
                        <div>{contact?.name} · {contact?.email} · {contact?.businessName || 'No business name'}</div>
                        <div className="text-muted-foreground">{registration.eventId} · {registration.sourceBrand}</div>
                        <label className="mt-2 block">
                          Attendance
                          <select
                            className="mt-1 block rounded-md border px-2 py-1"
                            value={attendance?.status || 'unknown'}
                            onChange={(event) => post('/api/community/admin/attendance', {
                              registrationId: registration.id,
                              status: event.target.value,
                            })}
                          >
                            <option value="unknown">Unknown</option>
                            <option value="attended">Attended</option>
                            <option value="no_show">No show</option>
                          </select>
                        </label>
                        <label className="mt-2 block">
                          Follow-up
                          <select
                            className="mt-1 block rounded-md border px-2 py-1"
                            defaultValue="none"
                            onChange={(event) => post('/api/community/admin/follow-up', {
                              contactId: registration.contactId,
                              status: event.target.value,
                              note: '',
                            })}
                          >
                            <option value="none">None</option>
                            <option value="needed">Needed</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="done">Done</option>
                          </select>
                        </label>
                      </li>
                    );
                  })}
                  {snapshot.registrations.length === 0 ? <li className="text-sm text-muted-foreground">No registrations yet.</li> : null}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Commercial records</h2>
                <p className="mt-2 text-sm text-muted-foreground">These are not created when someone registers for a workshop.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {snapshot.opportunities.map((row) => (
                    <li key={row.id}>{row.title} · {row.originatingBrand} · {row.kind} · {row.status}</li>
                  ))}
                  {snapshot.assessmentRequests.map((row) => (
                    <li key={row.id}>Assessment: {row.name} · {row.email} · {row.originatingBrand}</li>
                  ))}
                </ul>
                <CommercialForm onSave={(body) => post('/api/community/admin/opportunities', body)} />
                <AssessmentForm onSave={(body) => post('/api/community/admin/assessments', body)} />
              </section>

              <section>
                <h2 className="text-2xl font-bold">Hosting requests</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {snapshot.hostingRequests.map((row) => (
                    <li key={row.id}>{row.name} · {row.email} · {row.sourceBrand}: {row.message}</li>
                  ))}
                  {snapshot.hostingRequests.length === 0 ? <li className="text-muted-foreground">No hosting requests yet.</li> : null}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Impact summary</h2>
                <pre className="mt-4 whitespace-pre-wrap rounded-lg border bg-muted/30 p-4 text-sm">{snapshot.impactSummary}</pre>
              </section>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

function EventForm({ onSave }: { onSave: (body: unknown) => Promise<void> }) {
  return (
    <form
      className="mt-6 grid gap-3 md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const capacity = String(form.get('capacity') || '');
        void onSave({
          id: String(form.get('id') || ''),
          title: String(form.get('title') || ''),
          description: String(form.get('description') || ''),
          hostBrand: String(form.get('hostBrand') || 'foundforai'),
          start: String(form.get('start') || ''),
          end: String(form.get('end') || ''),
          timeZone: 'America/Denver',
          venue: String(form.get('venue') || ''),
          onlineUrl: String(form.get('onlineUrl') || ''),
          capacity: capacity ? Number(capacity) : null,
          registrationStatus: String(form.get('registrationStatus') || 'closed'),
          topic: String(form.get('topic') || ''),
          instructor: String(form.get('instructor') || ''),
          image: String(form.get('image') || ''),
          registrationUrl: null,
        });
      }}
    >
      <Field name="id" label="Id" placeholder="salt-lake-chatgpt-2027" />
      <Field name="title" label="Title" />
      <label className="md:col-span-2 text-sm">
        Description
        <Textarea name="description" className="mt-1" />
      </label>
      <label className="text-sm">
        Host
        <select name="hostBrand" className="mt-1 block w-full rounded-md border px-2 py-2">
          <option value="foundforai">FoundForAI</option>
          <option value="fripse">Fripse AI</option>
        </select>
      </label>
      <label className="text-sm">
        Registration
        <select name="registrationStatus" className="mt-1 block w-full rounded-md border px-2 py-2">
          <option value="closed">Closed</option>
          <option value="open">Open</option>
        </select>
      </label>
      <Field name="start" label="Start (ISO, Denver offset)" placeholder="2027-04-16T10:00:00-06:00" />
      <Field name="end" label="End (ISO, Denver offset)" placeholder="2027-04-16T11:30:00-06:00" />
      <Field name="venue" label="Venue" />
      <Field name="onlineUrl" label="Online link" />
      <Field name="capacity" label="Capacity" />
      <Field name="topic" label="Topic" />
      <Field name="instructor" label="Instructor" />
      <Field name="image" label="Image URL" />
      <Button type="submit" className="md:col-span-2 w-fit">Save event</Button>
    </form>
  );
}

function CommercialForm({ onSave }: { onSave: (body: unknown) => Promise<void> }) {
  return (
    <form
      className="mt-4 grid gap-3 md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        void onSave({
          title: String(form.get('title') || ''),
          originatingBrand: String(form.get('originatingBrand') || 'foundforai'),
          kind: 'inquiry',
          status: String(form.get('status') || 'new'),
          notes: String(form.get('notes') || ''),
          contactEmail: String(form.get('contactEmail') || ''),
        });
        event.currentTarget.reset();
      }}
    >
      <Field name="title" label="Opportunity title" />
      <Field name="contactEmail" label="Contact email" />
      <label className="text-sm">
        Originating brand
        <select name="originatingBrand" className="mt-1 block w-full rounded-md border px-2 py-2">
          <option value="foundforai">FoundForAI</option>
          <option value="fripse">Fripse AI</option>
        </select>
      </label>
      <label className="text-sm">
        Status
        <select name="status" className="mt-1 block w-full rounded-md border px-2 py-2">
          <option value="new">New</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </label>
      <label className="md:col-span-2 text-sm">
        Notes
        <Textarea name="notes" className="mt-1" />
      </label>
      <Button type="submit" className="w-fit">Save commercial record</Button>
    </form>
  );
}

function AssessmentForm({ onSave }: { onSave: (body: unknown) => Promise<void> }) {
  return (
    <form
      className="mt-6 grid gap-3 md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        void onSave({
          name: String(form.get('name') || ''),
          email: String(form.get('email') || ''),
          businessName: String(form.get('businessName') || ''),
          notes: String(form.get('notes') || ''),
          originatingBrand: String(form.get('originatingBrand') || 'fripse'),
        });
        event.currentTarget.reset();
      }}
    >
      <Field name="name" label="Assessment inquiry name" />
      <Field name="email" label="Email" />
      <Field name="businessName" label="Business" />
      <label className="text-sm">
        Originating brand
        <select name="originatingBrand" className="mt-1 block w-full rounded-md border px-2 py-2">
          <option value="fripse">Fripse AI</option>
          <option value="foundforai">FoundForAI</option>
        </select>
      </label>
      <label className="md:col-span-2 text-sm">
        Notes
        <Textarea name="notes" className="mt-1" />
      </label>
      <Button type="submit" variant="outline" className="w-fit">Log assessment inquiry</Button>
    </form>
  );
}

function Field({ name, label, placeholder }: { name: string; label: string; placeholder?: string }) {
  return (
    <label className="text-sm">
      {label}
      <Input name={name} placeholder={placeholder} className="mt-1" />
    </label>
  );
}
