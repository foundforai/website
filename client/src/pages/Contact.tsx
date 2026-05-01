import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';

const contactSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Contact', url: 'https://foundforai.com/contact' }
  ]),
  {
    "@type": "ContactPage",
    "@id": "https://foundforai.com/contact#contactpage",
    "url": "https://foundforai.com/contact",
    "name": "Contact Found For AI",
    "description": "Contact Found For AI for AI SEO consulting. Located in Cottonwood Heights, Utah.",
    "isPartOf": { "@id": "https://foundforai.com/#website" },
    "about": { "@id": "https://foundforai.com/#org" },
    "mainEntity": { "@id": "https://foundforai.com/#org" },
    "publisher": { "@id": "https://foundforai.com/#org" }
  }
];

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with your actual Formspree endpoint
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/movklzvl';
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New message from Found For AI website',
          _language: 'en',
        }),
      });

      if (response.ok) {
        toast({
          title: 'Thanks - we will be in touch soon.',
          description: 'Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: 'Please email info@foundforai.com directly.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Submission failed. Please email info@foundforai.com.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      title="Contact Found For AI - Get In Touch | Cottonwood Heights, Utah"
      description="Contact Found For AI for AI SEO consulting. Located in Cottonwood Heights, Utah. Call +1-801-898-2456 or email info@foundforai.com."
      canonical="https://foundforai.com/contact"
      schemas={contactSchemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about AI SEO? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" acceptCharset="UTF-8">
                  <input type="hidden" name="_honeypot" tabIndex={-1} autoComplete="off" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-name"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="input-contact-email"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      data-testid="input-message"
                      placeholder="How can we help?"
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-semibold"
                    disabled={loading}
                    data-testid="button-submit-contact"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:+18018982456" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-contact-phone">
                        +1 (801) 898-2456
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@foundforai.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-contact-email">
                        info@foundforai.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Cottonwood Heights, Utah
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <iframe
                  title="Cottonwood Heights, Utah Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48627.89384413489!2d-111.83970094863282!3d40.61900000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87528b0e91e0f5c9%3A0x4b8f6f3f5f5f5f5f!2sCottonwood%20Heights%2C%20UT!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
