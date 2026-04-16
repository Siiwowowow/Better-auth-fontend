"use client";

import React from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';

export default function Navbar() {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    toast.loading("Logging out...", { id: "logout" });
    await logout();
    toast.success("Successfully logged out!", {
      id: "logout",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-all">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          BatterAuth
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user.name || user.email || 'Welcome'}
            </span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium bg-red-500/10 text-red-600 dark:text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
             <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
            >
              Login
            </Link>
             <Link 
              href="/register" 
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
