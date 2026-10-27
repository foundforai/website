import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { RESOURCE_LINKS } from '@/data/revamp-copy';

const LINKS = [
  { href: '/ai-actions', label: 'AI Actions' },
  { href: '/dental', label: 'Dental' },
  { href: '/visibility', label: 'Visibility' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const resourcesActive = RESOURCE_LINKS.some((link) => location === link.href || location.startsWith(`${link.href}/`));

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" data-testid="link-home" aria-label="Found For AI home">
          <img src="/found-for-ai-wordmark.png" alt="Found For AI" className="site-logo" width="462" height="197" />
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {LINKS.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={location === link.href ? 'active' : undefined}
              data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.label}
            </Link>
          ))}
          <details className="site-resources">
            <summary className={resourcesActive ? 'active' : undefined}>Resources</summary>
            <div className="site-resources-menu">
              {RESOURCE_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
          <Link
            href="/about"
            className={location === '/about' ? 'active' : undefined}
            data-testid="link-about"
          >
            About
          </Link>
          <Link href="/audit" className="revamp-btn sm" data-testid="button-get-audit-header">
            Get my free audit
          </Link>
        </nav>

        <div className="site-header-actions">
          <button
            type="button"
            className="site-menu-btn"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            data-testid="button-mobile-menu"
          >
            {open ? '✕' : '☰'}
          </button>
          <Link href="/audit" className="revamp-btn sm site-header-audit" data-testid="button-get-audit-mobile">
            Get my free audit
          </Link>
        </div>
      </div>

      <div className={open ? 'site-drawer open' : 'site-drawer'}>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        {RESOURCE_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
