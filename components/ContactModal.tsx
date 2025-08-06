"use client";

import { useEffect } from 'react';
import ContactForm from './ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  inquiryType: 'demo' | 'partnership' | 'api_access' | 'support' | 'sales';
}

export default function ContactModal({ isOpen, onClose, title, subtitle, inquiryType }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 max-w-md w-full">
        <ContactForm
          title={title}
          subtitle={subtitle}
          inquiryType={inquiryType}
          onClose={onClose}
        />
      </div>
    </div>
  );
}