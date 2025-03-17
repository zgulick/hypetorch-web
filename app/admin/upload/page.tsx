"use client";

import { useState } from 'react';
import { Upload, Check, AlertCircle, Loader2 } from 'lucide-react';
import api from '@/lib/api';

export default function UploadDataPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('last_30_days');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus({
        success: false,
        message: 'Please select a file to upload.'
      });
      return;
    }
  
    setUploading(true);
    setUploadStatus(null);
  
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('time_period', selectedTimeframe);
    
    try {
      const response = await api.post('/upload_json', formData);
      
      setUploadStatus({
        success: response.status === 200,
        message: response.data.message || (response.status === 200 ? 'File uploaded successfully!' : 'Error uploading file')
      });
    } catch (error) {
      setUploadStatus({
        success: false,
        message: 'Error uploading file. Please try again.'
      });
    } finally {
      setUploading(false);
      if (document.getElementById('fileInput')) {
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
      }
      setFile(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upload Data</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Upload</h2>
        <p className="text-gray-400 mb-6">
          Upload JSON files containing transcript data for processing. The system will extract entities,
          calculate metrics, and update the database with the latest information.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Time Period</label>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="w-full md:w-1/3 bg-gray-700 border border-gray-600 rounded p-2 mb-4"
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_6_months">Last 6 Months</option>
          </select>
        </div>
        
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 hover:border-orange-500 transition-colors">
          {file ? (
            <div className="space-y-4">
              <Check size={48} className="mx-auto text-green-500" />
              <p className="text-lg font-medium break-all">{file.name}</p>
              <p className="text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-400 underline text-sm"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload size={48} className="mx-auto text-gray-400" />
              <p className="text-lg font-medium">Drag and drop your file here</p>
              <p className="text-gray-400">or</p>
              <label className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-md cursor-pointer inline-block">
                Browse Files
                <input 
                  id="fileInput"
                  type="file" 
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden" 
                />
              </label>
              <p className="text-gray-400 text-sm mt-2">
                Supported formats: .json
              </p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-md flex items-center justify-center ${
            !file || uploading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload size={18} className="mr-2" />
              Upload & Process
            </>
          )}
        </button>
        
        {uploadStatus && (
          <div className={`mt-6 p-4 rounded-md ${
            uploadStatus.success ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'
          }`}>
            <div className="flex items-start">
              {uploadStatus.success ? (
                <Check size={20} className="text-green-500 mr-2 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="text-red-500 mr-2 mt-0.5" />
              )}
              <p className={uploadStatus.success ? 'text-green-200' : 'text-red-200'}>
                {uploadStatus.message}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Upload History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Filename</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">03/14/2025</td>
                <td className="px-6 py-4 whitespace-nowrap">transcript_data_march.json</td>
                <td className="px-6 py-4 whitespace-nowrap">Last 30 Days</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">03/01/2025</td>
                <td className="px-6 py-4 whitespace-nowrap">podcast_data_feb.json</td>
                <td className="px-6 py-4 whitespace-nowrap">Last 30 Days</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">02/15/2025</td>
                <td className="px-6 py-4 whitespace-nowrap">season_metrics.json</td>
                <td className="px-6 py-4 whitespace-nowrap">Last 6 Months</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded-full text-xs">
                    Failed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}