import { useEffect, Suspense, lazy } from 'react';
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
    
    // Add structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "MobiRides",
      "description": "Premium car sharing platform for Botswana's professionals",
      "url": "https://mobirides.com",
      "telephone": "+267-123-4567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot 123, Independence Avenue",
        "addressLocality": "Gaborone",
        "addressCountry": "BW"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-24.6282",
        "longitude": "25.9231"
      },
      "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
      "priceRange": "P250-P750 per day"
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
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