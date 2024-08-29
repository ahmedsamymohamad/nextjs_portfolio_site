import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req, { params }) {
    try {
        const token = params.slug;

        if (!token) {
            console.log(`No token found for path. Redirecting to login page...`);
            const loginUrl = new URL('/login', req.url);
            return NextResponse.redirect(loginUrl);
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        if (!payload) {
            console.log(`Invalid token found. Redirecting to login page...`);
            const loginUrl = new URL('/login', req.url);
            return NextResponse.redirect(loginUrl);
        }

        const { password, password2 } = await req.json();

        if (password !== password2) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: { id: payload.userId },
            data: {
                password: hashedPassword,
            },
        });

        return NextResponse.json({ success: true, details: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: 'An error occurred while updating the user data' }, { status: 500 });
    }
}
