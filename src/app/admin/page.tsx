import React from 'react';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import Enquiry from '@/models/Enquiry';
import { DashboardStats } from '@/types';
import { AdminDashboardStats } from '@/components/admin/DashboardStats';

export const revalidate = 0; // Don't cache admin pages

export default async function AdminDashboardPage() {
  await connectDB();

  // Aggregate stats
  const totalServices = await Service.countDocuments();
  const activeServices = await Service.countDocuments({ status: 'Active' });
  const comingSoon = await Service.countDocuments({ status: 'Coming Soon' });
  const popularServices = await Service.countDocuments({ status: 'Popular' });
  const newServices = await Service.countDocuments({ status: 'New' });
  
  const totalEnquiries = await Enquiry.countDocuments();
  
  // Get recent enquiries
  const recentEnquiries = await Enquiry.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const stats: DashboardStats = {
    totalServices,
    activeServices,
    comingSoon,
    popularServices,
    newServices,
    totalEnquiries,
    recentEnquiries: JSON.parse(JSON.stringify(recentEnquiries)),
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <AdminDashboardStats stats={stats} />
    </div>
  );
}
