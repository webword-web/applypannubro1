import React from 'react';
import { DashboardStats } from '@/types';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Star, 
  Sparkles,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardStatsProps {
  stats: DashboardStats;
}

export function AdminDashboardStats({ stats }: AdminDashboardStatsProps) {
  const cards = [
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      title: 'Active Services',
      value: stats.activeServices,
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50',
      border: 'border-green-100',
    },
    {
      title: 'Coming Soon',
      value: stats.comingSoon,
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries,
      icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
    {
      title: 'Popular Services',
      value: stats.popularServices,
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      bg: 'bg-yellow-50',
      border: 'border-yellow-100',
    },
    {
      title: 'New Services',
      value: stats.newServices,
      icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
      bg: 'bg-cyan-50',
      border: 'border-cyan-100',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className={`p-6 rounded-2xl border ${card.border} ${card.bg} flex items-center gap-4 shadow-sm`}>
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {stats.recentEnquiries && stats.recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(enquiry.createdAt || '').toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{enquiry.customerName}</div>
                      <div className="text-sm text-gray-500">{enquiry.phone || 'No phone'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {enquiry.service}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        enquiry.status === 'New' ? 'bg-red-100 text-red-800' : 
                        enquiry.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {enquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No recent enquiries found.
          </div>
        )}
      </div>
    </div>
  );
}
