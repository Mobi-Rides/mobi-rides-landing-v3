import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageLayout, PageHero } from '../components/layouts';
import { ContactForm } from '../components/forms/ContactForm';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Users, 
  Building, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import contactInfo from '../data/contact-info.json';

interface ContactMethod {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  value: string;
  action?: string;
}

const ContactPage: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState(contactInfo.offices[0]);

  const contactMethods: ContactMethod[] = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      value: contactInfo.supportChannels[0]?.contact,
      action: `tel:${contactInfo.supportChannels[0]?.contact}`
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      value: contactInfo.supportChannels[1]?.contact,
      action: `mailto:${contactInfo.supportChannels[1]?.contact}`
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chat with us on WhatsApp',
      value: contactInfo.supportChannels[2]?.contact,
      action: `https://wa.me/${contactInfo.supportChannels[2]?.contact.replace(/[^0-9]/g, '')}`
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      description: 'Emergency assistance anytime',
      value: contactInfo.emergencyContact?.phone,
      action: `tel:${contactInfo.emergencyContact?.phone}`
    }
  ];

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact MobiRides",
    "description": "Get in touch with MobiRides for support, partnerships, or general inquiries. Multiple contact methods available.",
    "url": "https://mobirides.bw/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "MobiRides",
      "telephone": contactInfo.supportChannels[0]?.contact || '',
      "email": contactInfo.supportChannels[1]?.contact || '',
      "address": {
        "@type": "PostalAddress",
        "streetAddress": contactInfo.headquarters.address,
        "addressLocality": contactInfo.headquarters.address.city,
        "addressCountry": contactInfo.headquarters.address.country
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": contactInfo.supportChannels.find(c => c.id === 'phone')?.contact,
          "contactType": "customer service",
          "availableLanguage": ["English", "Setswana"]
        },
        {
          "@type": "ContactPoint",
          "telephone": contactInfo.emergencyContact?.phone,
          "contactType": "emergency",
          "availableLanguage": ["English", "Setswana"]
        }
      ]
    }
  };

  return (
    <PageLayout
      title="Contact Us - MobiRides | Get Support & Connect"
      description="Contact MobiRides for support, partnerships, or inquiries. Multiple ways to reach us including phone, email, WhatsApp, and office visits. 24/7 emergency support available."
      canonical="https://mobirides.bw/contact"
      jsonLd={jsonLd}
    >

      <PageHero
        title="Contact Us"
        subtitle="We're here to help. Reach out through any of our contact channels or visit one of our offices."
        backgroundImage="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20customer%20service%20center%20with%20friendly%20staff%20helping%20customers%2C%20bright%20and%20welcoming%20office%20environment%2C%20professional%20business%20setting%2C%20clean%20and%20modern%20design&image_size=landscape_16_9"
      />

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you. Our team is ready to assist with any questions or concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {method.description}
                  </p>
                  {method.action ? (
                    <a 
                      href={method.action}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <span className="text-blue-600 font-medium">
                      {method.value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Office Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Visit Our Offices
              </h2>
              
              {/* Office Selector */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {contactInfo.offices.map((office) => (
                    <button
                      key={office.id}
                      onClick={() => setSelectedOffice(office)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedOffice.id === office.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {office.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Office Details */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedOffice.name}</h3>
                    <p className="text-gray-600">{selectedOffice.address.street}</p>
                    <p className="text-gray-600">{selectedOffice.address.city}, {selectedOffice.address.country}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <a 
                    href={`tel:${selectedOffice.phone}`}
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {selectedOffice.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a 
                    href={`mailto:${selectedOffice.email}`}
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {selectedOffice.email}
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium">Business Hours</p>
                    <p className="text-gray-600">Mon-Fri: {selectedOffice.businessHours.monday}</p>
                    <p className="text-gray-600">Sat: {selectedOffice.businessHours.saturday}</p>
                    <p className="text-gray-600">Sun: {selectedOffice.businessHours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Department Contacts
            </h2>
            <p className="text-lg text-gray-600">
              Reach out to specific departments for specialized assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.departments.map((dept) => {
              const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
                Users,
                Building,
                Globe
              };
              const IconComponent = iconMap[dept.icon] || Users;

              return (
                <div key={dept.name} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {dept.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {dept.description}
                  </p>
                  <div className="space-y-2">
                    <a 
                      href={`mailto:${dept.email}`}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{dept.email}</span>
                    </a>
                    {dept.phone && (
                      <a 
                        href={`tel:${dept.phone}`}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{dept.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Media & Additional Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Social Media */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Follow Us
              </h2>
              <p className="text-gray-600 mb-6">
                Stay connected with us on social media for updates, tips, and community news.
              </p>
              <div className="flex space-x-4">
                {contactInfo.socialMedia.map((social) => {
                  const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                      aria-label={`Follow us on ${social.platform}`}
                    >
                      <IconComponent className="h-6 w-6 text-gray-700" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Additional Information
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Response Times</h3>
                  <p className="text-gray-600 text-sm">
                    We aim to respond to all inquiries within 24 hours during business days. 
                    Emergency support is available 24/7.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                  <p className="text-gray-600 text-sm">
                    Our support team is available in English and Setswana. 
                    Additional language support may be available upon request.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
                  <p className="text-gray-600 text-sm">
                    All our offices are wheelchair accessible. If you need special 
                    accommodations, please let us know in advance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;