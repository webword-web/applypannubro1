import React from 'react';
import { ServiceForm } from '@/components/admin/ServiceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewServicePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/services" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Services
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
      </div>
      
      <ServiceForm />
    </div>
  );
}
