import { Injectable } from "@nestjs/common";
import { MailService } from "./mail.service";
import { Interval } from "@nestjs/schedule";
import { log } from "console";

@Injectable()
export class MailScheduler {
    constructor(private readonly mailService: MailService) { }

    // @Interval(60000)
    // async setTestmailEvery10Sec() {
    //     await this.mailService.sendWelcomeEmail(
    //         'salep27182@pmdeal.com',
    //         'Sachin',
    //         'salep27182@pmdeal.com'
    //     )
    //     console.log('Sceduled mail was sent')
    // }
}