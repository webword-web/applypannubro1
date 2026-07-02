import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { authenticateRequest } from '@/lib/auth';

// GET single service by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Try finding by slug first, then by ID
    let service = await Service.findOne({ slug: id });
    if (!service) {
      service = await Service.findById(id).catch(() => null);
    }

    if (!service) {
      return Response.json({ error: 'Service not found' }, { status: 404 });
    }

    // Get related services (same category, excluding current)
    const related = await Service.find({
      category: service.category,
      _id: { $ne: service._id },
      isEnabled: true,
    })
      .limit(4)
      .sort({ displayOrder: 1 });

    return Response.json({ service, related });
  } catch (error) {
    console.error('Get service error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT update service (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = authenticateRequest(request);
    if (!payload) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const service = await Service.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return Response.json({ error: 'Service not found' }, { status: 404 });
    }

    return Response.json({ service });
  } catch (error) {
    console.error('Update service error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE service (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = authenticateRequest(request);
    if (!payload) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return Response.json({ error: 'Service not found' }, { status: 404 });
    }

    return Response.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
