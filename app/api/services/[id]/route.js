import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const service = await prisma.service.findUnique({
            where: { id },
        });

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { title, description } = await req.json();
    const user = prisma.user.findFirst({})

    try {
        const updatedService = await prisma.service.update({
            where: { id },
            data: {
                title,
                description,
                userId: user.id
            },
        });

        return NextResponse.json({ success: true, service: updatedService });
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
  
    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
  
    try {
        const deletedService = await prisma.service.delete({
            where: { id },
        });
  
        return NextResponse.json({ success: true, service: deletedService });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ error: 'An error occurred while deleting the service' }, { status: 500 });
    }
  }