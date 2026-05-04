import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { blogPosts } from '@/data/blog-posts';

function toIsoDate(date: string): string {
  if (!date) return date;
  if (date.includes('T')) return date;
  return `${date}T00:00:00-07:00`;
}

export default function BlogIndex() {
  const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  const blogIndexSchemas = [
    breadcrumbList([
      { name: 'Home', url: 'https://foundforai.com/' },
      { name: 'Blog', url: 'https://foundforai.com/blog' }
    ]),
    {
      "@type": "Blog",
      "@id": "https://foundforai.com/blog#blog",
      "url": "https://foundforai.com/blog",
      "name": "Found For AI Blog",
      "description": "Expert insights on AI SEO, schema markup implementation, GEO optimization, and making your website discoverable by AI search engines.",
      "isPartOf": { "@id": "https://foundforai.com/#website" },
      "publisher": { "@id": "https://foundforai.com/#org" },
      "author": { "@id": "https://foundforai.com/#dustin-crump" },
      "blogPost": blogPosts.map(p => ({
        "@type": "BlogPosting",
        "@id": `https://foundforai.com/blog/${p.slug}#article`,
        "headline": p.title,
        "url": `https://foundforai.com/blog/${p.slug}`,
        "datePublished": toIsoDate(p.date),
        "dateModified": toIsoDate(p.dateModified || p.date),
        "author": { "@id": "https://foundforai.com/#dustin-crump" }
      }))
    }
  ];

  return (
    <PageLayout
      title="AI SEO Blog - Schema Markup, GEO, and AI Discoverability Guides | Found For AI"
      description="Expert insights on AI SEO, schema markup implementation, GEO optimization, and making your website discoverable by AI search engines like ChatGPT and Perplexity."
      canonical="https://foundforai.com/blog"
      schemas={blogIndexSchemas}
    >
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center pt-12 pb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 relative inline-block">
              AI SEO Insights
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F5FDB] to-[#3B82F6] rounded-full"></span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
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
                    className="absolute top-4 left-4 bg-[#0F5FDB] text-white hover:bg-[#0D4FC4] border-0"
                    data-testid="badge-featured"
                  >
                    Featured
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                    <span data-testid="text-featured-date">
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span data-testid="text-featured-author">by {featuredPost.author}</span>
                    <span>•</span>
                    <span data-testid="text-featured-readtime">{featuredPost.readTime}</span>
                  </div>

                  <h2
                    className="text-[1.75rem] font-bold mb-4 transition-colors group-hover:text-[#0F5FDB]"
                    data-testid="text-featured-title"
                  >
                    {featuredPost.title}
                  </h2>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-featured-excerpt">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center text-[#0F5FDB] font-semibold group-hover:gap-3 gap-2 transition-all">
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
                    <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                      <span data-testid={`text-post-date-${post.slug}`}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span>•</span>
                      <span data-testid={`text-post-author-${post.slug}`}>by {post.author}</span>
                      <span>•</span>
                      <span data-testid={`text-post-readtime-${post.slug}`}>{post.readTime}</span>
                    </div>

                    <h2
                      className="text-xl md:text-2xl font-bold mb-3 transition-colors group-hover:text-[#0F5FDB] leading-tight"
                      data-testid={`text-post-title-${post.slug}`}
                    >
                      {post.title}
                    </h2>

                    <p className="text-base text-muted-foreground leading-relaxed mb-4" data-testid={`text-post-excerpt-${post.slug}`}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-[#0F5FDB] font-semibold group-hover:gap-3 gap-2 transition-all">
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
