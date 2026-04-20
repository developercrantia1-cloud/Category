import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { Mail1Servcie } from "./mail1.service";

@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [MailerModule1],
    providers: [Mail1Servcie, MailerModule1],
    exports: [Mail1Servcie]

})

export class MailerModule1 { }