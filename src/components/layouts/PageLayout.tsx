import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../Header';
import Footer from '../Footer';
import { siteConfig } from '@/config/site';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
  jsonLd?: object;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogImageWidth = '1200',
  ogImageHeight = '630',
  ogImageAlt,
  jsonLd,
  className = ''
}) => {
  // Compute defaults for OG tags using siteConfig
  const resolvedOgImage = ogImage || `${siteConfig.url}${siteConfig.seo.ogImage}`;
  const resolvedOgUrl = ogUrl || canonical;
  const resolvedOgImageAlt = ogImageAlt || description;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        {canonical && <link rel="canonical" href={canonical} />}
        
        {/* Open Graph tags */}
        <meta property="og:title" content={ogTitle || title} />
        <meta property="og:description" content={ogDescription || description} />
        {resolvedOgUrl && <meta property="og:url" content={resolvedOgUrl} />}
        <meta property="og:type" content="website" />
        <meta property="og:image" content={resolvedOgImage} />
        <meta property="og:image:width" content={ogImageWidth} />
        <meta property="og:image:height" content={ogImageHeight} />
        <meta property="og:image:alt" content={resolvedOgImageAlt} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle || title} />
        <meta name="twitter:description" content={ogDescription || description} />
        <meta name="twitter:image" content={resolvedOgImage} />
        <meta name="twitter:image:alt" content={resolvedOgImageAlt} />
        
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