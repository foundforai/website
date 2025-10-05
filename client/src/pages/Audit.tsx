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
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // TODO: Implement analytics tracking
        if (typeof window !== 'undefined' && (window as any).analytics) {
          (window as any).analytics.push({
            event: 'audit-form-submitted',
            email: formData.email,
            domain: new URL(formData.websiteUrl).hostname,
          });
        }

        toast({
          title: 'Audit Request Submitted!',
          description: data.message,
        });
        setLocation('/thank-you');
      } else {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: data.message || 'Please check your information and try again.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      title="Free AI Readiness Audit - Get Your Website Scorecard | Found For AI"
      description="Request a free AI SEO audit. Get a personalized scorecard analyzing your schema markup, GEO optimization, and AI discoverability within 24 hours."
      canonical="https://foundforai.com/audit"
    >
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Your Free AI Readiness Audit
            </h1>
            <p className="text-lg text-muted-foreground">
              Receive a personalized AI Readiness Scorecard within 24 hours
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Request Your Audit</CardTitle>
              <CardDescription>
                We'll analyze your website's schema, GEO data, and content structure to show you exactly how AI-ready you are.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
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
                    required
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                    data-testid="checkbox-consent"
                  />
                  <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer">
                    I consent to receive my AI Readiness Scorecard and occasional AI SEO insights via email.
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg font-semibold"
                  disabled={loading}
                  data-testid="button-submit-audit"
                >
                  {loading ? 'Submitting...' : 'Get My Free Scorecard'}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t">
                <p className="text-sm text-muted-foreground text-center mb-3">
                  Need results faster?
                </p>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="font-semibold mb-1">Priority Audit - $49</p>
                  <p className="text-sm text-muted-foreground">
                    Get your scorecard in 1 hour with actionable recommendations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}
