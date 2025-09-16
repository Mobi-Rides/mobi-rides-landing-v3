import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Building, Users, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface PartnerContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

interface FormData {
  // Step 1: Partner Type
  partnerType: string;
  
  // Step 2: Business Info
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  companySize: string;
  location: string;
  
  // Step 3: Interests
  interests: string[];
  description: string;
  timeline: string;
  
  // Step 4: Contact Preferences
  preferredContact: string;
  bestTimeToCall: string;
  newsletter: boolean;
}

const initialFormData: FormData = {
  partnerType: '',
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  website: '',
  companySize: '',
  location: '',
  interests: [],
  description: '',
  timeline: '',
  preferredContact: '',
  bestTimeToCall: '',
  newsletter: false
};

const partnerTypes = [
  { id: 'fleet', name: 'Fleet Owner', description: 'Vehicle fleet management and rental' },
  { id: 'insurance', name: 'Insurance Provider', description: 'Insurance products and services' },
  { id: 'financier', name: 'Financial Institution', description: 'Financing and payment solutions' },
  { id: 'workshop', name: 'Auto Workshop', description: 'Vehicle maintenance and repair services' },
  { id: 'dealership', name: 'Car Dealership', description: 'Vehicle sales and trade-ins' },
  { id: 'fuel', name: 'Fuel Partner', description: 'Fuel stations and energy solutions' },
  { id: 'technology', name: 'Technology Provider', description: 'Tech solutions and integrations' },
  { id: 'other', name: 'Other', description: 'Other partnership opportunities' }
];

const interestOptions = [
  'Revenue Sharing',
  'Technology Integration',
  'Market Expansion',
  'Customer Acquisition',
  'Brand Partnership',
  'Data Analytics',
  'API Access',
  'White Label Solutions',
  'Joint Marketing',
  'Exclusive Partnership'
];

export const PartnerContactForm: React.FC<PartnerContactFormProps> = ({ 
  className = '',
  onSuccess 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.interests;
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    updateFormData({ interests: updatedInterests });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.partnerType;
      case 2:
        return !!(formData.companyName && formData.contactPerson && formData.email && formData.phone);
      case 3:
        return formData.interests.length > 0 && !!formData.timeline;
      case 4:
        return !!formData.preferredContact;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error('Please fill in all required fields before continuing.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      toast.success('Partnership inquiry submitted successfully!');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`w-full max-w-2xl mx-auto ${className}`}>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground mb-4">
            Your partnership inquiry has been submitted successfully. Our business development team will review your information and contact you within 2-3 business days.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Next Steps:</strong> We'll send you a confirmation email shortly with additional information about our partnership process.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-6 w-6" />
          Partner with MobiRides
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Step 1: Partner Type */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">What type of partner are you?</h3>
              <p className="text-muted-foreground mb-4">
                Select the category that best describes your business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {partnerTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.partnerType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateFormData({ partnerType: type.id })}
                >
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm text-muted-foreground">{type.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Business Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Business Information</h3>
              <p className="text-muted-foreground mb-4">
                Tell us about your company
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData({ companyName: e.target.value })}
                  placeholder="Your company name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => updateFormData({ contactPerson: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="your.email@company.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  placeholder="+267 XX XXX XXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateFormData({ website: e.target.value })}
                  placeholder="https://yourcompany.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Select value={formData.companySize} onValueChange={(value) => updateFormData({ companySize: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Primary Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData({ location: e.target.value })}
                placeholder="City, Country"
              />
            </div>
          </div>
        )}

        {/* Step 3: Partnership Interests */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Partnership Interests</h3>
              <p className="text-muted-foreground mb-4">
                What aspects of partnership interest you most?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Areas of Interest *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? 'default' : 'outline'}
                      className="cursor-pointer justify-center p-2 h-auto"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Partnership Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData({ description: e.target.value })}
                  placeholder="Describe your partnership goals and how you envision working with MobiRides..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Expected Timeline *</Label>
                <Select value={formData.timeline} onValueChange={(value) => updateFormData({ timeline: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="When would you like to start?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediately</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6-12months">6-12 months</SelectItem>
                    <SelectItem value="exploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Preferences */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Preferences</h3>
              <p className="text-muted-foreground mb-4">
                How would you prefer us to contact you?
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base font-medium">Preferred Contact Method *</Label>
                <div className="space-y-2">
                  {[
                    { id: 'email', label: 'Email', icon: Mail },
                    { id: 'phone', label: 'Phone Call', icon: Phone },
                    { id: 'both', label: 'Both Email and Phone', icon: Users }
                  ].map(({ id, label, icon: Icon }) => (
                    <div
                      key={id}
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.preferredContact === id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => updateFormData({ preferredContact: id })}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {(formData.preferredContact === 'phone' || formData.preferredContact === 'both') && (
                <div className="space-y-2">
                  <Label htmlFor="bestTimeToCall">Best Time to Call</Label>
                  <Select value={formData.bestTimeToCall} onValueChange={(value) => updateFormData({ bestTimeToCall: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => updateFormData({ newsletter: !!checked })}
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to MobiRides partner newsletter for updates and opportunities
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerContactForm;