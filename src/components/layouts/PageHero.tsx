import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaAction?: () => void;
  ctaLink?: string;
  variant?: 'default' | 'centered' | 'minimal';
  overlay?: boolean;
  className?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  ctaAction,
  ctaLink,
  variant = 'default',
  overlay = true,
  className = ''
}) => {
  const baseClasses = 'relative py-20 lg:py-32';
  const variantClasses = {
    default: 'text-left',
    centered: 'text-center',
    minimal: 'py-12 lg:py-16'
  };

  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <section 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={backgroundStyle}
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl ${variant === 'centered' ? 'mx-auto' : ''}`}>
          {subtitle && (
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
              {subtitle}
            </p>
          )}
          
          <h1 className={`font-bold text-gray-900 mb-6 ${
            variant === 'minimal' 
              ? 'text-3xl lg:text-4xl' 
              : 'text-4xl lg:text-6xl'
          } ${backgroundImage ? 'text-white' : ''}`}>
            {title}
          </h1>
          
          {description && (
            <p className={`text-lg lg:text-xl mb-8 max-w-2xl ${
              backgroundImage ? 'text-gray-200' : 'text-gray-600'
            } ${variant === 'centered' ? 'mx-auto' : ''}`}>
              {description}
            </p>
          )}
          
          {ctaText && (
            <div className="flex flex-col sm:flex-row gap-4">
              {ctaLink ? (
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <a href={ctaLink} className="inline-flex items-center gap-2">
                    {ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              ) : (
                <Button 
                  onClick={ctaAction}
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2"
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;