import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function BlogIndex() {
  //TODO: remove mock functionality - replace with actual blog post data
  const posts = [
    {
      slug: 'what-is-schema-markup',
      title: 'What Is Schema Markup And Why It Matters For AI Search',
      date: '2025-01-15',
      author: 'Dustin Crump',
      excerpt: 'Learn how schema markup helps AI understand your website and why it\'s essential for being discovered by ChatGPT, Perplexity, and other AI search tools.',
    },
    {
      slug: 'how-to-make-website-ai-discoverable',
      title: 'How To Make Your Website AI Discoverable',
      date: '2025-01-10',
      author: 'Dustin Crump',
      excerpt: 'A step-by-step guide to optimizing your website for AI search engines. Implement schema, structure content, and ensure your business shows up in AI-powered answers.',
    },
  ];

  return (
    <PageLayout
      title="AI SEO Blog - Schema Markup, GEO, and AI Discoverability Guides | Found For AI"
      description="Expert insights on AI SEO, schema markup implementation, GEO optimization, and making your website discoverable by AI search engines like ChatGPT and Perplexity."
      canonical="https://foundforai.com/blog"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI SEO Insights
            </h1>
            <p className="text-lg text-muted-foreground">
              Practical guides for making your website AI-discoverable
            </p>
          </div>

          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="hover-elevate transition-all duration-200 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Badge>
                      <span className="text-sm text-muted-foreground">by {post.author}</span>
                    </div>
                    <CardTitle className="text-2xl group flex items-center justify-between">
                      {post.title}
                      <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </CardTitle>
                    <CardDescription className="text-base pt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
