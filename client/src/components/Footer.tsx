import { Link } from 'wouter';
import { Linkedin } from 'lucide-react';
import { SiX } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Found For AI</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-1">
              <p>Cottonwood Heights, Utah</p>
              <p>
                <a href="tel:+18018982456" className="hover:text-primary transition-colors" data-testid="link-phone">
                  +1 (801) 898-2456
                </a>
              </p>
              <p>
                <a href="mailto:info@foundforai.com" className="hover:text-primary transition-colors" data-testid="link-email">
                  info@foundforai.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/what-is-ai-seo" data-testid="link-footer-what-is-ai-seo">
                <span className="hover:text-primary transition-colors">What Is AI SEO</span>
              </Link>
              <Link href="/services" data-testid="link-footer-services">
                <span className="hover:text-primary transition-colors">Services</span>
              </Link>
              <Link href="/blog" data-testid="link-footer-blog">
                <span className="hover:text-primary transition-colors">Blog</span>
              </Link>
              <Link href="/about" data-testid="link-footer-about">
                <span className="hover:text-primary transition-colors">About</span>
              </Link>
              <Link href="/contact" data-testid="link-footer-contact">
                <span className="hover:text-primary transition-colors">Contact</span>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/fripse"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate rounded-lg p-2"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/fripseai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate rounded-lg p-2"
                aria-label="X (Twitter)"
                data-testid="link-twitter"
              >
                <SiX className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground space-y-2">
          <p>
            Powered by <a href="https://fripse.com" target="_blank" rel="noopener" className="hover:text-primary transition-colors" data-testid="link-fripse">Fripse AI</a> — automation systems for small businesses.
          </p>
          <p>&copy; {currentYear} Found For AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
