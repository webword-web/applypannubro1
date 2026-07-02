import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import Settings from '@/models/Settings';
import { HeroBanner } from '@/components/home/HeroBanner';
import { AboutSection } from '@/components/home/AboutSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { PopularServices } from '@/components/home/PopularServices';
import { AllServices } from '@/components/services/AllServices';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { CTASection } from '@/components/home/CTASection';
import { seedServices } from '@/data/seed-services';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  let allServices: any[] = [];
  let settings: any = null;

  try {
    await connectDB();
    
    // Fetch services
    allServices = await Service.find({ isEnabled: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
      
    // Fetch settings
    settings = await Settings.findOne().lean();
  } catch (error) {
    console.error('MongoDB connection failed, falling back to seed data');
    // Generate mock _id for seed services to avoid React key errors
    allServices = seedServices.map((s, i) => ({ ...s, _id: `mock-${i}` }));
  }
    
  // Find popular/featured services
  const popularServices = allServices.filter(
    s => s.isFeatured || s.status === 'Popular' || s.status === 'New'
  ).slice(0, 8); // Top 8 for the popular section

  // Convert ObjectIds to strings to pass to Client Components
  const serializedAllServices = JSON.parse(JSON.stringify(allServices));
  const serializedPopularServices = JSON.parse(JSON.stringify(popularServices));
  const serializedSettings = settings ? JSON.parse(JSON.stringify(settings)) : null;

  return (
    <>
      <HeroBanner 
        title={serializedSettings?.heroBannerTitle} 
        subtitle={serializedSettings?.heroBannerSubtitle} 
      />
      <AboutSection />
      <WhyChooseUs />
      
      {serializedPopularServices.length > 0 && (
        <PopularServices services={serializedPopularServices} />
      )}
      
      <AllServices initialServices={serializedAllServices} />
      
      <ReviewsSection />
      <CTASection />
    </>
  );
}
