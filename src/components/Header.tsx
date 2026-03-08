import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Find a Ride', href: '/find-ride' },
    { name: 'Rent Out Your Car', href: '/host' },
    { name: 'Rent2Buy', href: '/rent2buy' },
    { name: 'Partners', href: '/partners' },
    { name: 'Blog', href: '/blog' },
  ];

  const promoText = '🚗 Use code FIRST100 for P100 off your first booking! Book Now →';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground py-2.5 lg:py-3 px-4 shadow-md">
        {/* Desktop: static centered */}
        <div className="hidden lg:block text-center text-sm font-medium">
          <p>
            🚗 Use code <span className="font-bold bg-primary-foreground/20 px-1.5 py-0.5 rounded mx-1">FIRST100</span> for P100 off your first booking!{' '}
            <a href="https://app.mobirides.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary-foreground/80 transition-colors">
              Book Now →
            </a>
          </p>
        </div>
        {/* Mobile: marquee scrolling */}
        <div className="lg:hidden overflow-hidden">
          <a
            href="https://app.mobirides.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block whitespace-nowrap animate-marquee text-sm font-medium hover:text-primary-foreground/80 transition-colors"
          >
            {promoText}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 min-w-[180px]">
            <Link to="/">
              <img 
                src="/public/mobirides-logo.png" 
                alt="MobiRides Logo"
                className="h-12 lg:h-16 w-auto max-h-full"
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary font-medium' 
                    : 'text-white hover:text-gray-200 font-semibold'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center">
            <Button 
              className="btn-primary" 
              asChild
            >
              <a 
                href="https://app.mobirides.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Let's Go
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors p-2 rounded-lg ${
                isScrolled
                  ? 'text-foreground hover:text-primary'
                  : 'text-white hover:text-gray-200 bg-primary/30 backdrop-blur-sm'
              }`}
              style={{ zIndex: 9999 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full right-4 w-auto min-w-fit" style={{ zIndex: 9998 }}>
            <div className="pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md rounded-lg mt-2 shadow-medium">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-colors text-right whitespace-nowrap"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Button 
                  className="btn-primary" 
                  asChild
                >
                  <a 
                    href="https://app.mobirides.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Let's Go
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
