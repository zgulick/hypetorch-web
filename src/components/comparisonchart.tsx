"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

interface ComparisonChartProps {
  entityOne: {
    name: string;
    color: string;
    data: {
      [key: string]: number;
    };
  };
  entityTwo: {
    name: string;
    color: string;
    data: {
      [key: string]: number;
    };
  };
  metrics: Array<{
    key: string;
    label: string;
  }>;
  title: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-lg">
        <p className="font-medium text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm flex items-center">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color as string }}
            />
            <span className="font-medium">{entry.name}: </span>
            <span className="ml-1 text-gray-300">
              {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ComparisonChart({ entityOne, entityTwo, metrics, title }: ComparisonChartProps) {
  // Format data for the chart
  const chartData = metrics.map(metric => ({
    name: metric.label,
    [entityOne.name]: entityOne.data[metric.key] || 0,
    [entityTwo.name]: entityTwo.data[metric.key] || 0,
  }));

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-medium mb-6">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey={entityOne.name} 
              fill={entityOne.color} 
              radius={[4, 0, 0, 4]} 
            />
            <Bar 
              dataKey={entityTwo.name} 
              fill={entityTwo.color} 
              radius={[0, 4, 4, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}