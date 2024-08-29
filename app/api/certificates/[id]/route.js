import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const certificate = await prisma.certificate.findUnique({
            where: { id },
        });

        if (!certificate) {
            return NextResponse.json({ error: 'certificate not found' }, { status: 404 });
        }

        return NextResponse.json(certificate);
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { title, organizationName, link, date } = await req.json();

    try {
        const updatedCertificate = await prisma.certificate.update({
            where: { id },
            data: { title, organizationName, link, date },
        });

        return NextResponse.json({ success: true, certificate: updatedCertificate });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while updating the certificate' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
  
    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
  
    try {
        const deletedCertificate = await prisma.certificate.delete({
            where: { id },
        });
  
        return NextResponse.json({ success: true, certificate: deletedCertificate });
    } catch (error) {
        console.error('Error deleting certificate:', error);
        return NextResponse.json({ error: 'An error occurred while deleting the certificate' }, { status: 500 });
    }
  }
