'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IService } from '@/types';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { RippleButton } from '@/components/ui/RippleButton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services?all=true');
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Failed to fetch services', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setServices(services.filter(s => s._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const toggleEnable = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isEnabled: !currentStatus })
      });
      if (res.ok) {
        setServices(services.map(s => 
          s._id === id ? { ...s, isEnabled: !currentStatus } : s
        ));
      }
    } catch (error) {
      console.error('Failed to toggle', error);
    }
  };

  // Filter services client-side for immediate response
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || 
                          service.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
          <p className="text-gray-500 mt-1">Add, edit, or delete digital services</p>
        </div>
        <Link href="/admin/services/new">
          <RippleButton>
            <Plus className="w-5 h-5 mr-2" />
            Add New Service
          </RippleButton>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full sm:w-48 py-2 px-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Popular">Popular</option>
            <option value="New">New</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : filteredServices.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Enabled</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredServices.map((service, index) => (
                  <tr key={service._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.displayOrder || index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-xl mr-3">{service.icon}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{service.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{service.shortDescription}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        service.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        service.status === 'Popular' ? 'bg-purple-100 text-purple-800' :
                        service.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        service.status === 'Coming Soon' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button 
                        onClick={() => toggleEnable(service._id!, service.isEnabled)}
                        className={`inline-flex rounded-full p-1 transition-colors ${
                          service.isEnabled ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={service.isEnabled ? "Disable service" : "Enable service"}
                      >
                        {service.isEnabled ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/services/${service.slug}`} target="_blank" className="text-gray-400 hover:text-blue-600 p-1" title="View on site">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/services/${service._id}/edit`} className="text-gray-400 hover:text-orange-600 p-1" title="Edit service">
                          <Edit className="w-4 h-4" />
                        </Link>
                        {deleteConfirm === service._id ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleDelete(service._id!)} className="text-red-600 hover:text-red-800 text-xs font-bold border border-red-200 px-2 py-1 rounded bg-red-50">Confirm</button>
                            <button onClick={() => setDeleteConfirm(null)} className="text-gray-500 hover:text-gray-700 text-xs border px-2 py-1 rounded">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(service._id!)} className="text-gray-400 hover:text-red-600 p-1" title="Delete service">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500">
              <Search className="w-12 h-12 text-gray-300 mb-4" />
              <p>No services found matching your criteria.</p>
              <button 
                onClick={() => { setSearch(''); setStatusFilter('All'); }}
                className="mt-2 text-blue-600 font-medium hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
