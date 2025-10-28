import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/what-is-ai-seo', label: 'What Is AI SEO' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing & Plans' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" data-testid="link-home">
            <div className="hover-elevate rounded-lg px-2 py-1">
              <img 
                src={theme === 'dark' ? '/found-for-ai-logo-black.png' : '/found-for-ai-logo-white.png'} 
                alt={theme === 'dark' ? 'Found For AI logo white version' : 'Found For AI logo black version'}
                className="w-[90px] sm:w-[120px] md:w-[180px] h-auto" 
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className={`text-lg font-semibold py-3 px-1 transition-colors hover:text-primary ${location === link.href ? 'text-primary' : 'text-muted-foreground'}`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link href="/audit">
              <Button data-testid="button-get-audit-header" className="font-semibold">
                Get My Free Audit
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${location === link.href ? 'bg-primary text-primary-foreground' : 'hover-elevate'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <Link href="/audit">
              <Button className="w-full font-semibold" data-testid="button-get-audit-mobile" onClick={() => setMobileMenuOpen(false)}>
                Get My Free Audit
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
