import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChattingService } from './chatting.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JoinRoomDto } from './dto/join-room.dto';

@WebSocketGateway({ cors: true })
export class ChattingGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly chattingService: ChattingService) {}

  // Example handshake payload:
  // auth: { token: "<jwt-with-payload-like-{ id: 1 }>" }
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const user = this.extractUserFromToken(token);

      client.data.user = user;
    } catch {
      client.disconnect();
    }
  }

  @SubscribeMessage('join_room')
  async joinRoom(
    @MessageBody() dto: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Client payload example:
    // socket.emit('join_room', { roomId: 1 });
    const user = client.data.user;

    const allowed = await this.chattingService.canJoinRoom(
      Number(user.id),
      dto.roomId,
    );

    if (!allowed) {
      client.emit('error', 'Access denied');
      return;
    }

    client.join(String(dto.roomId));
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Client payload example:
    // socket.emit('send_message', { roomId: 1, message: 'Hello from user 1' });
    const user = client.data.user;

    const message = await this.chattingService.sendMessage({
      ...dto,
      senderId: Number(user.id),
    });

    this.server.to(String(dto.roomId)).emit('receive_message', message);
  }

  private extractUserFromToken(token: unknown) {
    if (typeof token !== 'string') {
      throw new Error('Missing token');
    }

    const [, payload] = token.split('.');
    if (!payload) {
      throw new Error('Invalid token');
    }

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const parsedPayload = JSON.parse(
      Buffer.from(normalizedPayload, 'base64').toString('utf-8'),
    ) as { id?: number | string };

    if (parsedPayload.id === undefined || Number.isNaN(Number(parsedPayload.id))) {
      throw new Error('Invalid user payload');
    }

    return {
      ...parsedPayload,
      id: Number(parsedPayload.id),
    };
  }
}
