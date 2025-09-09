import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Safety', href: '#safety' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    Renters: [
      { name: 'Find a Car', href: '#find-car' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Insurance', href: '#insurance' },
      { name: 'Support', href: '#support' },
      { name: 'Mobile App', href: '#app' }
    ],
    Hosts: [
      { name: 'List Your Car', href: '#list-car' },
      { name: 'Host Requirements', href: '#requirements' },
      { name: 'Earnings Calculator', href: '#earnings' },
      { name: 'Host Protection', href: '#protection' },
      { name: 'Host Community', href: '#community' }
    ],
    Resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Help Center', href: '#help' },
      { name: 'Travel Guides', href: '#guides' },
      { name: 'Business Solutions', href: '#business' },
      { name: 'API Documentation', href: '#api' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/mobirides' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/mobirides' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/mobirides' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/mobirides' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-hero w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">M</span>
              </div>
              <span className="ml-3 text-xl font-bold">MobiRides</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Futuristic African Mobility. Premium car sharing for Botswana's driven professionals and entrepreneurs.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">Plot 123, Independence Avenue, Gaborone, Botswana</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">+267 123 4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">hello@mobirides.com</span>
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
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </a>
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
                          <a
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                          >
                            {link.name}
                          </a>
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
              © 2024 MobiRides. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          
          <div className="mt-8 lg:mt-0 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <p className="text-gray-400 text-sm">
              🇧🇼 Proudly Botswana
            </p>
            <Button className="btn-primary">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;