import React from 'react';
import { Button } from '../ui/button';
import { siteConfig, buildTel, buildMailto } from '@/config/site';
import { ArrowRight, Phone, Mail } from 'lucide-react';

interface CTAAction {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

interface CTASectionProps {
  title: string;
  description?: string;
  actions: CTAAction[];
  variant?: 'default' | 'gradient' | 'minimal';
  backgroundImage?: string;
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  actions,
  variant = 'default',
  backgroundImage,
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';
      case 'minimal':
        return 'bg-gray-50';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  const getButtonVariant = (actionVariant: string = 'primary') => {
    if (variant === 'minimal') {
      switch (actionVariant) {
        case 'secondary':
          return 'bg-gray-600 hover:bg-gray-700 text-white';
        case 'outline':
          return 'border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white';
        default:
          return 'bg-blue-600 hover:bg-blue-700 text-white';
      }
    }
    
    switch (actionVariant) {
      case 'secondary':
        return 'bg-white text-blue-600 hover:bg-gray-100';
      case 'outline':
        return 'border-white text-white hover:bg-white hover:text-blue-600';
      default:
        return 'bg-white text-blue-600 hover:bg-gray-100';
    }
  };

  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <section 
      className={`py-16 lg:py-24 relative ${getVariantClasses()} ${className}`}
      style={backgroundStyle}
    >
      {/* Overlay for background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60" />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {title}
          </h2>
          
          {description && (
            <p className={`text-lg lg:text-xl mb-8 max-w-2xl mx-auto ${
              variant === 'minimal' ? 'text-gray-600' : 'text-gray-200'
            }`}>
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {actions.map((action, index) => (
              action.href ? (
                <Button 
                  key={index}
                  asChild 
                  size="lg" 
                  className={getButtonVariant(action.variant)}
                >
                  <a href={action.href} className="inline-flex items-center gap-2">
                    {action.icon}
                    {action.text}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              ) : (
                <Button 
                  key={index}
                  onClick={action.onClick}
                  size="lg" 
                  className={`${getButtonVariant(action.variant)} inline-flex items-center gap-2`}
                >
                  {action.icon}
                  {action.text}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )
            ))}
          </div>
          
          {/* Contact info for certain variants */}
          {variant === 'default' && (
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-gray-200 mb-4">Need immediate assistance?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <a 
                  href={buildTel()} 
                  className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.contact.phone}
                </a>
                <a 
                  href={buildMailto('support')} 
                  className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;