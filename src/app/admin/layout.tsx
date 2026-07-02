'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const { isAuthenticated } = useAuth();

  // Show nothing while checking auth status (prevents flicker)
  if (!isLoginPage && isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">{children}</div>;
  }

  // Only render admin shell if authenticated
  if (!isAuthenticated) {
    return null; // Will redirect in useAuth
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64 pt-16 lg:pt-0 min-h-screen flex flex-col">
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
