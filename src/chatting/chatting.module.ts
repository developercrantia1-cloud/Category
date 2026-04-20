import { Module } from '@nestjs/common';
import { ChattingGateway } from './chatting.gateway';
import { ChattingService } from './chatting.service';
import { ChattingRepository } from './chatting.repository';
import { ChattingController } from './chatting.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChattingGateway, ChattingService, ChattingRepository],
  controllers: [ChattingController],
})
export class ChattingModule {}