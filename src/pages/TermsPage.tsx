import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Scale, FileText, Users, Shield, AlertTriangle, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PageLayout } from '../components/layouts';
import legalContent from '../data/legal-content.json';

interface TermsSection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

const TermsPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const termsOfService = legalContent.termsOfService;

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
    "name": "Terms of Service - MobiRides",
    "description": "Read MobiRides Terms of Service and user agreements. Understand your rights and responsibilities when using our ride-sharing platform.",
    "url": "https://www.mobirides.com/terms",
    "mainEntity": {
      "@type": "TermsOfService",
      "name": "MobiRides Terms of Service",
      "dateModified": termsOfService.lastUpdated,
      "version": termsOfService.version,
      "effectiveDate": termsOfService.effectiveDate
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.mobirides.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Terms of Service",
          "item": "https://www.mobirides.com/terms"
        }
      ]
    }
  };

  const termsIcons = {
    'acceptance': FileText,
    'user-accounts': Users,
    'service-usage': Scale,
    'payments': Shield,
    'liability': AlertTriangle,
    'termination': ExternalLink
  };

  return (
    <PageLayout
      title="Terms of Service - MobiRides | User Agreement & Legal Terms"
      description="Read MobiRides Terms of Service and user agreements. Understand your rights and responsibilities when using our ride-sharing platform."
      canonical="https://www.mobirides.com/terms"
      jsonLd={jsonLd}
    >

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-gray-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-slate-600 rounded-full">
                <Scale className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Please read these terms carefully before using MobiRides. By using our service, you agree to these terms and conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Last updated: {termsOfService.lastUpdated}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Version: {termsOfService.version}</span>
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
                {termsOfService.sections.map((section: TermsSection) => {
                  const IconComponent = termsIcons[section.id as keyof typeof termsIcons] || FileText;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-slate-50 text-slate-700 border-l-4 border-slate-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-medium text-slate-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <FileText className="h-4 w-4" />
                    Download PDF
                  </button>
                  <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    Print Version
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <div className="space-y-8">
              {/* Important Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">Important Notice</h3>
                    <p className="text-amber-800 text-sm mb-3">
                      These Terms of Service constitute a legally binding agreement between you and MobiRides. 
                      Please read them carefully as they affect your legal rights and obligations.
                    </p>
                    <p className="text-amber-800 text-sm">
                      <strong>Effective Date:</strong> {termsOfService.effectiveDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms Sections */}
              {termsOfService.sections.map((section: TermsSection) => {
                const IconComponent = termsIcons[section.id as keyof typeof termsIcons] || FileText;
                const isExpanded = expandedSections.has(section.id);
                
                return (
                  <div 
                    key={section.id} 
                    data-section={section.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-slate-600" />
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
                                <div key={index} className="border-l-4 border-slate-200 pl-4">
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

              {/* Agreement Acknowledgment */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Agreement Acknowledgment</h3>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    By using MobiRides services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms-acceptance"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms-acceptance" className="text-sm text-slate-600">
                      I have read and agree to the Terms of Service and understand my rights and obligations as a MobiRides user.
                    </label>
                  </div>
                  {acceptedTerms && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 text-sm font-medium">
                        ✓ Thank you for accepting our Terms of Service. You can now use all MobiRides features.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions About These Terms?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service or need clarification on any provisions, please contact our legal team:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> legal@mobirides.com</p>
                  <p><strong>Address:</strong> Legal Department, Plot 16530, Sehithwa Rd, Gaborone West - Phase 1, Gaborone, Botswana</p>
                  <p><strong>Phone:</strong> +267 74300747</p>
                </div>
              </div>

              {/* Related Documents */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Related Documents</h3>
                <p className="text-blue-800 mb-4">
                  These terms work together with other important documents:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="/privacy" 
                    className="flex items-center gap-3 p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Privacy Policy</div>
                      <div className="text-sm text-blue-700">How we handle your data</div>
                    </div>
                  </a>
                  <a 
                    href="/support" 
                    className="flex items-center gap-3 p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Community Guidelines</div>
                      <div className="text-sm text-blue-700">Platform usage rules</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsPage;