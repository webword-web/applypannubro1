'use client';

import React, { useState, useEffect } from 'react';
import { ISiteSettings } from '@/types';
import { Save } from 'lucide-react';
import { RippleButton } from '@/components/ui/RippleButton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<ISiteSettings>>({
    businessName: 'APPLY PANNU BRO',
    contactNumber: '8525041700',
    whatsappNumber: '918525041700',
    email: 'applypannubro@gmail.com',
    address: 'Tamil Nadu, India',
    workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    heroBannerTitle: 'Your Trusted Digital Service Partner',
    heroBannerSubtitle: 'Get all your government services, certificates, and applications done quickly and hassle-free.',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error('Failed to fetch settings', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      
      if (res.ok) {
        setMessage({ text: 'Settings saved successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to save settings', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error occurred', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 mt-1">Configure global website details and contact information</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl mb-6 border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={settings.businessName || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="text"
                name="contactNumber"
                value={settings.contactNumber || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number (with country code)</label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={settings.email || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
              <input
                type="text"
                name="address"
                value={settings.address || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={settings.workingHours || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Homepage Customization</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Banner Title</label>
              <input
                type="text"
                name="heroBannerTitle"
                value={settings.heroBannerTitle || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Banner Subtitle</label>
              <textarea
                name="heroBannerSubtitle"
                value={settings.heroBannerSubtitle || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed HTML (Optional)</label>
              <textarea
                name="googleMapEmbed"
                value={settings.googleMapEmbed || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder='<iframe src="..."></iframe>'
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <RippleButton type="submit" size="lg" disabled={isSaving}>
            {isSaving ? <LoadingSpinner size="sm" className="mr-2" /> : <Save className="w-5 h-5 mr-2" />}
            Save Settings
          </RippleButton>
        </div>
      </form>
    </div>
  );
}
