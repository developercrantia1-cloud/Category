import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms')
  @ApiOperation({ summary: 'Get all active chat rooms' })
  findAllRooms() {
    return this.chatService.findAllRooms();
  }

  @Get('rooms/:roomId/messages')
  @ApiOperation({ summary: 'Get in-memory message history for a room' })
  findMessagesByRoom(@Param('roomId') roomId: string) {
    return this.chatService.findMessagesByRoom(roomId);
  }
}
