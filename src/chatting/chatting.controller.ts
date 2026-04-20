import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ChattingService } from './chatting.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('chatting')
export class ChattingController {
  constructor(private readonly chattingService: ChattingService) {}

  @Post('rooms')
  async createRoom(@Body() dto: CreateRoomDto) {
    return this.chattingService.createRoom(dto);
  }

  @Get(':roomId')
  async getMessages(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Req() req: any,
    @Query('userId') userIdQuery?: string,
  ) {
    const requestUserId = req.user?.id;
    const resolvedUserId = requestUserId ?? userIdQuery;

    if (resolvedUserId === undefined) {
      throw new UnauthorizedException(
        'No authenticated user found. Add your auth guard or pass ?userId=<id> for local testing.',
      );
    }

    const userId = Number(resolvedUserId);
    if (Number.isNaN(userId)) {
      throw new BadRequestException('userId must be a valid number.');
    }

    return this.chattingService.getMessages(userId, roomId);
  }
}
