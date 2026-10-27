import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { SiX } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <img src="/found-for-ai-logo.png" alt="Found For AI" />
          <p>AI Actions for local businesses. Salt Lake City, Utah.</p>
        </div>
        <nav className="site-footer-links" aria-label="Footer">
          <a href="mailto:support@foundforai.com" data-testid="link-email">
            support@foundforai.com
          </a>
          <Link href="/privacy" data-testid="link-footer-privacy">Privacy</Link>
          <Link href="/terms" data-testid="link-footer-terms">Terms</Link>
          <Link href="/refund-policy" data-testid="link-footer-refund">Refunds</Link>
          <Link href="/contact" data-testid="link-footer-contact">Contact</Link>
          <Link href="/events" data-testid="link-footer-events">Events</Link>
          <Link href="/media" data-testid="link-footer-media">Media</Link>
        </nav>
      </div>
      <div className="site-footer-social">
        <a href="https://www.linkedin.com/company/foundforai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-testid="link-linkedin">
          <Linkedin className="h-5 w-5" />
        </a>
        <a href="https://x.com/foundforai" target="_blank" rel="noopener noreferrer" aria-label="X" data-testid="link-twitter">
          <SiX className="h-5 w-5" />
        </a>
        <a href="https://instagram.com/foundforai" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="link-instagram">
          <Instagram className="h-5 w-5" />
        </a>
        <a href="https://facebook.com/foundforai" target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-testid="link-facebook">
          <Facebook className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
