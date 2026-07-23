import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { trackEvent, trackOpenAiAppointment } from '@/lib/analytics';

export default function BookCall() {
  useEffect(() => {
    trackEvent('book_call', {
      form_location: '/book-call',
    });
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'ai-visibility-strategy-call' });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#0F5FDB' },
          dark: { 'cal-brand': '#fafafa' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });

      // Fire the OpenAI (ChatGPT Ads) conversion only on a completed booking,
      // plus a GA4 event, rather than on page view.
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          trackOpenAiAppointment();
          trackEvent('appointment_scheduled', { form_location: '/book-call' });
        },
      });
    })();
  }, []);

  return (
    <PageLayout
      title="Schedule Your AI Visibility Strategy Call | Found For AI"
      description="Book a free AI Visibility Strategy Call with Found For AI. We'll review your AI search presence and scope a custom engagement that fits your business."
      canonical="https://foundforai.com/book-call"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/services">
              <Button variant="ghost" className="gap-2 mb-4" data-testid="button-back-services">
                <ArrowLeft className="h-4 w-4" />
                Back to Services
              </Button>
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Schedule Your Strategy Call
            </h1>
            <p className="text-lg text-muted-foreground">
              Pick a time that works for you. We'll walk through your current AI visibility, scope what your business needs, and map out next steps.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div style={{ width: '100%', height: '750px' }} data-testid="cal-embed-container">
                <Cal
                  namespace="ai-visibility-strategy-call"
                  calLink="foundforai/ai-visibility-strategy-call"
                  style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                  config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Email <a href="mailto:support@foundforai.com" className="text-primary hover:underline">support@foundforai.com</a>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
