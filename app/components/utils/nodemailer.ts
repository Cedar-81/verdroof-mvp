import nodemailer, { Transporter, SentMessageInfo } from "nodemailer";
import { EmailFormData } from "@/app/api/sendEmail/route";

interface EmailOptions {
  from: string;
  to: string;
  subject?: string;
  text?: string;
  html?: string;
}

export async function sendMail({
  email,
  email_data_html,
  email_data_string,
  subject,
}: EmailFormData): Promise<SentMessageInfo> {
  const transport: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL!,
      pass: process.env.SMTP_PASS!,
    },
  });

  try {
    await transport.verify(); // Test SMTP connection
  } catch (error) {
    throw new Error(
      "Error verifying SMTP connection: " + (error as Error).message
    );
  }

  const mailOptions: EmailOptions = {
    from: process.env.SMTP_EMAIL as string,
    to: email as string,
    subject,
    text: email_data_string as string,
    html: email_data_html as string,
  };

  try {
    const sendResult: SentMessageInfo = await transport.sendMail(mailOptions);
    return sendResult;
  } catch (error) {
    throw new Error("Error sending email: " + (error as Error).message);
  }
}
