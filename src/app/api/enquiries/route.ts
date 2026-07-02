import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { authenticateRequest } from '@/lib/auth';

// GET all enquiries (admin only)
export async function GET(request: NextRequest) {
  try {
    const payload = authenticateRequest(request);
    if (!payload) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    return Response.json({ enquiries });
  } catch (error) {
    console.error('Get enquiries error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST new enquiry (public - triggered on WhatsApp click)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.service || !body.serviceSlug) {
      return Response.json({ error: 'Service details are required' }, { status: 400 });
    }

    const enquiry = await Enquiry.create({
      customerName: body.customerName || 'Website Visitor',
      phone: body.phone || '',
      service: body.service,
      serviceSlug: body.serviceSlug,
      message: body.message || '',
      status: 'New',
    });

    return Response.json({ enquiry }, { status: 201 });
  } catch (error) {
    console.error('Create enquiry error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
