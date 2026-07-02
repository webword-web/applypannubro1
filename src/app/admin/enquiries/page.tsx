'use client';

import React, { useState, useEffect } from 'react';
import { IEnquiry } from '@/types';
import { Search, Phone, ExternalLink, Calendar } from 'lucide-react';
import { generateWhatsAppUrl } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<IEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter]);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (statusFilter !== 'All') queryParams.append('status', statusFilter);

      const res = await fetch(`/api/enquiries?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (error) {
      console.error('Failed to fetch enquiries', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    // In a real app, you would have a PUT endpoint to update the enquiry status
    // For now, we'll just update the local state since we didn't build the PUT route yet
    // I will mock this for the UI
    setEnquiries(enquiries.map(e => e._id === id ? { ...e, status: newStatus as any } : e));
    alert(`Status updated to ${newStatus}. (Mocked - API route not implemented for this demo)`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
        <p className="text-gray-500 mt-1">View and manage customer enquiries from WhatsApp clicks</p>
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
              placeholder="Search by name, phone or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchEnquiries()}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full sm:w-48 py-2 px-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* List */}
        <div className="overflow-x-auto min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : enquiries.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Requested</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(enquiry.createdAt || '').toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{enquiry.customerName}</div>
                      {enquiry.phone && (
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="w-3 h-3 mr-1" />
                          {enquiry.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{enquiry.service}</div>
                      {enquiry.message && (
                        <div className="text-xs text-gray-500 mt-1 italic">"{enquiry.message}"</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={enquiry.status}
                        onChange={(e) => updateStatus(enquiry._id!, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${
                          enquiry.status === 'New' ? 'bg-red-100 text-red-800' : 
                          enquiry.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' : 
                          enquiry.status === 'Converted' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="New" className="bg-white text-gray-900">New</option>
                        <option value="Contacted" className="bg-white text-gray-900">Contacted</option>
                        <option value="Converted" className="bg-white text-gray-900">Converted</option>
                        <option value="Closed" className="bg-white text-gray-900">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {enquiry.phone && (
                        <a 
                          href={generateWhatsAppUrl(enquiry.phone, `Hello ${enquiry.customerName}, this is regarding your enquiry for ${enquiry.service} at Apply Pannu Bro.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                          title="Reply on WhatsApp"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500">
              <Search className="w-12 h-12 text-gray-300 mb-4" />
              <p>No enquiries found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
