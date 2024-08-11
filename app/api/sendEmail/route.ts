import { sendMail } from "../../components/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export interface EmailFormData {
  email: string;
  email_data_html: string;
  email_data_string: string;
  subject: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await sendMail((await req.json()) as EmailFormData);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { title: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
