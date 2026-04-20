import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChattingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(data: { name?: string; userIds: number[] }) {
    return this.prisma.client.room.create({
      data: {
        name: data.name,
        users: {
          connect: data.userIds.map((id) => ({ id })),
        },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async createMessage(data: {
    message: string;
    senderId: number;
    roomId: number;
  }) {
    return this.prisma.client.message.create({ data });
  }

  async getMessages(roomId: number) {
    return this.prisma.client.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async isUserInRoom(userId: number, roomId: number) {
    const room = await this.prisma.client.room.findFirst({
      where: {
        id: roomId,
        users: {
          some: { id: userId },
        },
      },
    });

    return !!room;
  }
}
