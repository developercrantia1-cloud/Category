import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';
import { join } from 'path';

@Injectable()
export class MailRepository {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string, email: string) {
    const templatePath = join(process.cwd(), 'src/mail/templates/welcome.ejs');

    const html = await ejs.renderFile(templatePath, {
      name,
      email,
    });

    const result = await this.mailerService.sendMail({
      to,
      subject: 'Welcome',
      html,
    });

    console.log('Mail send result:', {
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response,
      messageId: result.messageId,
    });
  }
}
