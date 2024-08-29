import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Setup the transporter
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const mailOptions = {
    from: `${process.env.EMAIL_USER}@demomailtrap.com`, // Use the verified email address
    to: 'ahmed01223330@gmail.com',
    replyTo: email, // User's email for replying
    subject: `New message from ${name}`,
    text: `Message from: ${name}\nEmail: ${email}\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
