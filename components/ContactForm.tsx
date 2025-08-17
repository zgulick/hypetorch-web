"use client";

import { useState } from 'react';
import { Mail, Building, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2, Shield, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ContactFormProps {
  title: string;
  subtitle?: string;
  inquiryType: 'demo' | 'partnership' | 'api_access' | 'support' | 'sales';
  onClose?: () => void;
}

export default function ContactForm({ title, subtitle, inquiryType, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: inquiryType,
    message: '',
    preferredDate: ''
  });
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const validatePhone = (phone: string): boolean => {
    // Allow various phone formats: +1234567890, (123) 456-7890, 123-456-7890, 1234567890
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.company.trim()) {
      errors.company = 'Company is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('submitting');
    setErrorMessage('');

    try {
      const formspreeUrl = 'https://formspree.io/f/xzzvojja';
      
      console.log('Submitting to Formspree:', formspreeUrl);
      console.log('Form data:', formData);
      console.log('GDPR consent:', gdprConsent);
      
      // Create form data for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('inquiryType', formData.inquiryType);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('preferredDate', formData.preferredDate);
      formDataToSend.append('subject', getSubjectForInquiry(inquiryType));
      formDataToSend.append('gdprConsent', gdprConsent ? 'Yes' : 'No');
      
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      // Check if we got JSON response or if it's a redirect
      const contentType = response.headers.get('content-type');
      console.log('Response content type:', contentType);
      
      let responseData;
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
        console.log('Success response (JSON):', responseData);
      } else {
        // Handle non-JSON response (likely a redirect or HTML)
        const responseText = await response.text();
        console.log('Success response (Text):', responseText.substring(0, 200) + '...');
        responseData = { success: true };
      }
      
      setStatus('success');
      
      // Auto-close form after success
      setTimeout(() => {
        if (onClose) onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Detailed error submitting form:', error);
      setStatus('error');
      
      // More specific error message
      let errorMsg = 'Failed to submit form. Please try again or email us directly at hypetorch@gmail.com';
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          errorMsg = 'Form endpoint not found. Please email us directly at hypetorch@gmail.com';
        } else if (error.message.includes('403')) {
          errorMsg = 'Form submission blocked. Please email us directly at hypetorch@gmail.com';
        } else if (error.message.includes('422')) {
          errorMsg = 'Please check all required fields and try again.';
        }
      }
      setErrorMessage(errorMsg);
    }
  };

  const getSubjectForInquiry = (type: string): string => {
    switch (type) {
      case 'demo': return 'HypeTorch Platform Demo Request';
      case 'partnership': return 'HypeTorch Partnership Inquiry';
      case 'api_access': return 'HypeTorch API Access Request';
      case 'support': return 'HypeTorch Support Request';
      case 'sales': return 'HypeTorch Sales Inquiry';
      default: return 'HypeTorch Inquiry';
    }
  };


  const isFormValid = formData.name && formData.email && formData.company && formData.message && gdprConsent;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {status === 'success' ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-green-400 mb-2">Thank You!</h4>
          <p className="text-gray-300 text-sm">
            Your inquiry has been submitted. We&rsquo;ll get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`w-full bg-gray-700 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                validationErrors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Your full name"
            />
            {validationErrors.name && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full bg-gray-700 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                validationErrors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="your@company.com"
            />
            {validationErrors.email && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full bg-gray-700 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                validationErrors.phone ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {validationErrors.phone && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              <Building className="w-4 h-4 inline mr-1" />
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className={`w-full bg-gray-700 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                validationErrors.company ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Your company name"
            />
            {validationErrors.company && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.company}</p>
            )}
          </div>

          {inquiryType === 'demo' && (
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Preferred Demo Date
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                We&apos;ll contact you to schedule a time that works for both of us
              </p>
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className={`w-full bg-gray-700 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                validationErrors.message ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder={getPlaceholderForInquiry(inquiryType)}
            />
            {validationErrors.message && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="gdprConsent"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                className="mt-1 w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                required
              />
              <label htmlFor="gdprConsent" className="text-sm text-gray-300 flex-1">
                <Shield className="w-4 h-4 inline mr-1" />
                I consent to the processing of my personal data as described in the{" "}
                <Link href="/privacy-policy" className="text-orange-400 hover:underline">
                  Privacy Policy
                </Link>
                . This includes storing and using the information I provide to respond to my inquiry. *
              </label>
            </div>
          </div>

          {status === 'error' && (
            <div className="bg-red-900/30 border border-red-800 p-3 rounded-lg">
              <p className="text-red-200 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errorMessage}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || status === 'submitting'}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            We&rsquo;ll respond within 24 hours during business days
          </p>
        </form>
      )}
    </div>
  );
}

function getPlaceholderForInquiry(type: string): string {
  switch (type) {
    case 'demo':
      return 'Tell us about your use case and what you would like to see in the demo...';
    case 'partnership':
      return 'Describe your organization and potential partnership opportunity...';
    case 'api_access':
      return 'Describe your intended use case for the HypeTorch API...';
    case 'support':
      return 'Describe the issue you are experiencing or question you have...';
    case 'sales':
      return 'Tell us about your organization and analytics needs...';
    default:
      return 'How can we help you?';
  }
}