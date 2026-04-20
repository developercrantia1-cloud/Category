import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send test email' })
  async sendMail(@Body() dto: SendMailDto) {
    await this.mailService.sendWelcomeEmail(
      dto.to,
      dto.name,
      dto.email,
    );

    return {
      message: 'Email sent successfully 🚀',
    };
  }
}

