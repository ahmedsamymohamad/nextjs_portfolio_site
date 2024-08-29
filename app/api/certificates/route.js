import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Fetch certificates for the first user
        const user = await prisma.user.findFirst()

        const certificates = await prisma.certificate.findMany({
            where: { userId: user.id },
        });

        if (!certificates || certificates.length === 0) {
            return NextResponse.json({ error: 'No certificates found' }, { status: 404 });
        }

        return NextResponse.json(certificates);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching certificates' }, { status: 500 });
    }
}


export async function POST(req) {
    const { title, organizationName, link, percentage } = await req.json();

    const user = await prisma.user.findFirst({})

    if (!user) {
        return NextResponse.json({ error: 'No user found' }, { status: 404 });
    }

    const userId = user.id

    try {
        const newCertificate = await prisma.certificate.create({
            data: {
                title,
                organizationName,
                link,
                percentage,
                userId, // Assuming you pass the userId when adding a certificate
            },
        });

        return NextResponse.json({ success: true, certificate: newCertificate });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while creating the certificate' }, { status: 500 });
    }
}