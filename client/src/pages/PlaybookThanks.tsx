import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';

export default function PlaybookThanks() {
  return (
    <PageLayout
      title="Your Playbook Is Ready | Found For AI"
      description="Download your AI Readability Playbook instantly."
      canonical="https://foundforai.com/playbook/thanks"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your playbook is ready
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Click below to download instantly, we also emailed you a copy.
          </p>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-4">
              <a
                href="https://foundforai.com/found-for-ai-readability-playbook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-playbook-download"
              >
                <Button
                  size="lg"
                  className="w-full font-semibold group"
                  style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download the playbook
                </Button>
              </a>

              <a
                href="https://foundforai.com/talk-to-a-human"
                data-testid="link-playbook-thanks-talk"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full font-semibold group mt-3"
                >
                  Talk to a human
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <p className="text-xs text-muted-foreground pt-4">
                If the download doesn't start, refresh in a minute. We're updating the file.
              </p>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground mt-8">
            Next step: If you want this installed fast and correctly, ask about the AI Visibility Tune-Up.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
