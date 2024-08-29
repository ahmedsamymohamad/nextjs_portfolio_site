// app/api/portfolios/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  const { id } = params;
  const { title, description, gitHubLink, liveDemo, imageUrl } = await req.json();

  try {
    // Check if the portfolio exists
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!existingPortfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    let updatedImageUrl = existingPortfolio.imageUrl;

    if (imageUrl) {
      // If a new image is provided, first delete the old image from Cloudinary
      if (existingPortfolio.imageUrl) {
        const publicId = existingPortfolio.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Then upload the new image to Cloudinary
      const buffer = Buffer.from(imageUrl.split(',')[1], 'base64');
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
          if (error) {
            reject(error);
          } else {
            resolve(uploadResult);
          }
        }).end(buffer);
      });

      updatedImageUrl = uploadResult.secure_url;
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        gitHubLink,
        liveDemo,
        imageUrl: updatedImageUrl,
      },
    });

    return NextResponse.json({ success: true, portfolio: updatedPortfolio });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
      const deletedPortfolio = await prisma.portfolio.delete({
          where: { id },
      });

      return NextResponse.json({ success: true, portfolio: deletedPortfolio });
  } catch (error) {
      console.error('Error deleting portfolio:', error);
      return NextResponse.json({ error: 'An error occurred while deleting the portfolio' }, { status: 500 });
  }
}