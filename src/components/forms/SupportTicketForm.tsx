import React, { useState } from 'react';
import { Send, Upload, X, AlertCircle, CheckCircle } from 'lucide-react';

interface SupportTicketFormProps {
  onSubmit?: (data: SupportTicketData) => void;
  className?: string;
}

interface SupportTicketData {
  name: string;
  email: string;
  phone?: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
  attachments: File[];
}

interface FormErrors {
  [key: string]: string;
}

const SupportTicketForm: React.FC<SupportTicketFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<SupportTicketData>({
    name: '',
    email: '',
    phone: '',
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    attachments: []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'account', label: 'Account Management' },
    { value: 'safety', label: 'Safety Concern' },
    { value: 'driver', label: 'Driver Support' },
    { value: 'rider', label: 'Rider Support' },
    { value: 'partnership', label: 'Partnership Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SupportTicketData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} is not supported. Please upload images, PDFs, or text files.`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles].slice(0, 5) // Max 5 files
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: '',
          priority: 'medium',
          subject: '',
          description: '',
          attachments: []
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting support ticket:', error);
      alert('There was an error submitting your ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-8 text-center ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-900 mb-2">Ticket Submitted Successfully!</h3>
        <p className="text-green-700 mb-4">
          We've received your support request and will get back to you within 24 hours.
        </p>
        <p className="text-sm text-green-600">
          Ticket ID: #ST{Date.now().toString().slice(-6)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.category ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.category}
            </p>
          )}
        </div>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority Level
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {priorities.map(priority => (
            <label
              key={priority.value}
              className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.priority === priority.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={priority.value}
                checked={formData.priority === priority.value}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="sr-only"
              />
              <span className={`text-sm font-medium ${priority.color}`}>
                {priority.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.subject ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Brief description of your issue"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.subject}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          rows={6}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description ? (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.description}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Minimum 10 characters required
            </p>
          )}
          <p className="text-sm text-gray-400">
            {formData.description.length}/1000
          </p>
        </div>
      </div>

      {/* File Attachments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachments (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Upload screenshots, documents, or other relevant files
          </p>
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.txt"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            Choose Files
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Max 5 files, 10MB each. Supported: JPG, PNG, GIF, PDF, TXT
          </p>
        </div>

        {/* Attachment List */}
        {formData.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Upload className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit Ticket
            </>
          )}
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </a>
        .
      </div>
    </form>
  );
};

export default SupportTicketForm;