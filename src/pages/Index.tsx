import { useEffect, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { buildCanonicalUrl, siteConfig } from '@/config/site';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import { LazySection } from '@/components/LazySection';
import { AnimatedSection } from '@/components/AnimatedSection';
import { HeroSkeleton, CarsSkeleton, TrustSkeleton, TestimonialsSkeleton, SectionSkeleton } from '@/components/ui/skeleton-sections';
import Footer from '@/components/Footer';

// Lazy load sections for better performance
const HowItWorksSection = lazy(() => import('@/components/sections/HowItWorksSection'));
const CarsSection = lazy(() => import('@/components/sections/CarsSection'));
const TrustSection = lazy(() => import('@/components/sections/TrustSection'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const HostCTASection = lazy(() => import('@/components/sections/HostCTASection'));
const ExploreBotswanaSection = lazy(() => import('@/components/sections/ExploreBotswanaSection'));
const FinalCTASection = lazy(() => import('@/components/sections/FinalCTASection'));

const Index = () => {
  useEffect(() => {
    // Update page metadata
    document.title = "MobiRides - Premium Car Sharing in Botswana | Mobility for the Driven";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Access premium car rentals across Botswana. Safe, seamless, and sophisticated mobility solutions for professionals, entrepreneurs, and business travelers.');
    }
    
    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', buildCanonicalUrl());
    
    // Add structured data - Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteConfig.name,
      "alternateName": "MobiRides Botswana",
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo.url}`,
      "description": siteConfig.description,
      "email": siteConfig.contact.email,
      "telephone": siteConfig.contact.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.street,
        "addressLocality": siteConfig.address.city,
        "addressRegion": siteConfig.address.state,
        "postalCode": siteConfig.address.postalCode,
        "addressCountry": siteConfig.address.country
      },
      "sameAs": [
        siteConfig.social.facebook,
        siteConfig.social.twitter,
        siteConfig.social.instagram,
        siteConfig.social.linkedin,
        siteConfig.social.youtube
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": siteConfig.contact.phone,
          "contactType": "customer service",
          "email": siteConfig.departments.support,
          "availableLanguage": ["English", "Setswana"],
          "areaServed": "BW"
        },
        {
          "@type": "ContactPoint",
          "telephone": siteConfig.contact.emergency,
          "contactType": "emergency",
          "availableLanguage": ["English", "Setswana"],
          "areaServed": "BW"
        }
      ]
    };

    // Add structured data - Enhanced LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "description": siteConfig.description,
      "url": siteConfig.url,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "image": `${siteConfig.url}${siteConfig.logo.url}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.street,
        "addressLocality": siteConfig.address.city,
        "addressRegion": siteConfig.address.state,
        "postalCode": siteConfig.address.postalCode,
        "addressCountry": siteConfig.address.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": siteConfig.address.coordinates.lat.toString(),
        "longitude": siteConfig.address.coordinates.lng.toString()
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": siteConfig.businessHours.weekdays.split(' - ')[0],
          "closes": siteConfig.businessHours.weekdays.split(' - ')[1]
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": siteConfig.businessHours.saturday.split(' - ')[0],
          "closes": siteConfig.businessHours.saturday.split(' - ')[1]
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": siteConfig.businessHours.sunday.split(' - ')[0],
          "closes": siteConfig.businessHours.sunday.split(' - ')[1]
        }
      ],
      "priceRange": "BWP 250-750",
      "currenciesAccepted": "BWP",
      "paymentAccepted": "Cash, Credit Card, Debit Card, Bank Transfer",
      "areaServed": {
        "@type": "Country",
        "name": "Botswana"
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": siteConfig.address.coordinates.lat.toString(),
          "longitude": siteConfig.address.coordinates.lng.toString()
        },
        "geoRadius": "500000"
      }
    };

    // Add structured data - WebSite Schema with SearchAction
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "description": siteConfig.description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteConfig.url}/find-ride?location={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
    
    // Combine all schemas
    const combinedSchema = {
      "@context": "https://schema.org",
      "@graph": [organizationSchema, localBusinessSchema, websiteSchema]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(combinedSchema);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        {/* Open Graph Image */}
        <meta property="og:image" content={`${siteConfig.url}${siteConfig.seo.ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={siteConfig.seo.defaultDescription} />
        
        {/* Twitter Card Image */}
        <meta name="twitter:image" content={`${siteConfig.url}${siteConfig.seo.ogImage}`} />
        <meta name="twitter:image:alt" content={siteConfig.seo.defaultDescription} />
      </Helmet>
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <LazySection fallback={<SectionSkeleton />}>
          <AnimatedSection animation="fade-up">
            <HowItWorksSection />
          </AnimatedSection>
        </LazySection>
        
        <LazySection fallback={<CarsSkeleton />}>
          <AnimatedSection animation="fade-up" delay={100}>
            <CarsSection />
          </AnimatedSection>
        </LazySection>
        
        <LazySection fallback={<TrustSkeleton />}>
          <AnimatedSection animation="fade-up" delay={200}>
            <TrustSection />
          </AnimatedSection>
        </LazySection>
        
        <LazySection fallback={<TestimonialsSkeleton />}>
          <AnimatedSection animation="fade-up" delay={300}>
            <TestimonialsSection />
          </AnimatedSection>
        </LazySection>
        
        <LazySection fallback={<SectionSkeleton />}>
          <AnimatedSection animation="fade-up" delay={400}>
            <HostCTASection />
          </AnimatedSection>
        </LazySection>
        
        <LazySection fallback={<SectionSkeleton />}>
          <AnimatedSection animation="fade-up" delay={500}>
            <ExploreBotswanaSection />
          </AnimatedSection>
        </LazySection>
        
        <LazySection fallback={<SectionSkeleton />}>
          <AnimatedSection animation="fade-up" delay={600}>
            <FinalCTASection />
          </AnimatedSection>
        </LazySection>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;