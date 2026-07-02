'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { logout, admin } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Services', href: '/admin/services', icon: <FileText className="w-5 h-5" /> },
    { name: 'Enquiries', href: '/admin/enquiries', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Site Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm">
            AB
          </div>
          Admin Panel
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="mb-4 px-4 py-3 bg-gray-800 rounded-xl">
          <p className="text-sm font-medium text-white truncate">{admin?.name || 'Admin User'}</p>
          <p className="text-xs text-gray-400 truncate">{admin?.email || 'admin@applypannubro.com'}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">View Website</span>
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header & Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-4 z-50">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-xs">
            AB
          </div>
          Admin Panel
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 bottom-0 z-40">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed top-16 left-0 bottom-0 z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </div>
    </>
  );
}
