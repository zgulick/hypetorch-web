"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// ContactForm is ~400 lines plus a dozen icons, and every page that mounts a
// ContactModal (the demo page mounts three, all closed) was pulling it into the
// initial bundle to render nothing. Load it only when a modal actually opens.
const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: () => (
    <div className="p-8 space-y-4" aria-busy="true">
      <div className="h-10 rounded bg-gray-700/60 animate-pulse" />
      <div className="h-10 rounded bg-gray-700/60 animate-pulse" />
      <div className="h-28 rounded bg-gray-700/60 animate-pulse" />
    </div>
  )
});

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 max-w-lg w-full my-8">
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