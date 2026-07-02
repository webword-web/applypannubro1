'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import { RippleButton } from '@/components/ui/RippleButton';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        // Also set a cookie for potential server-side usage
        document.cookie = `admin-token=${data.token}; path=/; max-age=604800; SameSite=Strict`;
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl shadow-xl mb-4">
          AB
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
        <p className="text-gray-500 mt-2">Sign in to manage your digital services</p>
      </div>

      <GlassCard className="p-8 border bg-white shadow-xl">
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900"
                placeholder="admin@applypannubro.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900"
                placeholder="••••••••"
              />
            </div>
          </div>

          <RippleButton
            type="submit"
            fullWidth
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </RippleButton>
        </form>
      </GlassCard>
    </div>
  );
}
