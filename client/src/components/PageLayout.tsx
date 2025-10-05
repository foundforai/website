import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEOHead from './SEOHead';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export default function PageLayout({ children, title, description, canonical, ogImage }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead title={title} description={description} canonical={canonical} ogImage={ogImage} />
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
