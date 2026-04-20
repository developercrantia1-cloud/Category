import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { JoinRoomDto } from './dto/join-room.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  joinRoom(joinRoomDto: JoinRoomDto) {
    this.chatRepository.ensureRoom(joinRoomDto.roomId);

    return {
      roomId: joinRoomDto.roomId,
      userName: joinRoomDto.userName,
      joinedAt: new Date(),
    };
  }

  sendMessage(sendMessageDto: SendMessageDto) {
    this.chatRepository.ensureRoom(sendMessageDto.roomId);

    return this.chatRepository.createMessage(
      sendMessageDto.roomId,
      sendMessageDto.userName,
      sendMessageDto.message,
    );
  }

  findAllRooms() {
    return this.chatRepository.findAllRooms();
  }

  findMessagesByRoom(roomId: string) {
    return this.chatRepository.findMessagesByRoom(roomId);
  }
}
