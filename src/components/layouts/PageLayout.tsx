import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../Header';
import Footer from '../Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  jsonLd?: object;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  jsonLd,
  className = ''
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        
        {/* Open Graph tags */}
        <meta property="og:title" content={ogTitle || title} />
        <meta property="og:description" content={ogDescription || description} />
        {ogUrl && <meta property="og:url" content={ogUrl} />}
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle || title} />
        <meta name="twitter:description" content={ogDescription || description} />
        
        {/* JSON-LD structured data */}
        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
      </Helmet>
      
      <div className={`min-h-screen flex flex-col ${className}`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;