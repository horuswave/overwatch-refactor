import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailContent = `
New Site Assessment Request from Overwatch Website

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company/Property: ${company || "Not provided"}
Property Type: ${type || "Not specified"}

Message:
${message}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || "Overwatch Website <noreply@overwatchmoz.com>",
      to: process.env.CONTACT_EMAIL || "info@overwatchmoz.com",
      replyTo: email,
      subject: `[Overwatch] Site Assessment Request — ${name}`,
      text: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
