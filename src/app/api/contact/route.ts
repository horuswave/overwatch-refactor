import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

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

    if (resend) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Overwatch Website <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "info@overwatchmoz.com",
        replyTo: email,
        subject: `[Overwatch] Site Assessment Request — ${name}`,
        text: emailContent,
      });
    } else {
      console.log("Contact form submission (Resend not configured):", emailContent);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
