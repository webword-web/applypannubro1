import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { authenticateRequest } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET all services (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const enabled = searchParams.get('enabled');
    const all = searchParams.get('all'); // admin: get all including disabled

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    // Public requests only get enabled services
    if (!all) {
      query.isEnabled = true;
    }

    if (category && category !== 'All') {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }
    if (enabled === 'true') {
      query.isEnabled = true;
    } else if (enabled === 'false') {
      query.isEnabled = false;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const services = await Service.find(query).sort({ displayOrder: 1, createdAt: -1 });
    return Response.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new service (admin only)
export async function POST(request: NextRequest) {
  try {
    const payload = authenticateRequest(request);
    if (!payload) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    // Generate slug from name
    if (!body.slug) {
      body.slug = slugify(body.name);
    }

    // Check for duplicate slug
    const existing = await Service.findOne({ slug: body.slug });
    if (existing) {
      body.slug = `${body.slug}-${Date.now()}`;
    }

    const service = await Service.create(body);
    return Response.json({ service }, { status: 201 });
  } catch (error) {
    console.error('Create service error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
