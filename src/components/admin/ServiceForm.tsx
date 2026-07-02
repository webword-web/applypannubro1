'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IService } from '@/types';
import { SERVICE_CATEGORIES, STATUS_OPTIONS } from '@/lib/utils';
import { RippleButton } from '@/components/ui/RippleButton';
import { Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ServiceFormProps {
  initialData?: IService;
  isEdit?: boolean;
}

export function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Partial<IService>>(
    initialData || {
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      category: 'Government',
      status: 'Active',
      icon: '📄',
      image: '',
      documents: [''],
      eligibility: '',
      processingTime: '',
      governmentFee: 'Free',
      serviceCharge: '₹100',
      benefits: [''],
      faq: [{ question: '', answer: '' }],
      whatsappTemplate: '',
      displayOrder: 0,
      isEnabled: true,
      isFeatured: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  // Array Handlers
  const handleArrayChange = (index: number, field: 'documents' | 'benefits', value: string) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'documents' | 'benefits') => {
    setFormData((prev) => ({ ...prev, [field]: [...(prev[field] || []), ''] }));
  };

  const removeArrayItem = (index: number, field: 'documents' | 'benefits') => {
    const newArray = [...(formData[field] || [])];
    newArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  // FAQ Handlers
  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaq = [...(formData.faq || [])];
    newFaq[index] = { ...newFaq[index], [field]: value };
    setFormData((prev) => ({ ...prev, faq: newFaq }));
  };

  const addFaq = () => {
    setFormData((prev) => ({ ...prev, faq: [...(prev.faq || []), { question: '', answer: '' }] }));
  };

  const removeFaq = (index: number) => {
    const newFaq = [...(formData.faq || [])];
    newFaq.splice(index, 1);
    setFormData((prev) => ({ ...prev, faq: newFaq }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('adminToken');
      
      // Clean up empty array items before submitting
      const cleanedData = {
        ...formData,
        documents: formData.documents?.filter(d => d.trim() !== ''),
        benefits: formData.benefits?.filter(b => b.trim() !== ''),
        faq: formData.faq?.filter(f => f.question.trim() !== '' && f.answer.trim() !== ''),
      };

      const url = isEdit && initialData?._id ? `/api/services/${initialData._id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cleanedData)
      });

      if (res.ok) {
        router.push('/admin/services');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Basic Details */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. PAN Card Apply"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              placeholder="Auto-generated if left blank"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 📄"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {SERVICE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
            <input
              type="text"
              name="shortDescription"
              required
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="A brief 1-line description for the service card"
              maxLength={100}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed description shown on the service page"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Service Data */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Service Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Processing Time *</label>
            <input
              type="text"
              name="processingTime"
              required
              value={formData.processingTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 7-15 Working Days"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Government Fee *</label>
            <input
              type="text"
              name="governmentFee"
              required
              value={formData.governmentFee}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. ₹107 or Free"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Charge *</label>
            <input
              type="text"
              name="serviceCharge"
              required
              value={formData.serviceCharge}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. ₹200"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
            <textarea
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Who can apply for this?"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Dynamic Arrays (Documents & Benefits) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Documents */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Required Documents</h2>
            <button type="button" onClick={() => addArrayItem('documents')} className="text-blue-600 hover:text-blue-700 p-1">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {formData.documents?.map((doc, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={doc}
                  onChange={(e) => handleArrayChange(index, 'documents', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder={`Document ${index + 1}`}
                />
                <button type="button" onClick={() => removeArrayItem(index, 'documents')} className="text-red-500 hover:text-red-700 p-2 border border-gray-200 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {formData.documents?.length === 0 && <p className="text-sm text-gray-500">No documents added.</p>}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Key Benefits</h2>
            <button type="button" onClick={() => addArrayItem('benefits')} className="text-blue-600 hover:text-blue-700 p-1">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {formData.benefits?.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange(index, 'benefits', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder={`Benefit ${index + 1}`}
                />
                <button type="button" onClick={() => removeArrayItem(index, 'benefits')} className="text-red-500 hover:text-red-700 p-2 border border-gray-200 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {formData.benefits?.length === 0 && <p className="text-sm text-gray-500">No benefits added.</p>}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <button type="button" onClick={addFaq} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>
        <div className="space-y-4">
          {formData.faq?.map((faq, index) => (
            <div key={index} className="flex gap-4 items-start p-4 border border-gray-200 rounded-xl bg-gray-50">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
                  placeholder="Question"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                  placeholder="Answer"
                ></textarea>
              </div>
              <button type="button" onClick={() => removeFaq(index)} className="text-red-500 hover:text-red-700 p-2 border border-gray-200 rounded-lg hover:bg-red-50 bg-white">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {formData.faq?.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No FAQs added.</p>}
        </div>
      </div>

      {/* Settings & Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 md:border-r border-gray-200 md:pr-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 block">Enable Service</label>
                <p className="text-xs text-gray-500">Visible to public users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isEnabled" checked={formData.isEnabled} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 block">Featured Service</label>
                <p className="text-xs text-gray-500">Show in popular services section</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-32"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Lower number appears first</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Template Override</label>
            <p className="text-xs text-gray-500 mb-2">Optional. Use {"{service_name}"} as placeholder.</p>
            <textarea
              name="whatsappTemplate"
              value={formData.whatsappTemplate}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Hello Apply Pannu Bro, I want to apply for {service_name}..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-20 flex justify-end gap-4">
        <Link href="/admin/services">
          <RippleButton type="button" variant="ghost">Cancel</RippleButton>
        </Link>
        <RippleButton type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" className="mr-2 border-white/50 border-t-white" /> : <Save className="w-5 h-5 mr-2" />}
          {isEdit ? 'Save Changes' : 'Create Service'}
        </RippleButton>
      </div>
    </form>
  );
}
