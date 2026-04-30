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
  schemas?: object[];
  noindex?: boolean;
}

export default function PageLayout({ children, title, description, canonical, ogImage, schemas, noindex }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead title={title} description={description} canonical={canonical} ogImage={ogImage} schemas={schemas} noindex={noindex} />
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
