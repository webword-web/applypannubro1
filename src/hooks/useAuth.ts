'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [admin, setAdmin] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip check for login page
    if (pathname === '/admin/login') {
      setIsAuthenticated(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          setIsAuthenticated(false);
          if (pathname?.startsWith('/admin')) {
            router.push('/admin/login');
          }
          return;
        }

        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setAdmin(data.admin);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
          if (pathname?.startsWith('/admin')) {
            router.push('/admin/login');
          }
        }
      } catch (error) {
        console.error('Auth check failed', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem('adminToken');
    // Also remove cookie if we set one
    document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsAuthenticated(false);
    setAdmin(null);
    router.push('/admin/login');
  };

  return { isAuthenticated, admin, logout };
}
