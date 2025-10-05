import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, MapPin, Zap } from 'lucide-react';

export default function ValueCards() {
  const values = [
    {
      icon: Database,
      title: 'Schema',
      description: 'Structured data markup that tells AI exactly who you are, what you offer, and how to contact you. Essential for ChatGPT and Perplexity visibility.',
    },
    {
      icon: MapPin,
      title: 'GEO',
      description: 'Geographic optimization ensures AI assistants surface your business when users search for local services in your area. Critical for local discovery.',
    },
    {
      icon: Zap,
      title: 'AI Readiness',
      description: 'Clear content structure, semantic HTML, and FAQ formatting that AI models can parse and understand. The foundation of AI discoverability.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="hover-elevate transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
