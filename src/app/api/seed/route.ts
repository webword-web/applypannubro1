import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import Admin from '@/models/Admin';
import Settings from '@/models/Settings';
import { seedServices } from '@/data/seed-services';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Basic security check - only allow if DB is empty or a specific secret is provided
    const secret = request.nextUrl.searchParams.get('secret');
    const isLocalhost = request.headers.get('host')?.includes('localhost') || request.headers.get('host')?.includes('127.0.0.1');

    if (!isLocalhost && secret !== 'applypannubro-seed-secret-2024') {
      return Response.json({ error: 'Unauthorized seed attempt' }, { status: 401 });
    }

    await connectDB();

    // 1. Seed Services
    const existingServicesCount = await Service.countDocuments();
    let servicesSeeded = 0;

    if (existingServicesCount === 0) {
      await Service.insertMany(seedServices);
      servicesSeeded = seedServices.length;
    }

    // 2. Seed Admin
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'applypannubro@gmail.com' });
    let adminCreated = false;

    if (!existingAdmin) {
      const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD || 'admin123');
      await Admin.create({
        name: 'Super Admin',
        email: process.env.ADMIN_EMAIL || 'applypannubro@gmail.com',
        password: hashedPassword,
        role: 'superadmin',
      });
      adminCreated = true;
    }

    // 3. Seed Settings
    const existingSettings = await Settings.findOne();
    let settingsCreated = false;

    if (!existingSettings) {
      await Settings.create({});
      settingsCreated = true;
    }

    return Response.json({
      message: 'Database seeding completed',
      details: {
        servicesSeeded,
        adminCreated,
        settingsCreated,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error: 'Internal server error during seeding' }, { status: 500 });
  }
}
