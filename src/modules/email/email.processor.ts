import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import sanitizeHtml from 'sanitize-html';
import { SendEmailDto } from 'src/common/dtos';
import { createTransporter } from 'src/config/nodemailer';

@Processor('email-queue')
export class EmailProcessor {
  @Process('send-email')
  async handleSendEmail(job: Job<SendEmailDto>) {
    const { smtpConfig, mailOptions } = job.data;

    // Sanitize HTML content to prevent XSS attacks
    const sanitizedHtml = sanitizeHtml(mailOptions.html);
    const transporter = createTransporter(smtpConfig);

    try {
      await transporter.sendMail({
        ...mailOptions,
        html: sanitizedHtml,
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error}`);
    }
  }
}
