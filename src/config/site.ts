/**
 * Centralized site configuration
 * All site-wide constants and configuration values
 */

export const siteConfig = {
  // Domain & URLs
  domain: 'www.mobirides.com',
  url: 'https://www.mobirides.com',
  
  // Company Information
  name: 'MobiRides',
  tagline: 'Botswana\'s Premier Car Sharing Platform',
  description: 'Book trusted vehicles from verified hosts across Botswana. Safe, convenient, and affordable car rentals for every journey.',
  
  // Contact Information
  contact: {
    email: 'hello@mobirides.com',
    phone: '+267 74300747',
    emergency: '+267 911 MOBI (6624)',
    whatsapp: '+267 74300747',
  },
  
  // Department Emails
  departments: {
    support: 'hello@mobirides.com',
    safety: 'safety@mobirides.com',
    partnerships: 'partnerships@mobirides.com',
    media: 'media@mobirides.com',
    careers: 'careers@mobirides.com',
    gaborone: 'gaborone@mobirides.com',
    francistown: 'francistown@mobirides.com',
    maun: 'maun@mobirides.com',
  },
  
  // Social Media Links
  social: {
    facebook: 'https://facebook.com/mobirides.bw',
    twitter: 'https://twitter.com/mobirides_bw',
    instagram: 'https://instagram.com/mobirides.bw',
    linkedin: 'https://linkedin.com/company/mobirides-botswana',
    youtube: 'https://youtube.com/@mobirides-bw',
  },
  
  // Business Address
  address: {
    street: 'Plot 16530, Sehithwa Rd, Gaborone West - Phase 1',
    city: 'Gaborone',
    state: 'South-East District',
    country: 'Botswana',
    postalCode: '00000',
    coordinates: {
      lat: -24.6282,
      lng: 25.9231,
    },
  },
  
  // Mailing Address
  mailing: {
    name: 'MobiRides Botswana',
    poBox: 'P.O. Box 12345',
    city: 'Gaborone',
    country: 'Botswana',
  },
  
  // Business Hours
  businessHours: {
    weekdays: '08:00 - 17:00',
    saturday: '09:00 - 13:00',
    sunday: 'Closed',
  },
  
  // SEO Defaults
  seo: {
    defaultTitle: 'MobiRides - Botswana\'s Premier Car Sharing Platform',
    titleTemplate: '%s | MobiRides',
    defaultDescription: 'Book trusted vehicles from verified hosts across Botswana. Safe, convenient, and affordable car rentals for every journey.',
    ogImage: '/og-image.png',
    twitterHandle: '@mobirides_bw',
  },
  
  // Logo
  logo: {
    url: '/mobirides-logo.jpg',
    alt: 'MobiRides Logo',
  },
} as const;

// Type-safe URL builder
export const buildUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
};

// Type-safe canonical URL builder
export const buildCanonicalUrl = (path: string = ''): string => {
  return buildUrl(path);
};

// Type-safe email builder
export const buildMailto = (department: keyof typeof siteConfig.departments, subject?: string): string => {
  const email = siteConfig.departments[department];
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
};

// Type-safe phone link builder
export const buildTel = (phone: string = siteConfig.contact.phone): string => {
  return `tel:${phone.replace(/\s/g, '')}`;
};

// Type-safe WhatsApp link builder
export const buildWhatsApp = (message?: string): string => {
  const phone = siteConfig.contact.whatsapp.replace(/\s/g, '').replace('+', '');
  return message 
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phone}`;
};
