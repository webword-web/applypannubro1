import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import { seedServices } from '@/data/seed-services';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  let service: any = null;
  const { slug } = await params;
  
  try {
    await connectDB();
    service = await Service.findOne({ slug }).lean();
  } catch (error) {
    service = seedServices.find(s => s.slug === slug);
  }

  if (!service) {
    return { title: 'Service Not Found | APPLY PANNU BRO' };
  }

  return {
    title: `${service.name} | APPLY PANNU BRO`,
    description: service.shortDescription || service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  let service: any = null;
  let relatedServices: any[] = [];
  
  try {
    await connectDB();
    service = await Service.findOne({ slug }).lean();

    if (service) {
      relatedServices = await Service.find({
        category: service.category,
        _id: { $ne: service._id },
        isEnabled: true,
      })
        .limit(4)
        .sort({ displayOrder: 1 })
        .lean();
    }
  } catch (error) {
    service = seedServices.find(s => s.slug === slug);
    if (service) {
      relatedServices = seedServices
        .filter(s => s.category === service.category && s.slug !== slug)
        .slice(0, 4)
        .map((s, i) => ({ ...s, _id: `mock-${i}` }));
    }
  }

  if (!service) {
    notFound();
  }

  // Convert to plain objects for Client Component
  const serializedService = JSON.parse(JSON.stringify(service));
  const serializedRelatedServices = JSON.parse(JSON.stringify(relatedServices));

  return (
    <ServiceDetail 
      service={serializedService} 
      relatedServices={serializedRelatedServices} 
    />
  );
}
