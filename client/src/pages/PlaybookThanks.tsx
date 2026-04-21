import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';

export default function PlaybookThanks() {
  return (
    <PageLayout
      title="Your Playbook Is Ready | Found For AI"
      description="Download your AI Visibility Playbook instantly."
      canonical="https://foundforai.com/playbook/thanks"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your playbook is ready.
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Click below to download. We also sent a copy to your inbox.
          </p>

          <Card>
            <CardContent className="p-6 md:p-8">
              <a
                href="https://foundforai.com/found-for-ai-readability-playbook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-playbook-download"
              >
                <Button
                  size="lg"
                  className="w-full font-semibold"
                  style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download the playbook
                </Button>
              </a>
            </CardContent>
          </Card>

          <div className="mt-20 md:mt-24 text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Before you close this tab —
            </h2>
            <p className="text-muted-foreground mb-4">
              The playbook is a diagnostic. When most small business owners score themselves honestly, they can't confidently check off 8 to 12 of the 20 items. The gaps are almost always in the same three places: structured data, entity consistency, and AI crawl configuration. Technical stuff most websites were never built with.
            </p>
            <p className="text-muted-foreground mb-8">
              If that sounds like you and you don't want to learn how to fix it yourself, we built the AI Visibility Fix for exactly that situation. One flat fee. We do the work. Seven business days. Full audit report and a walkthrough video of everything we changed.
            </p>

            <a href="https://foundforai.com/talk-to-a-human#calendar" data-testid="link-playbook-thanks-book-call">
              <Button
                size="lg"
                className="font-semibold group"
                style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
              >
                Book a 15-minute call
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <p className="text-sm text-muted-foreground mt-6">
              Or{' '}
              <a
                href="/services"
                className="underline hover:text-foreground transition-colors"
                data-testid="link-playbook-thanks-services"
              >
                see what's included in the AI Visibility Fix →
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
