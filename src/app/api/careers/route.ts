import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const message = formData.get("message") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
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

    // Prepare email content
    const emailContent = `
New Job Application from Overwatch Careers Page

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Position Applied: ${position || "General Application"}

Cover Message:
${message || "No cover message provided"}
    `.trim();

    // Prepare email attachments
    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType?: string;
    }> = [];

    if (cvFile && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({
        filename: cvFile.name,
        content: buffer,
        contentType: cvFile.type,
      });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || "Overwatch Website <noreply@overwatchmoz.com>",
      to: process.env.CAREERS_EMAIL || process.env.CONTACT_EMAIL || "info@overwatchmoz.com",
      replyTo: email,
      subject: `[Overwatch] Job Application${position ? ` — ${position}` : " — General Application"} — ${name}`,
      text: emailContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers form error:", error);
    return NextResponse.json(
      { error: "Failed to send application" },
      { status: 500 }
    );
  }
}