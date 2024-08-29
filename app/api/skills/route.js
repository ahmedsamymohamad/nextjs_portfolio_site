// app/api/skills/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Fetch skills for the first user
        const user = await prisma.user.findFirst()

        const skills = await prisma.skill.findMany({
            where: { userId: user.id },
        });

        if (!skills || skills.length === 0) {
            return NextResponse.json({ error: 'No skills found' }, { status: 404 });
        }

        return NextResponse.json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        return NextResponse.json({ error: 'An error occurred while fetching skills' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { title, percentage } = await req.json();

        if (!title || percentage === undefined) {
            return NextResponse.json({ error: 'Title and percentage are required' }, { status: 400 });
        }

        // Fetch the first user
        const user = await prisma.user.findFirst();

        if (!user) {
            return NextResponse.json({ error: 'No user found' }, { status: 404 });
        }

        // Create a new skill
        const newSkill = await prisma.skill.create({
            data: {
                title,
                percentage: parseInt(percentage), // Ensure percentage is an integer
                userId: user.id,
            },
        });

        return NextResponse.json({ success: true, skill: newSkill });
    } catch (error) {
        console.error('Error creating skill:', error);
        return NextResponse.json({ error: 'An error occurred while creating the skill' }, { status: 500 });
    }
}
