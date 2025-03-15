"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAdmin } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Upload, 
  Settings, 
  LogOut, 
  BarChart
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <div className="h-screen w-64 bg-gray-800 text-white border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          HypeTorch Admin
        </h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <Link 
              href="/admin" 
              className={`flex items-center px-4 py-3 ${isActive('/admin') ? 'bg-gray-700 text-orange-400' : 'hover:bg-gray-700'}`}
            >
              <LayoutDashboard size={18} className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/entities" 
              className={`flex items-center px-4 py-3 ${isActive('/admin/entities') ? 'bg-gray-700 text-orange-400' : 'hover:bg-gray-700'}`}
            >
              <Users size={18} className="mr-3" />
              Entities
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/upload" 
              className={`flex items-center px-4 py-3 ${isActive('/admin/upload') ? 'bg-gray-700 text-orange-400' : 'hover:bg-gray-700'}`}
            >
              <Upload size={18} className="mr-3" />
              Upload Data
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/settings" 
              className={`flex items-center px-4 py-3 ${isActive('/admin/settings') ? 'bg-gray-700 text-orange-400' : 'hover:bg-gray-700'}`}
            >
              <Settings size={18} className="mr-3" />
              Settings
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard" 
              className="flex items-center px-4 py-3 hover:bg-gray-700"
              target="_blank"
            >
              <BarChart size={18} className="mr-3" />
              View Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="flex items-center text-gray-400 hover:text-white w-full px-4 py-2 rounded-md hover:bg-gray-700"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}