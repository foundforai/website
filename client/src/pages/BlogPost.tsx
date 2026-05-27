import { useRoute } from 'wouter';
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Badge } from '@/components/ui/badge';
import { breadcrumbList } from '@/lib/breadcrumb';
import { blogPostsBySlug } from '@/data/blog-posts';
import { buildBlogPostingSchema } from '@/lib/blog-schema';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug || '';
  const post = blogPostsBySlug[slug];

  const blogSchemas: object[] = [];
  if (post) {
    blogSchemas.push(
      breadcrumbList([
        { name: 'Home', url: 'https://foundforai.com/' },
        { name: 'Blog', url: 'https://foundforai.com/blog' },
        { name: post.title, url: `https://foundforai.com/blog/${slug}` }
      ])
    );
    blogSchemas.push(buildBlogPostingSchema(post));
  }

  useEffect(() => {
    if (post) {
      const ogType = document.querySelector('meta[property="og:type"]');
      if (ogType) {
        ogType.setAttribute('content', 'article');
      }

      if (post.ogDescription) {
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
          ogDesc.setAttribute('content', post.ogDescription);
        }
      }

      if (post.twitterDescription) {
        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc) {
          twitterDesc.setAttribute('content', post.twitterDescription);
        }
      }
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
      title={post.title}
      description={post.metaDescription || post.content.substring(0, 160)}
      canonical={`https://foundforai.com/blog/${slug}`}
      schemas={blogSchemas}
    >
      <article className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">
                {new Date(post.date.length === 10 ? post.date + 'T12:00:00' : post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Badge>
              <span className="text-sm text-muted-foreground">by {post.author}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

            {post.subtitle && (
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl">{post.subtitle}</p>
            )}

            {post.image && (
              <div className="rounded-xl overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover aspect-[21/9]"
                  data-testid="img-article-featured"
                />
              </div>
            )}
          </header>

          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:my-1 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.customCta ? (
            <div className="mt-16 p-8 md:p-10 bg-muted/50 border rounded-xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{post.customCta.headline}</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                {post.customCta.copy}
              </p>
              <a
                href={post.customCta.buttonLink}
                className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="button-article-cta"
              >
                {post.customCta.buttonText}
              </a>
              {post.customCta.footnote && (
                <p className="text-sm text-muted-foreground mt-4">{post.customCta.footnote}</p>
              )}
            </div>
          ) : (
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                Looking for AI automations? See <a href="https://fripse.com" target="_blank" rel="noopener" className="text-primary hover:underline" data-testid="link-fripse-blog">Fripse AI</a>.
              </p>
            </div>
          )}
        </div>
      </article>
    </PageLayout>
  );
}
