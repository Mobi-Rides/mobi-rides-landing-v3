import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}

interface ContactFormProps {
  type?: 'general' | 'support' | 'business' | 'host';
  onSubmit: (data: ContactFormData) => void;
  showSubject?: boolean;
  showPriority?: boolean;
  showPhone?: boolean;
  title?: string;
  description?: string;
  className?: string;
  loading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  type = 'general',
  onSubmit,
  showSubject = true,
  showPriority = false,
  showPhone = true,
  title,
  description,
  className = '',
  loading = false
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium',
    category: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  // Form configuration based on type
  const formConfig = {
    general: {
      title: 'Get in Touch',
      description: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      categories: ['General Inquiry', 'Partnership', 'Feedback', 'Other']
    },
    support: {
      title: 'Contact Support',
      description: 'Need help? Our support team is here to assist you.',
      categories: ['Technical Issue', 'Account Problem', 'Billing Question', 'Feature Request']
    },
    business: {
      title: 'Business Inquiry',
      description: 'Interested in our business solutions? Let\'s discuss how we can help.',
      categories: ['Enterprise Solutions', 'Partnership', 'API Access', 'Custom Integration']
    },
    host: {
      title: 'Host Support',
      description: 'Questions about hosting? We\'re here to help you succeed.',
      categories: ['Vehicle Requirements', 'Insurance Questions', 'Earnings', 'Community']
    }
  };

  const config = formConfig[type];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (showSubject && !formData.subject?.trim()) {
      newErrors.subject = 'Subject is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className={`max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          {title || config.title}
        </CardTitle>
        {(description || config.description) && (
          <p className="text-gray-600">
            {description || config.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          {showPhone && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+267 74300747"
              />
            </div>
          )}

          {/* Category and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {config.categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            {showPriority && (
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') => handleInputChange('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Low</Badge>
                        <span>General inquiry</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Medium</Badge>
                        <span>Standard support</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">High</Badge>
                        <span>Urgent issue</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Subject */}
          {showSubject && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={errors.subject ? 'border-red-500' : ''}
                placeholder="Brief description of your inquiry"
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject}</p>
              )}
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
              placeholder="Please provide details about your inquiry..."
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </div>
            )}
          </Button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Or reach us directly:</p>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{siteConfig.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{siteConfig.contact.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;