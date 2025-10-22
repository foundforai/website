import { useState, FormEvent } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface FormData {
  name: string;
  email: string;
  url: string;
  priority: 'learn' | 'soon' | 'now';
}

interface ScoreResult {
  score: number;
  findings: string[];
}

export default function ReadinessReport() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    url: '',
    priority: 'learn'
  });
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getFindings(score: number): string[] {
    if (score < 70) {
      return [
        "Missing or incomplete structured data (JSON-LD).",
        "Inconsistent metadata or sitemap not detected."
      ];
    } else if (score < 85) {
      return [
        "Basic schema detected, but entities may be unclear.",
        "Opportunity to improve answer-ready content."
      ];
    } else {
      return [
        "Solid baseline. Next step: entity tightening & AEO content.",
        "Consider Pro plan for topic clusters + reporting."
      ];
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiRequest('POST', '/api/readiness-report', formData);

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Submission failed');
      }

      const score = data.score;
      const findings = getFindings(score);

      setResult({ score, findings });

      // Analytics event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_submit',
          form: 'readiness_report',
          priority: formData.priority
        });
      }

      toast({
        title: "Check complete!",
        description: data.message,
      });

      // Smooth scroll to result
      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageLayout
      title="Free AI Visibility Check | Found For AI"
      description="Run a free AI visibility check. See how AI assistants read your site, then get a clear plan to fix issues."
      canonical="https://foundforai.com/readiness-report"
    >
      {/* Hero Section */}
      <section className="hero hero--brand" style={{ textAlign: 'center', padding: '48px 16px' }}>
        <h1>Free AI Visibility Check</h1>
        <p>Tell us where to look. We'll run a quick read of your site's AI-readiness and show a lite score instantly.</p>
      </section>

      {/* Form & Result Section */}
      <section className="content" style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px 32px' }}>
        <Card style={{ padding: '24px', borderRadius: '12px' }}>
          <form onSubmit={handleSubmit} data-testid="form-readiness-check">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="input-name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  data-testid="input-email"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  required
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  data-testid="input-url"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as 'learn' | 'soon' | 'now' })}
                >
                  <SelectTrigger id="priority" data-testid="select-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learn">Just exploring</SelectItem>
                    <SelectItem value="soon">Need this soon</SelectItem>
                    <SelectItem value="now">Ready to buy now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6" 
              disabled={isSubmitting}
              data-testid="button-submit-check"
            >
              {isSubmitting ? 'Running Check...' : 'Run Free Check →'}
            </Button>

            <p className="text-sm text-muted-foreground text-center mt-4">
              We'll email your full results and next steps. No spam.
            </p>
          </form>
        </Card>

        {/* Results Card */}
        {result && (
          <Card 
            id="result" 
            className="mt-6" 
            style={{ padding: '24px', borderRadius: '12px', background: 'hsl(var(--muted) / 0.3)' }}
            data-testid="result-card"
          >
            <h2 style={{ marginTop: 0 }}>
              Your Lite AI Visibility Score: <span className="text-primary" data-testid="text-score">{result.score}/100</span>
            </h2>
            <ul style={{ lineHeight: '1.7', margin: '12px 0 0 18px' }} data-testid="list-findings">
              {result.findings.map((finding, idx) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
            <div className="cta-row" style={{ marginTop: '24px' }}>
              <a 
                href="https://square.link/u/o25cVCY4" 
                target="_blank" 
                rel="noopener" 
                className="btn primary"
                data-testid="button-buy-starter-result"
              >
                Buy Starter Fix – $495 →
              </a>
              <a 
                href="/pricing" 
                className="btn ghost"
                data-testid="button-see-included"
              >
                See What's Included →
              </a>
            </div>
          </Card>
        )}
      </section>
    </PageLayout>
  );
}
