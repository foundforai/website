import { useRoute } from 'wouter';
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Badge } from '@/components/ui/badge';
import aiAutomationImg from '@assets/stock_images/ai_automation_workfl_1fb79544.jpg';
import aiSearchImg from '@assets/stock_images/artificial_intellige_8c98905d.jpg';
import schemaMarkupImg from '@assets/stock_images/schema_markup_struct_0763f9a1.jpg';
import websiteOptimizationImg from '@assets/stock_images/website_optimization_b4ff5bda.jpg';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug || '';

  //TODO: remove mock functionality - replace with actual markdown parsing
  const posts: Record<string, any> = {
    'missing-half-of-ai-seo-automation': {
      title: 'The Missing Half of AI SEO: Automating What Happens After You\'re Found',
      date: '2025-01-25',
      author: 'Dustin Crump',
      metaDescription: 'Getting found by AI is only half the game. The other half is what happens after—the follow-up, the workflow, the automation. That\'s where Fripse AI comes in.',
      hasMentions: true,
      image: aiAutomationImg,
      content: `
        <h2>Visibility Is Just Step One</h2>

        <p>Optimizing your website for AI search is crucial—but it's only the first step in the new digital landscape. Once an AI system finds you, the next question is:</p>

        <p><strong>What happens next?</strong></p>

        <p>If the customer asks a chatbot to contact you, book a service, or get a quote—does your system handle that smoothly, or does the lead vanish into an inbox?</p>

        <p>AI SEO gets you discovered. Automation keeps you connected.</p>

        <h2>The Invisible Gap Most Businesses Miss</h2>

        <p>Many websites are still built like billboards: they get seen, but they don't talk back. Today's customer expects instant replies, frictionless scheduling, and fast follow-ups—all powered by automation.</p>

        <p>Even if you're winning the AI SEO race, without automation, you're still leaking opportunity.</p>

        <h2>Enter Fripse AI</h2>

        <p>That's where <a href="https://fripse.com" target="_blank" rel="noopener" class="text-primary hover:underline">Fripse AI</a> comes in. They design the systems that take over once visibility turns into interest—automating things like:</p>

        <ul>
          <li>Lead follow-up sequences</li>
          <li>Scheduling and reminders</li>
          <li>Workflow routing</li>
          <li>Client communication templates</li>
          <li>CRM integrations</li>
        </ul>

        <p>We handle getting you found by AI; they handle what happens after you're found.</p>

        <h2>Why This Matters Now</h2>

        <p>The same AI that helps customers discover you can also manage your backend operations—if it's implemented correctly. The winners of the next decade won't just have websites optimized for AI search; they'll have businesses optimized for AI performance.</p>

        <h2>The Partnership Approach</h2>

        <p>We built Found For AI to prepare small businesses for the age of AI visibility. We partner with Fripse AI to make sure that visibility turns into results.</p>

        <p>Together, we help business owners:</p>

        <ul>
          <li>Get discovered</li>
          <li>Capture leads automatically</li>
          <li>Follow up consistently</li>
          <li>And grow with less manual effort</li>
        </ul>

        <h2>The Takeaway</h2>

        <p>Being visible to AI is powerful. But being ready to respond when AI sends you business—that's where real growth happens.</p>

        <p>Learn more about how automation can amplify your AI visibility at <a href="https://fripse.com" target="_blank" rel="noopener" class="text-primary hover:underline">Fripse AI</a>.</p>
      `,
    },
    'are-you-ready-to-be-found-by-ai': {
      title: 'Are You Ready to Be Found by AI? Why Traditional SEO Is About to Change Forever',
      date: '2025-01-20',
      author: 'Dustin Crump',
      image: aiSearchImg,
      content: `
        <p>When was the last time you Googled something?</p>
        
        <p>Exactly. You're not even doing that as much anymore, right? You're asking ChatGPT, Perplexity, or another AI assistant. And pretty soon, you'll be asking them everything.</p>
        
        <p>Now think about your customers.</p>
        
        <p>They're going to be doing the same thing.</p>
        
        <p>That's where FoundForAI comes in.</p>
        
        <p>Because the way people find businesses is changing — and most companies have no idea it's already happening.</p>

        <h2>The Shift: From Search to Suggestion</h2>
        
        <p>In the old world, you typed a keyword and scrolled through results.</p>
        
        <p>In the new world, AI does the searching for you — and only shows one or two answers.</p>
        
        <p>If your business isn't visible to AI, it doesn't exist in that conversation.</p>

        <h2>What "Being Found by AI" Really Means</h2>
        
        <p>It means your website, services, and reputation are structured so that AI models can:</p>
        
        <ul>
          <li>Understand what you do</li>
          <li>Trust your information</li>
          <li>Confidently recommend you when someone asks</li>
        </ul>
        
        <p>That's what AI SEO (or AI discoverability) is all about.</p>
        
        <p>It's not keyword stuffing. It's clarity, context, and clean data.</p>
        
        <p>At FoundForAI, we help businesses:</p>
        
        <ul>
          <li>Add the schema markup that makes your content machine-readable</li>
          <li>Structure your pages for natural-language questions</li>
          <li>Optimize your brand presence for LLMs like ChatGPT and Perplexity</li>
        </ul>
        
        <p>So when someone asks, "Who's the best AI consultant near me?" — the answer isn't random anymore. It's you.</p>

        <h2>The Future Is Already Here</h2>
        
        <p>AI-driven discovery is happening quietly right now.</p>
        
        <p>If you wait for "everyone else to catch on," you'll be buried behind the ones who didn't.</p>
        
        <p>Your business deserves to be visible in the new search era — and that starts today.</p>
        
        <p><a href="/audit" class="text-primary hover:underline">Get your free AI Readiness Audit</a> and find out if your business is visible to AI at FoundForAI.com/audit</p>
      `,
    },
    'what-is-schema-markup': {
      title: 'What Is Schema Markup And Why It Matters For AI Search',
      date: '2025-01-15',
      author: 'Dustin Crump',
      image: schemaMarkupImg,
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
      image: websiteOptimizationImg,
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

  useEffect(() => {
    if (post && post.hasMentions) {
      const articleSchema = document.createElement('script');
      articleSchema.type = 'application/ld+json';
      articleSchema.id = 'article-schema';
      articleSchema.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Found For AI",
          "url": "https://foundforai.com"
        },
        "mentions": {
          "@type": "Organization",
          "name": "Fripse AI",
          "url": "https://fripse.com"
        }
      });
      document.head.appendChild(articleSchema);

      return () => {
        const existingSchema = document.getElementById('article-schema');
        if (existingSchema) {
          document.head.removeChild(existingSchema);
        }
      };
    }
  }, [post]);

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
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Badge>
              <span className="text-sm text-muted-foreground">by {post.author}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-8">{post.title}</h1>
            
            {post.image && (
              <div className="rounded-xl overflow-hidden mb-8">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-auto object-cover aspect-[21/9]"
                  data-testid="img-article-featured"
                  loading="lazy"
                  width="1200"
                  height="514"
                />
              </div>
            )}
          </header>

          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:text-muted-foreground prose-li:my-1 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Looking for AI automations? See <a href="https://fripse.com" target="_blank" rel="noopener" className="text-primary hover:underline" data-testid="link-fripse-blog">Fripse AI</a>.
            </p>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
