import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageLayout, PageHero, CTASection, SectionWrapper } from '../components/layouts';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { 
  Handshake, 
  Building2, 
  Shield, 
  CreditCard, 
  Wrench, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  Calendar,
  Zap
} from 'lucide-react';
import partnersData from '../data/partners.json';

interface FormData {
  // Step 1: Basic Information
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  
  // Step 2: Partnership Details
  partnershipType: string;
  businessDescription: string;
  servicesOffered: string[];
  yearsInBusiness: string;
  
  // Step 3: Capabilities
  coverage: string[];
  capacity: string;
  certifications: string[];
  references: string;
  
  // Step 4: Agreement
  agreedToTerms: boolean;
  marketingConsent: boolean;
}

const PartnersPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: '',
    businessDescription: '',
    servicesOffered: [],
    yearsInBusiness: '',
    coverage: [],
    capacity: '',
    certifications: [],
    references: '',
    agreedToTerms: false,
    marketingConsent: false
  });

  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string | string[] | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayUpdate = (field: keyof FormData, value: string, checked: boolean) => {
    const currentArray = formData[field] as string[];
    if (checked) {
      updateFormData(field, [...currentArray, value]);
    } else {
      updateFormData(field, currentArray.filter(item => item !== value));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const isStepValid = (step: number): boolean => {
    // Allow navigation through all steps without validation
    // Users can browse all steps and fill information at any point
    return true;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Partner with Us - Mobirides",
    "description": "Join our network of trusted partners and grow your business with Mobirides. Partnership opportunities for fleet owners, insurance providers, and service providers.",
    "url": "https://mobirides.com/partners",
    "mainEntity": {
      "@type": "Organization",
      "name": "Mobirides Partnership Program",
      "description": "Strategic partnerships for sustainable growth in Botswana's mobility sector"
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Basic Information
              </h3>
              <p className="text-gray-600">
                Tell us about your company and how we can reach you
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  placeholder="Your company name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => updateFormData('contactPerson', e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="contact@company.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+267 XX XXX XXX"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  placeholder="https://www.company.com"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Partnership Details
              </h3>
              <p className="text-gray-600">
                Help us understand your business and partnership interests
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="partnershipType">Partnership Type *</Label>
                <Select value={formData.partnershipType} onValueChange={(value) => updateFormData('partnershipType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select partnership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fleet-owner">Fleet Owner</SelectItem>
                    <SelectItem value="insurance">Insurance Provider</SelectItem>
                    <SelectItem value="financial">Financial Partner</SelectItem>
                    <SelectItem value="service">Service Provider</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="businessDescription">Business Description *</Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => updateFormData('businessDescription', e.target.value)}
                  placeholder="Describe your business, services, and what makes you unique..."
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label>Services Offered (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {[
                    'Vehicle Rental',
                    'Insurance Coverage',
                    'Maintenance Services',
                    'Roadside Assistance',
                    'Fleet Management',
                    'Financial Services',
                    'Technology Solutions',
                    'Marketing Support',
                    'Training Programs'
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.servicesOffered.includes(service)}
                        onCheckedChange={(checked) => handleArrayUpdate('servicesOffered', service, checked as boolean)}
                      />
                      <Label htmlFor={service} className="text-sm">{service}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                <Select value={formData.yearsInBusiness} onValueChange={(value) => updateFormData('yearsInBusiness', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select years in business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Capabilities & Coverage
              </h3>
              <p className="text-gray-600">
                Tell us about your operational capacity and service areas
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label>Service Coverage Areas *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {[
                    'Gaborone',
                    'Francistown',
                    'Maun',
                    'Kasane',
                    'Palapye',
                    'Serowe',
                    'Lobatse',
                    'Jwaneng',
                    'Nationwide'
                  ].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.coverage.includes(area)}
                        onCheckedChange={(checked) => handleArrayUpdate('coverage', area, checked as boolean)}
                      />
                      <Label htmlFor={area} className="text-sm">{area}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="capacity">Service Capacity *</Label>
                <Select value={formData.capacity} onValueChange={(value) => updateFormData('capacity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your service capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-10 units/clients)</SelectItem>
                    <SelectItem value="medium">Medium (11-50 units/clients)</SelectItem>
                    <SelectItem value="large">Large (51-200 units/clients)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (200+ units/clients)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Certifications & Licenses</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {[
                    'Business License',
                    'Insurance License',
                    'ISO Certification',
                    'Safety Certification',
                    'Quality Assurance',
                    'Environmental Compliance'
                  ].map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert}
                        checked={formData.certifications.includes(cert)}
                        onCheckedChange={(checked) => handleArrayUpdate('certifications', cert, checked as boolean)}
                      />
                      <Label htmlFor={cert} className="text-sm">{cert}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="references">References (Optional)</Label>
                <Textarea
                  id="references"
                  value={formData.references}
                  onChange={(e) => updateFormData('references', e.target.value)}
                  placeholder="Please provide contact information for 2-3 business references..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Terms & Agreement
              </h3>
              <p className="text-gray-600">
                Review and agree to our partnership terms
              </p>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Company:</span>
                      <span>{formData.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Partnership Type:</span>
                      <span className="capitalize">{formData.partnershipType.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Coverage Areas:</span>
                      <span>{formData.coverage.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Capacity:</span>
                      <span className="capitalize">{formData.capacity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) => updateFormData('agreedToTerms', checked)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and 
                    <a href="#" className="text-blue-600 hover:underline"> Partnership Agreement</a>. 
                    I understand that this application will be reviewed and I will be contacted within 5 business days.
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketingConsent}
                    onCheckedChange={(checked) => updateFormData('marketingConsent', checked)}
                  />
                  <Label htmlFor="marketing" className="text-sm leading-relaxed">
                    I consent to receive marketing communications and partnership updates from Mobirides. 
                    You can unsubscribe at any time.
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <PageLayout
      title="Partner with Mobirides - Grow Your Business | Mobirides"
      description="Join our network of trusted partners in Botswana. Partnership opportunities for fleet owners, insurance providers, financial partners, and service providers."
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <PageHero
        title="Partner with Mobirides"
        subtitle="Strategic Partnerships"
        description="Join our network of trusted partners and grow your business while contributing to Botswana's mobility ecosystem."
        ctaText="Apply for Partnership"
        ctaHref="#application"
        backgroundImage="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=business%20partnership%20handshake%20modern%20office%20Botswana%20professional%20setting%20corporate%20meeting&image_size=landscape_16_9"
        variant="gradient"
      />

      {/* Partner Categories Section */}
      <SectionWrapper background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Partnership Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're looking for strategic partners across different sectors to enhance our service offering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnersData.categories.map((category, index) => {
            const icons = {
              'Fleet Owners': <Building2 className="w-8 h-8 text-blue-600" />,
              'Insurance Providers': <Shield className="w-8 h-8 text-green-600" />,
              'Financial Partners': <CreditCard className="w-8 h-8 text-purple-600" />,
              'Service Providers': <Wrench className="w-8 h-8 text-orange-600" />
            };
            
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {icons[category.name as keyof typeof icons]}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm text-gray-800">Benefits:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {category.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Badge variant="secondary" className="text-xs">
                    {category.requirements.length} Requirements
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Value Proposition Section */}
      <SectionWrapper background="gray" padding="medium">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Partner with Mobirides?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join Botswana's leading mobility platform and unlock new growth opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnersData.valuePropositions.map((value, index) => {
            const icons = {
              'Revenue Growth': <TrendingUp className="w-12 h-12 text-green-600" />,
              'Technology Integration': <Zap className="w-12 h-12 text-blue-600" />,
              'Market Expansion': <Globe className="w-12 h-12 text-purple-600" />,
              'Risk Management': <Shield className="w-12 h-12 text-orange-600" />
            };
            
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  {icons[value.title as keyof typeof icons]}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Partnership Process Section */}
      <SectionWrapper background="white" padding="large">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Partnership Journey - What to Expect
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Understanding our partnership process helps you prepare for a successful collaboration
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From application to launch, here's your step-by-step journey with Mobirides
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {partnersData.partnershipProcess.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < partnersData.partnershipProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-300 transform translate-x-4 z-0" />
                )}
                
                <div className="relative z-10 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{step.step}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    <Calendar className="w-4 h-4 mr-1" />
                    {step.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Process Benefits */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What Makes Our Process Different?
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Transparent Process</h4>
                <p className="text-gray-600 text-sm">Clear timelines and regular updates throughout your application journey</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Dedicated Support</h4>
                <p className="text-gray-600 text-sm">Personal partnership manager assigned from day one</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Fast Integration</h4>
                <p className="text-gray-600 text-sm">Streamlined onboarding gets you operational quickly</p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Partnership Journey?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join over 150+ partners already growing their business with Mobirides. 
              Your application takes less than 10 minutes to complete.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-3"
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Application Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* Partnership Application Form */}
      <SectionWrapper background="gray" padding="large" id="application">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Partnership Application
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Complete our multi-step application to join our partner network
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> You can navigate through all steps to preview what information is needed, then return to any step to fill in your details.
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-full h-1 mx-4 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Submit Application
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>



      <CTASection
        title="Ready to Partner with Us?"
        description="Join our growing network of partners and be part of Botswana's mobility revolution."
        actions={[
          {
            text: "Start Application",
            href: "#application",
            variant: "primary"
          },
          {
            text: "Contact Us",
            href: "tel:+2671234567",
            variant: "secondary",
            icon: <Phone className="w-4 h-4" />
          }
        ]}
      />
    </PageLayout>
  );
};

export default PartnersPage;