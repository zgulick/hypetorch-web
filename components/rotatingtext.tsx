"use client";

import { useState, useEffect } from 'react';

const RotatingText = () => {
  const terms = [
    "court",
    "field", 
    "screen",
    "pitch",
    "stage",
    "platform"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % terms.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [terms.length]);
  
  return (
    <span className="inline">
      off-<span className="text-orange-400">{terms[currentIndex]}</span> performance
    </span>
  );
};

export default RotatingText;