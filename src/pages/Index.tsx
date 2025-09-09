import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import CarsSection from '@/components/sections/CarsSection';
import TrustSection from '@/components/sections/TrustSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import HostCTASection from '@/components/sections/HostCTASection';
import ExploreBotswanaSection from '@/components/sections/ExploreBotswanaSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import Footer from '@/components/Footer';

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
        <HowItWorksSection />
        <CarsSection />
        <TrustSection />
        <TestimonialsSection />
        <HostCTASection />
        <ExploreBotswanaSection />
        <FinalCTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;