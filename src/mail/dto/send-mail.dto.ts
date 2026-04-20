import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendMailDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Recipient email address',
  })
  @IsEmail()
  to!: string;

  @ApiProperty({
    example: 'Sachin',
    description: 'User name',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Sender email',
  })
  @IsEmail()
  email!: string;
}