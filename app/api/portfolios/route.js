import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    // Find the first user (this is just for example purposes)
    const user = await prisma.user.findFirst();

    // Handle case where no user is found
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch all portfolios related to this user
    const portfolios = await prisma.portfolio.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const gitHubLink = formData.get('gitHubLink');
    const liveDemo = formData.get('liveDemo');
    const imageFile = formData.get('imageUrl');

    // Retrieve the user
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let imageUrl = '';

    // If a new image is provided, upload it to Cloudinary
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'portfolio_images' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // Create the new portfolio item
    const newPortfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        gitHubLink,
        liveDemo,
        imageUrl,
        userId: user.id,
      },
    });

    return NextResponse.json({ portfolio: newPortfolio });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}
