import { Injectable } from '@nestjs/common';
import { MailRepository } from './mail.repository';

@Injectable()
export class MailService {
  constructor(private readonly mailRepository: MailRepository) {}

  async sendWelcomeEmail(to: string, name: string, email: string) {
    await this.mailRepository.sendWelcomeEmail(to, name, email);
  }
}

