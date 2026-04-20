import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JoinRoomDto } from './dto/join-room.dto';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const room = this.chatService.joinRoom(joinRoomDto);

    client.join(room.roomId);
    client.emit('joinedRoom', room);

    this.server.to(room.roomId).emit('roomUsers', {
      roomId: room.roomId,
      joinedBy: room.userName,
    });

    return room;
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(@MessageBody() sendMessageDto: SendMessageDto) {
    const savedMessage = this.chatService.sendMessage(sendMessageDto);

    this.server.to(savedMessage.roomId).emit('newMessage', savedMessage);

    return savedMessage;
  }
}
