import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import aiAutomationImg from '@assets/stock_images/ai_automation_workfl_1fb79544.jpg';
import aiSearchImg from '@assets/stock_images/artificial_intellige_8c98905d.jpg';
import schemaMarkupImg from '@assets/stock_images/schema_markup_struct_0763f9a1.jpg';
import websiteOptimizationImg from '@assets/stock_images/website_optimization_b4ff5bda.jpg';

export default function BlogIndex() {
  //TODO: remove mock functionality - replace with actual blog post data
  const posts = [
    {
      slug: 'what-is-found-for-ai',
      title: 'What Is Found For AI?',
      date: new Date().toISOString().split('T')[0],
      author: 'Dustin Crump',
      excerpt: 'Found For AI is a consulting firm that helps real businesses become visible, understandable, and recommendable in AI-powered search.',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1516382799247-87df95d790b7?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: true,
    },
    {
      slug: 'missing-half-of-ai-seo-automation',
      title: 'The Missing Half of AI SEO: Automating What Happens After You\'re Found',
      date: '2025-01-25',
      author: 'Dustin Crump',
      excerpt: 'Getting found by AI is only half the game. The other half is what happens after—the follow-up, the workflow, the automation. That\'s where Fripse AI comes in.',
      readTime: '5 min read',
      image: aiAutomationImg,
    },
    {
      slug: 'are-you-ready-to-be-found-by-ai',
      title: 'Are You Ready to Be Found by AI? Why Traditional SEO Is About to Change Forever',
      date: '2025-01-20',
      author: 'Dustin Crump',
      excerpt: 'The way people find businesses is changing. AI assistants are replacing search engines, and if your business isn\'t visible to AI, it doesn\'t exist in that conversation.',
      readTime: '4 min read',
      image: aiSearchImg,
    },
    {
      slug: 'what-is-schema-markup',
      title: 'What Is Schema Markup And Why It Matters For AI Search',
      date: '2025-01-15',
      author: 'Dustin Crump',
      excerpt: 'Learn how schema markup helps AI understand your website and why it\'s essential for being discovered by ChatGPT, Perplexity, and other AI search tools.',
      readTime: '6 min read',
      image: schemaMarkupImg,
    },
    {
      slug: 'how-to-make-website-ai-discoverable',
      title: 'How To Make Your Website AI Discoverable',
      date: '2025-01-10',
      author: 'Dustin Crump',
      excerpt: 'A step-by-step guide to optimizing your website for AI search engines. Implement schema, structure content, and ensure your business shows up in AI-powered answers.',
      readTime: '7 min read',
      image: websiteOptimizationImg,
    },
  ];

  const [featuredPost, ...regularPosts] = posts;

  return (
    <PageLayout
      title="AI SEO Blog - Schema Markup, GEO, and AI Discoverability Guides | Found For AI"
      description="Expert insights on AI SEO, schema markup implementation, GEO optimization, and making your website discoverable by AI search engines like ChatGPT and Perplexity."
      canonical="https://foundforai.com/blog"
    >
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center pt-12 pb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 relative inline-block">
              AI SEO Insights
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007CFF] to-[#00BFFF] rounded-full"></span>
            </h1>
            <p className="text-lg text-[#6B7280] mt-6 max-w-2xl mx-auto">
              Practical guides for making your website AI-discoverable
            </p>
          </div>

          {/* Featured Post */}
          <Link href={`/blog/${featuredPost.slug}`} data-testid={`link-featured-${featuredPost.slug}`}>
            <article 
              className="group mb-12 bg-card rounded-xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className="absolute top-4 left-4 bg-[#007CFF] text-white hover:bg-[#0066CC] border-0"
                    data-testid="badge-featured"
                  >
                    Featured
                  </Badge>
                </div>
                
                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 text-sm text-[#6B7280]">
                    <span data-testid="text-featured-date">
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span data-testid="text-featured-author">by {featuredPost.author}</span>
                    <span>•</span>
                    <span data-testid="text-featured-readtime">{featuredPost.readTime}</span>
                  </div>
                  
                  <h2 
                    className="text-[1.75rem] font-bold mb-4 transition-colors group-hover:text-[#007CFF]"
                    data-testid="text-featured-title"
                  >
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-featured-excerpt">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center text-[#007CFF] font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span data-testid="link-featured-read-more">Read More</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </article>
          </Link>

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} data-testid={`link-post-${post.slug}`}>
                <article 
                  className="group bg-card rounded-xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-sm text-[#6B7280]">
                      <span data-testid={`text-post-date-${post.slug}`}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span>•</span>
                      <span data-testid={`text-post-author-${post.slug}`}>by {post.author}</span>
                      <span>•</span>
                      <span data-testid={`text-post-readtime-${post.slug}`}>{post.readTime}</span>
                    </div>
                    
                    <h2 
                      className="text-xl md:text-2xl font-bold mb-3 transition-colors group-hover:text-[#007CFF] leading-tight"
                      data-testid={`text-post-title-${post.slug}`}
                    >
                      {post.title}
                    </h2>
                    
                    <p className="text-base text-muted-foreground leading-relaxed mb-4" data-testid={`text-post-excerpt-${post.slug}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-[#007CFF] font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span data-testid={`link-post-read-more-${post.slug}`}>Read More</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
