"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '../lib/auth';
import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') return;
    
    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  // Don't render the sidebar on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}