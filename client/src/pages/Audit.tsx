import { useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export default function Audit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    websiteUrl: '',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with your actual Formspree endpoint
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/movklzvl';
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          websiteUrl: formData.websiteUrl,
          consent: formData.consent ? 'Yes' : 'No',
          _subject: 'New audit request from Found For AI website',
          _language: 'en',
        }),
      });

      if (response.ok) {
        // Track analytics if available
        if (typeof window !== 'undefined' && (window as any).analytics) {
          (window as any).analytics.push({
            event: 'audit-form-submitted',
            email: formData.email,
            domain: new URL(formData.websiteUrl).hostname,
          });
        }

        toast({
          title: 'Thanks - we will be in touch soon.',
          description: 'You will receive your AI Visibility Review shortly.',
        });
        
        // Redirect to thank you page
        setLocation('/thank-you');
      } else {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: 'Please email info@foundforai.com directly.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Submission failed. Please email info@foundforai.com.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      title="Free AI Visibility Review - See How AI Tools Understand Your Business | Found For AI"
      description="Request a free AI Visibility Review. Get a clear snapshot of how visible your business is to AI tools like ChatGPT and Perplexity."
      canonical="https://foundforai.com/audit"
    >
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Your Free AI Visibility Review
            </h1>
            <p className="text-lg text-muted-foreground">
              Get a clear snapshot of how visible your business is to AI tools.
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Request Your Review</CardTitle>
              <CardDescription>
                We'll review how clearly AI tools can understand your business, what they're missing, and where visibility may be breaking down.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" acceptCharset="UTF-8">
                <input type="hidden" name="_honeypot" tabIndex={-1} autoComplete="off" />
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    data-testid="input-full-name"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL *</Label>
                  <Input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    required
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    data-testid="input-website-url"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                    data-testid="checkbox-consent"
                  />
                  <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer">
                    I consent to receive my AI Visibility Review and occasional insights by email.
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg font-semibold"
                  disabled={loading}
                  data-testid="button-submit-audit"
                >
                  {loading ? 'Sending...' : 'Get My Free AI Visibility Review'}
                </Button>
              </form>

            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}
