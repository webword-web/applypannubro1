import { NextRequest } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
// import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary when ready
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export async function POST(request: NextRequest) {
  try {
    const payload = authenticateRequest(request);
    if (!payload) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // const formData = await request.formData();
    // const file = formData.get('file') as File;
    
    // if (!file) {
    //   return Response.json({ error: 'No file provided' }, { status: 400 });
    // }

    // This is a mock implementation for now until Cloudinary is configured
    // In a real app, you would upload to Cloudinary or AWS S3 here
    
    return Response.json({ 
      error: 'Image upload is not configured yet. Please set up Cloudinary.' 
      // url: 'https://via.placeholder.com/150' // Mock URL
    }, { status: 501 });

  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
