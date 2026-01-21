import React from 'react';
import { PageLayout, PageHero, SectionWrapper } from '../components/layouts';
import { buildCanonicalUrl } from '@/config/site';
import FAQSection from '../components/FAQSection';
import ContactForm from '../components/ContactForm';
import DocumentDownload from '../components/DocumentDownload';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Shield, 
  Phone, 
  FileText, 
  Users, 
  Car, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Heart,
  Lock,
  Camera,
  Smartphone
} from 'lucide-react';
import faqData from '../data/faq-data.json';

const SafetyPage: React.FC = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Comprehensive Damage Protection',
      description: 'Every rental is covered by our damage liability waiver with up to P1M liability coverage, powered by Pay-U.',
      details: ['Collision & comprehensive coverage', 'Liability protection', 'Uninsured motorist coverage', '24/7 claims support']
    },
    {
      icon: Users,
      title: 'Verified Community',
      description: 'All users undergo thorough background checks and identity verification before joining.',
      details: ['Background check screening', 'Driver license verification', 'Identity confirmation', 'Ongoing monitoring']
    },
    {
      icon: Car,
      title: 'Vehicle Safety Standards',
      description: 'Regular inspections and maintenance ensure all vehicles meet our strict safety requirements.',
      details: ['Annual safety inspections', 'Maintenance tracking', 'Real-time diagnostics', 'Emergency equipment']
    },
    {
      icon: Smartphone,
      title: 'Smart Technology',
      description: 'Advanced GPS tracking, remote monitoring, and instant communication keep everyone safe.',
      details: ['Real-time GPS tracking', 'Remote vehicle monitoring', 'Instant messaging', 'Emergency alerts']
    }
  ];

  const emergencySteps = [
    {
      step: 1,
      title: 'Ensure Safety First',
      description: 'Move to a safe location if possible and check for injuries.',
      icon: Heart
    },
    {
      step: 2,
      title: 'Call Emergency Services',
      description: 'If there are injuries or significant damage, call 911 immediately.',
      icon: Phone
    },
    {
      step: 3,
      title: 'Contact MobiRides',
      description: 'Use our 24/7 emergency hotline or in-app emergency button.',
      icon: AlertTriangle
    },
    {
      step: 4,
      title: 'Document the Scene',
      description: 'Take photos and gather information from all parties involved.',
      icon: Camera
    },
    {
      step: 5,
      title: 'File a Report',
      description: 'Complete the incident report through our app or website.',
      icon: FileText
    }
  ];

  const safetyStats = [
    { label: 'Safety Rating', value: '4.9/5', description: 'User safety satisfaction' },
    { label: 'Response Time', value: '<2 min', description: 'Emergency support response' },
    { label: 'Incident Rate', value: '0.02%', description: 'Of total rides completed' },
    { label: 'Claims Resolved', value: '99.8%', description: 'Within 48 hours' }
  ];

  const safetyDocuments = [
    {
      id: 'safety-guide-001',
      title: 'MobiRides Safety Guide',
      description: 'Comprehensive safety guidelines for using MobiRides services.',
      type: 'pdf' as const,
      size: '2.4 MB',
      category: 'guide',
      downloadUrl: '/documents/safety-guide.pdf',
      lastUpdated: '2024-01-15',
      publishedDate: '2024-01-15',
      tags: ['safety', 'guide']
    },
    {
      id: 'damage-waiver',
      title: 'Damage Waiver Details',
      description: 'Full damage liability waiver details and claim procedures',
      type: 'pdf' as const,
      size: '1.8 MB',
      category: 'protection',
      downloadUrl: '/documents/damage-waiver.pdf',
      lastUpdated: '2024-01-10',
      publishedDate: '2024-01-10',
      tags: ['damage protection', 'claims']
    },
    {
      id: 'emergency-contacts',
      title: 'Emergency Contact List',
      description: 'Important phone numbers and emergency contacts',
      type: 'pdf' as const,
      size: '0.5 MB',
      category: 'emergency',
      downloadUrl: '/documents/emergency-contacts.pdf',
      lastUpdated: '2024-01-20',
      publishedDate: '2024-01-20',
      tags: ['emergency', 'contacts']
    },
    {
      id: 'incident-form',
      title: 'Incident Report Form',
      description: 'Printable form for documenting incidents',
      type: 'pdf' as const,
      size: '0.3 MB',
      category: 'forms',
      downloadUrl: '/documents/incident-form.pdf',
      lastUpdated: '2024-01-05',
      publishedDate: '2024-01-05',
      tags: ['incident', 'form']
    }
  ];

  const safetyFAQs = faqData.safety || [];

  return (
    <PageLayout
      title="Safety First - MobiRides Security & Insurance Coverage"
      description="Learn about MobiRides' comprehensive safety measures, insurance coverage, emergency procedures, and community protection protocols."
      keywords="MobiRides safety, car sharing insurance, emergency procedures, vehicle safety, community protection"
      canonical={buildCanonicalUrl('/safety')}
    >
      <PageHero
        title="Your Safety is Our Priority"
        subtitle="Comprehensive Protection for Every Journey"
        description="From verified users to comprehensive insurance coverage, we've built multiple layers of protection to ensure your peace of mind on every ride."
        variant="gradient"
        ctaText="View Safety Guide"
        ctaLink="#safety-guide"
      />

      {/* Emergency Alert */}
      <SectionWrapper className="py-8">
        <Alert className="max-w-4xl mx-auto border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency Hotline: 1-800-MOBI-911</strong> - Available 24/7 for immediate assistance during your ride.
          </AlertDescription>
        </Alert>
      </SectionWrapper>

      {/* Safety Stats */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Safety by the Numbers
            </h2>
            <p className="text-lg text-gray-600">
              Our commitment to safety is reflected in our track record and user satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {safetyStats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Safety Features */}
      <SectionWrapper className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Multi-Layer Safety Protection
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've implemented comprehensive safety measures at every level to protect our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {safetyFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Emergency Procedures */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Emergency Procedures
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Know what to do in case of an emergency. Follow these steps to ensure everyone's safety.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {emergencySteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="p-4 bg-red-100 rounded-full">
                          <IconComponent className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                          {step.step}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Alert className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
              <Phone className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Remember:</strong> Our 24/7 emergency support team is always available at 1-800-MOBI-911 or through the emergency button in your app.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </SectionWrapper>

      {/* Damage Protection Coverage Details */}
      <SectionWrapper className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Comprehensive Damage Protection
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <div className="text-3xl font-bold mb-2">P1M</div>
              <div className="text-lg font-medium mb-2">Liability Coverage</div>
              <div className="text-sm opacity-90">Protection for third-party damages</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold mb-2">P800K</div>
              <div className="text-lg font-medium mb-2">Vehicle Damage</div>
              <div className="text-sm opacity-90">Vehicle damage protection</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-lg font-medium mb-2">Claims Support</div>
              <div className="text-sm opacity-90">Round-the-clock assistance</div>
            </div>
          </div>

          <p className="text-lg mb-8 opacity-90">
            Every MobiRides rental is automatically covered by our comprehensive damage liability waiver, powered by Pay-U's cloud-based repair network, providing peace of mind for both hosts and renters.
          </p>

          <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
            <a href="/damage-protection">View Full Protection Details</a>
          </Button>
        </div>
      </SectionWrapper>

      {/* Safety Documents */}
      <SectionWrapper className="py-16" id="safety-guide">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Safety Resources &amp; Documents
            </h2>
            <p className="text-lg text-gray-600">
              Download important safety guides, forms, and reference materials.
            </p>
          </div>

          <DocumentDownload 
            documents={safetyDocuments}
            showSearch={false}
            showStats={false}
          />
        </div>
      </SectionWrapper>

      {/* Safety FAQ */}
      <SectionWrapper className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Safety Questions &amp; Answers
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common safety and security questions.
            </p>
          </div>

          <FAQSection 
            items={safetyFAQs}
            searchable={true}
            categories={[]}
            title=""
          />
        </div>
      </SectionWrapper>

      {/* Contact Safety Team */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Contact Our Safety Team
            </h2>
            <p className="text-lg text-gray-600">
              Have safety concerns or questions? Our dedicated safety team is here to help.
            </p>
          </div>

          <ContactForm type="support" onSubmit={() => {}} />
        </div>
      </SectionWrapper>
    </PageLayout>
  );
};

export default SafetyPage;