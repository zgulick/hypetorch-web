"use client";

import { Suspense } from 'react';
import EnhancedComparison from './page';

function EnhancedComparisonWrapper() {
  return <EnhancedComparison />;
}

export default function ClientPageWrapper() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>}>
      <EnhancedComparisonWrapper />
    </Suspense>
  );
}