"use client";

import { useState } from 'react';
import { Mail, Building, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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
    company: '',
    inquiryType: inquiryType,
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // In a real implementation, this would send to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll create a mailto link as fallback
      const subject = getSubjectForInquiry(inquiryType);
      const body = formatEmailBody(formData);
      const mailtoLink = `mailto:hypetorch@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
      
      setStatus('success');
      
      // Auto-close form after success
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Failed to submit form. Please try again.');
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

  const formatEmailBody = (data: typeof formData): string => {
    return `Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Inquiry Type: ${data.inquiryType}

Message:
${data.message}

---
Sent from HypeTorch website contact form`;
  };

  const isFormValid = formData.name && formData.email && formData.company && formData.message;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full">
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
            Your inquiry has been submitted. We&apos;ll get back to you within 24 hours.
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
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your full name"
            />
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
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="your@company.com"
            />
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
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your company name"
            />
          </div>

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
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder={getPlaceholderForInquiry(inquiryType)}
            />
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
            We&apos;ll respond within 24 hours during business days
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