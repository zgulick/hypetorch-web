// File path: hypetorch-web/app/compare/enhanced/ClientPage.tsx

"use client";

import { Suspense } from 'react';
import EnhancedComparisonComponent from './EnhancedComparisonComponent';

export default function ClientPageWrapper() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>}>
      <EnhancedComparisonComponent />
    </Suspense>
  );
}