import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
import { Attachment } from "nodemailer/lib/mailer";

export interface SendMailOptions {
  to: string | string[];
  from: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export class EmailService {
  private trasporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    try {
      const sentInfo = await this.trasporter.sendMail(options);
      console.log("Email sent: " + { ...sentInfo });
      return true;
    } catch (error) {
      return false;
    }
  }
}
