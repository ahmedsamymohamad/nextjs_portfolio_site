import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
    const { id } = params;
    const { title, percentage } = await req.json();

    try {
        const updatedSkill = await prisma.skill.update({
            where: { id },
            data: { title, percentage },
        });

        return NextResponse.json({ success: true, skill: updatedSkill });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while updating the skill' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const deletedSkill = await prisma.skill.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, skill: deletedSkill });
    } catch (error) {
        console.error('Error deleting skill:', error);
        return NextResponse.json({ error: 'An error occurred while deleting the skill' }, { status: 500 });
    }
}