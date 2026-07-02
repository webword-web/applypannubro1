import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    return Response.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
