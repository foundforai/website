import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ScorecardSection() {
  const scores = [
    { category: 'Schema', grade: 'A', color: 'bg-green-500', percentage: 95 },
    { category: 'AI Readiness', grade: 'B', color: 'bg-accent', percentage: 82 },
    { category: 'GEO', grade: 'A', color: 'bg-green-500', percentage: 90 },
    { category: 'Performance', grade: 'B', color: 'bg-accent', percentage: 78 },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Your AI Readiness Score</h2>
          <p className="text-lg text-muted-foreground">
            Get a comprehensive analysis of how AI can discover your website
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sample Scorecard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scores.map((score, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{score.category}</span>
                    <Badge variant="outline" className="text-lg font-bold px-4 py-1">
                      {score.grade}
                    </Badge>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${score.color} transition-all duration-500`}
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{score.percentage}% optimized</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
