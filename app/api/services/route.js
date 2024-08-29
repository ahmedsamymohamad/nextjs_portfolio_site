import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Find the first user (this is just for example purposes)
    const user = await prisma.user.findFirst();

    // Handle case where no user is found
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch all services related to this user
    const services = await prisma.service.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { title, description } = await req.json();
    const user = await prisma.user.findFirst({})

    // Create a new service entry in the database
    const newService = await prisma.service.create({
      data: {
        title,
        description,
        userId: user.id
      },
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ error: 'Failed to add service' }, { status: 500 });
  }
}