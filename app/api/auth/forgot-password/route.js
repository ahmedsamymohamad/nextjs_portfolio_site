import prisma from "@/lib/prisma";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function GET() {
    try {
        // Fetch the first user from the database
        const user = await prisma.user.findFirst();

        // Check if user exists
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Generate JWT token for password reset
        const token = await new SignJWT({ userId: user.id, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1h')
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));

        // Set up the nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `${process.env.EMAIL_USER}@demomailtrap.com`, // Use the verified email address
            to: user.email, // Send the email to the user's email address
            replyTo: user.email, // User's email for replying
            subject: `Password reset - Next.js Portfolio Site`,
            text: `Reset Password: \n\nPlease click on the following link to reset your password:\n\n${process.env.NEXT_PUBLIC_URL}/reset-password/${token}\n\nIf you did not request a password reset, please ignore this email.`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error while sending email to reset password:", error);
        return NextResponse.json({ message: "Error while sending email to reset password" }, { status: 500 });
    }
}
