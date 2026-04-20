import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { Mail1Module } from './mail1/mail1.module';
import { ChatModule } from './chat/chat.module';
import { ChattingModule } from './chatting/chatting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CategoryModule,
    PrismaModule,
    UserModule,
    CarModule,
    MailModule,
    ChatModule,
    ChattingModule,
    // Mail1Module,
  ],
})
export class AppModule {}
