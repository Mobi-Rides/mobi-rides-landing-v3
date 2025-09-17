import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Eye, Lock, Users, FileText, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { PageLayout } from '../components/layouts';
import legalContent from '../data/legal-content.json';

interface PrivacySection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

const PrivacyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>('');

  const privacyPolicy = legalContent.privacyPolicy;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let current = '';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          current = section.getAttribute('data-section') || '';
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - MobiRides",
    "description": "Learn how MobiRides protects your privacy and handles your personal data. Our comprehensive privacy policy explains data collection, usage, and your rights.",
    "url": "https://mobirides.com/privacy",
    "mainEntity": {
      "@type": "PrivacyPolicy",
      "name": "MobiRides Privacy Policy",
      "dateModified": privacyPolicy.lastUpdated,
      "version": privacyPolicy.version,
      "effectiveDate": privacyPolicy.effectiveDate
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mobirides.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://mobirides.com/privacy"
        }
      ]
    }
  };

  const privacyIcons = {
    'data-collection': Shield,
    'data-usage': Eye,
    'data-sharing': Users,
    'data-security': Lock,
    'user-rights': FileText,
    'cookies': Clock
  };

  return (
    <PageLayout
      title="Privacy Policy - MobiRides | Data Protection & User Privacy"
      description="Learn how MobiRides protects your privacy and handles your personal data. Our comprehensive privacy policy explains data collection, usage, and your rights."
      canonical="https://mobirides.com/privacy"
      jsonLd={jsonLd}
    >

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Last updated: {privacyPolicy.lastUpdated}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Version: {privacyPolicy.version}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {privacyPolicy.sections.map((section: PrivacySection) => {
                  const IconComponent = privacyIcons[section.id as keyof typeof privacyIcons] || FileText;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <div className="space-y-8">
              {/* Effective Date Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Effective Date</h3>
                    <p className="text-blue-800 text-sm">
                      This Privacy Policy is effective as of {privacyPolicy.effectiveDate} and applies to all users of MobiRides services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Sections */}
              {privacyPolicy.sections.map((section: PrivacySection) => {
                const IconComponent = privacyIcons[section.id as keyof typeof privacyIcons] || FileText;
                const isExpanded = expandedSections.has(section.id);
                
                return (
                  <div 
                    key={section.id} 
                    data-section={section.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {section.content}
                          </p>
                          
                          {section.subsections && (
                            <div className="space-y-4">
                              {section.subsections.map((subsection, index) => (
                                <div key={index} className="border-l-4 border-gray-200 pl-4">
                                  <h4 className="font-medium text-gray-900 mb-2">{subsection.title}</h4>
                                  <p className="text-gray-600 text-sm leading-relaxed">{subsection.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Contact Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions About This Policy?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@mobirides.com</p>
                  <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>

              {/* Download Options */}
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-4">
                  You can download a copy of this privacy policy for your records.
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FileText className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;