import { useRoute } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Badge } from '@/components/ui/badge';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug || '';

  //TODO: remove mock functionality - replace with actual markdown parsing
  const posts: Record<string, any> = {
    'what-is-schema-markup': {
      title: 'What Is Schema Markup And Why It Matters For AI Search',
      date: '2025-01-15',
      author: 'Dustin Crump',
      content: `
        <p>Schema markup is structured data that you add to your website to help search engines and AI understand your content. Think of it as labels and context that explain what your website is about, who you are, and what you offer.</p>

        <h2>Why Schema Matters for AI</h2>
        <p>AI models like ChatGPT, Perplexity, and Google's AI Overviews don't read your website the way humans do. They look for structured, machine-readable data to understand:</p>
        <ul>
          <li>Your business name, location, and contact information</li>
          <li>The services or products you offer</li>
          <li>Customer reviews and ratings</li>
          <li>Frequently asked questions</li>
          <li>Article content and authorship</li>
        </ul>

        <h2>The Most Important Schema Types</h2>
        <p>For most businesses, these schema types deliver the biggest impact:</p>
        <ul>
          <li><strong>LocalBusiness</strong> - Essential for any business with a physical location</li>
          <li><strong>Service</strong> - Describes what you offer and pricing</li>
          <li><strong>FAQPage</strong> - Helps AI answer user questions directly</li>
          <li><strong>Article</strong> - For blog posts and content marketing</li>
        </ul>

        <h2>How to Implement Schema</h2>
        <p>Schema is added to your website as JSON-LD code in the page head. While you can implement it manually, it's easy to make mistakes. Found For AI provides ready-to-use code snippets tailored to your business in every Pro Audit.</p>

        <h2>Real Results</h2>
        <p>Websites with proper schema markup are significantly more likely to appear in AI-generated answers. When ChatGPT or Perplexity recommends businesses, they pull from structured data first.</p>

        <p>Ready to see how your schema stacks up? <a href="/audit" class="text-primary hover:underline">Get your free AI Readiness Audit</a>.</p>
      `,
    },
    'how-to-make-website-ai-discoverable': {
      title: 'How To Make Your Website AI Discoverable',
      date: '2025-01-10',
      author: 'Dustin Crump',
      content: `
        <p>AI search is fundamentally different from traditional search. When someone asks ChatGPT or Perplexity for recommendations, the AI scans the web for structured, clear information. Here's how to ensure your business shows up.</p>

        <h2>Step 1: Add Schema Markup</h2>
        <p>Schema markup is the foundation of AI discoverability. At minimum, implement LocalBusiness schema with your NAP (Name, Address, Phone), Service schema describing what you offer, and FAQPage schema for common questions.</p>

        <h2>Step 2: Structure Your Content Clearly</h2>
        <p>AI models prefer well-organized content with semantic HTML. Use:</p>
        <ul>
          <li>Proper heading hierarchy (H1, H2, H3)</li>
          <li>Short, factual paragraphs</li>
          <li>Lists and tables for comparisons</li>
          <li>Clear answers to common questions</li>
        </ul>

        <h2>Step 3: Optimize Your GEO Data</h2>
        <p>If you're a local business, ensure your geographic information is consistent and complete. This includes accurate coordinates, area served, opening hours, and a verified Google Business Profile.</p>

        <h2>Step 4: Create an FAQ Section</h2>
        <p>FAQs are gold for AI search. They directly answer user questions in a format AI can easily parse and present. Focus on real questions your customers ask.</p>

        <h2>Step 5: Test and Monitor</h2>
        <p>Ask ChatGPT, Perplexity, and Google AI questions related to your services in your area. Do you appear? If not, there's work to do.</p>

        <h2>Get Expert Help</h2>
        <p>Optimizing for AI search requires technical implementation and content restructuring. Found For AI provides a complete roadmap in every audit, plus done-for-you implementation if you need it.</p>

        <p><a href="/audit" class="text-primary hover:underline">Request your free AI Readiness Audit</a> to discover exactly what's holding you back from AI discovery.</p>
      `,
    },
  };

  const post = posts[slug];

  if (!post) {
    return (
      <PageLayout
        title="Post Not Found | Found For AI Blog"
        description="This blog post could not be found."
        canonical={`https://foundforai.com/blog/${slug}`}
      >
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">This blog post doesn't exist.</p>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`${post.title} | Found For AI Blog`}
      description={post.content.substring(0, 160)}
      canonical={`https://foundforai.com/blog/${slug}`}
    >
      <article className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Badge>
              <span className="text-sm text-muted-foreground">by {post.author}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
          </header>

          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:text-muted-foreground prose-li:my-1 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </PageLayout>
  );
}
