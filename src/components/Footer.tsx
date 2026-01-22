import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';

const Footer = () => {
  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'Partners', href: '/partners' }
    ],
    Renters: [
      { name: 'Find a Car', href: '/find-ride' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Rent2Buy', href: '/rent2buy' },
      { name: 'Damage Protection', href: '/damage-protection' },
      { name: 'Mobile App', href: '/#app' }
    ],
    Hosts: [
      { name: 'List Your Car', href: '/host' },
      { name: 'Host Requirements', href: '/host-requirements' },
      { name: 'Earnings Calculator', href: '/#earnings' },
      { name: 'Host Protection', href: '/host-protection' },
      { name: 'Host Community', href: '/host-community' }
    ],
    Resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Travel Guides', href: '/travel-guides' },
      { name: 'Business Solutions', href: '/business-solutions' },
      { name: 'API Documentation', href: '/api-docs' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: siteConfig.social.facebook },
    { name: 'Twitter', icon: Twitter, href: siteConfig.social.twitter },
    { name: 'Instagram', icon: Instagram, href: siteConfig.social.instagram },
    { name: 'LinkedIn', icon: Linkedin, href: siteConfig.social.linkedin }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/public/mobirides-logo.png" 
                alt="MobiRides - Premium Car Sharing in Botswana"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              The Future of African Mobility, from Botswana to the World. Premium vehicles for global travellers, driven professionals and ambitious entrepreneurs.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.country}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">{siteConfig.contact.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-hero rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Desktop Links Columns - Hidden on mobile */}
          <div className="hidden lg:contents">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-6">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Accordion - Shown on mobile, hidden on desktop */}
          <div className="lg:hidden lg:col-span-4 mt-8">
            <Accordion type="multiple" className="w-full">
              {Object.entries(footerLinks).map(([category, links]) => (
                <AccordionItem key={category} value={category} className="border-gray-800">
                  <AccordionTrigger className="text-white font-semibold text-lg hover:text-gray-300 py-4">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link.name}>
                          {link.href.startsWith('/') ? (
                            <Link
                              to={link.href}
                              className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                            >
                              {link.name}
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                            >
                              {link.name}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <p className="text-gray-400 text-sm">
              © 2025 MobiRides. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to={{ pathname: '/', hash: '#cookies' }} className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
          
          <div className="mt-8 lg:mt-0 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <p className="text-gray-400 text-sm">
              🇧🇼 Proudly Botswana
            </p>
            <a 
              href="https://app.mobirides.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-block text-center"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;