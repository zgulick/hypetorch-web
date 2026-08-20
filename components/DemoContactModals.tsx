'use client';

import React, { useState } from 'react';
import ContactModal from '@/components/ContactModal';

/**
 * The demo page's two contact modals, isolated into their own client island.
 *
 * These modals hold `useState`, which is why app/demo/page.tsx was previously
 * forced to be a client component — and why converting that page to a server
 * component threw React error #130. Keeping the state here lets the page itself
 * stay a server component while the modals remain fully interactive.
 */
export default function DemoContactModals() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  return (
    <>
      <ContactModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Schedule Full Demo"
        subtitle="See the complete HypeTorch platform in action"
        inquiryType="demo"
      />

      <ContactModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        title="Request API Access"
        subtitle="Get started with HypeTorch API integration"
        inquiryType="api_access"
      />
    </>
  );
}
