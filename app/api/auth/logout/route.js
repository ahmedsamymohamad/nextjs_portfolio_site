import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

    // Clear the token cookie
    response.cookies.set('token', '', { httpOnly: true, secure: false, maxAge: 0, path: '/' });

    return response;
}
