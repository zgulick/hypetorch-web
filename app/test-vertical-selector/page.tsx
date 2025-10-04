'use client';

import { useState } from 'react';
import VerticalSelector from '@/components/VerticalSelector';

export default function TestPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 p-12">
      <h1 className="text-white text-2xl mb-8">Vertical Selector Test</h1>

      <VerticalSelector
        selected={selected}
        onChange={setSelected}
      />

      <div className="text-white mt-8">
        <p>Selected: {selected === null ? 'All Verticals' : selected}</p>
      </div>
    </div>
  );
}