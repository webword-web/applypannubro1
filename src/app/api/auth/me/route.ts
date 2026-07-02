import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { authenticateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const payload = authenticateRequest(request);
    if (!payload) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const admin = await Admin.findById(payload.userId).select('-password');
    if (!admin) {
      return Response.json({ error: 'Admin not found' }, { status: 404 });
    }

    return Response.json({
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
