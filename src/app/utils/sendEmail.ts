/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import AppError from "../errorHelpers/AppError";
import { envVariables } from "../config/env";

// Create reusable transporter (SMTP config)
const transporter = nodemailer.createTransport({
  secure: true,
  auth: {
    user: envVariables.EMAIL_SENDER.SMTP_USER,
    pass: envVariables.EMAIL_SENDER.SMTP_PASS,
  },
  port: Number(envVariables.EMAIL_SENDER.SMTP_PORT),
  host: envVariables.EMAIL_SENDER.SMTP_HOST,
});

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string; // name of the ejs file inside templates folder
  templateData?: Record<string, any>; // dynamic data for template
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

/**
 * Send an email using a given EJS template.
 * @param to Recipient email
 * @param subject Subject line
 * @param templateName Template filename (without extension)
 * @param templateData Variables passed to the EJS template
 * @param attachments Optional file attachments
 */
export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData = {},
  attachments,
}: SendEmailOptions): Promise<void> => {
  try {
    // Resolve EJS template path
    const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);

    // Render HTML with provided data
    const html = await ejs.renderFile(templatePath, templateData);

    // Send email
    const info = await transporter.sendMail({
      from: envVariables.EMAIL_SENDER.SMTP_FROM,
      to,
      subject,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });

    // Debugging log (remove in production or use a logger)
    console.log(`📧 Email sent: ${info.messageId} → ${to}`);
  } catch (error: any) {
    // Wrap and throw AppError for global error handler
    throw new AppError(500, `Email sending failed: ${error.message || error}`);
  }
};
