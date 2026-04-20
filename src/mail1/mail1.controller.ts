import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SendMailDto } from './dto/send-mail.dto';

@Controller('mail1')
export class Mail1Controller {
    @Post('send')
    async sendmail(@Body() dto: SendMailDto) {
        return {
            message: 'Done'
        }
    }

}
