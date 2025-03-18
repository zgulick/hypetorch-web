import React from 'react';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ParametersTableProps {
  params: Parameter[];
}

const ParametersTable: React.FC<ParametersTableProps> = ({ params }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full mb-4">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Name</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Type</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Required</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Description</th>
        </tr>
      </thead>
      <tbody>
        {params.map((param, index) => (
          <tr key={index} className="border-b border-gray-700">
            <td className="px-4 py-2 text-sm font-mono text-gray-300">{param.name}</td>
            <td className="px-4 py-2 text-sm text-gray-300">{param.type}</td>
            <td className="px-4 py-2 text-sm text-gray-300">
              {param.required ? (
                <span className="text-orange-500">Required</span>
              ) : (
                <span className="text-gray-500">Optional</span>
              )}
            </td>
            <td className="px-4 py-2 text-sm text-gray-300">{param.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ParametersTable;