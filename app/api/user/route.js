import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch the first user (based on ID)
    const user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching the user data' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const {
      username,
      email,
      password,
      jobTitle,
      bio,
      gitHubLink,
      linkedinLink, } = await req.json();

    // Fetch the first user (based on ID)
    const user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prepare update data
    const updateData = {
      username,
      email,
      jobTitle,
      bio,
      gitHubLink,
      linkedinLink,
    };

    // If a new password is provided, hash and update it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update the user data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while updating the user data' }, { status: 500 });
  }
}