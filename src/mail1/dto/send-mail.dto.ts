import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SendMailDto {
    @ApiProperty({ example: 'Receiver Mail' })
    @IsEmail()
    to!: string;

    @ApiProperty({ example: 'Sachin' })
    name!: string;

    @ApiProperty({ example: 'test@gmail.com' })
    @IsEmail()
    from!: string;

}