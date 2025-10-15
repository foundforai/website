import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Calendar, Mail } from 'lucide-react';

export default function PurchaseConfirmation() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout
      title="Thank You - Purchase Confirmed | Found For AI"
      description="Thank you for your purchase! Book your onboarding call to get started with your AI Visibility Starter Fix."
      canonical="https://foundforai.com/purchase-complete"
    >
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#007CFF', '#00BFFF', '#FFD700', '#FF69B4', '#32CD32'][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5 min-h-[80vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-500/10 text-green-500 mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎉 Thank You For Your Purchase!
            </h1>
            <p className="text-xl text-muted-foreground">
              We're excited to get started on your <strong className="text-foreground">AI Visibility Starter Fix</strong>.
            </p>
          </div>

          <Card className="mb-8 shadow-xl">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Next Step: Book Your Onboarding Call</h3>
                  <p className="text-muted-foreground mb-4">
                    Schedule your starter fix call so we can review your site and gather the info we need to optimize your AI visibility.
                  </p>
                  <a 
                    href="https://calendar.app.google/n5c9BSGWMsTnrStj6" 
                    target="_blank" 
                    rel="noopener"
                    data-testid="link-book-call"
                  >
                    <Button size="lg" className="font-semibold group">
                      Book My Starter Fix Call →
                    </Button>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Confirmation Email</h3>
                  <p className="text-muted-foreground">
                    We'll confirm everything by email within 24 hours. Check your inbox for your order details and next steps.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Questions? Email us at <a href="mailto:info@foundforai.com" className="text-primary hover:underline">info@foundforai.com</a>
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti-fall 3s linear forwards;
          opacity: 0;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out 3;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </PageLayout>
  );
}
