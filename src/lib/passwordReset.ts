/// lib/passwordReset.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import sgMail from "@sendgrid/mail";

const UserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable is not set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email: string, url: string) => {
  const msg = {
    to: email,
    from: "mohdjamikhann@gmail.com",
    subject: "Password Reset",
    text: `Click on this link to reset your password: ${url}`,
    html: `<b>Click on this link to reset your password:</b> <a href="${url}">${url}</a>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

export async function verifyToken(req: NextRequest, res: NextRequest) {
  // Handle token verification logic
  // ...
  return NextResponse.json(
    { message: "Token verification request handled" },
    { status: 200 }
  );
}

export async function resetPassword(req: NextRequest, res: NextRequest) {
  // Handle password reset logic
  // ...
  return NextResponse.json(
    { message: "Password reset request handled" },
    { status: 200 }
  );
}
