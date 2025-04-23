import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
import { Attachment } from "nodemailer/lib/mailer";
import { logs } from "../../infrastructure/datasoruces/file-system.datasource";

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

  async sendEmailWithSystemLogs(
    to: string | string[],
    from: string,
  ): Promise<boolean> {
    const optionsWithLogs: SendMailOptions = {
      to,
      from,
      subject: "System logs",
      html: "<h1>System logs</h1>",
      attachments: [
        { filename: logs.low.filename, path: logs.low.path },
        { filename: logs.medium.filename, path: logs.medium.path },
        { filename: logs.high.filename, path: logs.high.path },
      ],
    };
    return await this.sendEmail(optionsWithLogs);
  }
}
