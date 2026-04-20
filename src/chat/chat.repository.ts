import { Injectable } from '@nestjs/common';

export type ChatMessage = {
  id: number;
  roomId: string;
  userName: string;
  message: string;
  sentAt: Date;
};

@Injectable()
export class ChatRepository {
  private readonly rooms = new Set<string>();
  private readonly messages = new Map<string, ChatMessage[]>();
  private nextMessageId = 1;

  ensureRoom(roomId: string) {
    this.rooms.add(roomId);

    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, []);
    }
  }

  createMessage(roomId: string, userName: string, message: string): ChatMessage {
    this.ensureRoom(roomId);

    const chatMessage: ChatMessage = {
      id: this.nextMessageId++,
      roomId,
      userName,
      message,
      sentAt: new Date(),
    };

    this.messages.get(roomId)!.push(chatMessage);

    return chatMessage;
  }

  findMessagesByRoom(roomId: string): ChatMessage[] {
    return [...(this.messages.get(roomId) ?? [])];
  }

  findAllRooms(): string[] {
    return [...this.rooms].sort((left, right) => left.localeCompare(right));
  }
}
