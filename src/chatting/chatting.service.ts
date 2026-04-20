import { Injectable, ForbiddenException } from '@nestjs/common';
import { ChattingRepository } from './chatting.repository';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class ChattingService {
  constructor(private readonly repo: ChattingRepository) {}

  async createRoom(dto: CreateRoomDto) {
    return this.repo.createRoom(dto);
  }

  async canJoinRoom(userId: number, roomId: number) {
    return this.repo.isUserInRoom(userId, roomId);
  }

  async sendMessage(data: {
    message: string;
    senderId: number;
    roomId: number;
  }) {
    const allowed = await this.repo.isUserInRoom(
      data.senderId,
      data.roomId,
    );

    if (!allowed) {
      throw new ForbiddenException('Not allowed in room');
    }

    return this.repo.createMessage(data);
  }

  async getMessages(userId: number, roomId: number) {
    const allowed = await this.repo.isUserInRoom(userId, roomId);

    if (!allowed) {
      throw new ForbiddenException('Access denied');
    }

    return this.repo.getMessages(roomId);
  }
}
