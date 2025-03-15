"use client";

import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface ComparisonCardProps {
  title: string;
  entityOne: {
    name: string;
    value: number;
  };
  entityTwo: {
    name: string;
    value: number;
  };
  higherIsBetter?: boolean;
  formatValue?: (value: number) => string;
}

export default function ComparisonCard({ 
  title, 
  entityOne, 
  entityTwo, 
  higherIsBetter = true,
  formatValue = (value) => value.toFixed(2)
}: ComparisonCardProps) {
  // Calculate the difference and percentage
  const difference = entityOne.value - entityTwo.value;
  const percentageDiff = entityTwo.value !== 0
    ? (difference / entityTwo.value) * 100
    : difference * 100;
  
  // Determine which entity is "better" according to the metric
  const entityOneIsBetter = higherIsBetter ? (difference > 0) : (difference < 0);
  const entityTwoIsBetter = higherIsBetter ? (difference < 0) : (difference > 0);
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${entityOneIsBetter ? 'bg-green-900/20 border border-green-900' : 'bg-gray-700/30'}`}>
          <p className="text-sm text-gray-400 mb-1">{entityOne.name}</p>
          <p className={`text-2xl font-bold ${entityOneIsBetter ? 'text-green-400' : ''}`}>
            {formatValue(entityOne.value)}
          </p>
        </div>
        
        <div className={`p-4 rounded-lg ${entityTwoIsBetter ? 'bg-green-900/20 border border-green-900' : 'bg-gray-700/30'}`}>
          <p className="text-sm text-gray-400 mb-1">{entityTwo.name}</p>
          <p className={`text-2xl font-bold ${entityTwoIsBetter ? 'text-green-400' : ''}`}>
            {formatValue(entityTwo.value)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center text-sm">
          <span className="text-gray-400 mr-2">Difference:</span>
          <span className={`flex items-center ${
            difference === 0 
              ? 'text-gray-400' 
              : entityOneIsBetter 
                ? 'text-green-400' 
                : 'text-red-400'
          }`}>
            {difference === 0 ? (
              <Minus size={16} className="mr-1" />
            ) : entityOneIsBetter ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            {formatValue(Math.abs(difference))} ({Math.abs(percentageDiff).toFixed(1)}%)
          </span>
        </div>
      </div>
    </div>
  );
}