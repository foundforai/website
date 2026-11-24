import type { PublicTestimonial } from '@/lib/community/types.ts';

/**
 * Renders nothing until a testimonial is approved and has publishing
 * permission. The public API already filters those flags. Do not pass
 * placeholders.
 */
export default function ApprovedTestimonials({ items }: { items: PublicTestimonial[] }) {
  const visible = items.filter((item) => item.quote.trim() && item.attribution.trim());
  if (visible.length === 0) return null;
  return (
    <section className="py-16 md:py-20 border-t" aria-labelledby="approved-testimonials-heading">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 id="approved-testimonials-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
          From business owners
        </h2>
        <div className="mt-8 space-y-6">
          {visible.map((item) => (
            <figure key={`${item.attribution}-${item.quote.slice(0, 24)}`} className="rounded-lg border bg-card p-6">
              <blockquote className="text-lg leading-relaxed">{item.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                {item.attribution}
                {item.detail ? `, ${item.detail}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
