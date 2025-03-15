"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../../lib/auth';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginAdmin(password)) {
      router.push('/admin');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
            HypeTorch Admin
          </h1>
          <p className="text-gray-400 mt-2">Enter your password to access the admin panel</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 p-3 rounded mb-4 text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-md font-medium mt-2 hover:opacity-90 transition-opacity"
          >
            Log In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-orange-400 hover:underline text-sm">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}