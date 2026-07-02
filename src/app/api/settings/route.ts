import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { authenticateRequest } from '@/lib/auth';

// GET settings (public)
export async function GET() {
  try {
    await connectDB();
    
    // Find the first settings document, or create a default one if it doesn't exist
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({});
    }

    return Response.json({ settings });
  } catch (error) {
    console.error('Get settings error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT update settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const payload = authenticateRequest(request);
    if (!payload) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    // We only ever have one settings document
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, body, {
        new: true,
        runValidators: true,
      });
    }

    return Response.json({ settings });
  } catch (error) {
    console.error('Update settings error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
